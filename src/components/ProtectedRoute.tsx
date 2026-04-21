import { useAuth } from '@/hooks/useAuth';

/**
 * Auth removed — no login required. Just waits briefly for the anonymous
 * Supabase session to be established so queries using auth.uid() work.
 */
export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
