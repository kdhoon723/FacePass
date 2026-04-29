// FacePass — Extra admin screens (Login + Settings)

const AX_BLUE = "#3182F6";
const AX_BLUE_WEAK = "#E8F2FE";
const AX_GRAY_900 = "#191F28";
const AX_GRAY_700 = "#333D4B";
const AX_GRAY_600 = "#4E5968";
const AX_GRAY_500 = "#6B7683";
const AX_GRAY_400 = "#8B95A1";
const AX_GRAY_300 = "#B0B8C1";
const AX_GRAY_200 = "#E5E8EB";
const AX_GRAY_100 = "#F2F4F6";
const AX_GRAY_50  = "#F9FAFB";
const AX_GREEN = "#007B33";

const axFont = `var(--font-body)`;

// ──────────────────────────────────────────────────────────────
// Admin · Login
// ──────────────────────────────────────────────────────────────
function AdminLogin() {
  return (
    <div style={{ width: 1440, height: 900, display: "flex", fontFamily: axFont, color: AX_GRAY_900, overflow: "hidden", borderRadius: 12 }}>
      {/* Left brand panel */}
      <div style={{ flex: "0 0 580px", background: "linear-gradient(160deg, #1858CC 0%, #3182F6 60%, #5BA0FF 100%)", color: "#fff", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", padding: "56px 56px 48px" }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", top: -120, right: -80, width: 400, height: 400, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,.18) 0%, rgba(255,255,255,0) 70%)" }} />
        <div style={{ position: "absolute", bottom: -160, left: -120, width: 460, height: 460, borderRadius: 999, background: "radial-gradient(circle, rgba(255,255,255,.10) 0%, rgba(255,255,255,0) 70%)" }} />

        {/* Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
          <svg width="44" height="44" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="2" width="28" height="28" rx="9" fill="#fff" />
            <circle cx="16" cy="13" r="4" fill={AX_BLUE} />
            <path d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5" stroke={AX_BLUE} strokeWidth="2.4" strokeLinecap="round" />
          </svg>
          <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em" }}>FacePass</div>
        </div>

        {/* Hero copy */}
        <div style={{ marginTop: "auto", position: "relative" }}>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.25 }}>
            출근부터 보고서까지,{"\n"}얼굴 한 번이면 끝나요
          </div>
          <div style={{ marginTop: 18, fontSize: 16, color: "rgba(255,255,255,.85)", lineHeight: 1.6, maxWidth: 420 }}>
            FacePass 관리자 콘솔에서 직원 등록, 실시간 출석 현황,
            월간 리포트를 한곳에서 관리하세요.
          </div>

          {/* Stats strip */}
          <div style={{ marginTop: 36, display: "flex", gap: 32 }}>
            {[
              { v: "284", l: "등록 직원" },
              { v: "98.4%", l: "이번 달 정시율" },
              { v: "1.2초", l: "평균 인식 시간" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em" }}>{s.v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.7)", marginTop: 2 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right login panel */}
      <div style={{ flex: 1, background: "#fff", display: "flex", flexDirection: "column", padding: "40px 56px" }}>
        {/* Top utility */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 14, fontSize: 13, color: AX_GRAY_500 }}>
          <span>도움이 필요하신가요?</span>
          <a style={{ color: AX_BLUE, fontWeight: 700, textDecoration: "none" }}>고객센터</a>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: 420, width: "100%", margin: "0 auto" }}>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.25 }}>
            관리자 로그인
          </div>
          <div style={{ marginTop: 8, fontSize: 15, color: AX_GRAY_500, lineHeight: 1.5 }}>
            가입한 회사 이메일로 로그인해주세요
          </div>

          {/* Primary SSO */}
          <button style={{ marginTop: 32, width: "100%", height: 56, borderRadius: 14, border: 0, background: AX_GRAY_900, color: "#fff", fontSize: 15, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            회사 계정(SSO)으로 로그인
          </button>

          <div style={{ marginTop: 12, fontSize: 12, color: AX_GRAY_500, textAlign: "center" }}>
            Google Workspace · Microsoft 365 · Okta 지원
          </div>

          {/* Divider */}
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1, height: 1, background: AX_GRAY_200 }} />
            <div style={{ fontSize: 12, color: AX_GRAY_400, fontWeight: 600 }}>또는</div>
            <div style={{ flex: 1, height: 1, background: AX_GRAY_200 }} />
          </div>

          {/* Email field */}
          <div style={{ marginTop: 24 }}>
            <div style={{ fontSize: 13, color: AX_GRAY_600, fontWeight: 600, marginBottom: 8 }}>업무 이메일</div>
            <div style={{ height: 56, background: AX_GRAY_100, borderRadius: 12, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, border: `1.5px solid ${AX_BLUE}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 500, color: AX_GRAY_900 }}>
                soomin.lee<span style={{ color: AX_GRAY_400 }}>@your-company.com</span>
              </div>
            </div>
          </div>

          {/* Password field */}
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ fontSize: 13, color: AX_GRAY_600, fontWeight: 600 }}>비밀번호</div>
              <a style={{ fontSize: 13, color: AX_BLUE, fontWeight: 600, textDecoration: "none", cursor: "pointer" }}>비밀번호 찾기</a>
            </div>
            <div style={{ height: 56, background: AX_GRAY_100, borderRadius: 12, display: "flex", alignItems: "center", padding: "0 16px", gap: 10, border: `1.5px solid ${AX_GRAY_200}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              <div style={{ flex: 1, fontSize: 18, color: AX_GRAY_900, letterSpacing: "0.2em" }}>••••••••••</div>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
          </div>

          {/* Remember + Magic link */}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: AX_GRAY_700, fontWeight: 600, cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, background: AX_BLUE, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              로그인 상태 유지
            </label>
            <a style={{ fontSize: 13, color: AX_GRAY_500, fontWeight: 600, textDecoration: "none", cursor: "pointer" }}>
              매직 링크로 받기 →
            </a>
          </div>

          {/* Submit */}
          <button style={{ marginTop: 24, width: "100%", height: 56, borderRadius: 14, border: 0, background: AX_BLUE, color: "#fff", fontSize: 16, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
            로그인
          </button>

          {/* Footnote */}
          <div style={{ marginTop: 24, fontSize: 12, color: AX_GRAY_500, textAlign: "center", lineHeight: 1.5 }}>
            계속 진행하면 <a style={{ color: AX_GRAY_700, fontWeight: 600 }}>이용약관</a>과
            {" "}<a style={{ color: AX_GRAY_700, fontWeight: 600 }}>개인정보처리방침</a>에 동의하는 것으로 간주됩니다
          </div>
        </div>

        {/* Bottom */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: AX_GRAY_400 }}>
          <div>© 2026 FacePass</div>
          <div style={{ display: "flex", gap: 16 }}>
            <span>v2.4.1</span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: AX_GREEN }} />
              모든 시스템 정상
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Admin · Settings (mini sidebar — independent of main admin file)
// ──────────────────────────────────────────────────────────────
function AxSidebar({ active = "settings" }) {
  const items = [
    { key: "dashboard", label: "대시보드", icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /> },
    { key: "records", label: "출석 기록", icon: <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" /> },
    { key: "reports", label: "리포트", icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" /> },
    { key: "employees", label: "직원 관리", icon: <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /> },
    { key: "settings", label: "설정", icon: <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65a.5.5 0 00.12-.64l-2-3.46a.5.5 0 00-.61-.22l-2.49 1a7.03 7.03 0 00-1.69-.98l-.38-2.65A.5.5 0 0014 2h-4a.5.5 0 00-.5.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1a.5.5 0 00-.61.22l-2 3.46a.5.5 0 00.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65a.5.5 0 00-.12.64l2 3.46a.5.5 0 00.61.22l2.49-1c.52.39 1.08.73 1.69.98l.38 2.65a.5.5 0 00.5.42h4a.5.5 0 00.5-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1a.5.5 0 00.61-.22l2-3.46a.5.5 0 00-.12-.64l-2.11-1.65zM12 15.5a3.5 3.5 0 110-7 3.5 3.5 0 010 7z" /> },
  ];
  return (
    <div style={{ width: 240, background: "#fff", borderRight: `1px solid ${AX_GRAY_200}`, display: "flex", flexDirection: "column", padding: "20px 14px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px 24px" }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="2" y="2" width="28" height="28" rx="9" fill={AX_BLUE} />
          <circle cx="16" cy="13" r="4" fill="#fff" />
          <path d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }}>FacePass</div>
          <div style={{ fontSize: 11, color: AX_GRAY_500, fontWeight: 600 }}>Admin Console</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map(item => {
          const isActive = item.key === active;
          return (
            <div key={item.key} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: isActive ? AX_BLUE_WEAK : "transparent", color: isActive ? AX_BLUE : AX_GRAY_700, fontWeight: isActive ? 700 : 600, fontSize: 14, cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">{item.icon}</svg>
              {item.label}
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: "auto", padding: "12px 10px", display: "flex", alignItems: "center", gap: 10, borderTop: `1px solid ${AX_GRAY_200}` }}>
        <div style={{ width: 32, height: 32, borderRadius: 99, background: "linear-gradient(135deg,#FFCCA8,#FFB582)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#6E4944" }}>수</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: AX_GRAY_900 }}>이수민</div>
          <div style={{ fontSize: 11, color: AX_GRAY_500 }}>HR · 관리자</div>
        </div>
      </div>
    </div>
  );
}

function AxToggle({ on = false }) {
  return (
    <div style={{ width: 44, height: 26, borderRadius: 99, background: on ? AX_BLUE : AX_GRAY_300, display: "flex", alignItems: "center", padding: 3, justifyContent: on ? "flex-end" : "flex-start", cursor: "pointer", transition: "all .2s" }}>
      <div style={{ width: 20, height: 20, borderRadius: 99, background: "#fff", boxShadow: "0 1px 3px rgba(0,19,43,.2)" }} />
    </div>
  );
}

function AxSettingsRow({ title, desc, control }) {
  return (
    <div style={{ display: "flex", alignItems: "center", padding: "20px 24px", borderBottom: `1px solid ${AX_GRAY_100}` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: AX_GRAY_900 }}>{title}</div>
        {desc && <div style={{ fontSize: 13, color: AX_GRAY_500, marginTop: 4, lineHeight: 1.5, maxWidth: 540 }}>{desc}</div>}
      </div>
      <div style={{ flexShrink: 0, marginLeft: 24 }}>{control}</div>
    </div>
  );
}

function AxSettingsCard({ title, children }) {
  return (
    <div style={{ background: "#fff", border: `1px solid ${AX_GRAY_200}`, borderRadius: 16, overflow: "hidden", marginBottom: 20 }}>
      <div style={{ padding: "16px 24px", borderBottom: `1px solid ${AX_GRAY_100}`, fontSize: 13, color: AX_GRAY_500, fontWeight: 700, letterSpacing: "0.02em", textTransform: "uppercase" }}>
        {title}
      </div>
      {children}
    </div>
  );
}

function AdminSettings() {
  return (
    <div style={{ width: 1440, height: 900, display: "flex", background: AX_GRAY_50, fontFamily: axFont, color: AX_GRAY_900, overflow: "hidden", borderRadius: 12 }}>
      <AxSidebar active="settings" />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ height: 72, background: "#fff", borderBottom: `1px solid ${AX_GRAY_200}`, display: "flex", alignItems: "center", padding: "0 32px", gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>설정</div>
            <div style={{ fontSize: 13, color: AX_GRAY_500, marginTop: 2 }}>키오스크, 인식, 출퇴근 정책을 한곳에서 관리해요</div>
          </div>
          <button style={{ height: 40, padding: "0 18px", borderRadius: 10, border: `1px solid ${AX_GRAY_200}`, background: "#fff", color: AX_GRAY_700, fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>변경 취소</button>
          <button style={{ height: 40, padding: "0 18px", borderRadius: 10, border: 0, background: AX_BLUE, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>저장</button>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflow: "auto", padding: "28px 32px 40px", display: "flex", gap: 24 }}>
          {/* Side nav */}
          <div style={{ width: 220, flexShrink: 0 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, position: "sticky", top: 0 }}>
              {[
                { l: "조직 정보", active: false },
                { l: "키오스크 위치", active: true },
                { l: "인식 정책", active: false },
                { l: "출퇴근 규정", active: false },
                { l: "알림", active: false },
                { l: "보안 / 개인정보", active: false },
                { l: "통합 / API", active: false },
              ].map((s, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: s.active ? 700 : 600, color: s.active ? AX_BLUE : AX_GRAY_600, background: s.active ? AX_BLUE_WEAK : "transparent", cursor: "pointer" }}>
                  {s.l}
                </div>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ flex: 1, minWidth: 0, maxWidth: 820 }}>
            {/* Kiosks */}
            <AxSettingsCard title="키오스크 위치">
              <div style={{ padding: "16px 24px", display: "flex", gap: 12 }}>
                <div style={{ flex: 1, height: 40, background: AX_GRAY_100, borderRadius: 10, display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={AX_GRAY_500} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <div style={{ fontSize: 13, color: AX_GRAY_500 }}>키오스크 검색</div>
                </div>
                <button style={{ height: 40, padding: "0 16px", borderRadius: 10, border: 0, background: AX_BLUE, color: "#fff", fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                  추가
                </button>
              </div>
              {[
                { name: "본사 7층 라운지", id: "KIO-001", status: "online", events: "오늘 124건", ip: "10.0.4.122" },
                { name: "본사 1층 정문", id: "KIO-002", status: "online", events: "오늘 287건", ip: "10.0.4.121" },
                { name: "판교 R&D 3층", id: "KIO-003", status: "offline", events: "어제 마지막 동기화", ip: "10.0.7.18" },
              ].map((k, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderTop: `1px solid ${AX_GRAY_100}`, gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: AX_BLUE_WEAK, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AX_BLUE} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: AX_GRAY_900 }}>{k.name}</div>
                    <div style={{ fontSize: 12, color: AX_GRAY_500, marginTop: 2 }}>{k.id} · {k.ip} · {k.events}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 999, background: k.status === "online" ? "rgba(0,123,51,.12)" : "rgba(239,68,82,.12)", fontSize: 12, fontWeight: 700, color: k.status === "online" ? AX_GREEN : "#EF4452" }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: k.status === "online" ? AX_GREEN : "#EF4452" }} />
                    {k.status === "online" ? "온라인" : "오프라인"}
                  </div>
                  <button style={{ width: 32, height: 32, borderRadius: 8, border: 0, background: "transparent", color: AX_GRAY_500, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12, color: AX_GRAY_500 }}>
                      <span>완화</span>
                      <span style={{ fontWeight: 700, color: AX_GRAY_900, fontSize: 14 }}>0.85</span>
                      <span>엄격</span>
                    </div>
                    <div style={{ height: 6, background: AX_GRAY_200, borderRadius: 99, position: "relative" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "70%", background: AX_BLUE, borderRadius: 99 }} />
                      <div style={{ position: "absolute", left: "calc(70% - 9px)", top: -6, width: 18, height: 18, borderRadius: 99, background: "#fff", border: `2px solid ${AX_BLUE}`, boxShadow: "0 1px 4px rgba(0,19,43,.15)" }} />
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
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ height: 36, background: AX_GRAY_100, borderRadius: 8, padding: "0 12px", display: "flex", alignItems: "center", fontSize: 14, fontWeight: 700, color: AX_GRAY_900, minWidth: 56, justifyContent: "center" }}>5</div>
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
                  <div style={{ display: "flex", gap: 8 }}>
                    <div style={{ height: 36, padding: "0 12px", background: AX_GRAY_100, borderRadius: 8, display: "flex", alignItems: "center", fontSize: 14, fontWeight: 700 }}>09:00</div>
                    <div style={{ height: 36, padding: "0 12px", background: AX_GRAY_100, borderRadius: 8, display: "flex", alignItems: "center", fontSize: 13, color: AX_GRAY_500, gap: 6 }}>
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
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end", maxWidth: 320 }}>
                    {["엔지니어링", "프로덕트 디자인", "데이터"].map((d, i) => (
                      <span key={i} style={{ padding: "5px 10px", background: AX_BLUE_WEAK, color: AX_BLUE, borderRadius: 8, fontSize: 12, fontWeight: 700 }}>{d}</span>
                    ))}
                    <span style={{ padding: "5px 10px", background: AX_GRAY_100, color: AX_GRAY_500, borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>+ 추가</span>
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
                  <div style={{ display: "flex", gap: 8 }}>
                    {["30일", "90일", "1년"].map((p, i) => (
                      <div key={i} style={{ padding: "8px 14px", borderRadius: 10, border: `1.5px solid ${i === 0 ? AX_BLUE : AX_GRAY_200}`, background: i === 0 ? AX_BLUE_WEAK : "#fff", color: i === 0 ? AX_BLUE : AX_GRAY_700, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{p}</div>
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
                  <button style={{ height: 36, padding: "0 14px", borderRadius: 8, border: `1px solid ${AX_GRAY_200}`, background: "#fff", color: AX_GRAY_700, fontSize: 13, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    CSV 다운로드
                  </button>
                }
              />
            </AxSettingsCard>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { AdminLogin, AdminSettings });
