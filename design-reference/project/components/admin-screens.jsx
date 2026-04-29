// FacePass — Admin desktop screens (Toss design system)
// Three views: Dashboard, Records search, Reports

const A_BLUE = "#3182F6";
const A_BLUE_WEAK = "#E8F2FE";
const A_BLUE_PRESSED = "#2365CF";
const A_GRAY_900 = "#191F28";
const A_GRAY_700 = "#333D4B";
const A_GRAY_600 = "#4E5968";
const A_GRAY_500 = "#6B7683";
const A_GRAY_400 = "#8B95A1";
const A_GRAY_300 = "#B0B8C1";
const A_GRAY_200 = "#E5E8EB";
const A_GRAY_100 = "#F2F4F6";
const A_GRAY_50  = "#F9FAFB";
const A_GREEN = "#007B33";
const A_RED = "#EF4452";
const A_YELLOW = "#FFC84D";
const A_ORANGE = "#FF9000";

const adminFont = `var(--font-body)`;

// ──────────────────────────────────────────────────────────────
// Sidebar
// ──────────────────────────────────────────────────────────────
function AdminSidebar({ active = "dashboard" }) {
  const items = [
    { key: "dashboard", label: "대시보드", icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" /> },
    { key: "records", label: "출석 기록", icon: <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zM8 17H5v-2h3v2zm0-4H5v-2h3v2zm0-4H5V7h3v2zm5 8h-3v-2h3v2zm0-4h-3v-2h3v2zm0-4h-3V7h3v2zm6 8h-4v-2h4v2zm0-4h-4v-2h4v2zm0-4h-4V7h4v2z" /> },
    { key: "reports", label: "리포트", icon: <path d="M5 9.2h3v8H5zM10.6 5h2.8v12h-2.8zM16.2 13h2.8v4h-2.8z" /> },
    { key: "employees", label: "직원 관리", icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" /> },
    { key: "settings", label: "설정", icon: <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" /> },
  ];
  return (
    <aside style={{ width: 232, background: "#fff", borderRight: `1px solid ${A_GRAY_200}`, display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px 24px" }}>
        <svg width="30" height="30" viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="9" fill={A_BLUE}/><circle cx="16" cy="13" r="4" fill="#fff"/><path d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" fill="none"/></svg>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>FacePass</div>
          <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600, marginTop: 1 }}>Admin Console</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {items.map(it => {
          const isActive = it.key === active;
          return (
            <div key={it.key} style={{
              display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10,
              background: isActive ? A_BLUE_WEAK : "transparent",
              color: isActive ? A_BLUE : A_GRAY_600,
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">{it.icon}</svg>
              <span>{it.label}</span>
              {it.key === "records" && (
                <span style={{ marginLeft: "auto", padding: "2px 8px", background: isActive ? "#fff" : A_GRAY_100, color: A_BLUE, borderRadius: 999, fontSize: 11, fontWeight: 700 }}>3</span>
              )}
            </div>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Help card */}
      <div style={{ padding: 16, background: A_GRAY_100, borderRadius: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>도움이 필요하세요?</div>
        <div style={{ fontSize: 12, color: A_GRAY_600, marginTop: 4, lineHeight: 1.45 }}>
          IT 헬프데스크에{"\n"}문의해주세요
        </div>
        <button style={{ marginTop: 10, width: "100%", height: 32, borderRadius: 8, background: "#fff", color: A_BLUE, fontSize: 12, fontWeight: 700, border: 0, cursor: "pointer" }}>
          문의하기
        </button>
      </div>

      {/* Profile */}
      <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 12 }}>
        <div style={{ width: 32, height: 32, borderRadius: 99, background: "linear-gradient(135deg,#FFCCA8,#FFB582)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#6E4944" }}>이</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>이수민</div>
          <div style={{ fontSize: 11, color: A_GRAY_500 }}>HR 매니저</div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A_GRAY_400} strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
      </div>
    </aside>
  );
}

// ──────────────────────────────────────────────────────────────
// Top bar
// ──────────────────────────────────────────────────────────────
function AdminTopBar({ title, subtitle, action }) {
  return (
    <div style={{ height: 72, background: "#fff", borderBottom: `1px solid ${A_GRAY_200}`, display: "flex", alignItems: "center", padding: "0 32px", gap: 24 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: A_GRAY_100, borderRadius: 10, fontSize: 13, color: A_GRAY_600, width: 280 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>직원, 부서, 사번 검색…</span>
        <span style={{ marginLeft: "auto", padding: "2px 6px", background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 5, fontSize: 11, color: A_GRAY_400 }}>⌘K</span>
      </div>
      <button style={{ width: 40, height: 40, borderRadius: 10, background: A_GRAY_100, border: 0, cursor: "pointer", color: A_GRAY_600, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
        <div style={{ position: "absolute", top: 8, right: 9, width: 8, height: 8, borderRadius: 99, background: A_RED, border: "2px solid #fff" }} />
      </button>
      {action}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Stat tile
// ──────────────────────────────────────────────────────────────
function StatTile({ label, value, suffix, delta, color = A_BLUE, icon, sub }) {
  return (
    <div style={{ flex: 1, background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 20, minWidth: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: color + "1A", color, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {icon}
        </div>
        {delta && (
          <div style={{ fontSize: 12, fontWeight: 700, padding: "3px 8px", borderRadius: 999, background: delta.startsWith("+") ? "rgba(0,123,51,.1)" : "rgba(239,68,82,.1)", color: delta.startsWith("+") ? A_GREEN : A_RED }}>
            {delta}
          </div>
        )}
      </div>
      <div style={{ marginTop: 16, fontSize: 13, color: A_GRAY_500, fontWeight: 600 }}>{label}</div>
      <div style={{ marginTop: 4, display: "flex", alignItems: "baseline", gap: 4 }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
        {suffix && <div style={{ fontSize: 15, color: A_GRAY_500, fontWeight: 600 }}>{suffix}</div>}
      </div>
      {sub && <div style={{ marginTop: 4, fontSize: 12, color: A_GRAY_500 }}>{sub}</div>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Hourly check-in chart (sparkline + bars)
// ──────────────────────────────────────────────────────────────
function HourlyChart() {
  const data = [
    { h: "07", v: 8 }, { h: "08", v: 24 }, { h: "08:30", v: 56, peak: true }, { h: "09", v: 42 },
    { h: "09:30", v: 18 }, { h: "10", v: 6 }, { h: "10:30", v: 3 }, { h: "11", v: 1 },
  ];
  const max = 60;
  return (
    <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>시간대별 출근 분포</div>
          <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 · 30분 단위</div>
        </div>
        <div style={{ display: "flex", gap: 6, padding: 4, background: A_GRAY_100, borderRadius: 10 }}>
          {["오늘", "이번 주", "이번 달"].map((t, i) => (
            <div key={t} style={{ padding: "6px 12px", borderRadius: 7, fontSize: 13, fontWeight: 700, background: i === 0 ? "#fff" : "transparent", color: i === 0 ? A_GRAY_900 : A_GRAY_500, boxShadow: i === 0 ? "0 1px 2px rgba(0,19,43,.06)" : "none", cursor: "pointer" }}>{t}</div>
          ))}
        </div>
      </div>

      {/* Bars */}
      <div style={{ marginTop: 28, display: "flex", alignItems: "flex-end", gap: 14, height: 180 }}>
        {data.map((d, i) => {
          const h = (d.v / max) * 160;
          return (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative" }}>
              {d.peak && (
                <div style={{ position: "absolute", top: -28, padding: "4px 8px", background: A_GRAY_900, color: "#fff", fontSize: 11, fontWeight: 700, borderRadius: 6, whiteSpace: "nowrap" }}>
                  피크 56명
                  <div style={{ position: "absolute", bottom: -4, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 8, height: 8, background: A_GRAY_900 }}/>
                </div>
              )}
              <div style={{ width: "100%", height: h, background: d.peak ? A_BLUE : A_BLUE_WEAK, borderRadius: 8, transition: "height .3s" }} />
              <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>{d.h}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Live feed of recent recognitions
// ──────────────────────────────────────────────────────────────
function LiveFeed() {
  const items = [
    { name: "김지원", dept: "프로덕트 디자인", time: "08:42", status: "ontime", initial: "지", color: "linear-gradient(135deg,#FFCCA8,#FFB582)", textColor: "#6E4944" },
    { name: "박서준", dept: "iOS 엔지니어링", time: "08:51", status: "ontime", initial: "서", color: "linear-gradient(135deg,#CDE7FF,#A3CCFF)", textColor: "#1E4FA8" },
    { name: "이하늘", dept: "데이터", time: "09:03", status: "late", initial: "하", color: "linear-gradient(135deg,#FFE6A8,#FFC84D)", textColor: "#7A5500" },
    { name: "최민지", dept: "마케팅", time: "09:12", status: "late", initial: "민", color: "linear-gradient(135deg,#D4F0D8,#9ED6A6)", textColor: "#1F5C2A" },
    { name: "정태윤", dept: "백엔드 엔지니어링", time: "08:34", status: "ontime", initial: "태", color: "linear-gradient(135deg,#F0D4F0,#D69ED6)", textColor: "#5C1F5C" },
    { name: "윤소희", dept: "그로스", time: "08:39", status: "ontime", initial: "소", color: "linear-gradient(135deg,#FFD4D4,#FF9E9E)", textColor: "#8C2424" },
  ];
  return (
    <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: "20px 0 8px", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 99, background: A_RED, animation: "fpPulse 1.6s infinite" }} />
          <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>실시간 인증</div>
        </div>
        <div style={{ fontSize: 12, color: A_BLUE, fontWeight: 700, cursor: "pointer" }}>전체 보기 →</div>
      </div>
      <div style={{ flex: 1, overflow: "hidden" }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 24px", borderTop: i === 0 ? `1px solid ${A_GRAY_200}` : "none" }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: it.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: it.textColor, flexShrink: 0 }}>{it.initial}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{it.name}</div>
              <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{it.dept}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: "tabular-nums" }}>{it.time}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: it.status === "ontime" ? A_GREEN : A_ORANGE, marginTop: 1 }}>
                {it.status === "ontime" ? "정시" : "지각"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Department donut breakdown
// ──────────────────────────────────────────────────────────────
function DeptBreakdown() {
  const depts = [
    { name: "엔지니어링", attend: 48, total: 52, color: A_BLUE },
    { name: "디자인", attend: 12, total: 14, color: "#7C5CFF" },
    { name: "프로덕트", attend: 8, total: 10, color: A_ORANGE },
    { name: "마케팅", attend: 9, total: 11, color: A_GREEN },
    { name: "운영", attend: 6, total: 7, color: A_YELLOW },
  ];
  const totalA = depts.reduce((s, d) => s + d.attend, 0);
  const totalT = depts.reduce((s, d) => s + d.total, 0);
  // Build conic gradient
  let acc = 0;
  const stops = depts.map(d => {
    const start = (acc / totalA) * 360;
    acc += d.attend;
    const end = (acc / totalA) * 360;
    return `${d.color} ${start}deg ${end}deg`;
  }).join(", ");

  return (
    <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>부서별 출석</div>
      <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>오늘 출근한 인원 기준</div>

      <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 20 }}>
        <div style={{ position: "relative", width: 132, height: 132, flexShrink: 0 }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 99, background: `conic-gradient(${stops})` }} />
          <div style={{ position: "absolute", inset: 18, borderRadius: 99, background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>{totalA}</div>
            <div style={{ fontSize: 11, color: A_GRAY_500, fontWeight: 600 }}>/ {totalT}명</div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
          {depts.map(d => (
            <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: 99, background: d.color }} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: A_GRAY_700 }}>{d.name}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: "tabular-nums" }}>{d.attend}/{d.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Dashboard screen
// ──────────────────────────────────────────────────────────────
function AdminDashboard() {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: A_GRAY_50, fontFamily: adminFont }}>
      <AdminTopBar
        title="대시보드"
        subtitle="2026년 4월 29일 수요일 · 09:14 기준"
        action={
          <button style={{ height: 40, padding: "0 18px", borderRadius: 10, background: A_BLUE, color: "#fff", border: 0, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            CSV 내보내기
          </button>
        }
      />

      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {/* Stat row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <StatTile
            label="오늘 출근"
            value="83" suffix="/ 94명"
            delta="+4.2%"
            color={A_BLUE}
            sub="어제보다 4명 늘었어요"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>}
          />
          <StatTile
            label="정시 출근률"
            value="94" suffix="%"
            delta="+1.8%"
            color={A_GREEN}
            sub="이번 달 평균 92%"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>}
          />
          <StatTile
            label="지각"
            value="5" suffix="명"
            delta="-2"
            color={A_ORANGE}
            sub="3명은 사전 보고 완료"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
          <StatTile
            label="미출근"
            value="6" suffix="명"
            delta="+1"
            color={A_RED}
            sub="휴가 4명 · 미보고 2명"
            icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>}
          />
        </div>

        {/* Chart + Live feed */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, marginBottom: 20 }}>
          <HourlyChart />
          <LiveFeed />
        </div>

        {/* Bottom row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <DeptBreakdown />
          <AlertsCard />
        </div>
      </div>
    </div>
  );
}

function AlertsCard() {
  const alerts = [
    { type: "warn", title: "박지호님 미출근", desc: "예정 시각 9시 · 미보고 상태입니다", time: "방금" },
    { type: "info", title: "임유나님 결근 신청", desc: "병가 — 검토가 필요해요", time: "8분 전" },
    { type: "warn", title: "강민호님 지각 3회", desc: "이번 주 누적 — 면담을 추천해요", time: "1시간 전" },
  ];
  return (
    <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: "20px 24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>주의가 필요해요</div>
        <div style={{ padding: "3px 9px", background: "rgba(239,68,82,.1)", color: A_RED, fontSize: 12, fontWeight: 700, borderRadius: 999 }}>3</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 12 }}>
        {alerts.map((a, i) => (
          <div key={i} style={{ display: "flex", gap: 12, padding: "12px 0", borderTop: i ? `1px solid ${A_GRAY_200}` : "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: a.type === "warn" ? "rgba(255,144,0,.12)" : A_BLUE_WEAK, color: a.type === "warn" ? A_ORANGE : A_BLUE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
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

// ──────────────────────────────────────────────────────────────
// Records / search screen
// ──────────────────────────────────────────────────────────────
function AdminRecords() {
  const rows = [
    { name: "김지원", emp: "EMP-0142", dept: "프로덕트 디자인", in: "08:42", out: "18:23", work: "9시간 41분", status: "ontime", color: "linear-gradient(135deg,#FFCCA8,#FFB582)", textColor: "#6E4944", initial: "지" },
    { name: "박서준", emp: "EMP-0233", dept: "iOS 엔지니어링", in: "08:51", out: "19:02", work: "10시간 11분", status: "ontime", color: "linear-gradient(135deg,#CDE7FF,#A3CCFF)", textColor: "#1E4FA8", initial: "서" },
    { name: "이하늘", emp: "EMP-0098", dept: "데이터", in: "09:03", out: "18:45", work: "9시간 42분", status: "late", color: "linear-gradient(135deg,#FFE6A8,#FFC84D)", textColor: "#7A5500", initial: "하" },
    { name: "최민지", emp: "EMP-0356", dept: "마케팅", in: "09:12", out: "—", work: "—", status: "late", color: "linear-gradient(135deg,#D4F0D8,#9ED6A6)", textColor: "#1F5C2A", initial: "민" },
    { name: "정태윤", emp: "EMP-0061", dept: "백엔드 엔지니어링", in: "08:34", out: "18:50", work: "10시간 16분", status: "ontime", color: "linear-gradient(135deg,#F0D4F0,#D69ED6)", textColor: "#5C1F5C", initial: "태" },
    { name: "윤소희", emp: "EMP-0177", dept: "그로스", in: "08:39", out: "—", work: "—", status: "ontime", color: "linear-gradient(135deg,#FFD4D4,#FF9E9E)", textColor: "#8C2424", initial: "소" },
    { name: "박지호", emp: "EMP-0211", dept: "iOS 엔지니어링", in: "—", out: "—", work: "—", status: "absent", color: A_GRAY_200, textColor: A_GRAY_500, initial: "지" },
    { name: "임유나", emp: "EMP-0299", dept: "운영", in: "—", out: "—", work: "—", status: "leave", color: "linear-gradient(135deg,#E5E8EB,#B0B8C1)", textColor: "#4E5968", initial: "유" },
    { name: "강민호", emp: "EMP-0044", dept: "백엔드 엔지니어링", in: "09:24", out: "—", work: "—", status: "late", color: "linear-gradient(135deg,#CDF0F0,#9ECDD6)", textColor: "#1F4F5C", initial: "민" },
  ];
  const statusBadge = (s) => {
    const map = {
      ontime: { bg: "rgba(0,123,51,.1)", c: A_GREEN, l: "정시" },
      late:   { bg: "rgba(255,144,0,.12)", c: A_ORANGE, l: "지각" },
      absent: { bg: "rgba(239,68,82,.1)", c: A_RED, l: "미출근" },
      leave:  { bg: A_GRAY_100, c: A_GRAY_600, l: "휴가" },
    }[s];
    return <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 999, background: map.bg, color: map.c, fontSize: 12, fontWeight: 700 }}>{map.l}</div>;
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: A_GRAY_50, fontFamily: adminFont }}>
      <AdminTopBar
        title="출석 기록"
        subtitle="모든 직원의 출퇴근 기록을 확인할 수 있어요"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ height: 40, padding: "0 14px", borderRadius: 10, background: "#fff", border: `1px solid ${A_GRAY_200}`, color: A_GRAY_700, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              필터
            </button>
            <button style={{ height: 40, padding: "0 16px", borderRadius: 10, background: A_BLUE, color: "#fff", border: 0, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              CSV 내보내기
            </button>
          </div>
        }
      />

      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {/* Filter bar */}
        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 20, padding: 16, background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 14 }}>
          {/* Date range */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: A_GRAY_100, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_900 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            2026.04.22 — 2026.04.29
          </div>
          {/* Quick chips */}
          {[{ label: "오늘", on: true }, { label: "이번 주" }, { label: "이번 달" }, { label: "지난 달" }].map(c => (
            <div key={c.label} style={{ padding: "10px 14px", borderRadius: 999, background: c.on ? A_GRAY_900 : A_GRAY_100, color: c.on ? "#fff" : A_GRAY_600, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{c.label}</div>
          ))}
          <div style={{ width: 1, height: 24, background: A_GRAY_200 }} />
          {/* Department dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: `1px solid ${A_GRAY_200}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_700, cursor: "pointer" }}>
            부서: 전체
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A_GRAY_400} strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", border: `1px solid ${A_GRAY_200}`, borderRadius: 10, fontSize: 13, fontWeight: 700, color: A_GRAY_700, cursor: "pointer" }}>
            상태: 전체
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={A_GRAY_400} strokeWidth="2.4" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <div style={{ flex: 1 }} />
          <div style={{ fontSize: 13, color: A_GRAY_500 }}>
            총 <b style={{ color: A_GRAY_900 }}>94건</b> · 출근 83 · 지각 5 · 미출근 6
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px", padding: "14px 20px", background: A_GRAY_50, borderBottom: `1px solid ${A_GRAY_200}`, fontSize: 12, fontWeight: 700, color: A_GRAY_500, textTransform: "uppercase", letterSpacing: "0.04em", alignItems: "center" }}>
            <input type="checkbox" />
            <div>직원</div>
            <div>부서</div>
            <div>출근</div>
            <div>퇴근</div>
            <div>근무 시간</div>
            <div>상태</div>
            <div></div>
          </div>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "32px 2fr 1.6fr 1fr 1fr 1.2fr 1fr 60px", padding: "14px 20px", borderBottom: i < rows.length - 1 ? `1px solid ${A_GRAY_200}` : "none", alignItems: "center" }}>
              <input type="checkbox" />
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: r.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: r.textColor, flexShrink: 0 }}>{r.initial}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.emp}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: A_GRAY_700, fontWeight: 500 }}>{r.dept}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: r.in === "—" ? A_GRAY_400 : A_GRAY_900, fontVariantNumeric: "tabular-nums" }}>{r.in}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: r.out === "—" ? A_GRAY_400 : A_GRAY_900, fontVariantNumeric: "tabular-nums" }}>{r.out}</div>
              <div style={{ fontSize: 13, color: r.work === "—" ? A_GRAY_400 : A_GRAY_700, fontVariantNumeric: "tabular-nums" }}>{r.work}</div>
              <div>{statusBadge(r.status)}</div>
              <div style={{ display: "flex", justifyContent: "flex-end", color: A_GRAY_400, cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
              </div>
            </div>
          ))}
          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderTop: `1px solid ${A_GRAY_200}`, background: A_GRAY_50 }}>
            <div style={{ fontSize: 13, color: A_GRAY_500 }}>1–9 / 94명</div>
            <div style={{ display: "flex", gap: 4 }}>
              {["‹", "1", "2", "3", "…", "11", "›"].map((p, i) => (
                <div key={i} style={{ minWidth: 32, height: 32, padding: "0 10px", borderRadius: 8, background: p === "1" ? A_GRAY_900 : "transparent", color: p === "1" ? "#fff" : A_GRAY_600, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{p}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Reports screen — bigger charts
// ──────────────────────────────────────────────────────────────
function AdminReports() {
  const weekData = [
    { d: "월", on: 84, late: 6, absent: 4 },
    { d: "화", on: 88, late: 4, absent: 2 },
    { d: "수", on: 86, late: 5, absent: 3 },
    { d: "목", on: 82, late: 8, absent: 4 },
    { d: "금", on: 79, late: 9, absent: 6 },
    { d: "월", on: 87, late: 5, absent: 2 },
    { d: "화", on: 83, late: 5, absent: 6 },
  ];
  const max = 100;

  const monthlyAvg = [92, 91, 93, 94, 92, 89, 91, 93, 95, 94, 92, 94];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: A_GRAY_50, fontFamily: adminFont }}>
      <AdminTopBar
        title="리포트"
        subtitle="추세를 한눈에 보고 문제를 빠르게 짚어보세요"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ display: "flex", gap: 4, padding: 4, background: A_GRAY_100, borderRadius: 10 }}>
              {["주간", "월간", "분기"].map((t, i) => (
                <div key={t} style={{ padding: "6px 14px", borderRadius: 7, fontSize: 13, fontWeight: 700, background: i === 0 ? "#fff" : "transparent", color: i === 0 ? A_GRAY_900 : A_GRAY_500, cursor: "pointer" }}>{t}</div>
              ))}
            </div>
            <button style={{ height: 40, padding: "0 18px", borderRadius: 10, background: A_BLUE, color: "#fff", border: 0, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>리포트 다운로드</button>
          </div>
        }
      />
      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {/* Insight banner */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 22px", background: "linear-gradient(120deg, #E8F2FE 0%, #F2F4F6 100%)", borderRadius: 16, marginBottom: 20 }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>✨</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900 }}>이번 주는 정시 출근률이 <span style={{ color: A_BLUE }}>2.1%p</span> 올랐어요</div>
            <div style={{ fontSize: 13, color: A_GRAY_600, marginTop: 2 }}>특히 화요일과 금요일의 9시 직전 러시가 개선됐어요</div>
          </div>
          <button style={{ padding: "8px 14px", borderRadius: 10, background: "#fff", color: A_GRAY_700, border: 0, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>자세히 보기</button>
        </div>

        {/* Stacked bars */}
        <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>일별 출근 구성</div>
              <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>지난 7 영업일</div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              {[{ l: "정시", c: A_BLUE }, { l: "지각", c: A_ORANGE }, { l: "미출근", c: A_GRAY_300 }].map(x => (
                <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: A_GRAY_600, fontWeight: 600 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 99, background: x.c }} />{x.l}
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: 30, display: "flex", alignItems: "flex-end", gap: 28, height: 220 }}>
            {weekData.map((d, i) => {
              const total = d.on + d.late + d.absent;
              const onH = (d.on / max) * 200;
              const lateH = (d.late / max) * 200;
              const absH = (d.absent / max) * 200;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 600 }}>{total}명</div>
                  <div style={{ width: 36, display: "flex", flexDirection: "column", borderRadius: 8, overflow: "hidden" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
          {/* Trend line */}
          <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>월간 정시 출근률 추이</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>최근 12개월</div>

            <div style={{ marginTop: 20, position: "relative", height: 200 }}>
              <svg width="100%" height="200" viewBox="0 0 600 200" preserveAspectRatio="none">
                {/* Grid */}
                {[0, 1, 2, 3].map(i => (
                  <line key={i} x1="0" y1={20 + i * 50} x2="600" y2={20 + i * 50} stroke={A_GRAY_200} strokeDasharray="3 4" />
                ))}
                {/* Area */}
                <defs>
                  <linearGradient id="rA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={A_BLUE} stopOpacity="0.25"/>
                    <stop offset="100%" stopColor={A_BLUE} stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {(() => {
                  const pts = monthlyAvg.map((v, i) => [40 + i * 50, 200 - ((v - 80) / 20) * 180]);
                  const path = pts.map(([x, y], i) => (i ? "L" : "M") + x + " " + y).join(" ");
                  const area = path + ` L${pts[pts.length-1][0]} 200 L${pts[0][0]} 200 Z`;
                  return (
                    <g>
                      <path d={area} fill="url(#rA)" />
                      <path d={path} stroke={A_BLUE} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === pts.length-1 ? 6 : 3.5} fill="#fff" stroke={A_BLUE} strokeWidth="2.5" />)}
                    </g>
                  );
                })()}
              </svg>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: A_GRAY_500, fontWeight: 600, padding: "0 16px" }}>
                {["5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월", "1월", "2월", "3월", "4월"].map(m => <span key={m}>{m}</span>)}
              </div>
            </div>
          </div>

          {/* Top performers */}
          <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: "20px 0" }}>
            <div style={{ padding: "0 24px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>이번 달 우수 출석자</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: A_BLUE, padding: "3px 8px", background: A_BLUE_WEAK, borderRadius: 999 }}>TOP 5</div>
            </div>
            {[
              { rank: 1, name: "정태윤", dept: "백엔드", rate: 100, streak: 27, c: "linear-gradient(135deg,#F0D4F0,#D69ED6)", tc: "#5C1F5C", i: "태" },
              { rank: 2, name: "김지원", dept: "디자인", rate: 100, streak: 22, c: "linear-gradient(135deg,#FFCCA8,#FFB582)", tc: "#6E4944", i: "지" },
              { rank: 3, name: "박서준", dept: "iOS", rate: 98, streak: 14, c: "linear-gradient(135deg,#CDE7FF,#A3CCFF)", tc: "#1E4FA8", i: "서" },
              { rank: 4, name: "윤소희", dept: "그로스", rate: 96, streak: 11, c: "linear-gradient(135deg,#FFD4D4,#FF9E9E)", tc: "#8C2424", i: "소" },
              { rank: 5, name: "한도윤", dept: "운영", rate: 95, streak: 9, c: "linear-gradient(135deg,#D4F0D8,#9ED6A6)", tc: "#1F5C2A", i: "도" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 24px", borderTop: i ? `1px solid ${A_GRAY_200}` : "none" }}>
                <div style={{ width: 24, fontSize: 13, fontWeight: 700, color: r.rank <= 3 ? A_BLUE : A_GRAY_400, textAlign: "center" }}>#{r.rank}</div>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: r.c, color: r.tc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>{r.i}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.dept} · {r.streak}일 연속</div>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: A_GRAY_900, fontVariantNumeric: "tabular-nums" }}>{r.rate}<span style={{ fontSize: 11, color: A_GRAY_500 }}>%</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Employees / Enrollment screen — invite + manage face data
// ──────────────────────────────────────────────────────────────
function AdminEmployees() {
  const employees = [
    { name: "김지원", emp: "EMP-0142", dept: "프로덕트 디자인", status: "enrolled", at: "2026.04.29", quality: 98, c: "linear-gradient(135deg,#FFCCA8,#FFB582)", tc: "#6E4944", i: "지" },
    { name: "박서준", emp: "EMP-0233", dept: "iOS 엔지니어링", status: "enrolled", at: "2026.04.18", quality: 96, c: "linear-gradient(135deg,#CDE7FF,#A3CCFF)", tc: "#1E4FA8", i: "서" },
    { name: "이하늘", emp: "EMP-0098", dept: "데이터", status: "pending", at: "초대 발송 · 어제", quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: "하" },
    { name: "최민지", emp: "EMP-0356", dept: "마케팅", status: "enrolled", at: "2026.03.21", quality: 88, c: "linear-gradient(135deg,#D4F0D8,#9ED6A6)", tc: "#1F5C2A", i: "민" },
    { name: "정태윤", emp: "EMP-0061", dept: "백엔드", status: "enrolled", at: "2026.03.02", quality: 99, c: "linear-gradient(135deg,#F0D4F0,#D69ED6)", tc: "#5C1F5C", i: "태" },
    { name: "한도윤", emp: "EMP-0411", dept: "운영", status: "expired", at: "링크 만료 · 7일", quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: "도" },
    { name: "오세린", emp: "EMP-0445", dept: "마케팅", status: "pending", at: "초대 발송 · 2시간 전", quality: null, c: A_GRAY_200, tc: A_GRAY_500, i: "세" },
  ];
  const badge = (s) => {
    const m = {
      enrolled: { bg: "rgba(0,123,51,.1)", c: A_GREEN, l: "등록 완료" },
      pending:  { bg: A_BLUE_WEAK, c: A_BLUE, l: "등록 대기" },
      expired:  { bg: "rgba(239,68,82,.1)", c: A_RED, l: "만료" },
    }[s];
    return <div style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 999, background: m.bg, color: m.c, fontSize: 12, fontWeight: 700 }}>{m.l}</div>;
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: A_GRAY_50, fontFamily: adminFont }}>
      <AdminTopBar
        title="직원 관리"
        subtitle="직원을 초대하면, 모바일 링크로 본인이 직접 얼굴을 등록해요"
        action={
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ height: 40, padding: "0 14px", borderRadius: 10, background: "#fff", border: `1px solid ${A_GRAY_200}`, color: A_GRAY_700, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              CSV로 일괄 초대
            </button>
            <button style={{ height: 40, padding: "0 16px", borderRadius: 10, background: A_BLUE, color: "#fff", border: 0, fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              직원 초대하기
            </button>
          </div>
        }
      />
      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {/* Stat row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
          <StatTile label="전체 직원" value="94" suffix="명" color={A_BLUE} sub="활성 계정 기준" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>}/>
          <StatTile label="등록 완료" value="89" suffix="명" color={A_GREEN} sub="전체의 94.6%" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}/>
          <StatTile label="등록 대기" value="4" suffix="명" color={A_ORANGE} sub="초대 발송됨 · 미완료" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}/>
          <StatTile label="링크 만료" value="1" suffix="명" color={A_RED} sub="재발송 필요" icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}/>
        </div>

        {/* Two-column: Invite panel + table */}
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: 16 }}>
          {/* Invite panel */}
          <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: A_GRAY_900, letterSpacing: "-0.01em" }}>새 직원 초대</div>
            <div style={{ fontSize: 13, color: A_GRAY_500, marginTop: 2 }}>초대 링크를 받은 직원이 모바일에서 본인의 얼굴을 직접 등록해요</div>

            <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 12 }}>
              {[{l:"이름",v:"오세린"},{l:"사번",v:"EMP-0445"},{l:"부서",v:"마케팅"},{l:"연락처",v:"010-XXXX-3304"}].map(f => (
                <div key={f.l}>
                  <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>{f.l}</div>
                  <div style={{ height: 40, padding: "0 12px", border: `1px solid ${A_GRAY_200}`, borderRadius: 10, display: "flex", alignItems: "center", fontSize: 14, color: A_GRAY_900, background: "#fff" }}>{f.v}</div>
                </div>
              ))}
              <div>
                <div style={{ fontSize: 12, color: A_GRAY_500, fontWeight: 700, marginBottom: 6 }}>발송 방법</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[{l:"문자",on:true},{l:"이메일"},{l:"슬랙"}].map(o => (
                    <div key={o.l} style={{ flex: 1, height: 38, borderRadius: 10, border: `1.5px solid ${o.on ? A_BLUE : A_GRAY_200}`, background: o.on ? A_BLUE_WEAK : "#fff", color: o.on ? A_BLUE : A_GRAY_600, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>{o.l}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* QR preview */}
            <div style={{ marginTop: 18, padding: 14, background: A_GRAY_100, borderRadius: 14, display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 64, height: 64, borderRadius: 10, background: "#fff", padding: 6, flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 21 21">
                  {["1111111000-0000-0000111","10000000-0000-000000010","1000-0000-0000101110101","1000-0000-0000101110100","1000-0000-0000101110101","10000000-0000-000000010","1111111000-0000-0000111","0000000000-0000-0000000","110000-0000-00000110011","000-0000-0000000-0000-0000","1000-0000-0000001011010","110000-0000-00000100110","000-0000-0000000-0000-0000","0000000000-0000-0000001","1111111000-0000-0000010","10000000-0000-000010110","1000-0000-0000100110001","1000-0000-0000111100100","1000-0000-0000100100010","10000000-0000-000010010","1111111000-0000-0000001"].map((row,y)=>row.split("").map((c,x)=> c==="1" ? <rect key={x+","+y} x={x} y={y} width="1" height="1" fill="#191F28"/> : null))}
                </svg>
              </div>
              <div style={{ flex: 1, fontSize: 12, color: A_GRAY_600, lineHeight: 1.5 }}>
                직원이 이 QR을 스캔하거나{" "}<b style={{ color: A_GRAY_900 }}>facepass.app/e/AB42</b>로 접속하면 등록을 시작해요
              </div>
            </div>
            <button style={{ width: "100%", marginTop: 14, height: 48, borderRadius: 12, background: A_BLUE, color: "#fff", border: 0, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              초대 링크 발송
            </button>
            <div style={{ marginTop: 8, textAlign: "center", fontSize: 12, color: A_GRAY_500 }}>링크는 7일 동안 유효해요</div>
          </div>

          {/* Employees table */}
          <div style={{ background: "#fff", border: `1px solid ${A_GRAY_200}`, borderRadius: 16, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${A_GRAY_200}`, gap: 12 }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", background: A_GRAY_100, borderRadius: 10, fontSize: 13, color: A_GRAY_500 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                이름, 사번, 부서로 검색…
              </div>
              {[{l:"전체",on:true},{l:"등록 완료"},{l:"대기"},{l:"만료"}].map(c => (
                <div key={c.l} style={{ padding: "7px 12px", borderRadius: 999, background: c.on ? A_GRAY_900 : A_GRAY_100, color: c.on ? "#fff" : A_GRAY_600, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>{c.l}</div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.4fr 1fr 60px", padding: "12px 20px", background: A_GRAY_50, borderBottom: `1px solid ${A_GRAY_200}`, fontSize: 12, fontWeight: 700, color: A_GRAY_500, textTransform: "uppercase", letterSpacing: "0.04em", alignItems: "center" }}>
              <div>직원</div><div>부서</div><div>상태</div><div>등록 정보</div><div>품질</div><div></div>
            </div>
            {employees.map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1.4fr 1fr 1.4fr 1fr 60px", padding: "14px 20px", borderBottom: i < employees.length - 1 ? `1px solid ${A_GRAY_200}` : "none", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: r.c, color: r.tc, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{r.i}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: A_GRAY_900 }}>{r.name}</div>
                    <div style={{ fontSize: 12, color: A_GRAY_500, marginTop: 1 }}>{r.emp}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: A_GRAY_700 }}>{r.dept}</div>
                <div>{badge(r.status)}</div>
                <div style={{ fontSize: 13, color: A_GRAY_500 }}>{r.at}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: r.quality ? (r.quality >= 95 ? A_GREEN : A_ORANGE) : A_GRAY_300 }}>
                  {r.quality ? `${r.quality}%` : "—"}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", color: A_GRAY_400, cursor: "pointer" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Wrapper
// ──────────────────────────────────────────────────────────────
function AdminScreen({ view = "dashboard" }) {
  return (
    <div style={{ width: 1440, height: 900, display: "flex", background: A_GRAY_50, fontFamily: adminFont, color: A_GRAY_900, overflow: "hidden", borderRadius: 12 }}>
      <AdminSidebar active={view} />
      {view === "dashboard" && <AdminDashboard />}
      {view === "records" && <AdminRecords />}
      {view === "reports" && <AdminReports />}
      {view === "employees" && <AdminEmployees />}
    </div>
  );
}

Object.assign(window, { AdminScreen });
