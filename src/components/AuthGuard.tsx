import { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/api';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

/**
 * Wraps `/admin/*` routes. Reads the current Supabase session, redirects to
 * `/admin/login` while preserving the intended destination, and reacts to
 * sign-in/sign-out events so that the UI follows token state without a manual
 * page refresh.
 */
export function AuthGuard() {
  const [status, setStatus] = useState<AuthStatus>('checking');
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      setStatus(data.session ? 'authenticated' : 'unauthenticated');
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (cancelled) return;
      setStatus(session ? 'authenticated' : 'unauthenticated');
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (status === 'checking') {
    return (
      <div
        style={{
          minHeight: '100dvh',
          background: 'var(--color-gray-50)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gray-500)',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              border: '2.5px solid var(--color-gray-200)',
              borderTopColor: 'var(--color-brand)',
              animation: 'fp-spin 0.9s linear infinite',
            }}
          />
          세션 확인 중…
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
