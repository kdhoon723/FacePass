import type { ReactNode } from 'react';

const AX_GRAY_500 = '#6B7683';
const AX_GRAY_200 = '#E5E8EB';
const AX_GRAY_100 = '#F2F4F6';

interface AxSettingsCardProps {
  title: string;
  children: ReactNode;
}

export default function AxSettingsCard({ title, children }: AxSettingsCardProps) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${AX_GRAY_200}`,
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 20,
      }}
    >
      <div
        style={{
          padding: '16px 24px',
          borderBottom: `1px solid ${AX_GRAY_100}`,
          fontSize: 13,
          color: AX_GRAY_500,
          fontWeight: 700,
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </div>
      {children}
    </div>
  );
}
