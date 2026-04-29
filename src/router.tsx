import { createBrowserRouter, Outlet } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthGuard } from './components/AuthGuard';

// Lazy-load each screen group. The kiosk bundle stays small even though the
// admin console pulls in heavy dashboard widgets.
const KioskApp = lazy(() => import('./screens/kiosk/KioskApp'));
const EmpNoFallback = lazy(() => import('./screens/edge/EmpNoFallback'));
const PermPrime = lazy(() => import('./screens/edge/PermPrime'));
const PermDenied = lazy(() => import('./screens/edge/PermDenied'));
const InviteError = lazy(() => import('./screens/edge/InviteError'));
const EnrollFlow = lazy(() => import('./screens/enroll/EnrollFlow'));

const AdminLogin = lazy(() => import('./screens/admin/AdminLogin'));
const AdminLayout = lazy(() => import('./screens/admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./screens/admin/AdminDashboard'));
const AdminRecords = lazy(() => import('./screens/admin/AdminRecords'));
const AdminReports = lazy(() => import('./screens/admin/AdminReports'));
const AdminEmployees = lazy(() => import('./screens/admin/AdminEmployees'));
const AdminSettings = lazy(() => import('./screens/admin/AdminSettings'));

const NotFound = lazy(() => import('./screens/NotFound'));

const Splash = () => (
  <div
    style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-gray-100)',
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
      불러오는 중…
    </div>
  </div>
);

const SuspenseBoundary = () => (
  <Suspense fallback={<Splash />}>
    <Outlet />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    Component: SuspenseBoundary,
    children: [
      // Kiosk + edge cases (mobile)
      { path: '/', Component: KioskApp },
      { path: '/empno', Component: EmpNoFallback },
      { path: '/perm-prime', Component: PermPrime },
      { path: '/perm-denied', Component: PermDenied },
      { path: '/invite-error', Component: InviteError },
      { path: '/invite-error/:token', Component: InviteError },

      // Enrollment (mobile, magic-link entry)
      { path: '/enroll/:token', Component: EnrollFlow },

      // Admin console (desktop)
      { path: '/admin/login', Component: AdminLogin },
      {
        path: '/admin',
        Component: AuthGuard,
        children: [
          {
            Component: AdminLayout,
            children: [
              { index: true, Component: AdminDashboard },
              { path: 'records', Component: AdminRecords },
              { path: 'reports', Component: AdminReports },
              { path: 'employees', Component: AdminEmployees },
              { path: 'settings', Component: AdminSettings },
            ],
          },
        ],
      },

      { path: '*', Component: NotFound },
    ],
  },
]);
