import { useEffect, useState, useRef, useCallback } from 'react';
import AdminTopBar from './_components/AdminTopBar';
import AxSettingsCard from './_components/AxSettingsCard';
import AxSettingsRow from './_components/AxSettingsRow';
import AxToggle from './_components/AxToggle';
import Skeleton from './_components/Skeleton';
import EmptyState from './_components/EmptyState';
import { adminApi } from '../../lib/api';
import type { AppSettings, KioskWithEventCount } from '../../lib/api-types';

const AX_BLUE = '#3182F6';
const AX_BLUE_WEAK = '#E8F2FE';
const AX_GRAY_900 = '#191F28';
const AX_GRAY_700 = '#333D4B';
const AX_GRAY_600 = '#4E5968';
const AX_GRAY_500 = '#6B7683';
const AX_GRAY_200 = '#E5E8EB';
const AX_GRAY_100 = '#F2F4F6';
const AX_GRAY_50 = '#F9FAFB';
const AX_GREEN = '#007B33';

const NAV_ITEMS = [
  { l: '조직 정보', id: 'section-org', v2: true },
  { l: '키오스크 위치', id: 'section-kiosks', v2: false },
  { l: '인식 정책', id: 'section-recognition', v2: false },
  { l: '출퇴근 규정', id: 'section-attendance', v2: false },
  { l: '알림', id: 'section-notifications', v2: true },
  { l: '보안 / 개인정보', id: 'section-security', v2: false },
  { l: '통합 / API', id: 'section-integrations', v2: true },
];

const RETENTION_OPTIONS = [
  { label: '30일', value: 30 },
  { label: '90일', value: 90 },
  { label: '1년', value: 365 },
];

function fmt5(t: string): string {
  // '09:00:00' → '09:00', '09:00' → '09:00'
  return t ? t.slice(0, 5) : '';
}

export default function AdminSettings() {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [draft, setDraft] = useState<AppSettings | null>(null);
  const [kiosks, setKiosks] = useState<KioskWithEventCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeNav, setActiveNav] = useState('section-kiosks');

  // Kiosk search
  const [kioskSearch, setKioskSearch] = useState('');

  // Add kiosk modal state
  const [addKioskOpen, setAddKioskOpen] = useState(false);
  const [newKioskName, setNewKioskName] = useState('');
  const [newKioskLocation, setNewKioskLocation] = useState('');
  const [addingKiosk, setAddingKiosk] = useState(false);

  // Flexible department input
  const [deptInput, setDeptInput] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [s, k] = await Promise.all([adminApi.getSettings(), adminApi.listKiosks()]);
      setSettings(s);
      setDraft(s);
      setKiosks(k);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const isDirty = draft && settings
    ? JSON.stringify(draft) !== JSON.stringify(settings)
    : false;

  const handleSave = async () => {
    if (!draft || !isDirty) return;
    setSaving(true);
    try {
      const updated = await adminApi.updateSettings(draft);
      setSettings(updated);
      setDraft(updated);
      showToast('저장됐어요');
    } catch {
      showToast('저장에 실패했어요', true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (settings) setDraft({ ...settings });
  };

  const setD = (patch: Partial<AppSettings>) => {
    setDraft((prev) => prev ? { ...prev, ...patch } : prev);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const top = el.offsetTop - 20;
      container.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveNav(id);
  };

  const handleAddKiosk = async () => {
    if (!newKioskName.trim()) return;
    setAddingKiosk(true);
    try {
      await adminApi.createKiosk({ name: newKioskName.trim(), location: newKioskLocation.trim() || undefined });
      const updated = await adminApi.listKiosks();
      setKiosks(updated);
      setNewKioskName('');
      setNewKioskLocation('');
      setAddKioskOpen(false);
    } catch {
      showToast('키오스크 추가에 실패했어요', true);
    } finally {
      setAddingKiosk(false);
    }
  };

  const addFlexDept = () => {
    const val = deptInput.trim();
    if (!val || !draft) return;
    if (draft.flexible_departments.includes(val)) { setDeptInput(''); return; }
    setD({ flexible_departments: [...draft.flexible_departments, val] });
    setDeptInput('');
  };

  const removeFlexDept = (d: string) => {
    if (!draft) return;
    setD({ flexible_departments: draft.flexible_departments.filter((x) => x !== d) });
  };

  const filteredKiosks = kiosks.filter((k) => {
    const q = kioskSearch.toLowerCase();
    return !q || k.name.toLowerCase().includes(q) || (k.ip_addr ?? '').includes(q) || k.id.toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: AX_GRAY_50, fontFamily: 'var(--font-body)' }}>
        <AdminTopBar title="설정" subtitle="키오스크, 인식, 출퇴근 정책을 한곳에서 관리해요" />
        <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px 40px', display: 'flex', gap: 24 }}>
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {NAV_ITEMS.map((_, i) => <Skeleton key={i} height={38} borderRadius={10} />)}
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {[200, 160, 220, 180].map((h, i) => (
              <div key={i} style={{ background: '#fff', border: `1px solid ${AX_GRAY_200}`, borderRadius: 16, marginBottom: 20, padding: 24 }}>
                <Skeleton height={18} width={120} borderRadius={4} style={{ marginBottom: 20 }} />
                <Skeleton height={h} borderRadius={8} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !draft) {
    return (
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: AX_GRAY_50, fontFamily: 'var(--font-body)' }}>
        <AdminTopBar title="설정" subtitle="키오스크, 인식, 출퇴근 정책을 한곳에서 관리해요" />
        <EmptyState message="설정을 불러올 수 없어요" onRetry={load} />
      </div>
    );
  }

  const sliderPct = ((draft.recognition_threshold - 0.5) / (0.99 - 0.5)) * 100;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: AX_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="설정"
        subtitle="키오스크, 인식, 출퇴근 정책을 한곳에서 관리해요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={handleCancel}
              disabled={!isDirty}
              style={{ height: 40, padding: '0 18px', borderRadius: 10, border: `1px solid ${AX_GRAY_200}`, background: '#fff', color: isDirty ? AX_GRAY_700 : AX_GRAY_500, fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: isDirty ? 'pointer' : 'not-allowed', opacity: isDirty ? 1 : 0.5 }}
            >
              변경 취소
            </button>
            <button
              onClick={handleSave}
              disabled={!isDirty || saving}
              style={{ height: 40, padding: '0 18px', borderRadius: 10, border: 0, background: isDirty ? AX_BLUE : AX_GRAY_500, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: isDirty && !saving ? 'pointer' : 'not-allowed', opacity: isDirty ? 1 : 0.5 }}
            >
              {saving ? '저장 중...' : '저장'}
            </button>
          </div>
        }
      />

      {/* Body */}
      <div ref={scrollRef} style={{ flex: 1, overflow: 'auto', padding: '28px 32px 40px', display: 'flex', gap: 24 }}>
        {/* Side nav */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 0 }}>
            {NAV_ITEMS.map((s) => {
              const active = activeNav === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{ padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: active ? 700 : 600, color: active ? AX_BLUE : AX_GRAY_600, background: active ? AX_BLUE_WEAK : 'transparent', cursor: 'pointer' }}
                >
                  {s.l}
                </div>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 820 }}>

          {/* --- 조직 정보 (V2 placeholder) --- */}
          <div id="section-org">
            <AxSettingsCard title="조직 정보">
              <div style={{ padding: '32px 24px', textAlign: 'center', color: AX_GRAY_500, fontSize: 14 }}>
                조직 정보 설정은 다음 업데이트에서 추가됩니다.
              </div>
            </AxSettingsCard>
          </div>

          {/* --- Kiosks --- */}
          <div id="section-kiosks">
            <AxSettingsCard title="키오스크 위치">
              <div style={{ padding: '16px 24px', display: 'flex', gap: 12 }}>
                <div style={{ flex: 1, height: 40, background: AX_GRAY_100, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input
                    value={kioskSearch}
                    onChange={(e) => setKioskSearch(e.target.value)}
                    placeholder="키오스크 검색"
                    style={{ border: 'none', background: 'transparent', outline: 'none', flex: 1, fontSize: 13, color: AX_GRAY_900, fontFamily: 'inherit' }}
                  />
                </div>
                <button
                  onClick={() => setAddKioskOpen(true)}
                  style={{ height: 40, padding: '0 16px', borderRadius: 10, border: 0, background: AX_BLUE, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  추가
                </button>
              </div>

              {/* Add kiosk inline form */}
              {addKioskOpen && (
                <div style={{ margin: '0 16px 12px', padding: 16, background: AX_GRAY_50, borderRadius: 12, border: `1px solid ${AX_GRAY_200}` }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: AX_GRAY_900, marginBottom: 12 }}>새 키오스크 추가</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <input
                      value={newKioskName}
                      onChange={(e) => setNewKioskName(e.target.value)}
                      placeholder="이름 (예: 본사 1층 정문)"
                      style={{ flex: 1, height: 36, padding: '0 10px', border: `1px solid ${AX_GRAY_200}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                    />
                    <input
                      value={newKioskLocation}
                      onChange={(e) => setNewKioskLocation(e.target.value)}
                      placeholder="위치 (선택)"
                      style={{ flex: 1, height: 36, padding: '0 10px', border: `1px solid ${AX_GRAY_200}`, borderRadius: 8, fontSize: 13, fontFamily: 'inherit', outline: 'none' }}
                    />
                    <button
                      onClick={handleAddKiosk}
                      disabled={!newKioskName.trim() || addingKiosk}
                      style={{ height: 36, padding: '0 14px', borderRadius: 8, border: 0, background: AX_BLUE, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', opacity: newKioskName.trim() ? 1 : 0.5 }}
                    >
                      {addingKiosk ? '추가 중...' : '추가'}
                    </button>
                    <button
                      onClick={() => { setAddKioskOpen(false); setNewKioskName(''); setNewKioskLocation(''); }}
                      style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: '#fff', color: AX_GRAY_600, fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              )}

              {filteredKiosks.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: AX_GRAY_500, fontSize: 13, borderTop: `1px solid ${AX_GRAY_100}` }}>
                  등록된 키오스크가 없어요
                </div>
              ) : (
                filteredKiosks.map((k) => {
                  const online = k.is_active && k.last_seen_at
                    ? (Date.now() - new Date(k.last_seen_at).getTime()) < 5 * 60 * 1000
                    : k.is_active;
                  const statusLabel = online ? '온라인' : '오프라인';
                  const statusColor = online ? AX_GREEN : '#EF4452';
                  const statusBg = online ? 'rgba(0,123,51,.12)' : 'rgba(239,68,82,.12)';
                  return (
                    <div key={k.id} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderTop: `1px solid ${AX_GRAY_100}`, gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: AX_BLUE_WEAK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AX_BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: AX_GRAY_900 }}>{k.name}</div>
                        <div style={{ fontSize: 12, color: AX_GRAY_500, marginTop: 2 }}>
                          {k.id.slice(0, 8)} · {k.ip_addr ?? '—'} · 오늘 {k.today_events}건
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: statusBg, fontSize: 12, fontWeight: 700, color: statusColor }}>
                        <span style={{ width: 6, height: 6, borderRadius: 99, background: statusColor, display: 'inline-block' }} />
                        {statusLabel}
                      </div>
                      <button
                        onClick={() => alert('키오스크 관리 (V2): 다음 업데이트에서 추가됩니다')}
                        style={{ width: 32, height: 32, borderRadius: 8, border: 0, background: 'transparent', color: AX_GRAY_500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                      </button>
                    </div>
                  );
                })
              )}
            </AxSettingsCard>
          </div>

          {/* --- Recognition policy --- */}
          <div id="section-recognition">
            <AxSettingsCard title="인식 정책">
              <AxSettingsRow
                title="인식 임계값"
                desc="값이 높을수록 본인일 확률이 강해야 통과해요. 보통 0.85를 권장해요."
                control={
                  <div style={{ width: 280 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: AX_GRAY_500 }}>
                      <span>완화</span>
                      <span style={{ fontWeight: 700, color: AX_GRAY_900, fontSize: 14 }}>{draft.recognition_threshold.toFixed(2)}</span>
                      <span>엄격</span>
                    </div>
                    <div
                      style={{ height: 6, background: AX_GRAY_200, borderRadius: 99, position: 'relative', cursor: 'pointer' }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                        const val = +(0.5 + pct * (0.99 - 0.5)).toFixed(2);
                        setD({ recognition_threshold: val });
                      }}
                    >
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${sliderPct}%`, background: AX_BLUE, borderRadius: 99 }} />
                      <div style={{ position: 'absolute', left: `calc(${sliderPct}% - 9px)`, top: -6, width: 18, height: 18, borderRadius: 99, background: '#fff', border: `2px solid ${AX_BLUE}`, boxShadow: '0 1px 4px rgba(0,19,43,.15)' }} />
                    </div>
                  </div>
                }
              />
              <AxSettingsRow
                title="라이브니스 검사"
                desc="사진/영상 위조를 차단해요. 인식 시간이 약 0.3초 늘어나요."
                control={
                  <div onClick={() => setD({ liveness_check: !draft.liveness_check })}>
                    <AxToggle on={draft.liveness_check} />
                  </div>
                }
              />
              <AxSettingsRow
                title="중복 출근 방지"
                desc={`동일인이 ${draft.duplicate_prevent_minutes}분 내에 다시 인증되면 중복으로 처리해요.`}
                control={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <button
                      onClick={() => setD({ duplicate_prevent_minutes: Math.max(1, draft.duplicate_prevent_minutes - 1) })}
                      style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >−</button>
                    <div style={{ height: 36, background: AX_GRAY_100, borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: AX_GRAY_900, minWidth: 56, justifyContent: 'center' }}>
                      {draft.duplicate_prevent_minutes}
                    </div>
                    <button
                      onClick={() => setD({ duplicate_prevent_minutes: Math.min(60, draft.duplicate_prevent_minutes + 1) })}
                      style={{ width: 28, height: 28, borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: '#fff', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >+</button>
                    <span style={{ fontSize: 13, color: AX_GRAY_500, fontWeight: 600 }}>분</span>
                  </div>
                }
              />
            </AxSettingsCard>
          </div>

          {/* --- Attendance rules --- */}
          <div id="section-attendance">
            <AxSettingsCard title="출퇴근 규정">
              <AxSettingsRow
                title="기본 출근 시각"
                desc="이 시각 이후 출근은 '지각'으로 자동 분류돼요."
                control={
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                      type="time"
                      value={fmt5(draft.default_check_in_time)}
                      onChange={(e) => setD({ default_check_in_time: e.target.value })}
                      style={{ height: 36, padding: '0 10px', background: AX_GRAY_100, borderRadius: 8, border: 'none', fontSize: 14, fontWeight: 700, color: AX_GRAY_900, fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
                    />
                    <div style={{ height: 36, padding: '0 12px', background: AX_GRAY_100, borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 13, color: AX_GRAY_500, gap: 6 }}>
                      유예
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={draft.late_grace_minutes}
                        onChange={(e) => setD({ late_grace_minutes: Math.max(0, Math.min(30, Number(e.target.value))) })}
                        style={{ width: 36, border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, color: AX_GRAY_900, fontFamily: 'inherit', outline: 'none', textAlign: 'center' }}
                      />
                      분
                    </div>
                  </div>
                }
              />
              <AxSettingsRow
                title="자동 퇴근 처리"
                desc="설정한 시각까지 퇴근 인증이 없으면 마지막 활동 시각을 퇴근으로 기록해요."
                control={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <input
                      type="time"
                      value={fmt5(draft.auto_check_out_time)}
                      onChange={(e) => setD({ auto_check_out_time: e.target.value })}
                      style={{ height: 36, padding: '0 10px', background: AX_GRAY_100, borderRadius: 8, border: 'none', fontSize: 13, color: AX_GRAY_600, fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
                    />
                  </div>
                }
              />
              <AxSettingsRow
                title="유연근무 적용 부서"
                desc="해당 부서는 출근 시각 정책의 영향을 받지 않아요."
                control={
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 320 }}>
                    {draft.flexible_departments.map((d) => (
                      <span
                        key={d}
                        style={{ padding: '5px 10px', background: AX_BLUE_WEAK, color: AX_BLUE, borderRadius: 8, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
                        onClick={() => removeFlexDept(d)}
                      >
                        {d}
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      </span>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <input
                        value={deptInput}
                        onChange={(e) => setDeptInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') addFlexDept(); }}
                        placeholder="부서 추가"
                        style={{ width: 80, height: 30, padding: '0 8px', border: `1px dashed ${AX_GRAY_200}`, borderRadius: 8, fontSize: 12, fontFamily: 'inherit', outline: 'none', background: AX_GRAY_50 }}
                      />
                      <span
                        onClick={addFlexDept}
                        style={{ padding: '5px 10px', background: AX_GRAY_100, color: AX_GRAY_500, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}
                      >+</span>
                    </div>
                  </div>
                }
              />
            </AxSettingsCard>
          </div>

          {/* --- 알림 (V2 placeholder) --- */}
          <div id="section-notifications">
            <AxSettingsCard title="알림">
              <div style={{ padding: '32px 24px', textAlign: 'center', color: AX_GRAY_500, fontSize: 14 }}>
                알림 설정은 다음 업데이트에서 추가됩니다.
              </div>
            </AxSettingsCard>
          </div>

          {/* --- Privacy --- */}
          <div id="section-security">
            <AxSettingsCard title="보안 / 개인정보">
              <AxSettingsRow
                title="얼굴 데이터 보관 기간"
                desc="퇴사 후 자동으로 영구 삭제되는 기간이에요."
                control={
                  <div style={{ display: 'flex', gap: 8 }}>
                    {RETENTION_OPTIONS.map(({ label, value }) => {
                      const active = draft.retention_days === value;
                      return (
                        <div
                          key={value}
                          onClick={() => setD({ retention_days: value })}
                          style={{ padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${active ? AX_BLUE : AX_GRAY_200}`, background: active ? AX_BLUE_WEAK : '#fff', color: active ? AX_BLUE : AX_GRAY_700, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}
                        >
                          {label}
                        </div>
                      );
                    })}
                  </div>
                }
              />
              <AxSettingsRow
                title="얼굴 이미지 원본 저장 안 함"
                desc="얼굴 특징점 벡터만 저장하고 원본 이미지는 인식 후 즉시 폐기해요."
                control={
                  <div onClick={() => setD({ store_raw_images: !draft.store_raw_images })}>
                    <AxToggle on={!draft.store_raw_images} />
                  </div>
                }
              />
              <AxSettingsRow
                title="감사 로그 내보내기"
                desc="모든 관리자 조작 내역을 CSV로 다운로드할 수 있어요."
                control={
                  <button
                    onClick={() => alert('준비 중 — 다음 업데이트에서 추가됩니다')}
                    style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: '#fff', color: AX_GRAY_700, fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    CSV 다운로드
                  </button>
                }
              />
            </AxSettingsCard>
          </div>

          {/* --- 통합 / API (V2 placeholder) --- */}
          <div id="section-integrations">
            <AxSettingsCard title="통합 / API">
              <div style={{ padding: '32px 24px', textAlign: 'center', color: AX_GRAY_500, fontSize: 14 }}>
                통합 및 API 설정은 다음 업데이트에서 추가됩니다.
              </div>
            </AxSettingsCard>
          </div>

        </div>
      </div>

      {/* Toast */}
      <div id="settings-toast" style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 9999 }} />
    </div>
  );
}

// Simple toast helper
function showToast(msg: string, isError = false) {
  const container = document.getElementById('settings-toast');
  if (!container) return;
  const el = document.createElement('div');
  el.style.cssText = `
    padding: 12px 20px;
    background: ${isError ? '#EF4452' : '#191F28'};
    color: #fff;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 700;
    font-family: inherit;
    box-shadow: 0 4px 20px rgba(0,19,43,.18);
    opacity: 0;
    transition: opacity .2s;
    white-space: nowrap;
    pointer-events: none;
  `;
  el.textContent = msg;
  container.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '1'; });
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 220);
  }, 2500);
}
