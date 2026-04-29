import type { ReactNode } from 'react';

const A_BLUE = '#3182F6';
const A_GRAY_900 = '#191F28';
const A_GRAY_500 = '#6B7683';
const A_GRAY_200 = '#E5E8EB';
const A_GREEN = '#007B33';
const A_RED = '#EF4452';

interface StatTileProps {
  label: string;
  value: string;
  suffix?: string;
  delta?: string;
  color?: string;
  icon?: ReactNode;
  sub?: string;
}

export default function StatTile({
  label,
  value,
  suffix,
  delta,
  color = A_BLUE,
  icon,
  sub,
}: StatTileProps) {
  return (
    <div
      style={{
        flex: 1,
        background: '#fff',
        border: `1px solid ${A_GRAY_200}`,
        borderRadius: 16,
        padding: 20,
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: color + '1A',
            color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </div>
        {delta && (
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: 999,
              background: delta.startsWith('+')
                ? 'rgba(0,123,51,.1)'
                : 'rgba(239,68,82,.1)',
              color: delta.startsWith('+') ? A_GREEN : A_RED,
            }}
          >
            {delta}
          </div>
        )}
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: A_GRAY_500, fontWeight: 600 }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'baseline',
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: A_GRAY_900,
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {value}
        </div>
        {suffix && (
          <div style={{ fontSize: 15, color: A_GRAY_500, fontWeight: 600 }}>{suffix}</div>
        )}
      </div>
      {sub && <div style={{ marginTop: 4, fontSize: 12, color: A_GRAY_500 }}>{sub}</div>}
    </div>
  );
}
