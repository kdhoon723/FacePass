import AdminTopBar from './_components/AdminTopBar';

const A_BLUE = '#3182F6';
const A_GRAY_900 = '#191F28';
const A_GRAY_700 = '#333D4B';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
const A_GRAY_50 = '#F9FAFB';
const A_GREEN = '#007B33';
const A_RED = '#EF4452';
const A_ORANGE = '#FF9000';

const rows = [
  { name: '김지원', emp: 'EMP-0142', dept: '프로덕트 디자인', in: '08:42', out: '18:23', work: '9시간 41분', status: 'ontime', color: 'linear-gradient(135deg,#FFCCA8,#FFB582)', textColor: '#6E4944', initial: '지' },
  { name: '박서준', emp: 'EMP-0233', dept: 'iOS 엔지니어링', in: '08:51', out: '19:02', work: '10시간 11분', status: 'ontime', color: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', textColor: '#1E4FA8', initial: '서' },
  { name: '이하늘', emp: 'EMP-0098', dept: '데이터', in: '09:03', out: '18:45', work: '9시간 42분', status: 'late', color: 'linear-gradient(135deg,#FFE6A8,#FFC84D)', textColor: '#7A5500', initial: '하' },
  { name: '최민지', emp: 'EMP-0356', dept: '마케팅', in: '09:12', out: '—', work: '—', status: 'late', color: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', textColor: '#1F5C2A', initial: '민' },
  { name: '정태윤', emp: 'EMP-0061', dept: '백엔드 엔지니어링', in: '08:34', out: '18:50', work: '10시간 16분', status: 'ontime', color: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', textColor: '#5C1F5C', initial: '태' },
  { name: '윤소희', emp: 'EMP-0177', dept: '그로스', in: '08:39', out: '—', work: '—', status: 'ontime', color: 'linear-gradient(135deg,#FFD4D4,#FF9E9E)', textColor: '#8C2424', initial: '소' },
  { name: '박지호', emp: 'EMP-0211', dept: 'iOS 엔지니어링', in: '—', out: '—', work: '—', status: 'absent', color: A_GRAY_200, textColor: A_GRAY_500, initial: '지' },
  { name: '임유나', emp: 'EMP-0299', dept: '운영', in: '—', out: '—', work: '—', status: 'leave', color: 'linear-gradient(135deg,#E5E8EB,#B0B8C1)', textColor: '#4E5968', initial: '유' },
  { name: '강민호', emp: 'EMP-0044', dept: '백엔드 엔지니어링', in: '09:24', out: '—', work: '—', status: 'late', color: 'linear-gradient(135deg,#CDF0F0,#9ECDD6)', textColor: '#1F4F5C', initial: '민' },
];

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; c: string; l: string }> = {
    ontime: { bg: 'rgba(0,123,51,.1)', c: A_GREEN, l: '정시' },
    late:   { bg: 'rgba(255,144,0,.12)', c: A_ORANGE, l: '지각' },
    absent: { bg: 'rgba(239,68,82,.1)', c: A_RED, l: '미출근' },
    leave:  { bg: A_GRAY_100, c: A_GRAY_600, l: '휴가' },
  };
  const m = map[s];
  return (
    <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: m.bg, color: m.c, fontSize: 12, fontWeight: 700 }}>
      {m.l}
    </div>
  );
};

export default function AdminRecords() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: A_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="출석 기록"
        subtitle="모든 직원의 출퇴근 기록을 확인할 수 있어요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ height: 40, padding: '0 14px', borderRadius: 10, background: '#fff', border: `1px solid ${A_GRAY_200}`, color: A_GRAY_700, fontSize: 13, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'inherit' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              필터
            </button>
            <button style={{ height: 40, padding: '0 16px', borderRadius: 10, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CSV 내보내기
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Filter bar */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginBottom: 20, padding: 16, background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: A_GRAY_100, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            2026.04.22 — 2026.04.29
          </div>
          {[{ label: '오늘', on: true }, { label: '이번 주' }, { label: '이번 달' }, { label: '지난 달' }].map((c) => (
            <div key={c.label} style={{ padding: '10px 14px', borderRadius: 999, background: c.on ? A_GRAY_900 : A_GRAY_100, color: c.on ? '#fff' : A_GRAY_600, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{c.label}</div>
          ))}
          <div style={{ width: 1, height: 24, background: A_GRAY_200 }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: `1px solid ${A_GRAY_200}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_700, cursor: 'pointer' }}>
            부서: 전체
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A_GRAY_400} strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', border: `1px solid ${A_GRAY_200}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_700, cursor: 'pointer' }}>
            상태: 전체
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A_GRAY_400} strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 13, color: A_GRAY_500 }}>
            총 <b style={{ color: A_GRAY_900 }}>94건</b> · 출근 83 · 지각 5 · 미출근 6
          </div>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px', padding: '14px 20px', background: A_GRAY_50, borderBottom: `1px solid ${A_GRAY_200}`, fontSize: 12, fontWeight: 700, color: A_GRAY_500, textTransform: 'uppercase', letterSpacing: '0.04em', alignItems: 'center' }}>
            <input type="checkbox" readOnly />
            <div>직원</div>
            <div>부서</div>
            <div>출근</div>
            <div>퇴근</div>
            <div>근무 시간</div>
            <div>상태</div>
            <div></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px', padding: '14px 20px', borderBottom: i < rows.length - 1 ? `1px solid ${A_GRAY_200}` : 'none', alignItems: 'center' }}>
              <input type="checkbox" readOnly />
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: r.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: r.textColor, flexShrink: 0 }}>{r.initial}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.emp}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: A_GRAY_700, fontWeight: 500 }}>{r.dept}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: r.in === '—' ? A_GRAY_400 : A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{r.in}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: r.out === '—' ? A_GRAY_400 : A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{r.out}</div>
              <div style={{ fontSize: 13, color: r.work === '—' ? A_GRAY_400 : A_GRAY_700, fontVariantNumeric: 'tabular-nums' }}>{r.work}</div>
              <div>{statusBadge(r.status)}</div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', color: A_GRAY_400, cursor: 'pointer' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: `1px solid ${A_GRAY_200}`, background: A_GRAY_50 }}>
            <div style={{ fontSize: 13, color: A_GRAY_500 }}>1–9 / 94명</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['‹', '1', '2', '3', '…', '11', '›'].map((p, i) => (
                <div key={i} style={{ minWidth: 32, height: 32, padding: '0 10px', borderRadius: 8, background: p === '1' ? A_GRAY_900 : 'transparent', color: p === '1' ? '#fff' : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
