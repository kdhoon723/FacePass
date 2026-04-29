interface StatusBarProps {
  /** Use white icons over a dark background. */
  dark?: boolean;
  /** Display time. Defaults to a static "9:41" so static screenshots stay stable. */
  time?: string;
}

/**
 * iOS-style status bar (47px tall) used across every mobile-frame screen.
 * Mirrors the markup in `design-reference/project/components/user-screens.jsx`.
 */
export function StatusBar({ dark = false, time = '9:41' }: StatusBarProps) {
  const c = dark ? '#fff' : '#000';
  return (
    <div
      style={{
        height: 47,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px 0 32px',
        color: c,
        fontSize: 17,
        fontWeight: 600,
        fontFamily: 'var(--font-body)',
        letterSpacing: '-0.01em',
      }}
    >
      <span>{time}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* signal */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill={c} />
          <path
            d="M2 4.2C3.7 2.7 5.7 1.9 8 1.9s4.3.8 6 2.3"
            stroke={c}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M4 6.6c1.1-1 2.5-1.5 4-1.5s2.9.5 4 1.5"
            stroke={c}
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
        {/* battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={c} opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill={c} />
          <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill={c} opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}
