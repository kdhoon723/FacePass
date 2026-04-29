import { tokens } from '@/lib/tokens';

const FP_BLUE = tokens.brand;
const FP_GRAY_900 = tokens.gray900;
const FP_GRAY_600 = tokens.gray600;
const FP_GRAY_200 = tokens.gray200;
const FP_GRAY_100 = tokens.gray100;

interface Props {
  employee?: { name: string; employee_no: string; department?: string | null };
  checkType?: 'check_in' | 'check_out';
  /** When the recognition happened (defaults to now). */
  recognizedAt?: Date;
  /** Free-form location label (kiosk name + room) */
  locationLabel?: string;
  /** Status pill on the right side of the detail card */
  status?: 'on_time' | 'late' | 'early_leave';
  /** Consecutive on-time streak in days (hide when undefined) */
  streakDays?: number;
  onClose?: () => void;
}

function formatKoreanTime(date: Date): string {
  const h = date.getHours();
  const ampm = h < 12 ? '오전' : '오후';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const m = date.getMinutes().toString().padStart(2, '0');
  const s = date.getSeconds().toString().padStart(2, '0');
  return `${ampm} ${hour12}:${m}:${s}`;
}

const STATUS_LABELS: Record<NonNullable<Props['status']>, { label: string; color: string; bg: string }> = {
  on_time: { label: '정시 출근', color: '#007B33', bg: 'rgba(0,123,51,.1)' },
  late: { label: '지각', color: '#FF9000', bg: 'rgba(255,144,0,.12)' },
  early_leave: { label: '조퇴', color: '#FF9000', bg: 'rgba(255,144,0,.12)' },
};

export default function ScreenSuccess({
  employee,
  checkType = 'check_in',
  recognizedAt,
  locationLabel = '본사 7층 라운지 · 키오스크',
  status = 'on_time',
  streakDays,
  onClose,
}: Props) {
  const name = employee?.name ?? '김지원';
  const initials = name.slice(-2);
  const at = recognizedAt ?? new Date();
  const statusInfo = STATUS_LABELS[status];
  const checkLabel =
    checkType === 'check_out' ? (status === 'early_leave' ? '조퇴 처리' : '퇴근 완료') : statusInfo.label;
  return (
    <div style={{ width: '100%', minHeight: '100dvh', background: '#fff', display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-body)', color: FP_GRAY_900, position: 'relative', overflow: 'hidden auto' }}>
      {/* Soft success aura */}
      <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400, background: 'radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 70%)' }} />


      {/* Top close */}
      <div style={{ position: 'relative', padding: '10px 16px', display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onClose} style={{ width: 40, height: 40, borderRadius: 99, background: FP_GRAY_100, border: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: FP_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Hero — checkmark + photo */}
      <div style={{ position: 'relative', padding: '12px 28px 0', textAlign: 'center' }}>
        <div style={{ position: 'relative', width: 156, height: 156, margin: '0 auto' }}>
          {/* Profile photo placeholder (gradient + initial) */}
          <div style={{ width: 156, height: 156, borderRadius: 999, background: 'linear-gradient(135deg, #FFCCA8 0%, #FFB582 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 60, fontWeight: 700, color: '#6E4944', letterSpacing: '-0.02em', boxShadow: '0 8px 24px rgba(0,19,43,.10)' }}>
            {initials}
          </div>
          {/* Check badge */}
          <div style={{ position: 'absolute', bottom: 4, right: 4, width: 48, height: 48, borderRadius: 99, background: FP_BLUE, border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(49,130,246,.4)' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 17, fontWeight: 700, color: FP_BLUE }}>{checkType === 'check_out' ? '퇴근 완료' : '출근 완료'}</div>
        <div style={{ marginTop: 6, fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.25 }}>
          {name}님,{'\n'}좋은 하루 보내세요
        </div>
      </div>

      {/* Detail card */}
      <div style={{ padding: '32px 20px 0' }}>
        <div style={{ background: FP_GRAY_100, borderRadius: 20, padding: '20px 22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>인증 시각</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: FP_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{formatKoreanTime(at)}</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>위치</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: FP_GRAY_900 }}>{locationLabel}</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: '4px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>구분</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ padding: '4px 10px', borderRadius: 999, background: statusInfo.bg, color: statusInfo.color, fontSize: 13, fontWeight: 700 }}>{checkLabel}</div>
            </div>
          </div>
        </div>

        {/* Streak — hidden when no streak data is supplied */}
        {streakDays !== undefined && streakDays > 0 && (
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', background: '#FFF8E1', borderRadius: 16 }}>
            <div style={{ fontSize: 22 }}>🔥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: FP_GRAY_600, fontWeight: 600 }}>연속 정시 출근</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: FP_GRAY_900, marginTop: 1 }}>{streakDays}일째 이어가는 중이에요</div>
            </div>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '16px 20px 12px' }}>
        <button onClick={onClose} style={{
          width: '100%', height: 56, borderRadius: 16, border: 0,
          background: FP_BLUE, color: '#fff', fontSize: 17, fontWeight: 700,
          fontFamily: 'inherit', cursor: 'pointer',
        }}>
          확인
        </button>
      </div>
    </div>
  );
}
