import { useEffect, useState, useCallback } from 'react';
import AdminTopBar from './_components/AdminTopBar';
import StatTile from './_components/StatTile';
import Skeleton from './_components/Skeleton';
import EmptyState from './_components/EmptyState';
import { adminApi } from '../../lib/api';
import type { DashboardData } from '../../lib/api-types';

const A_BLUE = '#3182F6';
const A_BLUE_WEAK = '#E8F2FE';
const A_GRAY_900 = '#191F28';
const A_GRAY_700 = '#333D4B';
const A_GRAY_500 = '#6B7683';
const A_GRAY_200 = '#E5E8EB';
const A_GRAY_50 = '#F9FAFB';
const A_GREEN = '#007B33';
const A_RED = '#EF4452';
const A_ORANGE = '#FF9000';

function formatNowLabel() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const month = now.getMonth() + 1;
  const date = now.getDate();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const day = days[now.getDay()];
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  return `${yyyy}년 ${month}월 ${date}일 ${day}요일 · ${hh}:${mm} 기준`;
}

function HourlyChart({ hourly, loading, onRetry }: {
  hourly: DashboardData['hourly'] | null;
  loading: boolean;
  onRetry: () => void;
}) {
  const cardStyle = {
    background: '#fff',
    border: `1px solid ${A_GRAY_200}`,
    borderRadius: 16,
    padding: 24,
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <Skeleton height={22} width={180} borderRadius={6} style={{ marginBottom: 8 }} />
        <Skeleton height={14} width={120} borderRadius={4} />
        <div style={{ marginTop: 28, display: 'flex', alignItems: 'flex-end', gap: 14, height: 180 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <Skeleton height={80 + Math.random() * 80} borderRadius={8} />
              <Skeleton height={11} width={28} borderRadius={3} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!hourly) {
    return (
      <div style={cardStyle}>
        <EmptyState message="데이터를 불러올 수 없어요" onRetry={onRetry} />
      </div>
    );
  }

  // Filter hours with data for display (show range 6–20 or all non-zero)
  const nonZero = hourly.filter((h) => h.check_in > 0 || h.check_out > 0);

  if (nonZero.length === 0) {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>시간대별 출근 분포</div>
        <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 · 1시간 단위</div>
        <EmptyState message="아직 출근 데이터가 없어요" sub="오늘 출근 기록이 쌓이면 여기에 표시돼요" />
      </div>
    );
  }

  const display = nonZero.length > 0 ? nonZero : hourly.slice(6, 20);
  const maxVal = Math.max(...display.map((h) => h.check_in), 1);

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>시간대별 출근 분포</div>
          <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 · 1시간 단위</div>
        </div>
      </div>

      <div style={{ marginTop: 28, display: 'flex', alignItems: 'flex-end', gap: 14, height: 180 }}>
        {display.map((d, i) => {
          const h = (d.check_in / maxVal) * 160;
          const isPeak = d.check_in === maxVal && maxVal > 0;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative' }}>
              {isPeak && (
                <div style={{ position: 'absolute', top: -28, padding: '4px 8px', background: A_GRAY_900, color: '#fff', fontSize: 11, fontWeight: 700, borderRadius: 6, whiteSpace: 'nowrap' }}>
                  피크 {d.check_in}명
                  <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%) rotate(45deg)', width: 8, height: 8, background: A_GRAY_900 }} />
                </div>
              )}
              <div style={{ width: '100%', height: Math.max(h, 4), background: isPeak ? A_BLUE : A_BLUE_WEAK, borderRadius: 8, transition: 'height .3s' }} />
              <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>{String(d.hour).padStart(2, '0')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LiveFeed({ data, loading, onRetry }: {
  data: DashboardData | null;
  loading: boolean;
  onRetry: () => void;
}) {
  const cardStyle = {
    background: '#fff',
    border: `1px solid ${A_GRAY_200}`,
    borderRadius: 16,
    padding: '20px 0 8px',
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
  };

  const header = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px 16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: 99, background: A_RED }} />
        <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>실시간 인증</div>
      </div>
      <div style={{ fontSize: 12, color: A_BLUE, fontWeight: 700, cursor: 'pointer' }}>전체 보기 →</div>
    </div>
  );

  if (loading) {
    return (
      <div style={cardStyle}>
        {header}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderTop: `1px solid ${A_GRAY_200}` }}>
              <Skeleton width={38} height={38} borderRadius={12} />
              <div style={{ flex: 1 }}>
                <Skeleton height={14} width={80} borderRadius={4} style={{ marginBottom: 6 }} />
                <Skeleton height={12} width={120} borderRadius={3} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <Skeleton height={14} width={40} borderRadius={4} style={{ marginBottom: 4 }} />
                <Skeleton height={11} width={28} borderRadius={3} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={cardStyle}>
        {header}
        <EmptyState message="데이터를 불러올 수 없어요" onRetry={onRetry} />
      </div>
    );
  }

  // Build recent feed from today's hourly data (no direct log feed in dashboard API)
  // Use alerts as items, fallback to empty
  const alerts = data.alerts;

  return (
    <div style={cardStyle}>
      {header}
      <div style={{ flex: 1, overflow: 'hidden', borderTop: `1px solid ${A_GRAY_200}` }}>
        {alerts.length === 0 ? (
          <EmptyState message="아직 인증 기록이 없어요" sub="오늘 인증이 발생하면 여기에 표시돼요" />
        ) : (
          alerts.map((alert, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 24px', borderBottom: `1px solid ${A_GRAY_200}` }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, background: A_BLUE_WEAK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>⚠️</div>
              <div style={{ flex: 1, fontSize: 13, color: A_GRAY_700 }}>{alert}</div>
            </div>
          ))
        )}
        {data.kpi.checked_in_today > 0 && alerts.length === 0 && (
          <div style={{ padding: '12px 24px', fontSize: 13, color: A_GRAY_500 }}>
            오늘 <b style={{ color: A_GRAY_900 }}>{data.kpi.checked_in_today}명</b>이 출근했어요
          </div>
        )}
      </div>
    </div>
  );
}

function DeptBreakdown({ data, loading, onRetry }: {
  data: DashboardData | null;
  loading: boolean;
  onRetry: () => void;
}) {
  const cardStyle = {
    background: '#fff',
    border: `1px solid ${A_GRAY_200}`,
    borderRadius: 16,
    padding: 24,
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <Skeleton height={20} width={120} borderRadius={6} style={{ marginBottom: 8 }} />
        <Skeleton height={13} width={160} borderRadius={4} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
          <Skeleton width={132} height={132} borderRadius={99} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={16} borderRadius={4} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={cardStyle}>
        <EmptyState message="데이터를 불러올 수 없어요" onRetry={onRetry} />
      </div>
    );
  }

  const DEPT_COLORS = [A_BLUE, '#7C5CFF', A_ORANGE, A_GREEN, '#FFC84D', '#EF4452', '#00BCD4'];
  const byDept = data.by_department;
  const entries = Object.entries(byDept);
  const totalA = entries.reduce((s, [, v]) => s + v, 0);
  const totalT = data.kpi.total_employees;

  if (totalA === 0) {
    return (
      <div style={cardStyle}>
        <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>부서별 출석</div>
        <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 출근한 인원 기준</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
          <div style={{ width: 132, height: 132, borderRadius: 99, background: A_GRAY_200, flexShrink: 0 }} />
          <div style={{ fontSize: 13, color: A_GRAY_500 }}>아직 출근 데이터가 없어요</div>
        </div>
      </div>
    );
  }

  let acc = 0;
  const stops = entries
    .map(([, v], idx) => {
      const color = DEPT_COLORS[idx % DEPT_COLORS.length];
      const start = (acc / totalA) * 360;
      acc += v;
      const end = (acc / totalA) * 360;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(', ');

  return (
    <div style={cardStyle}>
      <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>부서별 출석</div>
      <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 출근한 인원 기준</div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginTop: 20 }}>
        <div style={{ position: 'relative', width: 132, height: 132, flexShrink: 0 }}>
          <div style={{ width: '100%', height: '100%', borderRadius: 99, background: `conic-gradient(${stops})` }} />
          <div style={{ position: 'absolute', inset: 18, borderRadius: 99, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{totalA}</div>
            <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>/ {totalT}명</div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {entries.map(([dept, cnt], idx) => (
            <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 99, background: DEPT_COLORS[idx % DEPT_COLORS.length] }} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: A_GRAY_700 }}>{dept}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{cnt}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AlertsCard({ data, loading, onRetry }: {
  data: DashboardData | null;
  loading: boolean;
  onRetry: () => void;
}) {
  const cardStyle = {
    background: '#fff',
    border: `1px solid ${A_GRAY_200}`,
    borderRadius: 16,
    padding: '20px 24px',
  };

  if (loading) {
    return (
      <div style={cardStyle}>
        <Skeleton height={20} width={140} borderRadius={6} style={{ marginBottom: 16 }} />
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i ? `1px solid ${A_GRAY_200}` : 'none' }}>
            <Skeleton width={32} height={32} borderRadius={10} />
            <div style={{ flex: 1 }}>
              <Skeleton height={14} width={160} borderRadius={4} style={{ marginBottom: 6 }} />
              <Skeleton height={12} width={200} borderRadius={3} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!data) {
    return (
      <div style={cardStyle}>
        <EmptyState message="데이터를 불러올 수 없어요" onRetry={onRetry} />
      </div>
    );
  }

  const alerts = data.alerts;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>주의가 필요해요</div>
        {alerts.length > 0 && (
          <div style={{ padding: '3px 9px', background: 'rgba(239,68,82,.1)', color: A_RED, fontSize: 12, fontWeight: 700, borderRadius: 999 }}>
            {alerts.length}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
        {alerts.length === 0 ? (
          <EmptyState message="주의가 필요한 사항이 없어요" sub="출근 현황이 정상이에요" />
        ) : (
          alerts.map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderTop: i ? `1px solid ${A_GRAY_200}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(255,144,0,.12)', color: A_ORANGE, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{a}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [nowLabel, setNowLabel] = useState(formatNowLabel);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await adminApi.dashboard();
      setData(result);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const id = setInterval(() => setNowLabel(formatNowLabel()), 60_000);
    return () => clearInterval(id);
  }, []);

  const kpi = data?.kpi;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: A_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="대시보드"
        subtitle={nowLabel}
        action={
          <button
            style={{ height: 40, padding: '0 18px', borderRadius: 10, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
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
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 20, minWidth: 0 }}>
                <Skeleton width={36} height={36} borderRadius={10} style={{ marginBottom: 16 }} />
                <Skeleton height={13} width={80} borderRadius={4} style={{ marginBottom: 8 }} />
                <Skeleton height={32} width={100} borderRadius={6} />
              </div>
            ))
          ) : error ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} style={{ flex: 1, background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 20, minWidth: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: A_GRAY_500 }}>오류</span>
              </div>
            ))
          ) : (
            <>
              <StatTile
                label="오늘 출근"
                value={String(kpi?.checked_in_today ?? 0)}
                suffix={`/ ${kpi?.total_employees ?? 0}명`}
                color={A_BLUE}
                sub={`미출근 ${kpi?.absent_today ?? 0}명`}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>}
              />
              <StatTile
                label="정시 출근률"
                value={kpi && kpi.checked_in_today > 0 ? String(Math.round(((kpi.checked_in_today - kpi.late_today) / kpi.checked_in_today) * 100)) : '—'}
                suffix="%"
                color={A_GREEN}
                sub={`출근자 ${kpi?.checked_in_today ?? 0}명 기준`}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
              />
              <StatTile
                label="지각"
                value={String(kpi?.late_today ?? 0)}
                suffix="명"
                color={A_ORANGE}
                sub="오늘 지각 처리"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              />
              <StatTile
                label="미출근"
                value={String(kpi?.absent_today ?? 0)}
                suffix="명"
                color={A_RED}
                sub="전체 직원 기준"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
              />
            </>
          )}
        </div>

        {/* Chart + Live feed */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, marginBottom: 20 }}>
          <HourlyChart hourly={data?.hourly ?? null} loading={loading} onRetry={fetchData} />
          <LiveFeed data={data} loading={loading} onRetry={fetchData} />
        </div>

        {/* Bottom row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <DeptBreakdown data={data} loading={loading} onRetry={fetchData} />
          <AlertsCard data={data} loading={loading} onRetry={fetchData} />
        </div>
      </div>
    </div>
  );
}
