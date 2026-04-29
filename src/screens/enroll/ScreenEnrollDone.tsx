import { tokens } from '@/lib/tokens';

interface Props {
  employee?: { name: string; employee_no: string; dept?: string | null };
}

export default function ScreenEnrollDone({ employee }: Props = {}) {
  const name = employee?.name ?? '김지원';
  const initials = name.slice(-2);
  const employeeNo = employee?.employee_no ?? 'EMP-0142';
  const dept = employee?.dept ?? '프로덕트 디자인';
  const enrolledAt = new Date().toLocaleString('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  }).replace(/\. /g, '.').replace(/\.$/, '');
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100dvh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'var(--font-body)',
        color: tokens.gray900,
        position: 'relative',
        overflow: 'hidden auto',
      }}
    >
      {/* Brand aura */}
      <div
        style={{
          position: 'absolute',
          top: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 700,
          height: 480,
          background:
            'radial-gradient(ellipse at center, rgba(49,130,246,.12) 0%, rgba(49,130,246,0) 65%)',
        }}
      />


      {/* Nav row */}
      <div
        style={{
          position: 'relative',
          padding: '10px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ width: 40 }} />
        <div style={{ fontSize: 13, color: tokens.gray500, fontWeight: 700 }}>3 / 3</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Hero */}
      <div
        style={{ position: 'relative', padding: '32px 28px 0', textAlign: 'center' }}
      >
        <div
          style={{ position: 'relative', width: 156, height: 156, margin: '0 auto' }}
        >
          {/* Profile avatar */}
          <div
            style={{
              width: 156,
              height: 156,
              borderRadius: 999,
              background: 'linear-gradient(135deg, #FFCCA8 0%, #FFB582 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 60,
              fontWeight: 700,
              color: '#6E4944',
              boxShadow: '0 8px 24px rgba(0,19,43,.10)',
            }}
          >
            {initials}
          </div>
          {/* Check badge */}
          <div
            style={{
              position: 'absolute',
              bottom: 4,
              right: 4,
              width: 48,
              height: 48,
              borderRadius: 99,
              background: tokens.brand,
              border: '4px solid #fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(49,130,246,.4)',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>

        <div
          style={{ marginTop: 28, fontSize: 17, fontWeight: 700, color: tokens.brand }}
        >
          등록 완료
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.3,
          }}
        >
          이제 얼굴로{'\n'}바로 출근할 수 있어요
        </div>
        <div
          style={{
            marginTop: 12,
            fontSize: 15,
            color: tokens.gray600,
            lineHeight: 1.5,
          }}
        >
          내일 아침, 본사 7층 라운지의{'\n'}FacePass 키오스크에서 출근해보세요
        </div>
      </div>

      {/* Info card */}
      <div style={{ padding: '28px 20px 0' }}>
        <div
          style={{
            background: tokens.gray100,
            borderRadius: 20,
            padding: '18px 20px',
          }}
        >
          {[
            { label: '이름', value: name },
            { label: '사번 / 부서', value: `${employeeNo} · ${dept}` },
            { label: '등록 시각', value: enrolledAt },
          ].map((row, i) => (
            <div key={i}>
              {i > 0 && (
                <div
                  style={{ height: 1, background: tokens.gray200, margin: '4px 0' }}
                />
              )}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '6px 0',
                }}
              >
                <div
                  style={{ fontSize: 13, color: tokens.gray600, fontWeight: 600 }}
                >
                  {row.label}
                </div>
                <div
                  style={{ fontSize: 15, fontWeight: 700, color: tokens.gray900 }}
                >
                  {row.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          padding: '16px 20px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <button
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            border: 0,
            background: tokens.brand,
            color: '#fff',
            fontSize: 17,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          완료
        </button>
        <button
          style={{
            width: '100%',
            height: 48,
            borderRadius: 14,
            border: 0,
            background: 'transparent',
            color: tokens.gray600,
            fontSize: 14,
            fontWeight: 700,
            fontFamily: 'inherit',
            cursor: 'pointer',
          }}
        >
          다시 등록하기
        </button>
      </div>
    </div>
  );
}
