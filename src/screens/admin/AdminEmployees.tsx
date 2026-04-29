import { useEffect, useState, useCallback } from 'react';
import AdminTopBar from './_components/AdminTopBar';
import StatTile from './_components/StatTile';
import Skeleton from './_components/Skeleton';
import EmptyState from './_components/EmptyState';
import { adminApi } from '../../lib/api';
import type { EmployeeWithEmbeddingCount, CreateEmployeeInput } from '../../lib/api-types';

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

function empStatus(emp: EmployeeWithEmbeddingCount): 'enrolled' | 'pending' | 'expired' {
  if (emp.enrolled_at) return 'enrolled';
  // We don't have invite expiry here, so treat non-enrolled as pending
  return 'pending';
}

const badge = (s: string) => {
  const m: Record<string, { bg: string; c: string; l: string }> = {
    enrolled: { bg: 'rgba(0,123,51,.1)', c: A_GREEN, l: '등록 완료' },
    pending:  { bg: A_BLUE_WEAK, c: A_BLUE, l: '등록 대기' },
    expired:  { bg: 'rgba(239,68,82,.1)', c: A_RED, l: '만료' },
  };
  const mb = m[s] ?? { bg: A_GRAY_100, c: A_GRAY_600, l: s };
  return <div style={{ display: 'inline-flex', padding: '4px 10px', borderRadius: 999, background: mb.bg, color: mb.c, fontSize: 12, fontWeight: 700 }}>{mb.l}</div>;
};

type StatusFilter = '' | 'enrolled' | 'pending' | 'expired';

const SEND_METHOD_LABELS: Record<string, string> = { sms: '문자', email: '이메일', slack: '슬랙' };

export default function AdminEmployees() {
  const [employees, setEmployees] = useState<EmployeeWithEmbeddingCount[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('');
  const [searchQ, setSearchQ] = useState('');

  // Invite form
  const [inviteName, setInviteName] = useState('');
  const [inviteEmpNo, setInviteEmpNo] = useState('');
  const [inviteDept, setInviteDept] = useState('');
  const [inviteContact, setInviteContact] = useState('');
  const [inviteMethod, setInviteMethod] = useState<'sms' | 'email' | 'slack'>('sms');
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [inviting, setInviting] = useState(false);
  const [inviteError, setInviteError] = useState('');

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const params: Record<string, string> = { limit: '50' };
      if (statusFilter) params.status = statusFilter;
      if (searchQ) params.q = searchQ;
      const res = await adminApi.listEmployees(params);
      setEmployees(res.data);
      setTotal(res.total);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQ]);

  useEffect(() => {
    const t = setTimeout(fetchEmployees, searchQ ? 400 : 0);
    return () => clearTimeout(t);
  }, [fetchEmployees, searchQ]);

  // KPI derived from list
  const enrolledCount = employees.filter((e) => e.enrolled_at).length;
  const pendingCount = employees.filter((e) => !e.enrolled_at).length;

  const handleInvite = async () => {
    if (!inviteName || !inviteEmpNo) {
      setInviteError('이름과 사번은 필수입니다');
      return;
    }
    setInviting(true);
    setInviteError('');
    try {
      const input: CreateEmployeeInput = {
        name: inviteName,
        employee_no: inviteEmpNo,
        department: inviteDept || undefined,
        phone: inviteContact || undefined,
        send_method: inviteMethod,
        invite: true,
      };
      const result = await adminApi.createEmployee(input);
      setInviteToken(result.invite_token ?? null);
      // Reset form
      setInviteName('');
      setInviteEmpNo('');
      setInviteDept('');
      setInviteContact('');
      // Refresh list
      await fetchEmployees();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : '초대 중 오류가 발생했어요';
      setInviteError(msg);
    } finally {
      setInviting(false);
    }
  };

  const inviteUrl = inviteToken ? `facepass.app/e/${inviteToken}` : 'facepass.app/e/——';

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
            <button
              onClick={() => { setInviteToken(null); document.getElementById('invite-name')?.focus(); }}
              style={{ height: 40, padding: '0 16px', borderRadius: 10, background: A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'inherit' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              직원 초대하기
            </button>
          </div>
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
                <Skeleton height={32} width={80} borderRadius={6} />
              </div>
            ))
          ) : (
            <>
              <StatTile
                label="전체 직원"
                value={String(total)}
                suffix="명"
                color={A_BLUE}
                sub="활성 계정 기준"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>}
              />
              <StatTile
                label="등록 완료"
                value={String(enrolledCount)}
                suffix="명"
                color={A_GREEN}
                sub={total > 0 ? `전체의 ${Math.round((enrolledCount / total) * 100)}%` : '—'}
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
              />
              <StatTile
                label="등록 대기"
                value={String(pendingCount)}
                suffix="명"
                color={A_ORANGE}
                sub="초대 발송됨 · 미완료"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
              />
              <StatTile
                label="이번 달 신규"
                value={String(employees.filter((e) => {
                  const now = new Date();
                  const created = new Date(e.created_at);
                  return created.getFullYear() === now.getFullYear() && created.getMonth() === now.getMonth();
                }).length)}
                suffix="명"
                color={A_BLUE}
                sub="이번 달 추가된 직원"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>}
              />
            </>
          )}
        </div>

        {/* Two-column: Invite panel + table */}
        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 16 }}>
          {/* Invite panel */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: '-0.01em' }}>새 직원 초대</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>초대 링크를 받은 직원이 모바일에서 본인의 얼굴을 직접 등록해요</div>

            <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { l: '이름', id: 'invite-name', v: inviteName, set: setInviteName, ph: '홍길동' },
                { l: '사번', id: 'invite-empno', v: inviteEmpNo, set: setInviteEmpNo, ph: 'EMP-0001' },
                { l: '부서', id: 'invite-dept', v: inviteDept, set: setInviteDept, ph: '엔지니어링' },
                { l: '연락처', id: 'invite-contact', v: inviteContact, set: setInviteContact, ph: '000-0000-0000' },
              ].map((f) => (
                <div key={f.l}>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>{f.l}</div>
                  <input
                    id={f.id}
                    value={f.v}
                    onChange={(e) => f.set(e.target.value)}
                    placeholder={f.ph}
                    style={{ width: '100%', height: 40, padding: '0 12px', border: `1px solid ${A_GRAY_200}`, borderRadius: 10, fontSize: 14, color: A_GRAY_900, background: '#fff', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>
              ))}
              <div>
                <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>발송 방법</div>
                <div style={{ display: 'flex', gap: 6 }}>
                  {(['sms', 'email', 'slack'] as const).map((method) => (
                    <div
                      key={method}
                      onClick={() => setInviteMethod(method)}
                      style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${inviteMethod === method ? A_BLUE : A_GRAY_200}`, background: inviteMethod === method ? A_BLUE_WEAK : '#fff', color: inviteMethod === method ? A_BLUE : A_GRAY_600, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                    >
                      {SEND_METHOD_LABELS[method]}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR preview */}
            <div style={{ marginTop: 18, padding: 14, background: A_GRAY_100, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, background: '#fff', padding: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {inviteToken ? (
                  <svg width="100%" height="100%" viewBox="0 0 21 21">
                    {['1111111000-0000-0000111', '10000000-0000-000000010', '1000-0000-0000101110101', '1000-0000-0000101110100', '1000-0000-0000101110101', '10000000-0000-000000010', '1111111000-0000-0000111', '0000000000-0000-0000000', '110000-0000-00000110011', '000-0000-0000000-0000-0000', '1000-0000-0000001011010', '110000-0000-00000100110', '000-0000-0000000-0000-0000', '0000000000-0000-0000001', '1111111000-0000-0000010', '10000000-0000-000010110', '1000-0000-0000100110001', '1000-0000-0000111100100', '1000-0000-0000100100010', '10000000-0000-000010010', '1111111000-0000-0000001'].map((row, y) =>
                      row.split('').map((c, x) =>
                        c === '1' ? <rect key={x + ',' + y} x={x} y={y} width="1" height="1" fill="#191F28" /> : null
                      )
                    )}
                  </svg>
                ) : (
                  <div style={{ fontSize: 24, color: A_GRAY_300 }}>QR</div>
                )}
              </div>
              <div style={{ flex: 1, fontSize: 12, color: A_GRAY_600, lineHeight: 1.5 }}>
                직원이 이 QR을 스캔하거나{' '}
                <b style={{ color: A_GRAY_900 }}>{inviteUrl}</b>
                로 접속하면 등록을 시작해요
              </div>
            </div>

            {inviteError && (
              <div style={{ marginTop: 8, fontSize: 12, color: A_RED, fontWeight: 600 }}>{inviteError}</div>
            )}
            {inviteToken && (
              <div style={{ marginTop: 8, fontSize: 12, color: A_GREEN, fontWeight: 600 }}>초대 링크가 발송됐어요!</div>
            )}

            <button
              onClick={handleInvite}
              disabled={inviting}
              style={{ width: '100%', marginTop: 14, height: 48, borderRadius: 12, background: inviting ? A_GRAY_300 : A_BLUE, color: '#fff', border: 0, fontSize: 14, fontWeight: 700, cursor: inviting ? 'not-allowed' : 'pointer', fontFamily: 'inherit' }}
            >
              {inviting ? '발송 중...' : '초대 링크 발송'}
            </button>
            <div style={{ marginTop: 8, textAlign: 'center', fontSize: 12, color: A_GRAY_500 }}>링크는 72시간 동안 유효해요</div>
          </div>

          {/* Employees table */}
          <div style={{ background: '#fff', border: `1px solid ${A_GRAY_200}`, borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${A_GRAY_200}`, gap: 12 }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: A_GRAY_100, borderRadius: 10, fontSize: 13, color: A_GRAY_500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="이름, 사번, 부서로 검색…"
                  style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: 13, color: A_GRAY_900, fontFamily: 'inherit' }}
                />
              </div>
              {([
                { l: '전체', v: '' as StatusFilter },
                { l: '등록 완료', v: 'enrolled' as StatusFilter },
                { l: '대기', v: 'pending' as StatusFilter },
              ]).map((c) => (
                <div
                  key={c.l}
                  onClick={() => setStatusFilter(c.v)}
                  style={{ padding: '7px 12px', borderRadius: 999, background: statusFilter === c.v ? A_GRAY_900 : A_GRAY_100, color: statusFilter === c.v ? '#fff' : A_GRAY_600, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                >
                  {c.l}
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1.4fr 1fr 60px', padding: '12px 20px', background: A_GRAY_50, borderBottom: `1px solid ${A_GRAY_200}`, fontSize: 12, fontWeight: 700, color: A_GRAY_500, textTransform: 'uppercase', letterSpacing: '0.04em', alignItems: 'center' }}>
              <div>직원</div><div>부서</div><div>상태</div><div>등록 정보</div><div>임베딩</div><div></div>
            </div>
            <div style={{ flex: 1, overflow: 'auto' }}>
              {loading ? (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1.4fr 1fr 60px', padding: '14px 20px', borderBottom: `1px solid ${A_GRAY_200}`, alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Skeleton width={36} height={36} borderRadius={12} />
                      <div>
                        <Skeleton height={14} width={80} borderRadius={4} style={{ marginBottom: 4 }} />
                        <Skeleton height={12} width={60} borderRadius={3} />
                      </div>
                    </div>
                    <Skeleton height={13} width={80} borderRadius={4} />
                    <Skeleton height={22} width={56} borderRadius={999} />
                    <Skeleton height={13} width={90} borderRadius={4} />
                    <Skeleton height={13} width={30} borderRadius={4} />
                  </div>
                ))
              ) : error ? (
                <EmptyState message="데이터를 불러올 수 없어요" onRetry={fetchEmployees} />
              ) : employees.length === 0 ? (
                <EmptyState message="직원이 없어요" sub="왼쪽 패널에서 직원을 초대해보세요" />
              ) : (
                employees.map((r, i) => {
                  const avatar = avatarFor(r.id);
                  const nameInitial = r.name[1] ?? r.name[0];
                  const status = empStatus(r);
                  const enrolledDate = r.enrolled_at
                    ? new Date(r.enrolled_at).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace('.', '')
                    : status === 'pending' ? '초대 발송됨' : '—';
                  return (
                    <div key={r.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1.4fr 1fr 60px', padding: '14px 20px', borderBottom: i < employees.length - 1 ? `1px solid ${A_GRAY_200}` : 'none', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 12, background: avatar.bg, color: avatar.tc, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                          {nameInitial}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                          <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.employee_no}</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 13, color: A_GRAY_700 }}>{r.department ?? '—'}</div>
                      <div>{badge(status)}</div>
                      <div style={{ fontSize: 13, color: A_GRAY_500 }}>{enrolledDate}</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: r.embedding_count > 0 ? A_GREEN : A_GRAY_300 }}>
                        {r.embedding_count > 0 ? `${r.embedding_count}개` : '—'}
                      </div>
                      <div
                        onClick={() => alert(`직원 상세 (V2): ${r.name}`)}
                        style={{ display: 'flex', justifyContent: 'flex-end', color: A_GRAY_400, cursor: 'pointer' }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
