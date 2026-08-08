import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

/**
 * Auth flow:
 * - On first load, the app silently signs the visitor in anonymously via
 *   Supabase so RLS policies (auth.uid() = user_id) keep working and each
 *   browser gets its own private data.
 * - `signInWithGoogle()` upgrades an anonymous session to a real Google
 *   account via linkIdentity (keeps the same user_id, so existing data
 *   stays attached), or does a normal OAuth sign-in if there's no
 *   anonymous session yet.
 * - `enterAsGuest()` just navigates to /dashboard.
 */
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isGuest: boolean;
  signInWithGoogle: () => Promise<{ error: any }>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: any }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  enterAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const ensureSession = async () => {
      if (!mounted) return;
      setLoading(true);

      const { data: { session: existing } } = await supabase.auth.getSession();
      if (existing) {
        if (!mounted) return;
        setSession(existing);
        setUser(existing.user);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.auth.signInAnonymously();
      if (!mounted) return;
      if (error) {
        console.error('Anonymous sign-in failed:', error);
        setSession(null);
        setUser(null);
        setLoading(false);
        return;
      }
      setSession(data.session);
      setUser(data.user);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);
      if (s?.user) {
        setLoading(false);
        return;
      }
      if (event === 'SIGNED_OUT') {
        void ensureSession();
      }
    });

    void ensureSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const enterAsGuest = () => {
    navigate('/dashboard');
  };

  /**
   * Signs in with Google. If the current session is anonymous, links the
   * Google identity onto it so the user keeps their existing data and
   * user_id. Otherwise does a normal OAuth redirect sign-in.
   */
  const signInWithGoogle = async () => {
    try {
      const { data: { session: current } } = await supabase.auth.getSession();

      if (current?.user?.is_anonymous) {
        const { data, error } = await supabase.auth.linkIdentity({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`,
          },
        });
        return { error };
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      return { error };
    } catch (err) {
      console.error('Google sign-in failed:', err);
      return { error: err };
    }
  };

  const noopAuth = async () => ({ error: null });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isGuest: false,
      signInWithGoogle,
      signInWithEmail: noopAuth,
      signUpWithEmail: noopAuth,
      signOut,
      enterAsGuest,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}