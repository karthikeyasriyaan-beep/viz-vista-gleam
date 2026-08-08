// @ts-nocheck
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: {
  env: {
    get: (key: string) => string | undefined;
  };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};

const CLIENT_ID = Deno.env.get("GOOGLE_GMAIL_CLIENT_ID")!;
const CLIENT_SECRET = Deno.env.get("GOOGLE_GMAIL_CLIENT_SECRET")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const BANK_SENDERS = [
  "hdfcbank.com",
  "icicibank.com",
  "sbi.co.in",
  "onlinesbi.com",
  "axisbank.com",
  "kotak.com",
  "yesbank.in",
  "idfcfirstbank.com",
  "indusind.com",
  "pnbindia.in",
  "bankofbaroda.in",
  "canarabank.com",
  "unionbankofindia.co.in",
  "paytmbank.com",
  "federalbank.co.in",
];

async function getAccessToken(refreshToken: string) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token",
    }),
  });
  const data = await res.json();
  return data.access_token as string | undefined;
}

function decodeBase64Url(input: string) {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  return atob(b64);
}

function extractPlainText(payload: any): string {
  if (payload.mimeType === "text/plain" && payload.body?.data) {
    return decodeBase64Url(payload.body.data);
  }
  if (payload.parts) {
    for (const part of payload.parts) {
      const text = extractPlainText(part);
      if (text) return text;
    }
  }
  return "";
}

function parseTransaction(body: string, msgId: string, internalDate: string) {
  console.log("---- Parsing Gmail Message ----");
  console.log("Message ID:", msgId);
  console.log("Internal Date:", internalDate);
  console.log("Raw Body:", body);

  const amountMatch = body.match(/(?:₹|rs\.?|inr)\s?([\d,]+\.?\d*)/i);
  console.log("Amount Match:", amountMatch);
  if (!amountMatch) {
    console.log("❌ No amount found, skipping.");
    return null;
  }
  const amount = parseFloat(amountMatch[1].replace(/,/g, ""));
  console.log("Parsed Amount:", amount);

  const isDebit = /(debited|spent|paid|withdrawn|purchase|payment|sent)/i.test(body);
  const isCredit = /(credited|received|deposit|refund|added)/i.test(body);
  console.log("Debit Match:", isDebit, "Credit Match:", isCredit);

  if (!isDebit && !isCredit) {
    console.log("❌ No debit/credit keywords found, skipping.");
    return null;
  }

  const merchantMatch = body.match(/(?:at|to)\s+([A-Za-z0-9\s&]+?)(?:\son|\.|\s?ref|\s?avl|$)/i);
  console.log("Merchant Match:", merchantMatch);

  const txn = {
    amount,
    type: isDebit ? "debit" : "credit",
    category: "Other",
    merchant: merchantMatch?.[1]?.trim() || "Unknown",
    sms_hash: `gmail-${msgId}`,
  };

  console.log("✅ Parsed Transaction:", txn);
  return txn;
}

Deno.serve(async (_req: Request) => {
  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: connections, error } = await supabase
    .from("gmail_connections")
    .select("user_id, refresh_token, last_synced_at");

  if (error) return new Response(`DB error: ${error.message}`, { status: 500 });

  const results = [];

  for (const conn of connections ?? []) {
    const accessToken = await getAccessToken(conn.refresh_token);
    if (!accessToken) {
      results.push({ user: conn.user_id, status: "token refresh failed" });
      continue;
    }

    const query = BANK_SENDERS.map((s) => `from:${s}`).join(" OR ");
    const after = conn.last_synced_at
      ? Math.floor(new Date(conn.last_synced_at).getTime() / 1000)
      : Math.floor((Date.now() - 30 * 24 * 60 * 60 * 1000) / 1000);

    const searchString = `(${query}) after:${after}`;
    console.log("---- Gmail Query ----");
    console.log("User:", conn.user_id);
    console.log("Search String:", searchString);

    const listRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?q=${encodeURIComponent(searchString)}`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const listData = await listRes.json();
    console.log("Raw Gmail API Response:", listData);

    const messages = listData.messages ?? [];
    console.log("Messages Found:", messages.length);

    let parsedCount = 0;
    let skippedCount = 0;
    const expenseRows: any[] = [];
    const incomeRows: any[] = [];

    for (const m of messages) {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${m.id}?format=full`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      const msgData = await msgRes.json();
      const body = extractPlainText(msgData.payload);

      const txn = parseTransaction(body, m.id, msgData.internalDate);
      if (!txn) {
        console.log("❌ Skipped Message:", m.id);
        skippedCount++;
        continue;
      }

      const txnDate = new Date(parseInt(msgData.internalDate)).toISOString().split("T")[0];

      if (txn.type === "debit") {
        expenseRows.push({
          user_id: conn.user_id,
          name: txn.merchant,
          amount: txn.amount,
          category: txn.category,
          date: txnDate,
          source: "gmail_auto",
          sms_hash: txn.sms_hash,
        });
      } else {
        incomeRows.push({
          user_id: conn.user_id,
          source: txn.merchant,
          amount: txn.amount,
          category: txn.category,
          date: txnDate,
          source_type: "gmail_auto",
          sms_hash: txn.sms_hash,
        });
      }
      console.log("✅ Transaction Parsed:", txn);
      parsedCount++;
    }

    if (expenseRows.length > 0) {
      const { error: expError } = await supabase
        .from("expenses")
        .upsert(expenseRows, { onConflict: "sms_hash", ignoreDuplicates: true });
      if (expError) {
        console.log("Expense insert error:", expError.message);
        results.push({ user: conn.user_id, status: `expense insert error: ${expError.message}` });
      }
    }

    if (incomeRows.length > 0) {
      const { error: incError } = await supabase
        .from("income")
        .upsert(incomeRows, { onConflict: "sms_hash", ignoreDuplicates: true });
      if (incError) {
        console.log("Income insert error:", incError.message);
        results.push({ user: conn.user_id, status: `income insert error: ${incError.message}` });
      }
    }

    if (!listData.error) {
      await supabase
        .from("gmail_connections")
        .update({ last_synced_at: new Date().toISOString() })
        .eq("user_id", conn.user_id);
    } else {
      console.log("Skipping last_synced_at update due to API error:", listData.error);
    }

    const totalSynced = expenseRows.length + incomeRows.length;

    console.log(`---- Summary for User ${conn.user_id} ----`);
    console.log(`Messages Checked: ${messages.length}`);
    console.log(`Parsed: ${parsedCount}, Skipped: ${skippedCount}`);
    console.log(`Expenses: ${expenseRows.length}, Income: ${incomeRows.length}`);

    results.push({
      user: conn.user_id,
      checked: messages.length,
      parsed: parsedCount,
      skipped: skippedCount,
      expenses: expenseRows.length,
      income: incomeRows.length,
      synced: totalSynced,
    });
  }

  return new Response(JSON.stringify(results), { headers: { "Content-Type": "application/json" } });
});