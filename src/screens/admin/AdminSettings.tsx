import AdminTopBar from './_components/AdminTopBar';
import AxSettingsCard from './_components/AxSettingsCard';
import AxSettingsRow from './_components/AxSettingsRow';
import AxToggle from './_components/AxToggle';

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

export default function AdminSettings() {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: AX_GRAY_50, fontFamily: 'var(--font-body)' }}>
      <AdminTopBar
        title="설정"
        subtitle="키오스크, 인식, 출퇴근 정책을 한곳에서 관리해요"
        action={
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ height: 40, padding: '0 18px', borderRadius: 10, border: `1px solid ${AX_GRAY_200}`, background: '#fff', color: AX_GRAY_700, fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>변경 취소</button>
            <button style={{ height: 40, padding: '0 18px', borderRadius: 10, border: 0, background: AX_BLUE, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer' }}>저장</button>
          </div>
        }
      />

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '28px 32px 40px', display: 'flex', gap: 24 }}>
        {/* Side nav */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, position: 'sticky', top: 0 }}>
            {[
              { l: '조직 정보', active: false },
              { l: '키오스크 위치', active: true },
              { l: '인식 정책', active: false },
              { l: '출퇴근 규정', active: false },
              { l: '알림', active: false },
              { l: '보안 / 개인정보', active: false },
              { l: '통합 / API', active: false },
            ].map((s, i) => (
              <div key={i} style={{ padding: '10px 14px', borderRadius: 10, fontSize: 13, fontWeight: s.active ? 700 : 600, color: s.active ? AX_BLUE : AX_GRAY_600, background: s.active ? AX_BLUE_WEAK : 'transparent', cursor: 'pointer' }}>
                {s.l}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div style={{ flex: 1, minWidth: 0, maxWidth: 820 }}>
          {/* Kiosks */}
          <AxSettingsCard title="키오스크 위치">
            <div style={{ padding: '16px 24px', display: 'flex', gap: 12 }}>
              <div style={{ flex: 1, height: 40, background: AX_GRAY_100, borderRadius: 10, display: 'flex', alignItems: 'center', padding: '0 14px', gap: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <div style={{ fontSize: 13, color: AX_GRAY_500 }}>키오스크 검색</div>
              </div>
              <button style={{ height: 40, padding: '0 16px', borderRadius: 10, border: 0, background: AX_BLUE, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                추가
              </button>
            </div>
            {[
              { name: '본사 7층 라운지', id: 'KIO-001', status: 'online', events: '오늘 124건', ip: '10.0.4.122' },
              { name: '본사 1층 정문', id: 'KIO-002', status: 'online', events: '오늘 287건', ip: '10.0.4.121' },
              { name: '판교 R&D 3층', id: 'KIO-003', status: 'offline', events: '어제 마지막 동기화', ip: '10.0.7.18' },
            ].map((k, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 24px', borderTop: `1px solid ${AX_GRAY_100}`, gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: AX_BLUE_WEAK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AX_BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: AX_GRAY_900 }}>{k.name}</div>
                  <div style={{ fontSize: 12, color: AX_GRAY_500, marginTop: 2 }}>{k.id} · {k.ip} · {k.events}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: k.status === 'online' ? 'rgba(0,123,51,.12)' : 'rgba(239,68,82,.12)', fontSize: 12, fontWeight: 700, color: k.status === 'online' ? AX_GREEN : '#EF4452' }}>
                  <span style={{ width: 6, height: 6, borderRadius: 99, background: k.status === 'online' ? AX_GREEN : '#EF4452', display: 'inline-block' }} />
                  {k.status === 'online' ? '온라인' : '오프라인'}
                </div>
                <button style={{ width: 32, height: 32, borderRadius: 8, border: 0, background: 'transparent', color: AX_GRAY_500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                </button>
              </div>
            ))}
          </AxSettingsCard>

          {/* Recognition policy */}
          <AxSettingsCard title="인식 정책">
            <AxSettingsRow
              title="인식 임계값"
              desc="값이 높을수록 본인일 확률이 강해야 통과해요. 보통 0.85를 권장해요."
              control={
                <div style={{ width: 280 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 12, color: AX_GRAY_500 }}>
                    <span>완화</span>
                    <span style={{ fontWeight: 700, color: AX_GRAY_900, fontSize: 14 }}>0.85</span>
                    <span>엄격</span>
                  </div>
                  <div style={{ height: 6, background: AX_GRAY_200, borderRadius: 99, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '70%', background: AX_BLUE, borderRadius: 99 }} />
                    <div style={{ position: 'absolute', left: 'calc(70% - 9px)', top: -6, width: 18, height: 18, borderRadius: 99, background: '#fff', border: `2px solid ${AX_BLUE}`, boxShadow: '0 1px 4px rgba(0,19,43,.15)' }} />
                  </div>
                </div>
              }
            />
            <AxSettingsRow
              title="라이브니스 검사"
              desc="사진/영상 위조를 차단해요. 인식 시간이 약 0.3초 늘어나요."
              control={<AxToggle on={true} />}
            />
            <AxSettingsRow
              title="중복 출근 방지"
              desc="동일인이 5분 내에 다시 인증되면 중복으로 처리해요."
              control={
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ height: 36, background: AX_GRAY_100, borderRadius: 8, padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700, color: AX_GRAY_900, minWidth: 56, justifyContent: 'center' }}>5</div>
                  <span style={{ fontSize: 13, color: AX_GRAY_500, fontWeight: 600 }}>분</span>
                </div>
              }
            />
          </AxSettingsCard>

          {/* Attendance rules */}
          <AxSettingsCard title="출퇴근 규정">
            <AxSettingsRow
              title="기본 출근 시각"
              desc="이 시각 이후 출근은 '지각'으로 자동 분류돼요."
              control={
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ height: 36, padding: '0 12px', background: AX_GRAY_100, borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 14, fontWeight: 700 }}>09:00</div>
                  <div style={{ height: 36, padding: '0 12px', background: AX_GRAY_100, borderRadius: 8, display: 'flex', alignItems: 'center', fontSize: 13, color: AX_GRAY_500, gap: 6 }}>
                    유예 <span style={{ fontWeight: 700, color: AX_GRAY_900 }}>10분</span>
                  </div>
                </div>
              }
            />
            <AxSettingsRow
              title="자동 퇴근 처리"
              desc="당일 23:00까지 퇴근 인증이 없으면 마지막 활동 시각을 퇴근으로 기록해요."
              control={<AxToggle on={true} />}
            />
            <AxSettingsRow
              title="유연근무 적용 부서"
              desc="해당 부서는 출근 시각 정책의 영향을 받지 않아요."
              control={
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 320 }}>
                  {['엔지니어링', '프로덕트 디자인', '데이터'].map((d, i) => (
                    <span key={i} style={{ padding: '5px 10px', background: AX_BLUE_WEAK, color: AX_BLUE, borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{d}</span>
                  ))}
                  <span style={{ padding: '5px 10px', background: AX_GRAY_100, color: AX_GRAY_500, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>+ 추가</span>
                </div>
              }
            />
          </AxSettingsCard>

          {/* Privacy */}
          <AxSettingsCard title="보안 / 개인정보">
            <AxSettingsRow
              title="얼굴 데이터 보관 기간"
              desc="퇴사 후 자동으로 영구 삭제되는 기간이에요."
              control={
                <div style={{ display: 'flex', gap: 8 }}>
                  {['30일', '90일', '1년'].map((p, i) => (
                    <div key={i} style={{ padding: '8px 14px', borderRadius: 10, border: `1.5px solid ${i === 0 ? AX_BLUE : AX_GRAY_200}`, background: i === 0 ? AX_BLUE_WEAK : '#fff', color: i === 0 ? AX_BLUE : AX_GRAY_700, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{p}</div>
                  ))}
                </div>
              }
            />
            <AxSettingsRow
              title="얼굴 이미지 원본 저장 안 함"
              desc="얼굴 특징점 벡터만 저장하고 원본 이미지는 인식 후 즉시 폐기해요."
              control={<AxToggle on={true} />}
            />
            <AxSettingsRow
              title="감사 로그 내보내기"
              desc="모든 관리자 조작 내역을 CSV로 다운로드할 수 있어요."
              control={
                <button style={{ height: 36, padding: '0 14px', borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: '#fff', color: AX_GRAY_700, fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  CSV 다운로드
                </button>
              }
            />
          </AxSettingsCard>
        </div>
      </div>
    </div>
  );
}
