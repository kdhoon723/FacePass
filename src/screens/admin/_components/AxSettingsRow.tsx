import type { ReactNode } from 'react';

const AX_GRAY_900 = '#191F28';
const AX_GRAY_500 = '#6B7683';
const AX_GRAY_100 = '#F2F4F6';

interface AxSettingsRowProps {
  title: string;
  desc?: string;
  control: ReactNode;
}

export default function AxSettingsRow({ title, desc, control }: AxSettingsRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: `1px solid ${AX_GRAY_100}`,
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: AX_GRAY_900 }}>{title}</div>
        {desc && (
          <div
            style={{
              fontSize: 13,
              color: AX_GRAY_500,
              marginTop: 4,
              lineHeight: 1.5,
              maxWidth: 540,
            }}
          >
            {desc}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 24 }}>{control}</div>
    </div>
  );
}
