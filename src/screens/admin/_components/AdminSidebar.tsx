// AdminSidebar — unified sidebar for all admin pages
// Merges AdminSidebar (admin-screens.jsx) and AxSidebar (admin-screens-extra.jsx)

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
type NavKey = 'dashboard' | 'records' | 'reports' | 'employees' | 'settings';

interface AdminSidebarProps {
  active?: NavKey;
}

const navItems: Array<{ key: NavKey; label: string; iconPath: string }> = [
  {
    key: 'dashboard',
    label: '대시보드',
    iconPath: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z',
  },
  {
    key: 'records',
    label: '출석 기록',
    iconPath:
      'M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z',
  },
  {
    key: 'reports',
    label: '리포트',
    iconPath: 'M5 9.2h3v8H5zM10.6 5h2.8v12h-2.8zM16.2 13h2.8v4h-2.8z',
  },
  {
    key: 'employees',
    label: '직원 관리',
    iconPath:
      'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
  },
  {
    key: 'settings',
    label: '설정',
    iconPath:
      'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
  },
];

export default function AdminSidebar({ active = 'dashboard' }: AdminSidebarProps) {
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 12px 24px',
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
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const isActive = item.key === active;
          return (
            <div
              key={item.key}
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
                cursor: 'pointer',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d={item.iconPath} />
              </svg>
              <span>{item.label}</span>
              {item.key === 'records' && (
                <span
                  style={{
                    marginLeft: 'auto',
                    padding: '2px 8px',
                    background: isActive ? '#fff' : A_GRAY_100,
                    color: A_BLUE,
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  3
                </span>
              )}
            </div>
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

      {/* Profile */}
      <div
        style={{
          marginTop: 12,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: 10,
          borderRadius: 12,
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
          이
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>이수민</div>
          <div style={{ fontSize: 11, color: A_GRAY_500 }}>HR 매니저</div>
        </div>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={A_GRAY_400}
          strokeWidth="2.4"
          strokeLinecap="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </aside>
  );
}
