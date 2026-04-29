// AdminSidebar — unified sidebar for all admin pages
// Merges AdminSidebar (admin-screens.jsx) and AxSidebar (admin-screens-extra.jsx)

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/api';

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_700 = '#333D4B';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';

type NavKey = 'dashboard' | 'records' | 'reports' | 'employees' | 'settings';

interface AdminSidebarProps {
  active?: NavKey;
}

const navItems: Array<{ key: NavKey; label: string; to: string; iconPath: string }> = [
  {
    key: 'dashboard',
    label: '대시보드',
    to: '/admin',
    iconPath: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  },
  {
    key: 'records',
    label: '출석 기록',
    to: '/admin/records',
    iconPath:
      'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z',
  },
  {
    key: 'reports',
    label: '리포트',
    to: '/admin/reports',
    iconPath: 'M5 9.2h3v8H5zM10.6 5h2.8v12h-2.8zM16.2 13h2.8v4h-2.8z',
  },
  {
    key: 'employees',
    label: '직원 관리',
    to: '/admin/employees',
    iconPath:
      'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  {
    key: 'settings',
    label: '설정',
    to: '/admin/settings',
    iconPath:
      'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  },
];

export default function AdminSidebar({ active = 'dashboard' }: AdminSidebarProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<{ email: string; initial: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    supabase.auth.getUser().then(({ data }) => {
      if (cancelled || !data.user) return;
      const email = data.user.email ?? '';
      setProfile({ email, initial: email.slice(0, 1).toUpperCase() || 'A' });
    });
    return () => { cancelled = true; };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login', { replace: true });
  };

  return (
    <aside
      style={{
        width: 232,
        background: '#fff',
        borderRight: `1px solid ${A_GRAY_200}`,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 12px',
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <Link
        to="/admin"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px 24px',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="9" fill={A_BLUE} />
          <circle cx="16" cy="13" r="4" fill="#fff" />
          <path
            d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5"
            stroke="#fff"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: A_GRAY_900,
              letterSpacing: '-0.01em',
            }}
          >
            FacePass
          </div>
          <div
            style={{
              fontSize: 11,
              color: A_GRAY_500,
              fontWeight: 600,
              marginTop: 1,
            }}
          >
            Admin Console
          </div>
        </div>
      </Link>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <Link
              key={item.key}
              to={item.to}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                borderRadius: 10,
                background: isActive ? A_BLUE_WEAK : 'transparent',
                color: isActive ? A_BLUE : A_GRAY_600,
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = A_GRAY_100;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={item.iconPath} />
              </svg>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Help card */}
      <div style={{ padding: 16, background: A_GRAY_100, borderRadius: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>
          도움이 필요하세요?
        </div>
        <div
          style={{
            fontSize: 12,
            color: A_GRAY_600,
            marginTop: 4,
            lineHeight: 1.45,
          }}
        >
          IT 헬프데스크에{'\n'}문의해주세요
        </div>
        <button
          onClick={() => window.open('mailto:user@example.invalid?subject=FacePass%20문의')}
          style={{
            marginTop: 10,
            width: '100%',
            height: 32,
            borderRadius: 8,
            background: '#fff',
            color: A_BLUE,
            fontSize: 12,
            fontWeight: 700,
            border: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          문의하기
        </button>
      </div>

      {/* Profile + logout */}
      <div style={{ marginTop: 12, position: 'relative' }}>
        <button
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderRadius: 12,
            background: menuOpen ? A_GRAY_100 : 'transparent',
            border: 0,
            cursor: 'pointer',
            fontFamily: 'inherit',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 99,
              background: 'linear-gradient(135deg,#FFCCA8,#FFB582)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 13,
              fontWeight: 700,
              color: '#6E4944',
            }}
          >
            {profile?.initial ?? '·'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: A_GRAY_900,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {profile?.email ?? '로딩 중…'}
            </div>
            <div style={{ fontSize: 11, color: A_GRAY_500 }}>관리자</div>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke={A_GRAY_400}
            strokeWidth="2.4"
            strokeLinecap="round"
            style={{ transform: menuOpen ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {menuOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              left: 0,
              right: 0,
              marginBottom: 6,
              background: '#fff',
              border: `1px solid ${A_GRAY_200}`,
              borderRadius: 12,
              boxShadow: '0 8px 24px rgba(0,19,43,.08)',
              padding: 4,
              zIndex: 10,
            }}
          >
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 8,
                border: 0,
                background: 'transparent',
                color: A_GRAY_700,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                textAlign: 'left',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = A_GRAY_100)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
