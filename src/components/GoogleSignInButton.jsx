import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function GoogleSignInButton() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { data: { session: current } } = await supabase.auth.getSession();

    if (current?.user?.is_anonymous) {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'google',
        options: { redirectTo: 'https://trackorapp.in/dashboard' },
      });
      if (error) {
        console.error('Google link error:', error);
        setLoading(false);
      }
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: 'https://trackorapp.in/dashboard' },
    });
    if (error) {
      console.error('Google sign-in error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#fff',
        cursor: loading ? 'default' : 'pointer',
        fontSize: '14px',
        fontWeight: '500',
        opacity: loading ? 0.6 : 1,
      }}
    >
      <img src="https://www.google.com/favicon.ico" width="18" height="18" alt="" />
      {loading ? 'Redirecting…' : 'Sign in with Google'}
    </button>
  );
}