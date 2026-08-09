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

Deno.serve(async (req: Request) => {
  const url = new URL(req.url);
  const type = url.searchParams.get("type") === "monthly" ? "monthly" : "weekly";

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const now = new Date();

  let startDate: Date;
  let periodLabel: string;
  let refDate: string;

  if (type === "monthly") {
    // Previous calendar month
    const prevMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const prevYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
    startDate = new Date(prevYear, prevMonth, 1);
    const endOfPrevMonth = new Date(prevYear, prevMonth + 1, 0);
    periodLabel = startDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
    refDate = `monthly-${prevYear}-${prevMonth + 1}`;
    // override "now" upper bound for filtering
    var rangeEnd = endOfPrevMonth;
  } else {
    startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    periodLabel = "the past week";
    refDate = `weekly-${now.toISOString().split("T")[0]}`;
    var rangeEnd = now;
  }

  const { data: userRows } = await supabase.from("expenses").select("user_id").limit(5000);
  const userIds = [...new Set((userRows ?? []).map((r: any) => r.user_id))];
  const results: any[] = [];

  for (const userId of userIds) {
    const notifType = type === "monthly" ? "monthly_summary" : "weekly_summary";
    const { data: already } = await supabase
      .from("notification_log")
      .select("id")
      .eq("user_id", userId)
      .eq("type", notifType)
      .eq("reference", refDate)
      .maybeSingle();
    if (already) continue;

    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount, category, date")
      .eq("user_id", userId);
    const { data: income } = await supabase
      .from("income")
      .select("amount, date")
      .eq("user_id", userId);

    const inRange = (dateStr: string) => {
      const d = new Date(dateStr);
      return d >= startDate && d <= rangeEnd;
    };

    const periodExpenses = (expenses ?? []).filter((e: any) => inRange(e.date));
    const periodIncome = (income ?? []).filter((i: any) => inRange(i.date));

    if (periodExpenses.length === 0 && periodIncome.length === 0) continue; // nothing to report

    const totalSpent = periodExpenses.reduce((s: number, e: any) => s + Number(e.amount), 0);
    const totalIncome = periodIncome.reduce((s: number, i: any) => s + Number(i.amount), 0);

    const byCategory: Record<string, number> = {};
    for (const e of periodExpenses) {
      const c = e.category || "Other";
      byCategory[c] = (byCategory[c] || 0) + Number(e.amount);
    }
    const topCategory = Object.entries(byCategory).sort((a, b) => (b[1] as number) - (a[1] as number))[0];

    const heading = type === "monthly" ? `Your ${periodLabel} recap 📊` : "Your weekly recap 📊";
    const topCatText = topCategory ? ` Top category: ${topCategory[0]} (₹${Math.round(topCategory[1] as number)}).` : "";
    const body = `Spent ₹${Math.round(totalSpent)}, earned ₹${Math.round(totalIncome)} in ${periodLabel}.${topCatText}`;

    await sendPush(userId, heading, body, "https://trackorapp.in/analytics");
    await supabase.from("notification_log").insert({ user_id: userId, type: notifType, reference: refDate });
    results.push({ user: userId, type, totalSpent, totalIncome, topCategory: topCategory?.[0] });
  }

  return new Response(JSON.stringify({ type, count: results.length, results }), {
    headers: { "Content-Type": "application/json" },
  });
});