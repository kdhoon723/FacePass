const A_GRAY_900 = '#191F28';
const A_GRAY_500 = '#6B7683';
const A_BLUE = '#3182F6';

interface EmptyStateProps {
  message: string;
  sub?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export default function EmptyState({ message, sub, onRetry, retryLabel = '다시 시도' }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        gap: 12,
      }}
    >
      <div style={{ fontSize: 36 }}>📭</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900, textAlign: 'center' }}>{message}</div>
      {sub && <div style={{ fontSize: 13, color: A_GRAY_500, textAlign: 'center' }}>{sub}</div>}
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            marginTop: 8,
            padding: '8px 18px',
            borderRadius: 10,
            background: A_BLUE,
            color: '#fff',
            border: 0,
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}
