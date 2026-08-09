// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: {
  env: { get: (key: string) => string | undefined };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ONESIGNAL_APP_ID = Deno.env.get("ONESIGNAL_APP_ID")!;
const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY")!;

const LOW_THRESHOLD = 100; // ₹100 or below triggers the alert

async function sendPush(userId: string, heading: string, body: string, url: string) {
  const res = await fetch("https://api.onesignal.com/notifications", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Key ${ONESIGNAL_REST_API_KEY}`,
    },
    body: JSON.stringify({
      app_id: ONESIGNAL_APP_ID,
      include_aliases: { external_id: [userId] },
      target_channel: "push",
      headings: { en: heading },
      contents: { en: body },
      url,
    }),
  });
  return res.json();
}

Deno.serve(async (_req: Request) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const todayRef = `safe-spend-${now.toISOString().split("T")[0]}`;
  const results: any[] = [];

  // Get all users with a gmail_connections or any activity — simplest: distinct user_ids from expenses
  const { data: userRows } = await supabase
    .from("expenses")
    .select("user_id")
    .limit(5000);

  const userIds = [...new Set((userRows ?? []).map((r: any) => r.user_id))];

  for (const userId of userIds) {
    // Skip if already notified today
    const { data: already } = await supabase
      .from("notification_log")
      .select("id")
      .eq("user_id", userId)
      .eq("type", "safe_spend_low")
      .eq("reference", todayRef)
      .maybeSingle();
    if (already) continue;

    const { data: income } = await supabase.from("income").select("amount, date").eq("user_id", userId);
    const { data: expenses } = await supabase.from("expenses").select("amount, date, category").eq("user_id", userId);
    const { data: categoryBudgets } = await supabase
      .from("budgets")
      .select("category, monthly_limit")
      .eq("user_id", userId)
      .eq("month", month)
      .eq("year", year);

    const monthIncome = (income ?? []).filter((i: any) => {
      const d = new Date(i.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });
    const monthExpenses = (expenses ?? []).filter((e: any) => {
      const d = new Date(e.date);
      return d.getMonth() + 1 === month && d.getFullYear() === year;
    });

    const totalIncome = monthIncome.reduce((s: number, i: any) => s + Number(i.amount), 0);

    const spendByCategory: Record<string, number> = {};
    for (const e of monthExpenses) {
      const c = e.category || "Other";
      spendByCategory[c] = (spendByCategory[c] || 0) + Number(e.amount);
    }

    const budgetedCategories = new Set((categoryBudgets ?? []).map((b: any) => b.category));
    const totalReservedDeduction = (categoryBudgets ?? []).reduce(
      (s: number, b: any) => s + Math.max(Number(b.monthly_limit || 0), spendByCategory[b.category] || 0),
      0
    );
    const unbudgetedSpend = Object.entries(spendByCategory)
      .filter(([cat]) => !budgetedCategories.has(cat))
      .reduce((s, [, amt]) => s + (amt as number), 0);

    const safeToSpend = Math.max(totalIncome - totalReservedDeduction - unbudgetedSpend, 0);
    const daysInMonth = new Date(year, month, 0).getDate();
    const daysLeft = Math.max(daysInMonth - now.getDate(), 1);
    const dailySafe = safeToSpend / daysLeft;

    if (dailySafe <= LOW_THRESHOLD) {
      await sendPush(
        userId,
        "Safe-to-spend is low today ⚠️",
        `Only ₹${Math.round(dailySafe)} left to spend safely today. Check your dashboard before spending.`,
        "https://trackorapp.in/dashboard"
      );
      await supabase.from("notification_log").insert({
        user_id: userId,
        type: "safe_spend_low",
        reference: todayRef,
      });
      results.push({ user: userId, dailySafe: Math.round(dailySafe) });
    }
  }

  return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
});