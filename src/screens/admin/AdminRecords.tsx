import { useEffect, useState, useCallback } from 'react';
import AdminTopBar from './_components/AdminTopBar';
import Skeleton from './_components/Skeleton';
import EmptyState from './_components/EmptyState';
import { adminApi } from '../../lib/api';
import type { AttendanceLog } from '../../lib/api-types';

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

const AVATAR_GRADIENTS = [
  { bg: 'linear-gradient(135deg,#FFCCA8,#FFB582)', tc: '#6E4944' },
  { bg: 'linear-gradient(135deg,#CDE7FF,#A3CCFF)', tc: '#1E4FA8' },
  { bg: 'linear-gradient(135deg,#FFE6A8,#FFC84D)', tc: '#7A5500' },
  { bg: 'linear-gradient(135deg,#D4F0D8,#9ED6A6)', tc: '#1F5C2A' },
  { bg: 'linear-gradient(135deg,#F0D4F0,#D69ED6)', tc: '#5C1F5C' },
  { bg: 'linear-gradient(135deg,#FFD4D4,#FF9E9E)', tc: '#8C2424' },
  { bg: 'linear-gradient(135deg,#CDF0F0,#9ECDD6)', tc: '#1F4F5C' },
  { bg: 'linear-gradient(135deg,#F0F0D4,#D6D69E)', tc: '#4F4F1F' },
];

function avatarFor(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return AVATAR_GRADIENTS[h % AVATAR_GRADIENTS.length];
}

type AttendanceRow = AttendanceLog & {
  employees?: { id: string; name: string; employee_no: string; department: string | null } | null;
};

const statusBadge = (s: string) => {
  const map: Record<string, { bg: string; c: string; l: string }> = {
    on_time:  { bg: 'rgba(0,123,51,.1)', c: A_GREEN, l: '정시' },
    late:     { bg: 'rgba(255,144,0,.12)', c: A_ORANGE, l: '지각' },
    absent:   { bg: 'rgba(239,68,82,.1)', c: A_RED, l: '미출근' },
    leave:    { bg: A_GRAY_100, c: A_GRAY_600, l: '휴가' },
  };
  const m = map[s] ?? { bg: A_GRAY_100, c: A_GRAY_600, l: s };
  return (
    <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: m.bg, color: m.c, fontSize: 12, fontWeight: 700 }}>
      {m.l}
    </div>
  );
};

function formatTime(iso: string) {
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

type DatePreset = 'today' | 'week' | 'month' | 'last_month';

function getDateRange(preset: DatePreset): { from: string; to: string; label: string } {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  const fmt = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  if (preset === 'today') {
    const t = fmt(now);
    return { from: t, to: t, label: `${t}` };
  }
  if (preset === 'week') {
    const day = now.getDay() || 7;
    const mon = new Date(now); mon.setDate(now.getDate() - day + 1);
    return { from: fmt(mon), to: fmt(now), label: `${fmt(mon)} — ${fmt(now)}` };
  }
  if (preset === 'month') {
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    return { from: fmt(first), to: fmt(now), label: `${fmt(first)} — ${fmt(now)}` };
  }
  // last_month
  const first = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const last = new Date(now.getFullYear(), now.getMonth(), 0);
  return { from: fmt(first), to: fmt(last), label: `${fmt(first)} — ${fmt(last)}` };
}

const PAGE_SIZE = 10;

export default function AdminRecords() {
  const [preset, setPreset] = useState<DatePreset>('today');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<AttendanceRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const range = getDateRange(preset);

  // Summary counts from current page data (server doesn't return per-status summary)
  const onTimeCount = rows.filter((r) => r.status === 'on_time').length;
  const lateCount = rows.filter((r) => r.status === 'late').length;
  const absentCount = rows.filter((r) => r.status === 'absent').length;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params: Record<string, string> = {
        from: range.from + 'T00:00:00',
        to: range.to + 'T23:59:59',
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      };
      if (statusFilter) params.status = statusFilter;
      const res = await adminApi.listAttendance(params);
      setRows(res.data as AttendanceRow[]);
      setTotal(res.total);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [range.from, range.to, statusFilter, page]);

  useEffect(() => {
    setPage(0);
  }, [preset, statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const renderPagination = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 7) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      pages.push(0);
      if (page > 2) pages.push('...');
      for (let i = Math.max(1, page - 1); i <= Math.min(totalPages - 2, page + 1); i++) pages.push(i);
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages - 1);
    }
    return pages;
  };

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
            {range.label}
          </div>
          {([
            { label: '오늘', value: 'today' as DatePreset },
            { label: '이번 주', value: 'week' as DatePreset },
            { label: '이번 달', value: 'month' as DatePreset },
            { label: '지난 달', value: 'last_month' as DatePreset },
          ]).map((c) => (
            <div
              key={c.label}
              onClick={() => setPreset(c.value)}
              style={{ padding: '10px 14px', borderRadius: 999, background: preset === c.value ? A_GRAY_900 : A_GRAY_100, color: preset === c.value ? '#fff' : A_GRAY_600, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
            >
              {c.label}
            </div>
          ))}
          <div style={{ width: 1, height: 24, background: A_GRAY_200 }} />
          {([
            { label: '전체', value: '' },
            { label: '정시', value: 'on_time' },
            { label: '지각', value: 'late' },
            { label: '미출근', value: 'absent' },
          ]).map((s) => (
            <div
              key={s.label}
              onClick={() => setStatusFilter(s.value)}
              style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', border: `1px solid ${statusFilter === s.value ? A_BLUE : A_GRAY_200}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: statusFilter === s.value ? A_BLUE : A_GRAY_700, cursor: 'pointer', background: statusFilter === s.value ? '#E8F2FE' : '#fff' }}
            >
              상태: {s.label}
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 13, color: A_GRAY_500 }}>
            총 <b style={{ color: A_GRAY_900 }}>{total}건</b>
            {!loading && ` · 정시 ${onTimeCount} · 지각 ${lateCount} · 미출근 ${absentCount}`}
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
            <div>유형</div>
            <div>상태</div>
            <div></div>
          </div>

          {loading ? (
            Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px', padding: '14px 20px', borderBottom: `1px solid ${A_GRAY_200}`, alignItems: 'center' }}>
                <Skeleton width={16} height={16} borderRadius={3} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Skeleton width={36} height={36} borderRadius={12} />
                  <div>
                    <Skeleton height={14} width={80} borderRadius={4} style={{ marginBottom: 4 }} />
                    <Skeleton height={12} width={60} borderRadius={3} />
                  </div>
                </div>
                <Skeleton height={13} width={100} borderRadius={4} />
                <Skeleton height={14} width={40} borderRadius={4} />
                <Skeleton height={14} width={40} borderRadius={4} />
                <Skeleton height={13} width={60} borderRadius={4} />
                <Skeleton height={22} width={50} borderRadius={999} />
              </div>
            ))
          ) : error ? (
            <EmptyState message="데이터를 불러올 수 없어요" onRetry={fetchData} />
          ) : rows.length === 0 ? (
            <EmptyState message="조건에 맞는 출근 기록이 없어요" sub="필터를 조정하거나 다른 날짜를 선택해보세요" />
          ) : (
            rows.map((r, i) => {
              const emp = r.employees;
              const empId = emp?.id ?? r.employee_id;
              const avatar = avatarFor(empId);
              const nameInitial = emp?.name ? emp.name[1] ?? emp.name[0] : '?';
              return (
                <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px', padding: '14px 20px', borderBottom: i < rows.length - 1 ? `1px solid ${A_GRAY_200}` : 'none', alignItems: 'center' }}>
                  <input type="checkbox" readOnly />
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: avatar.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, color: avatar.tc, flexShrink: 0 }}>
                      {nameInitial}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{emp?.name ?? '알 수 없음'}</div>
                      <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{emp?.employee_no ?? r.employee_id.slice(0, 8)}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 13, color: A_GRAY_700, fontWeight: 500 }}>{emp?.department ?? '—'}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: A_GRAY_900, fontVariantNumeric: 'tabular-nums' }}>{formatTime(r.recognized_at)}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: A_GRAY_400, fontVariantNumeric: 'tabular-nums' }}>—</div>
                  <div style={{ fontSize: 13, color: A_GRAY_700 }}>{r.type === 'check_in' ? '출근' : '퇴근'}</div>
                  <div>{statusBadge(r.status)}</div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', color: A_GRAY_400, cursor: 'pointer' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                  </div>
                </div>
              );
            })
          )}

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderTop: `1px solid ${A_GRAY_200}`, background: A_GRAY_50 }}>
            <div style={{ fontSize: 13, color: A_GRAY_500 }}>
              {loading ? '로딩 중...' : `${page * PAGE_SIZE + 1}–${Math.min((page + 1) * PAGE_SIZE, total)} / ${total}건`}
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              <div
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                style={{ minWidth: 32, height: 32, padding: '0 10px', borderRadius: 8, background: 'transparent', color: page === 0 ? A_GRAY_400 : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: page === 0 ? 'default' : 'pointer' }}
              >
                ‹
              </div>
              {renderPagination().map((p, i) =>
                p === '...' ? (
                  <div key={`dots-${i}`} style={{ minWidth: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: A_GRAY_400 }}>…</div>
                ) : (
                  <div
                    key={p}
                    onClick={() => setPage(p as number)}
                    style={{ minWidth: 32, height: 32, padding: '0 10px', borderRadius: 8, background: page === p ? A_GRAY_900 : 'transparent', color: page === p ? '#fff' : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                  >
                    {(p as number) + 1}
                  </div>
                )
              )}
              <div
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                style={{ minWidth: 32, height: 32, padding: '0 10px', borderRadius: 8, background: 'transparent', color: page === totalPages - 1 ? A_GRAY_400 : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: page === totalPages - 1 ? 'default' : 'pointer' }}
              >
                ›
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
