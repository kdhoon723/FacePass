import AdminTopBar from './_components/AdminTopBar';
import StatTile from './_components/StatTile';

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_700 = '#333D4B';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_300 = '#B0B8C1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
const A_GRAY_50 = '#F9FAFB';
const A_GREEN = '#007B33';
const A_RED = '#EF4452';
const A_ORANGE = '#FF9000';

const employees = [
  { name: '김지원', emp: 'EMP-0142', dept: '프로덕트 디자인', status: 'enrolled', at: '2026.04.29', quality: 98, c: 'linear-gradient(135deg,#FFCCA8,#FFB582)', tc: '#6E4944', i: '지' },
  { name: '박서준', emp: 'EMP-0233', dept: 'iOS 엔지니어링', status: 'enrolled', at: '2026.04.18', quality: 96, c: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', tc: '#1E4FA8', i: '서' },
  { name: '이하늘', emp: 'EMP-0098', dept: '데이터', status: 'pending', at: '초대 발송 · 어제', quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: '하' },
  { name: '최민지', emp: 'EMP-0356', dept: '마케팅', status: 'enrolled', at: '2026.03.21', quality: 88, c: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', tc: '#1F5C2A', i: '민' },
  { name: '정태윤', emp: 'EMP-0061', dept: '백엔드', status: 'enrolled', at: '2026.03.02', quality: 99, c: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', tc: '#5C1F5C', i: '태' },
  { name: '한도윤', emp: 'EMP-0411', dept: '운영', status: 'expired', at: '링크 만료 · 7일', quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: '도' },
  { name: '오세린', emp: 'EMP-0445', dept: '마케팅', status: 'pending', at: '초대 발송 · 2시간 전', quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: '세' },
];

const badge = (s: string) => {
  const m: Record<string, { bg: string; c: string; l: string }> = {
    enrolled: { bg: 'rgba(0,123,51,.1)', c: A_GREEN, l: '등록 완료' },
    pending:  { bg: A_BLUE_WEAK, c: A_BLUE, l: '등록 대기' },
    expired:  { bg: 'rgba(239,68,82,.1)', c: A_RED, l: '만료' },
  };
  const mb = m[s];
  return <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: mb.bg, color: mb.c, fontSize: 12, fontWeight: 700 }}>{mb.l}</div>;
};

export default function AdminEmployees() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: A_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="직원 관리"
        subtitle="직원을 초대하면, 모바일 링크로 본인이 직접 얼굴을 등록해요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ height: 40, padding: '0 14px', borderRadius: 10, background: '#fff', border: `1px solid ${A_GRAY_200}`, color: A_GRAY_700, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              CSV로 일괄 초대
            </button>
            <button style={{ height: 40, padding: '0 16px', borderRadius: 10, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              직원 초대하기
            </button>
          </div>
        }
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Stat row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <StatTile
            label="전체 직원"
            value="94"
            suffix="명"
            color={A_BLUE}
            sub="활성 계정 기준"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>}
          />
          <StatTile
            label="등록 완료"
            value="89"
            suffix="명"
            color={A_GREEN}
            sub="전체의 94.6%"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          />
          <StatTile
            label="등록 대기"
            value="4"
            suffix="명"
            color={A_ORANGE}
            sub="초대 발송됨 · 미완료"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
          <StatTile
            label="링크 만료"
            value="1"
            suffix="명"
            color={A_RED}
            sub="재발송 필요"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
          />
        </div>

        {/* Two-column: Invite panel + table */}
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16 }}>
          {/* Invite panel */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>새 직원 초대</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>초대 링크를 받은 직원이 모바일에서 본인의 얼굴을 직접 등록해요</div>

            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[{ l: '이름', v: '오세린' }, { l: '사번', v: 'EMP-0445' }, { l: '부서', v: '마케팅' }, { l: '연락처', v: '010-XXXX-3304' }].map((f) => (
                <div key={f.l}>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>{f.l}</div>
                  <div style={{ height: 40, padding: '0 12px', border: `1px solid ${A_GRAY_200}`, borderRadius: 10, display: 'flex', alignItems: 'center', fontSize: 14, color: A_GRAY_900, background: '#fff' }}>{f.v}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>발송 방법</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[{ l: '문자', on: true }, { l: '이메일' }, { l: '슬랙' }].map((o) => (
                    <div key={o.l} style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${o.on ? A_BLUE : A_GRAY_200}`, background: o.on ? A_BLUE_WEAK : '#fff', color: o.on ? A_BLUE : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{o.l}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR preview */}
            <div style={{ marginTop: 18, padding: 14, background: A_GRAY_100, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, background: '#fff', padding: 6, flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 21 21">
                  {['1111111000-0000-0000111', '10000000-0000-000000010', '1000-0000-0000101110101', '1000-0000-0000101110100', '1000-0000-0000101110101', '10000000-0000-000000010', '1111111000-0000-0000111', '0000000000-0000-0000000', '110000-0000-00000110011', '000-0000-0000000-0000-0000', '1000-0000-0000001011010', '110000-0000-00000100110', '000-0000-0000000-0000-0000', '0000000000-0000-0000001', '1111111000-0000-0000010', '10000000-0000-000010110', '1000-0000-0000100110001', '1000-0000-0000111100100', '1000-0000-0000100100010', '10000000-0000-000010010', '1111111000-0000-0000001'].map((row, y) =>
                    row.split('').map((c, x) =>
                      c === '1' ? <rect key={x + ',' + y} x={x} y={y} width="1" height="1" fill="#191F28" /> : null
                    )
                  )}
                </svg>
              </div>
              <div style={{ flex: 1, fontSize: 12, color: A_GRAY_600, lineHeight: 1.5 }}>
                직원이 이 QR을 스캔하거나{' '}<b style={{ color: A_GRAY_900 }}>facepass.app/e/AB42</b>로 접속하면 등록을 시작해요
              </div>
            </div>
            <button style={{ width: '100%', marginTop: 14, height: 48, borderRadius: 12, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              초대 링크 발송
            </button>
            <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: A_GRAY_500 }}>링크는 7일 동안 유효해요</div>
          </div>

          {/* Employees table */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${A_GRAY_200}`, gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: A_GRAY_100, borderRadius: 10, fontSize: 13, color: A_GRAY_500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                이름, 사번, 부서로 검색…
              </div>
              {[{ l: '전체', on: true }, { l: '등록 완료' }, { l: '대기' }, { l: '만료' }].map((c) => (
                <div key={c.l} style={{ padding: '7px 12px', borderRadius: 999, background: c.on ? A_GRAY_900 : A_GRAY_100, color: c.on ? '#fff' : A_GRAY_600, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{c.l}</div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1.4fr 1fr 60px', padding: '12px 20px', background: A_GRAY_50, borderBottom: `1px solid ${A_GRAY_200}`, fontSize: 12, fontWeight: 700, color: A_GRAY_500, textTransform: 'uppercase', letterSpacing: '0.04em', alignItems: 'center' }}>
              <div>직원</div><div>부서</div><div>상태</div><div>등록 정보</div><div>품질</div><div></div>
            </div>
            {employees.map((r, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1.4fr 1fr 60px', padding: '14px 20px', borderBottom: i < employees.length - 1 ? `1px solid ${A_GRAY_200}` : 'none', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: r.c, color: r.tc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{r.i}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.emp}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: A_GRAY_700 }}>{r.dept}</div>
                <div>{badge(r.status)}</div>
                <div style={{ fontSize: 13, color: A_GRAY_500 }}>{r.at}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.quality ? (r.quality >= 95 ? A_GREEN : A_ORANGE) : A_GRAY_300 }}>
                  {r.quality ? `${r.quality}%` : '—'}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', color: A_GRAY_400, cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
