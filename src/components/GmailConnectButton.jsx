import { useAuth } from '@/hooks/useAuth';

const GOOGLE_GMAIL_CLIENT_ID = "679798363007-nqnrb2gvd4v3dk49mm0ohc2fdteiqnh7.apps.googleusercontent.com";

export function GmailConnectButton() {
  const { user } = useAuth();

  if (!user || user.is_anonymous) return null;

  const handleConnect = () => {
    const params = new URLSearchParams({
      client_id: GOOGLE_GMAIL_CLIENT_ID,
      redirect_uri: "https://akozvprafftexqgjrplg.supabase.co/functions/v1/gmail-oauth-callback",
      response_type: "code",
      scope: "https://www.googleapis.com/auth/gmail.readonly",
      access_type: "offline",
      prompt: "consent",
      state: user.id,
    });

    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  };

  return (
    <button onClick={handleConnect} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '10px 20px', borderRadius: '8px', border: '1px solid #ddd',
      background: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 500,
    }}>
      Connect Gmail for auto-tracking
    </button>
  );
}