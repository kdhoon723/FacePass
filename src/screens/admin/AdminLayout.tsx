import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from './_components/AdminSidebar';

type NavKey = 'dashboard' | 'records' | 'reports' | 'employees' | 'settings';

export default function AdminLayout() {
  const { pathname } = useLocation();

  const active: NavKey = pathname.includes('/records')
    ? 'records'
    : pathname.includes('/reports')
      ? 'reports'
      : pathname.includes('/employees')
        ? 'employees'
        : pathname.includes('/settings')
          ? 'settings'
          : 'dashboard';

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        background: 'var(--color-gray-50)',
        fontFamily: 'var(--font-body)',
      }}
    >
      <AdminSidebar active={active} />
      <Outlet />
    </div>
  );
}
