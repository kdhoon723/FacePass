import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        background: 'var(--color-gray-100)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        textAlign: 'center',
      }}
    >
      <div>
        <div style={{ fontSize: 60, fontWeight: 700, color: 'var(--color-gray-300)' }}>404</div>
        <div
          style={{
            marginTop: 8,
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--color-gray-900)',
          }}
        >
          페이지를 찾을 수 없어요
        </div>
        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: 24,
            padding: '12px 20px',
            borderRadius: 12,
            background: 'var(--color-brand)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          홈으로
        </Link>
      </div>
    </div>
  );
}
