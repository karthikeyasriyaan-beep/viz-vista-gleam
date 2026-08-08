import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const CLIENT_ID = Deno.env.get("GOOGLE_GMAIL_CLIENT_ID")!;
const CLIENT_SECRET = Deno.env.get("GOOGLE_GMAIL_CLIENT_SECRET")!;
const REDIRECT_URI = Deno.env.get("GOOGLE_GMAIL_REDIRECT_URI")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state"); // user_id passed through

  if (!code || !state) {
    return new Response("Missing code or state", { status: 400 });
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    return new Response(
      "No refresh token returned. If you've connected before, revoke access at https://myaccount.google.com/permissions and try again.",
      { status: 400 }
    );
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { error } = await supabase
    .from("gmail_connections")
    .upsert(
      { user_id: state, refresh_token: tokens.refresh_token },
      { onConflict: "user_id" }
    );

  if (error) {
    return new Response(`Failed to save connection: ${error.message}`, { status: 500 });
  }

  return Response.redirect("https://trackorapp.in/dashboard?gmail_connected=true", 302);
});