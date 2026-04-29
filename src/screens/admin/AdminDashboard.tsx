import AdminTopBar from './_components/AdminTopBar';
import StatTile from './_components/StatTile';

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_700 = '#333D4B';
const A_GRAY_500 = '#6B7683';
const A_GRAY_400 = '#8B95A1';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_100 = '#F2F4F6';
const A_GRAY_50 = '#F9FAFB';
const A_GREEN = '#007B33';
const A_RED = '#EF4452';
const A_ORANGE = '#FF9000';
const A_YELLOW = '#FFC84D';

function HourlyChart() {
  const data = [
    { h: '07', v: 8 },
    { h: '08', v: 24 },
    { h: '08:30', v: 56, peak: true },
    { h: '09', v: 42 },
    { h: '09:30', v: 18 },
    { h: '10', v: 6 },
    { h: '10:30', v: 3 },
    { h: '11', v: 1 },
  ];
  const max = 60;
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${A_GRAY_200}`,
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: A_GRAY_900,
              letterSpacing: '-0.01em',
            }}
          >
            시간대별 출근 분포
          </div>
          <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 · 30분 단위</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 6,
            padding: 4,
            background: A_GRAY_100,
            borderRadius: 10,
          }}
        >
          {['오늘', '이번 주', '이번 달'].map((t, i) => (
            <div
              key={t}
              style={{
                padding: '6px 12px',
                borderRadius: 7,
                fontSize: 13,
                fontWeight: 700,
                background: i === 0 ? '#fff' : 'transparent',
                color: i === 0 ? A_GRAY_900 : A_GRAY_500,
                boxShadow: i === 0 ? '0 1px 2px rgba(0,19,43,.06)' : 'none',
                cursor: 'pointer',
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 28,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 14,
          height: 180,
        }}
      >
        {data.map((d, i) => {
          const h = (d.v / max) * 160;
          return (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                position: 'relative',
              }}
            >
              {d.peak && (
                <div
                  style={{
                    position: 'absolute',
                    top: -28,
                    padding: '4px 8px',
                    background: A_GRAY_900,
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 700,
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                  }}
                >
                  피크 56명
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -4,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(45deg)',
                      width: 8,
                      height: 8,
                      background: A_GRAY_900,
                    }}
                  />
                </div>
              )}
              <div
                style={{
                  width: '100%',
                  height: h,
                  background: d.peak ? A_BLUE : A_BLUE_WEAK,
                  borderRadius: 8,
                  transition: 'height .3s',
                }}
              />
              <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>{d.h}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveFeed() {
  const items = [
    { name: '김지원', dept: '프로덕트 디자인', time: '08:42', status: 'ontime', initial: '지', color: 'linear-gradient(135deg,#FFCCA8,#FFB582)', textColor: '#6E4944' },
    { name: '박서준', dept: 'iOS 엔지니어링', time: '08:51', status: 'ontime', initial: '서', color: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', textColor: '#1E4FA8' },
    { name: '이하늘', dept: '데이터', time: '09:03', status: 'late', initial: '하', color: 'linear-gradient(135deg,#FFE6A8,#FFC84D)', textColor: '#7A5500' },
    { name: '최민지', dept: '마케팅', time: '09:12', status: 'late', initial: '민', color: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', textColor: '#1F5C2A' },
    { name: '정태윤', dept: '백엔드 엔지니어링', time: '08:34', status: 'ontime', initial: '태', color: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', textColor: '#5C1F5C' },
    { name: '윤소희', dept: '그로스', time: '08:39', status: 'ontime', initial: '소', color: 'linear-gradient(135deg,#FFD4D4,#FF9E9E)', textColor: '#8C2424' },
  ];
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${A_GRAY_200}`,
        borderRadius: 16,
        padding: '20px 0 8px',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 99,
              background: A_RED,
            }}
          />
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: A_GRAY_900,
              letterSpacing: '-0.01em',
            }}
          >
            실시간 인증
          </div>
        </div>
        <div style={{ fontSize: 12, color: A_BLUE, fontWeight: 700, cursor: 'pointer' }}>
          전체 보기 →
        </div>
      </div>
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {items.map((it, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '10px 24px',
              borderTop: i === 0 ? `1px solid ${A_GRAY_200}` : 'none',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 12,
                background: it.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                fontWeight: 700,
                color: it.textColor,
                flexShrink: 0,
              }}
            >
              {it.initial}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{it.dept}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: A_GRAY_900,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {it.time}
              </div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: it.status === 'ontime' ? A_GREEN : A_ORANGE,
                  marginTop: 1,
                }}
              >
                {it.status === 'ontime' ? '정시' : '지각'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeptBreakdown() {
  const depts = [
    { name: '엔지니어링', attend: 48, total: 52, color: A_BLUE },
    { name: '디자인', attend: 12, total: 14, color: '#7C5CFF' },
    { name: '프로덕트', attend: 8, total: 10, color: A_ORANGE },
    { name: '마케팅', attend: 9, total: 11, color: A_GREEN },
    { name: '운영', attend: 6, total: 7, color: A_YELLOW },
  ];
  const totalA = depts.reduce((s, d) => s + d.attend, 0);
  const totalT = depts.reduce((s, d) => s + d.total, 0);
  let acc = 0;
  const stops = depts
    .map((d) => {
      const start = (acc / totalA) * 360;
      acc += d.attend;
      const end = (acc / totalA) * 360;
      return `${d.color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${A_GRAY_200}`,
        borderRadius: 16,
        padding: 24,
      }}
    >
      <div
        style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}
      >
        부서별 출석
      </div>
      <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 출근한 인원 기준</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
        <div style={{ position: 'relative', width: 132, height: 132, flexShrink: 0 }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 99,
              background: `conic-gradient(${stops})`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 18,
              borderRadius: 99,
              background: '#fff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: A_GRAY_900,
                letterSpacing: '-0.02em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {totalA}
            </div>
            <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>/ {totalT}명</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {depts.map((d) => (
            <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{ width: 8, height: 8, borderRadius: 99, background: d.color }}
              />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: A_GRAY_700 }}>
                {d.name}
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: A_GRAY_900,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {d.attend}/{d.total}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertsCard() {
  const alerts = [
    { type: 'warn', title: '박지호님 미출근', desc: '예정 시각 9시 · 미보고 상태입니다', time: '방금' },
    { type: 'info', title: '임유나님 결근 신청', desc: '병가 — 검토가 필요해요', time: '8분 전' },
    { type: 'warn', title: '강민호님 지각 3회', desc: '이번 주 누적 — 면담을 추천해요', time: '1시간 전' },
  ];
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${A_GRAY_200}`,
        borderRadius: 16,
        padding: '20px 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}
        >
          주의가 필요해요
        </div>
        <div
          style={{
            padding: '3px 9px',
            background: 'rgba(239,68,82,.1)',
            color: A_RED,
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 999,
          }}
        >
          3
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
        {alerts.map((a, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 12,
              padding: '12px 0',
              borderTop: i ? `1px solid ${A_GRAY_200}` : 'none',
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 10,
                background: a.type === 'warn' ? 'rgba(255,144,0,.12)' : A_BLUE_WEAK,
                color: a.type === 'warn' ? A_ORANGE : A_BLUE,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 2 }}>{a.desc}</div>
            </div>
            <div style={{ fontSize: 11, color: A_GRAY_400, fontWeight: 600 }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: A_GRAY_50,
        fontFamily: 'var(--font-body)',
      }}
    >
      <AdminTopBar
        title="대시보드"
        subtitle="2026년 4월 29일 수요일 · 09:14 기준"
        action={
          <button
            style={{
              height: 40,
              padding: '0 18px',
              borderRadius: 10,
              background: A_BLUE,
              color: '#fff',
              border: 0,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'inherit',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            CSV 내보내기
          </button>
        }
      />

      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Stat row */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
          <StatTile
            label="오늘 출근"
            value="83"
            suffix="/ 94명"
            delta="+4.2%"
            color={A_BLUE}
            sub="어제보다 4명 늘었어요"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <polyline points="17 11 19 13 23 9" />
              </svg>
            }
          />
          <StatTile
            label="정시 출근률"
            value="94"
            suffix="%"
            delta="+1.8%"
            color={A_GREEN}
            sub="이번 달 평균 92%"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            }
          />
          <StatTile
            label="지각"
            value="5"
            suffix="명"
            delta="-2"
            color={A_ORANGE}
            sub="3명은 사전 보고 완료"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            }
          />
          <StatTile
            label="미출근"
            value="6"
            suffix="명"
            delta="+1"
            color={A_RED}
            sub="휴가 4명 · 미보고 2명"
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            }
          />
        </div>

        {/* Chart + Live feed */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 360px',
            gap: 16,
            marginBottom: 20,
          }}
        >
          <HourlyChart />
          <LiveFeed />
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <DeptBreakdown />
          <AlertsCard />
        </div>
      </div>
    </div>
  );
}
