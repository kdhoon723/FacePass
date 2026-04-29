type Variant = 'mobile' | 'desktop';

interface PlaceholderProps {
  label: string;
  description?: string;
  variant?: Variant;
}

/**
 * Temporary placeholder used while screens are being migrated from the
 * Claude Design bundle. Each migrated screen replaces its placeholder import
 * in `src/router.tsx`.
 */
export function Placeholder({ label, description, variant = 'mobile' }: PlaceholderProps) {
  const isMobile = variant === 'mobile';
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-gray-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: isMobile ? 390 : 1100,
          background: '#fff',
          borderRadius: 24,
          padding: '40px 32px',
          boxShadow: 'var(--shadow-card)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: 'var(--color-brand-weak)',
            color: 'var(--color-brand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          🚧
        </div>
        <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-gray-900)' }}>{label}</div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: 'var(--color-gray-500)',
            lineHeight: 1.5,
          }}
        >
          {description ?? '이 화면은 디자인 시안에서 옮기는 중이에요'}
        </div>
      </div>
    </div>
  );
}
