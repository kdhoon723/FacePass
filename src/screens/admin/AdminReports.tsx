import { useEffect, useState, useCallback } from 'react';
import AdminTopBar from './_components/AdminTopBar';
import Skeleton from './_components/Skeleton';
import EmptyState from './_components/EmptyState';
import { adminApi } from '../../lib/api';

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

type WeekDay = { date: string; on_time: number; late: number; absent: number };
type MonthPoint = { month: string; on_time_rate: number };
type Top5 = { employee_id: string; days_on_time: number };

const MONTH_LABELS: Record<string, string> = {
  '01': '1월', '02': '2월', '03': '3월', '04': '4월', '05': '5월', '06': '6월',
  '07': '7월', '08': '8월', '09': '9월', '10': '10월', '11': '11월', '12': '12월',
};

function monthLabel(ym: string) {
  const [, m] = ym.split('-');
  return MONTH_LABELS[m] ?? ym;
}

function dayLabel(dateStr: string) {
  const d = new Date(dateStr);
  return ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
}

const AVATAR_GRADIENTS = [
  { bg: 'linear-gradient(135deg,#FFCCA8,#FFB582)', tc: '#6E4944' },
  { bg: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', tc: '#1E4FA8' },
  { bg: 'linear-gradient(135deg,#FFE6A8,#FFC84D)', tc: '#7A5500' },
  { bg: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', tc: '#1F5C2A' },
  { bg: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', tc: '#5C1F5C' },
];

function avatarFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

type Period = 'weekly' | 'monthly' | 'quarterly';

function downloadCsv(filename: string, header: string, rows: string[]) {
  const body = rows.join('\n');
  // BOM for Excel UTF-8 detection
  const blob = new Blob([`﻿${header}\n${body}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminReports() {
  const [weekData, setWeekData] = useState<WeekDay[] | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthPoint[] | null>(null);
  const [top5, setTop5] = useState<Top5[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [period, setPeriod] = useState<Period>('weekly');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [weekly, monthly] = await Promise.all([
        adminApi.weeklyReport(),
        adminApi.monthlyReport(),
      ]);
      setWeekData(weekly.data);
      setMonthlyData(monthly.monthly);
      setTop5(monthly.top5_attendees);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Compute insight: compare last 2 weeks of monthly data
  const insightText = (() => {
    if (!monthlyData || monthlyData.length < 2) return null;
    const last = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];
    const diff = last.on_time_rate - prev.on_time_rate;
    if (diff === 0) return `이번 달 정시 출근률은 ${last.on_time_rate}%로 지난 달과 동일해요`;
    const sign = diff > 0 ? '+' : '';
    return `이번 달 정시 출근률이 지난 달 대비 ${sign}${diff}%p ${diff > 0 ? '올랐어요' : '내렸어요'}`;
  })();

  const maxWeek = weekData ? Math.max(...weekData.map((d) => d.on_time + d.late + d.absent), 1) : 100;
  const monthlyAvgArr = monthlyData?.map((m) => m.on_time_rate) ?? [];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: A_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="리포트"
        subtitle="추세를 한눈에 보고 문제를 빠르게 짚어보세요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              role="tablist"
              style={{ display: 'flex', gap: 4, padding: 4, background: A_GRAY_100, borderRadius: 10 }}
            >
              {([
                { v: 'weekly' as const, l: '주간' },
                { v: 'monthly' as const, l: '월간' },
                { v: 'quarterly' as const, l: '분기' },
              ]).map((t) => {
                const active = period === t.v;
                return (
                  <button
                    key={t.v}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setPeriod(t.v)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 7,
                      fontSize: 13,
                      fontWeight: 700,
                      background: active ? '#fff' : 'transparent',
                      color: active ? A_GRAY_900 : A_GRAY_500,
                      boxShadow: active ? '0 1px 2px rgba(0,19,43,.06)' : 'none',
                      cursor: 'pointer',
                      border: 0,
                      fontFamily: 'inherit',
                    }}
                  >
                    {t.l}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => {
                if (!weekData && !monthlyData) return;
                if (period === 'monthly' && monthlyData) {
                  downloadCsv(
                    `facepass-monthly-${new Date().toISOString().slice(0, 10)}.csv`,
                    '월,정시 출근률(%)',
                    monthlyData.map((m) => `${m.month},${m.on_time_rate}`),
                  );
                } else if (weekData) {
                  downloadCsv(
                    `facepass-weekly-${new Date().toISOString().slice(0, 10)}.csv`,
                    '날짜,요일,정시,지각,미출근',
                    weekData.map((d) => `${d.date},${dayLabel(d.date)},${d.on_time},${d.late},${d.absent}`),
                  );
                }
              }}
              disabled={loading || (!weekData && !monthlyData)}
              style={{
                height: 40,
                padding: '0 18px',
                borderRadius: 10,
                background: A_BLUE,
                color: '#fff',
                border: 0,
                fontSize: 14,
                fontWeight: 700,
                cursor: loading ? 'default' : 'pointer',
                opacity: loading ? 0.6 : 1,
                fontFamily: 'inherit',
              }}
            >
              리포트 다운로드
            </button>
          </div>
        }
      />
      {period === 'quarterly' && (
        <div
          style={{
            margin: '16px 28px 0',
            padding: '12px 16px',
            background: A_BLUE_WEAK,
            color: A_BLUE,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          분기 리포트는 다음 업데이트에서 추가될 예정이에요. 지금은 주간/월간 데이터를 사용해주세요.
        </div>
      )}
      <div style={{ flex: 1, overflow: 'auto', padding: 28 }}>
        {/* Insight banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '18px 22px', background: 'linear-gradient(120deg, #E8F2FE 0%, #F2F4F6 100%)', borderRadius: 16, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✨</div>
          <div style={{ flex: 1 }}>
            {loading ? (
              <>
                <Skeleton height={15} width={280} borderRadius={5} style={{ marginBottom: 8 }} />
                <Skeleton height={13} width={220} borderRadius={4} />
              </>
            ) : insightText ? (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900 }}>{insightText}</div>
                <div style={{ fontSize: 13, color: A_GRAY_600, marginTop: 2 }}>월간 추이를 기반으로 계산됐어요</div>
              </>
            ) : (
              <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900 }}>데이터가 충분히 쌓이면 인사이트를 보여드려요</div>
            )}
          </div>
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
            {loading ? (
              Array.from({ length: 7 }).map((_, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <Skeleton height={120 + i * 10} borderRadius={8} />
                  <Skeleton height={12} width={20} borderRadius={3} />
                </div>
              ))
            ) : error ? (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EmptyState message="데이터를 불러올 수 없어요" onRetry={fetchData} />
              </div>
            ) : !weekData || weekData.length === 0 ? (
              <div style={{ flex: 1 }}>
                <EmptyState message="아직 통계가 부족해요" sub="출근 데이터가 쌓이면 차트가 나타나요" />
              </div>
            ) : (
              weekData.map((d, i) => {
                const total = d.on_time + d.late + d.absent;
                const onH = (d.on_time / maxWeek) * 200;
                const lateH = (d.late / maxWeek) * 200;
                const absH = (d.absent / maxWeek) * 200;
                return (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 600 }}>{total}명</div>
                    <div style={{ width: 36, display: 'flex', flexDirection: 'column', borderRadius: 8, overflow: 'hidden' }}>
                      <div style={{ height: absH, background: A_GRAY_300 }} />
                      <div style={{ height: lateH, background: A_ORANGE }} />
                      <div style={{ height: onH, background: A_BLUE }} />
                    </div>
                    <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 600 }}>{dayLabel(d.date)}</div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
          {/* Trend line */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>월간 정시 출근률 추이</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>최근 12개월</div>

            <div style={{ marginTop: 20, position: 'relative', height: 200 }}>
              {loading ? (
                <Skeleton height={200} borderRadius={8} />
              ) : error || !monthlyData || monthlyData.length === 0 ? (
                <EmptyState message="데이터를 불러올 수 없어요" onRetry={fetchData} />
              ) : (
                <>
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
                      const n = monthlyAvgArr.length;
                      const step = n > 1 ? 560 / (n - 1) : 0;
                      const pts = monthlyAvgArr.map((v, i) => [20 + i * step, 200 - ((v - 80) / 20) * 180] as [number, number]);
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
                    {monthlyData.map((m) => <span key={m.month}>{monthLabel(m.month)}</span>)}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Top performers */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: '20px 0' }}>
            <div style={{ padding: '0 24px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>이번 달 우수 출석자</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: A_BLUE, padding: '3px 8px', background: A_BLUE_WEAK, borderRadius: 999 }}>TOP 5</div>
            </div>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderTop: i ? `1px solid ${A_GRAY_200}` : 'none' }}>
                  <Skeleton width={24} height={16} borderRadius={4} />
                  <Skeleton width={36} height={36} borderRadius={12} />
                  <div style={{ flex: 1 }}>
                    <Skeleton height={14} width={80} borderRadius={4} style={{ marginBottom: 4 }} />
                    <Skeleton height={12} width={100} borderRadius={3} />
                  </div>
                  <Skeleton height={15} width={40} borderRadius={4} />
                </div>
              ))
            ) : error ? (
              <EmptyState message="데이터를 불러올 수 없어요" onRetry={fetchData} />
            ) : !top5 || top5.length === 0 ? (
              <EmptyState message="아직 통계가 부족해요" sub="30일치 데이터가 쌓이면 표시돼요" />
            ) : (
              top5.map((r, i) => {
                const avatar = avatarFor(r.employee_id);
                const shortId = r.employee_id.slice(0, 6).toUpperCase();
                return (
                  <div key={r.employee_id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 24px', borderTop: i ? `1px solid ${A_GRAY_200}` : 'none' }}>
                    <div style={{ width: 24, fontSize: 13, fontWeight: 700, color: i < 3 ? A_BLUE : A_GRAY_400, textAlign: 'center' }}>#{i + 1}</div>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: avatar.bg, color: avatar.tc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700 }}>
                      {shortId[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{shortId}</div>
                      <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.days_on_time}일 정시 출근</div>
                    </div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>
                      {r.days_on_time}<span style={{ fontSize: 11, color: A_GRAY_500 }}>일</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
