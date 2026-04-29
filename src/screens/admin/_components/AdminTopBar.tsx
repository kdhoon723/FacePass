import { type ReactNode, useRef, useEffect, useState } from 'react';

const A_GRAY_900 = '#191F28';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
const A_RED = '#EF4452';

interface AdminTopBarProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export default function AdminTopBar({ title, subtitle, action }: AdminTopBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      style={{
        height: 72,
        background: '#fff',
        borderBottom: `1px solid ${A_GRAY_200}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 32px',
        gap: 24,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: A_GRAY_900,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>{subtitle}</div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '9px 14px',
          background: A_GRAY_100,
          borderRadius: 10,
          fontSize: 13,
          color: A_GRAY_600,
          width: 280,
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          style={{ flexShrink: 0, color: A_GRAY_500 }}
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref={searchRef}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="직원, 부서, 사번 검색…"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: 13,
            color: A_GRAY_900,
            fontFamily: 'inherit',
          }}
        />
        {!searchValue && (
          <span
            style={{
              marginLeft: 'auto',
              padding: '2px 6px',
              background: '#fff',
              border: `1px solid ${A_GRAY_200}`,
              borderRadius: 5,
              fontSize: 11,
              color: A_GRAY_400,
              flexShrink: 0,
            }}
          >
            ⌘K
          </span>
        )}
      </div>
      <button
        onClick={() => alert('알림 기능은 다음 업데이트에서 추가됩니다')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: A_GRAY_100,
          border: 0,
          cursor: 'pointer',
          color: A_GRAY_600,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 9,
            width: 8,
            height: 8,
            borderRadius: 99,
            background: A_RED,
            border: '2px solid #fff',
          }}
        />
      </button>
      {action}
    </div>
  );
}
