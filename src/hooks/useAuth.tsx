import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

/**
 * Auth simplified: no login UI. On first load, the app silently signs the
 * visitor in anonymously via Supabase so RLS policies (auth.uid() = user_id)
 * keep working and each browser gets its own private data.
 *
 * `enterAsGuest()` just navigates to /dashboard.
 * Other auth methods are kept as no-ops so existing imports don't break.
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
      const { data: { session: existing } } = await supabase.auth.getSession();
      if (existing) {
        if (!mounted) return;
        setSession(existing);
        setUser(existing.user);
        setLoading(false);
        return;
      }
      // No session yet — sign in anonymously so RLS-protected inserts work.
      const { data, error } = await supabase.auth.signInAnonymously();
      if (!mounted) return;
      if (error) {
        console.error('Anonymous sign-in failed:', error);
        setLoading(false);
        return;
      }
      setSession(data.session);
      setUser(data.user);
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setUser(s?.user ?? null);
    });

    ensureSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const enterAsGuest = () => {
    navigate('/dashboard');
  };

  const noopAuth = async () => ({ error: null });
  const signOut = async () => { navigate('/'); };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      isGuest: false,
      signInWithGoogle: noopAuth,
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
