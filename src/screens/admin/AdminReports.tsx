import AdminTopBar from './_components/AdminTopBar';

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_600 = '#4E5968';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
const A_GRAY_50 = '#F9FAFB';
const A_GRAY_300 = '#B0B8C1';
const A_ORANGE = '#FF9000';

const weekData = [
  { d: '월', on: 84, late: 6, absent: 4 },
  { d: '화', on: 88, late: 4, absent: 2 },
  { d: '수', on: 86, late: 5, absent: 3 },
  { d: '목', on: 82, late: 8, absent: 4 },
  { d: '금', on: 79, late: 9, absent: 6 },
  { d: '월', on: 87, late: 5, absent: 2 },
  { d: '화', on: 83, late: 5, absent: 6 },
];
const max = 100;

const monthlyAvg = [92, 91, 93, 94, 92, 89, 91, 93, 95, 94, 92, 94];

export default function AdminReports() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: A_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="리포트"
        subtitle="추세를 한눈에 보고 문제를 빠르게 짚어보세요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ display: 'flex', gap: 4, padding: 4, background: A_GRAY_100, borderRadius: 10 }}>
              {['주간', '월간', '분기'].map((t, i) => (
                <div key={t} style={{ padding: '6px 14px', borderRadius: 7, fontSize: 13, fontWeight: 700, background: i === 0 ? '#fff' : 'transparent', color: i === 0 ? A_GRAY_900 : A_GRAY_500, cursor: 'pointer' }}>{t}</div>
              ))}
            </div>
            <button style={{ height: 40, padding: '0 18px', borderRadius: 10, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>리포트 다운로드</button>
          </div>
        }
      />
      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Insight banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', background: 'linear-gradient(120deg, #E8F2FE 0%, #F2F4F6 100%)', borderRadius: 16, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900 }}>이번 주는 정시 출근률이 <span style={{ color: A_BLUE }}>2.1%p</span> 올랐어요</div>
            <div style={{ fontSize: 13, color: A_GRAY_600, marginTop: 2 }}>특히 화요일과 금요일의 9시 직전 러시가 개선됐어요</div>
          </div>
          <button style={{ padding: '8px 14px', borderRadius: 10, background: '#fff', color: A_GRAY_600, border: 0, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>자세히 보기</button>
        </div>

        {/* Stacked bars */}
        <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>일별 출근 구성</div>
              <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>지난 7 영업일</div>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ l: '정시', c: A_BLUE }, { l: '지각', c: A_ORANGE }, { l: '미출근', c: A_GRAY_300 }].map((x) => (
                <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: A_GRAY_600, fontWeight: 600 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: x.c }} />{x.l}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 30, display: 'flex', alignItems: 'flex-end', gap: 28, height: 220 }}>
            {weekData.map((d, i) => {
              const total = d.on + d.late + d.absent;
              const onH = (d.on / max) * 200;
              const lateH = (d.late / max) * 200;
              const absH = (d.absent / max) * 200;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 600 }}>{total}명</div>
                  <div style={{ width: 36, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden' }}>
                    <div style={{ height: absH, background: A_GRAY_300 }} />
                    <div style={{ height: lateH, background: A_ORANGE }} />
                    <div style={{ height: onH, background: A_BLUE }} />
                  </div>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 600 }}>{d.d}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          {/* Trend line */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>월간 정시 출근률 추이</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>최근 12개월</div>

            <div style={{ marginTop: 20, position: 'relative', height: 200 }}>
              <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={20 + i * 50} x2="600" y2={20 + i * 50} stroke={A_GRAY_200} strokeDasharray="3 4" />
                ))}
                <defs>
                  <linearGradient id="rA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={A_BLUE} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={A_BLUE} stopOpacity="0" />
                  </linearGradient>
                </defs>
                {(() => {
                  const pts = monthlyAvg.map((v, i) => [40 + i * 50, 200 - ((v - 80) / 20) * 180] as [number, number]);
                  const path = pts.map(([x, y], i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ');
                  const area = path + ` L${pts[pts.length - 1][0]} 200 L${pts[0][0]} 200 Z`;
                  return (
                    <g>
                      <path d={area} fill="url(#rA)" />
                      <path d={path} stroke={A_BLUE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map(([x, y], i) => (
                        <circle key={i} cx={x} cy={y} r={i === pts.length - 1 ? 6 : 3.5} fill="#fff" stroke={A_BLUE} strokeWidth="2.5" />
                      ))}
                    </g>
                  );
                })()}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: A_GRAY_500, fontWeight: 600, padding: '0 16px' }}>
                {['5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '1월', '2월', '3월', '4월'].map((m) => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Top performers */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: '20px 0' }}>
            <div style={{ padding: '0 24px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>이번 달 우수 출석자</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: A_BLUE, padding: '3px 8px', background: A_BLUE_WEAK, borderRadius: 999 }}>TOP 5</div>
            </div>
            {[
              { rank: 1, name: '정태윤', dept: '백엔드', rate: 100, streak: 27, c: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', tc: '#5C1F5C', i: '태' },
              { rank: 2, name: '김지원', dept: '디자인', rate: 100, streak: 22, c: 'linear-gradient(135deg,#FFCCA8,#FFB582)', tc: '#6E4944', i: '지' },
              { rank: 3, name: '박서준', dept: 'iOS', rate: 98, streak: 14, c: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', tc: '#1E4FA8', i: '서' },
              { rank: 4, name: '윤소희', dept: '그로스', rate: 96, streak: 11, c: 'linear-gradient(135deg,#FFD4D4,#FF9E9E)', tc: '#8C2424', i: '소' },
              { rank: 5, name: '한도윤', dept: '운영', rate: 95, streak: 9, c: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', tc: '#1F5C2A', i: '도' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderTop: i ? `1px solid ${A_GRAY_200}` : 'none' }}>
                <div style={{ width: 24, fontSize: 13, fontWeight: 700, color: r.rank <= 3 ? A_BLUE : A_GRAY_400, textAlign: 'center' }}>#{r.rank}</div>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: r.c, color: r.tc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>{r.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.dept} · {r.streak}일 연속</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{r.rate}<span style={{ fontSize: 11, color: A_GRAY_500 }}>%</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
