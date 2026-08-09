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

async function alreadySent(supabase: any, userId: string, type: string, reference: string) {
  const { data } = await supabase
    .from("notification_log")
    .select("id")
    .eq("user_id", userId)
    .eq("type", type)
    .eq("reference", reference)
    .maybeSingle();
  return !!data;
}

async function logSent(supabase: any, userId: string, type: string, reference: string) {
  await supabase.from("notification_log").insert({ user_id: userId, type, reference });
}

Deno.serve(async (_req: Request) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const results: any[] = [];

  // ---------- Category budgets ----------
  const { data: budgets } = await supabase
    .from("budgets")
    .select("id, user_id, category, monthly_limit, month, year")
    .eq("month", month)
    .eq("year", year);

  for (const b of budgets ?? []) {
    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount, date")
      .eq("user_id", b.user_id)
      .eq("category", b.category);

    const spent = (expenses ?? [])
      .filter((e: any) => {
        const d = new Date(e.date);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      })
      .reduce((s: number, e: any) => s + Number(e.amount), 0);

    const pct = b.monthly_limit > 0 ? (spent / b.monthly_limit) * 100 : 0;
    const ref = `budget-${b.id}-${month}-${year}`;

    if (pct >= 100) {
      const already = await alreadySent(supabase, b.user_id, "budget_100", ref);
      if (!already) {
        await sendPush(
          b.user_id,
          "Budget limit reached ⚠️",
          `You've hit 100% of your ${b.category} budget this month.`,
          "https://trackorapp.in/budget"
        );
        await logSent(supabase, b.user_id, "budget_100", ref);
        results.push({ user: b.user_id, category: b.category, alert: "100%" });
      }
    } else if (pct >= 80) {
      const already = await alreadySent(supabase, b.user_id, "budget_80", ref);
      if (!already) {
        await sendPush(
          b.user_id,
          "Budget getting close 👀",
          `You've used 80% of your ${b.category} budget this month.`,
          "https://trackorapp.in/budget"
        );
        await logSent(supabase, b.user_id, "budget_80", ref);
        results.push({ user: b.user_id, category: b.category, alert: "80%" });
      }
    }
  }

  // ---------- Overall monthly budget ----------
  const { data: monthlyBudgets } = await supabase
    .from("monthly_budgets")
    .select("id, user_id, total_limit, month, year")
    .eq("month", month)
    .eq("year", year);

  for (const mb of monthlyBudgets ?? []) {
    const { data: expenses } = await supabase
      .from("expenses")
      .select("amount, date")
      .eq("user_id", mb.user_id);

    const spent = (expenses ?? [])
      .filter((e: any) => {
        const d = new Date(e.date);
        return d.getMonth() + 1 === month && d.getFullYear() === year;
      })
      .reduce((s: number, e: any) => s + Number(e.amount), 0);

    const pct = mb.total_limit > 0 ? (spent / mb.total_limit) * 100 : 0;
    const ref = `monthly-${mb.id}-${month}-${year}`;

    if (pct >= 100) {
      const already = await alreadySent(supabase, mb.user_id, "budget_100", ref);
      if (!already) {
        await sendPush(
          mb.user_id,
          "Monthly budget reached ⚠️",
          `You've hit 100% of your overall monthly budget.`,
          "https://trackorapp.in/budget"
        );
        await logSent(supabase, mb.user_id, "budget_100", ref);
        results.push({ user: mb.user_id, scope: "monthly", alert: "100%" });
      }
    } else if (pct >= 80) {
      const already = await alreadySent(supabase, mb.user_id, "budget_80", ref);
      if (!already) {
        await sendPush(
          mb.user_id,
          "Monthly budget getting close 👀",
          `You've used 80% of your overall monthly budget.`,
          "https://trackorapp.in/budget"
        );
        await logSent(supabase, mb.user_id, "budget_80", ref);
        results.push({ user: mb.user_id, scope: "monthly", alert: "80%" });
      }
    }
  }

  return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
});