// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ONESIGNAL_APP_ID = Deno.env.get("ONESIGNAL_APP_ID")!;
const ONESIGNAL_REST_API_KEY = Deno.env.get("ONESIGNAL_REST_API_KEY")!;
const TEMPLATE_ID = "0f35ab7d-6174-4ae2-85c0-a8384f228345";

Deno.serve(async (_req: Request) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  // Look ahead 1–3 days for upcoming renewals
  const today = new Date();
  const in3Days = new Date(today);
  in3Days.setDate(today.getDate() + 3);

  const todayStr = today.toISOString().split("T")[0];
  const in3DaysStr = in3Days.toISOString().split("T")[0];

  const { data: subs, error } = await supabase
    .from("subscriptions")
    .select("id, user_id, name, amount, next_billing_date, status")
    .eq("status", "active")
    .gte("next_billing_date", todayStr)
    .lte("next_billing_date", in3DaysStr);

  if (error) {
    return new Response(`DB error: ${error.message}`, { status: 500 });
  }

  const results: any[] = [];

  for (const sub of subs ?? []) {
    // Ensure next_billing_date is treated as string
    const renewalDate = new Date(sub.next_billing_date as string);
    const daysLeft = Math.ceil(
      (renewalDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    // OneSignal payload
    const payload = {
      app_id: ONESIGNAL_APP_ID,
      template_id: TEMPLATE_ID,
      // Use external user IDs instead of aliases
      include_external_user_ids: [sub.user_id],
      target_channel: "push",
      custom_data: {
        subscription_name: sub.name,
        days_left: String(daysLeft),
        amount: `₹${sub.amount}`,
      },
      // Override contents directly to ensure message delivery
      contents: {
        en: `Your ${sub.name} renews in ${daysLeft} day(s) — ₹${sub.amount}. Review it in Trackora.`,
      },
    };

    try {
      const res = await fetch("https://api.onesignal.com/notifications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Key ${ONESIGNAL_REST_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });

      const result: any = await res.json();
      results.push({
        user_id: sub.user_id,
        subscription: sub.name,
        status: res.status,
        result,
      });
    } catch (err: any) {
      results.push({
        user_id: sub.user_id,
        subscription: sub.name,
        status: "error",
        error: err.message,
      });
    }
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
});


