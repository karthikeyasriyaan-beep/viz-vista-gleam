import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

declare global {
  interface Window {
    OneSignalDeferred: any[];
  }
}

function isAllowedOneSignalHost() {
  const hostname = window.location.hostname;
  return hostname === 'trackorapp.in' || hostname === 'www.trackorapp.in' || hostname === 'localhost' || hostname === '127.0.0.1';
}

export function useOneSignal() {
  const { user, isGuest } = useAuth();

  useEffect(() => {
    if (!isAllowedOneSignalHost()) return;
    if (!user || isGuest || user.is_anonymous) return;

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      try {
        // Link this browser's push subscription to the actual Supabase user_id
        await OneSignal.login(user.id);
      } catch (err) {
        console.error('OneSignal login failed:', err);
      }
    });
  }, [user, isGuest]);

  const requestPermission = () => {
    if (!isAllowedOneSignalHost()) return;

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async (OneSignal: any) => {
      await OneSignal.Notifications.requestPermission();
    });
  };

  return { requestPermission };
}