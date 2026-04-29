// FacePass — User-facing mobile screens (Toss design system)
// Each screen renders into a 390×844 frame.

const FP_BLUE = "#3182F6";
const FP_BLUE_WEAK = "#E8F2FE";
const FP_GRAY_900 = "#191F28";
const FP_GRAY_700 = "#333D4B";
const FP_GRAY_600 = "#4E5968";
const FP_GRAY_500 = "#6B7684";
const FP_GRAY_400 = "#8B95A1";
const FP_GRAY_300 = "#B0B8C1";
const FP_GRAY_200 = "#E5E8EB";
const FP_GRAY_100 = "#F2F4F6";
const FP_GREEN = "#007B33";
const FP_RED = "#EF4452";

// ──────────────────────────────────────────────────────────────
// Shared bits
// ──────────────────────────────────────────────────────────────
function FPLogo({ size = 28, color = FP_BLUE }) {
  // FacePass mark — a face silhouette inside a soft squircle
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="2" y="2" width="28" height="28" rx="9" fill={color} />
      <circle cx="16" cy="13" r="4" fill="#fff" />
      <path d="M7 25c1.6-4.2 5.1-6.5 9-6.5s7.4 2.3 9 6.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function StatusBar({ dark = false }) {
  const c = dark ? "#fff" : "#000";
  return (
    <div style={{
      height: 47, display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 28px 0 32px", color: c, fontSize: 17, fontWeight: 600, fontFamily: "var(--font-body)",
      letterSpacing: "-0.01em",
    }}>
      <span>9:41</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* signal */}
        <svg width="18" height="11" viewBox="0 0 18 11" fill={c}>
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="5" y="5" width="3" height="6" rx="1" />
          <rect x="10" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="15" y="0" width="3" height="11" rx="1" />
        </svg>
        {/* wifi */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill={c} />
          <path d="M2 4.2C3.7 2.7 5.7 1.9 8 1.9s4.3.8 6 2.3" stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M4 6.6c1.1-1 2.5-1.5 4-1.5s2.9.5 4 1.5" stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        </svg>
        {/* battery */}
        <svg width="27" height="12" viewBox="0 0 27 12" fill="none">
          <rect x="0.5" y="0.5" width="22" height="11" rx="3" stroke={c} opacity="0.4" />
          <rect x="2" y="2" width="19" height="8" rx="1.5" fill={c} />
          <rect x="23.5" y="4" width="1.5" height="4" rx="0.5" fill={c} opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

function HomeIndicator({ dark = false }) {
  return (
    <div style={{ height: 34, display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 8 }}>
      <div style={{ width: 134, height: 5, borderRadius: 99, background: dark ? "#fff" : "#000", opacity: dark ? 0.9 : 0.85 }} />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 1. Idle / Welcome — 공용 키오스크 (입구에 두는 화면)
// 사람이 다가오면 자동으로 카메라 모드로 전환됨. 개인화 정보 없음.
// ──────────────────────────────────────────────────────────────
function ScreenIdle() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FP_GRAY_900, position: "relative", overflow: "hidden" }}>
      {/* Soft brand aura */}
      <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 700, height: 500, background: "radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)", pointerEvents: "none" }} />

      <StatusBar />

      {/* Top: company brand + connection */}
      <div style={{ position: "relative", padding: "12px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FPLogo size={26} />
          <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.01em" }}>FacePass</span>
          <span style={{ fontSize: 13, color: FP_GRAY_400, fontWeight: 600, marginLeft: 4 }}>· 본사 7층</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 10px", background: FP_GRAY_100, borderRadius: 999, fontSize: 12, fontWeight: 700, color: FP_GRAY_600 }}>
          <div style={{ width: 6, height: 6, borderRadius: 99, background: FP_GREEN }} />
          정상
        </div>
      </div>

      {/* Hero — date + big clock, centered */}
      <div style={{ position: "relative", padding: "56px 28px 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: FP_BLUE, letterSpacing: "-0.005em" }}>2026년 4월 29일 수요일</div>
        <div style={{ marginTop: 8, display: "flex", alignItems: "baseline", gap: 8 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 96, fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1, color: FP_GRAY_900, fontVariantNumeric: "tabular-nums" }}>
            08:42
          </div>
        </div>
        <div style={{ marginTop: 32, fontSize: 28, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
          좋은 아침이에요{"\n"}오늘도 잘 부탁드려요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FP_GRAY_600, lineHeight: 1.5 }}>
          출근 마감까지 <b style={{ color: FP_GRAY_900 }}>18분</b> 남았어요
        </div>
      </div>

      {/* Animated face-detect prompt — implies "approach to start" */}
      <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
        <div style={{ position: "relative", width: 160, height: 160 }}>
          {/* Pulsing rings */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: "fpRing 2.4s ease-out infinite" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: "fpRing 2.4s ease-out 0.8s infinite" }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 999, border: `2px solid ${FP_BLUE}`, opacity: 0.4, animation: "fpRing 2.4s ease-out 1.6s infinite" }} />
          {/* Center face icon */}
          <div style={{ position: "absolute", inset: 36, borderRadius: 999, background: FP_BLUE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(49,130,246,.4)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11.5a.5.5 0 100-1 .5.5 0 000 1zM15 11.5a.5.5 0 100-1 .5.5 0 000 1z" fill="#fff" stroke="none"/>
              <path d="M8 15s1.5 2 4 2 4-2 4-2"/>
              <path d="M3 7V5a2 2 0 012-2h2M21 7V5a2 2 0 00-2-2h-2M3 17v2a2 2 0 002 2h2M21 17v2a2 2 0 01-2 2h-2"/>
            </svg>
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 19, fontWeight: 700, color: FP_GRAY_900, letterSpacing: "-0.01em" }}>
          얼굴을 화면에 비춰주세요
        </div>
        <div style={{ marginTop: 6, fontSize: 14, color: FP_GRAY_600 }}>
          다가오시면 자동으로 인식이 시작돼요
        </div>
      </div>

      {/* Bottom: stats + alt method */}
      <div style={{ position: "relative", padding: "0 20px 16px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1, padding: "12px 14px", background: FP_GRAY_100, borderRadius: 14 }}>
            <div style={{ fontSize: 11, color: FP_GRAY_600, fontWeight: 600 }}>오늘 출근</div>
            <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: FP_GRAY_900, fontVariantNumeric: "tabular-nums" }}>83<span style={{ fontSize: 12, color: FP_GRAY_400, fontWeight: 600 }}> / 94</span></div>
          </div>
          <div style={{ flex: 1, padding: "12px 14px", background: FP_GRAY_100, borderRadius: 14 }}>
            <div style={{ fontSize: 11, color: FP_GRAY_600, fontWeight: 600 }}>마지막 인증</div>
            <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700, color: FP_GRAY_900 }}>윤<span style={{ color: FP_GRAY_400 }}>OO</span> · 8:39</div>
          </div>
        </div>
        <button style={{
          width: "100%", height: 48, borderRadius: 14, border: 0,
          background: "rgba(7,25,76,0.05)", color: FP_GRAY_600, fontSize: 14, fontWeight: 700,
          fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
        }}>
          얼굴 인식이 안 되시나요? <span style={{ color: FP_GRAY_900 }}>사번으로 입력</span>
        </button>
      </div>
      <HomeIndicator />

      <style>{`@keyframes fpRing{0%{transform:scale(.55);opacity:.7}100%{transform:scale(1.4);opacity:0}}`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 2. Camera permission + alignment guide
// ──────────────────────────────────────────────────────────────
function ScreenCamera() {
  return (
    <div style={{ width: 390, height: 844, background: "#0E1116", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* Simulated camera feed — soft gradient background hinting at a person */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 38%, #3a4252 0%, #1c2230 45%, #0a0d12 100%)" }} />
      {/* Subtle face hint silhouette */}
      <div style={{ position: "absolute", left: "50%", top: 320, transform: "translate(-50%,-50%)", width: 200, height: 250, borderRadius: "48%", background: "radial-gradient(ellipse at center, rgba(255,200,170,.15) 0%, rgba(255,200,170,0) 70%)" }} />

      <StatusBar dark />

      {/* Top bar */}
      <div style={{ position: "relative", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: "rgba(255,255,255,.14)", backdropFilter: "blur(20px)", border: 0, color: "#fff", fontSize: 22, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(255,255,255,.14)", backdropFilter: "blur(20px)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: 99, background: FP_RED, animation: "pulse 1.6s infinite" }} />
          출근 인증
        </div>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: "rgba(255,255,255,.14)", backdropFilter: "blur(20px)", border: 0, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
        </button>
      </div>

      {/* Compact QR-style corner guide */}
      <div style={{ position: "relative", padding: "20px 0 0", display: "flex", justifyContent: "center" }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {[
            [10, 10, 1, 1], [210, 10, -1, 1], [10, 210, 1, -1], [210, 210, -1, -1],
          ].map(([x, y, dx, dy], i) => (
            <g key={i} stroke="#fff" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
              <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
            </g>
          ))}
        </svg>
      </div>

      {/* Title under the guide */}
      <div style={{ position: "relative", padding: "20px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          얼굴을 비춰주세요
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
          카메라에 자연스럽게 잡히면 자동으로 인식돼요
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Bottom controls */}
      <div style={{ position: "relative", padding: "0 24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "rgba(255,255,255,.08)", borderRadius: 18, backdropFilter: "blur(20px)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: FP_BLUE_WEAK, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FP_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>출근으로 기록</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)", marginTop: 1 }}>탭해서 퇴근으로 변경</div>
            </div>
          </div>
          <div style={{ display: "flex", background: "rgba(0,0,0,.3)", borderRadius: 999, padding: 3 }}>
            <div style={{ padding: "7px 14px", borderRadius: 999, background: "#fff", color: FP_GRAY_900, fontSize: 13, fontWeight: 700 }}>출근</div>
            <div style={{ padding: "7px 14px", color: "rgba(255,255,255,.55)", fontSize: 13, fontWeight: 700 }}>퇴근</div>
          </div>
        </div>
      </div>
      <HomeIndicator dark />

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 3. Recognizing (loading)
// ──────────────────────────────────────────────────────────────
function ScreenRecognizing() {
  return (
    <div style={{ width: 390, height: 844, background: "#0E1116", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 38%, #3a4252 0%, #1c2230 45%, #0a0d12 100%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 360, transform: "translate(-50%,-50%)", width: 220, height: 270, borderRadius: "48%", background: "radial-gradient(ellipse at center, rgba(255,200,170,.18) 0%, rgba(255,200,170,0) 70%)" }} />

      <StatusBar dark />

      <div style={{ position: "relative", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 40 }} />
        <div style={{ padding: "8px 14px", borderRadius: 999, background: "rgba(49,130,246,.2)", backdropFilter: "blur(20px)", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 8, color: "#fff", border: `1px solid rgba(49,130,246,.4)` }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M12 2a10 10 0 0110 10" style={{ animation: "spin 0.9s linear infinite", transformOrigin: "center" }}/></svg>
          인증 중
        </div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title */}
      <div style={{ position: "relative", padding: "20px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>얼굴을 확인하고 있어요</div>
        <div style={{ marginTop: 8, fontSize: 14, color: "rgba(255,255,255,.6)" }}>잠시만 그대로 있어주세요</div>
      </div>

      {/* Compact corner guide with scan line */}
      <div style={{ position: "relative", padding: "24px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 220, height: 220 }}>
          <svg width="220" height="220" viewBox="0 0 220 220" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={FP_BLUE} stopOpacity="0" />
                <stop offset="50%" stopColor={FP_BLUE} stopOpacity="1" />
                <stop offset="100%" stopColor={FP_BLUE} stopOpacity="0" />
              </linearGradient>
            </defs>
            {[
              [10, 10, 1, 1], [210, 10, -1, 1], [10, 210, 1, -1], [210, 210, -1, -1],
            ].map(([x, y, dx, dy], i) => (
              <g key={i} stroke={FP_BLUE} strokeWidth="4" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 8px rgba(49,130,246,.6))" }}>
                <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
                <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
              </g>
            ))}
            {/* scan line */}
            <g style={{ animation: "scanLine 2.2s cubic-bezier(.6,0,.4,1) infinite" }}>
              <rect x="15" y="0" width="190" height="3" fill="url(#scanGrad)" />
            </g>
            {/* face landmarks */}
            {[[80,90],[140,90],[110,120],[95,150],[125,150]].map(([cx,cy],i)=>(
              <circle key={i} cx={cx} cy={cy} r="3" fill={FP_BLUE} style={{ animation: `landmark 1.4s ${i*0.08}s infinite` }}/>
            ))}
          </svg>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Progress steps */}
      <div style={{ position: "relative", padding: "0 24px 18px" }}>
        <div style={{ background: "rgba(255,255,255,.08)", borderRadius: 20, padding: "16px 20px", backdropFilter: "blur(20px)" }}>
          {[
            { label: "얼굴 감지", done: true },
            { label: "특징점 매칭", done: true },
            { label: "신원 확인", done: false, active: true },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0" }}>
              <div style={{ width: 22, height: 22, borderRadius: 99, background: s.done ? FP_BLUE : (s.active ? "rgba(49,130,246,.2)" : "rgba(255,255,255,.1)"), border: s.active && !s.done ? `2px solid ${FP_BLUE}` : 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {s.done && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                {s.active && !s.done && <div style={{ width: 8, height: 8, borderRadius: 99, background: FP_BLUE, animation: "pulse 1s infinite" }} />}
              </div>
              <div style={{ flex: 1, fontSize: 15, fontWeight: 600, color: s.done || s.active ? "#fff" : "rgba(255,255,255,.4)" }}>{s.label}</div>
              {s.done && <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>0.3s</div>}
              {s.active && <div style={{ fontSize: 13, color: FP_BLUE, fontWeight: 700 }}>처리 중…</div>}
            </div>
          ))}
        </div>
      </div>
      <HomeIndicator dark />

      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes landmark{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1.2)}}
        @keyframes scanLine{0%{transform:translateY(0)}100%{transform:translateY(220px)}}
      `}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 4. Success
// ──────────────────────────────────────────────────────────────
function ScreenSuccess() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FP_GRAY_900, position: "relative", overflow: "hidden" }}>
      {/* Soft success aura */}
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 70%)" }} />

      <StatusBar />

      {/* Top close */}
      <div style={{ position: "relative", padding: "10px 16px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FP_GRAY_100, border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: FP_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Hero — checkmark + photo */}
      <div style={{ position: "relative", padding: "12px 28px 0", textAlign: "center" }}>
        <div style={{ position: "relative", width: 156, height: 156, margin: "0 auto" }}>
          {/* Profile photo placeholder (gradient + initial) */}
          <div style={{ width: 156, height: 156, borderRadius: 999, background: "linear-gradient(135deg, #FFCCA8 0%, #FFB582 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 700, color: "#6E4944", letterSpacing: "-0.02em", boxShadow: "0 8px 24px rgba(0,19,43,.10)" }}>
            지원
          </div>
          {/* Check badge */}
          <div style={{ position: "absolute", bottom: 4, right: 4, width: 48, height: 48, borderRadius: 99, background: FP_BLUE, border: "4px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(49,130,246,.4)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 17, fontWeight: 700, color: FP_BLUE }}>출근 완료</div>
        <div style={{ marginTop: 6, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
          김지원님,{"\n"}좋은 하루 보내세요
        </div>
      </div>

      {/* Detail card */}
      <div style={{ padding: "32px 20px 0" }}>
        <div style={{ background: FP_GRAY_100, borderRadius: 20, padding: "20px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>인증 시각</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: FP_GRAY_900, fontVariantNumeric: "tabular-nums" }}>오전 8:42:13</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>위치</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: FP_GRAY_900 }}>본사 7층 라운지 · 키오스크</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
            <div style={{ fontSize: 14, color: FP_GRAY_600, fontWeight: 600 }}>구분</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ padding: "4px 10px", borderRadius: 999, background: "rgba(0,123,51,.1)", color: FP_GREEN, fontSize: 13, fontWeight: 700 }}>정시 출근</div>
            </div>
          </div>
        </div>

        {/* Streak */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", background: "#FFF8E1", borderRadius: 16 }}>
          <div style={{ fontSize: 22 }}>🔥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, color: FP_GRAY_600, fontWeight: 600 }}>연속 정시 출근</div>
            <div style={{ fontSize: 17, fontWeight: 700, color: FP_GRAY_900, marginTop: 1 }}>14일째 이어가는 중이에요</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "16px 20px 12px" }}>
        <button style={{
          width: "100%", height: 56, borderRadius: 16, border: 0,
          background: FP_BLUE, color: "#fff", fontSize: 17, fontWeight: 700,
          fontFamily: "inherit", cursor: "pointer",
        }}>
          확인
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 5. Failure / retry
// ──────────────────────────────────────────────────────────────
function ScreenFailure() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FP_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 360, background: "radial-gradient(ellipse at center, rgba(239,68,82,.10) 0%, rgba(239,68,82,0) 70%)" }} />

      <StatusBar />

      <div style={{ position: "relative", padding: "10px 16px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FP_GRAY_100, border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: FP_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      <div style={{ position: "relative", padding: "20px 28px 0", textAlign: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: 99, background: "rgba(239,68,82,.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={FP_RED} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <div style={{ marginTop: 22, fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          얼굴을 인식하지{"\n"}못했어요
        </div>
        <div style={{ marginTop: 10, fontSize: 16, color: FP_GRAY_600, lineHeight: 1.5 }}>
          조명, 거리, 각도 등을 확인하고{"\n"}다시 시도해주세요
        </div>
      </div>

      {/* Tips */}
      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: FP_GRAY_400, textTransform: "uppercase", letterSpacing: "0.04em", padding: "0 4px 10px" }}>이렇게 해보세요</div>
        <div style={{ background: FP_GRAY_100, borderRadius: 20, padding: 6 }}>
          {[
            { icon: "💡", title: "조명을 밝게 해주세요", desc: "역광이나 어두운 곳은 인식이 어려워요" },
            { icon: "👤", title: "얼굴이 가려지지 않도록", desc: "눈·코·입이 모두 보여야 해요" },
            { icon: "📏", title: "30cm 정도 거리에서", desc: "너무 멀거나 가까우면 안 돼요" },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", borderBottom: i < 2 ? `1px solid ${FP_GRAY_200}` : "none" }}>
              <div style={{ width: 40, height: 40, borderRadius: 14, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{t.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>{t.title}</div>
                <div style={{ fontSize: 13, color: FP_GRAY_600, marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 14, fontSize: 13, color: FP_GRAY_400, textAlign: "center" }}>
          시도 횟수 <b style={{ color: FP_GRAY_600 }}>2 / 3</b>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "16px 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{
          width: "100%", height: 56, borderRadius: 16, border: 0,
          background: FP_BLUE, color: "#fff", fontSize: 17, fontWeight: 700,
          fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/></svg>
          다시 시도하기
        </button>
        <button style={{
          width: "100%", height: 52, borderRadius: 14, border: 0,
          background: "rgba(7,25,76,0.05)", color: FP_GRAY_600, fontSize: 16, fontWeight: 700,
          fontFamily: "inherit", cursor: "pointer",
        }}>
          사번으로 입력하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 6. Enroll · Intro — 회사에서 받은 등록 링크/QR로 진입했을 때
// ──────────────────────────────────────────────────────────────
function ScreenEnrollIntro() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FP_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, background: "radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)", pointerEvents: "none" }} />
      <StatusBar />

      <div style={{ position: "relative", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: "transparent", border: 0, cursor: "pointer", color: FP_GRAY_900, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
        <div style={{ fontSize: 13, color: FP_GRAY_500, fontWeight: 700 }}>1 / 3</div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ position: "relative", padding: "20px 28px 0", textAlign: "center" }}>
        {/* Hero illustration */}
        <div style={{ width: 132, height: 132, borderRadius: 36, background: FP_BLUE_WEAK, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", position: "relative" }}>
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" stroke={FP_BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="9" r="4"/>
            <path d="M5 21c1.5-4 4-6 7-6s5.5 2 7 6"/>
          </svg>
          <div style={{ position: "absolute", top: -6, right: -6, width: 36, height: 36, borderRadius: 99, background: "#fff", boxShadow: "0 4px 12px rgba(0,19,43,.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FP_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
          </div>
        </div>

        <div style={{ marginTop: 24, fontSize: 13, fontWeight: 700, color: FP_BLUE, letterSpacing: "0.02em", textTransform: "uppercase" }}>FacePass 등록</div>
        <div style={{ marginTop: 8, fontSize: 28, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
          김지원님,{"\n"}얼굴 등록을 시작할게요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FP_GRAY_600, lineHeight: 1.5 }}>
          앞으로 출근할 때 이 얼굴로 인식해요.{"\n"}1분이면 충분해요.
        </div>
      </div>

      {/* Steps */}
      <div style={{ padding: "28px 20px 0" }}>
        {[
          { n: 1, t: "얼굴 사진 3장 촬영", d: "자연스러운 표정과 다른 모습을 담아 인식률을 높여요" },
          { n: 2, t: "본인 확인", d: "사번과 매칭해서 정확히 등록해요" },
          { n: 3, t: "등록 완료", d: "내일부터 키오스크에서 바로 출근할 수 있어요" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 16, background: i === 0 ? FP_BLUE_WEAK : "transparent" }}>
            <div style={{ width: 28, height: 28, borderRadius: 99, background: i === 0 ? FP_BLUE : FP_GRAY_100, color: i === 0 ? "#fff" : FP_GRAY_500, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: FP_GRAY_600, marginTop: 2, lineHeight: 1.45 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Privacy notice */}
      <div style={{ margin: "16px 20px 0", padding: "12px 14px", background: FP_GRAY_100, borderRadius: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FP_GRAY_600} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <div style={{ fontSize: 12, color: FP_GRAY_600, lineHeight: 1.5 }}>
          얼굴 데이터는 <b style={{ color: FP_GRAY_900 }}>회사 서버에서 암호화</b>되어 저장되며, 출근 인증 외 용도로 사용되지 않아요.
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ padding: "16px 20px 12px" }}>
        <button style={{
          width: "100%", height: 56, borderRadius: 16, border: 0,
          background: FP_BLUE, color: "#fff", fontSize: 17, fontWeight: 700,
          fontFamily: "inherit", cursor: "pointer",
          boxShadow: "0 6px 20px rgba(49,130,246,.35)",
        }}>
          시작하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 7. Enroll · Capture — 셀카 촬영 (3 of 3)
// ──────────────────────────────────────────────────────────────
function ScreenEnrollCapture() {
  return (
    <div style={{ width: 390, height: 844, background: "#0E1116", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 90% at 50% 38%, #3a4252 0%, #1c2230 45%, #0a0d12 100%)" }} />
      <div style={{ position: "absolute", left: "50%", top: 360, transform: "translate(-50%,-50%)", width: 220, height: 270, borderRadius: "48%", background: "radial-gradient(ellipse at center, rgba(255,200,170,.18) 0%, rgba(255,200,170,0) 70%)" }} />

      <StatusBar dark />

      <div style={{ position: "relative", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: "rgba(255,255,255,.14)", backdropFilter: "blur(20px)", border: 0, color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.8)" }}>2 / 3</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title + capture progress */}
      <div style={{ position: "relative", padding: "12px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: FP_BLUE, letterSpacing: "0.04em" }}>· 사진 3 / 3 ·</div>
        <div style={{ marginTop: 6, fontSize: 22, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
          한 장 더 자유롭게{"\n"}등록해볼까요?
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,.6)", lineHeight: 1.5 }}>
          안경을 끼셨다면 <b style={{color:"#fff"}}>안경을 벗은 모습</b>,{"\n"}아니면 웃는 표정을 추가해도 좋아요
        </div>

        {/* 3-step thumbnails */}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 10 }}>
          {[
            { label: "자연스럽게", done: true },
            { label: "살짝 미소", done: true },
            { label: "자유 등록", active: true },
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: t.done ? "linear-gradient(135deg,#FFCCA8,#FFB582)" : (t.active ? "rgba(49,130,246,.2)" : "rgba(255,255,255,.08)"), border: t.active ? `2px solid ${FP_BLUE}` : "none", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {t.done && (
                  <div style={{ position: "absolute", bottom: -4, right: -4, width: 22, height: 22, borderRadius: 99, background: FP_BLUE, border: "2px solid #0E1116", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
                {t.active && <div style={{ width: 6, height: 6, borderRadius: 99, background: FP_BLUE, animation: "pulse 1s infinite" }} />}
              </div>
              <div style={{ fontSize: 11, color: t.done ? "rgba(255,255,255,.85)" : (t.active ? FP_BLUE : "rgba(255,255,255,.4)"), fontWeight: 700 }}>{t.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Compact corner guide — sits high so the page stays compact */}
      <div style={{ position: "relative", padding: "20px 0 0", display: "flex", justifyContent: "center" }}>
        <svg width="220" height="220" viewBox="0 0 220 220">
          {[
            [10, 10, 1, 1], [210, 10, -1, 1], [10, 210, 1, -1], [210, 210, -1, -1],
          ].map(([x, y, dx, dy], i) => (
            <g key={i} stroke={FP_GREEN} strokeWidth="4.5" strokeLinecap="round" fill="none" style={{ filter: "drop-shadow(0 0 10px rgba(0,123,51,.6))" }}>
              <path d={`M${x} ${y} L${x + dx * 32} ${y}`} />
              <path d={`M${x} ${y} L${x} ${y + dy * 32}`} />
            </g>
          ))}
        </svg>
      </div>

      <div style={{ position: "relative", padding: "16px 28px 0", textAlign: "center" }}>
        <div style={{ display: "inline-flex", padding: "8px 14px", borderRadius: 999, background: "rgba(0,123,51,.2)", border: `1px solid rgba(0,123,51,.5)`, fontSize: 13, fontWeight: 700, alignItems: "center", gap: 6, backdropFilter: "blur(20px)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          좋아요! 3·2·1초 후 촬영돼요
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* Shutter */}
      <div style={{ position: "relative", padding: "0 24px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10"/></svg>
        </div>
        <button style={{ width: 80, height: 80, borderRadius: 99, background: "#fff", border: `4px solid rgba(255,255,255,.4)`, cursor: "pointer", boxShadow: "0 8px 28px rgba(0,0,0,.3)" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 99, background: "#fff", border: `2px solid #0E1116`, boxShadow: "inset 0 0 0 4px #fff" }} />
        </button>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
        </div>
      </div>
      <HomeIndicator dark />

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}`}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// 8. Enroll · Done
// ──────────────────────────────────────────────────────────────
function ScreenEnrollDone() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FP_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 480, background: "radial-gradient(ellipse at center, rgba(49,130,246,.12) 0%, rgba(49,130,246,0) 65%)" }} />
      <StatusBar />
      <div style={{ position: "relative", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ width: 40 }} />
        <div style={{ fontSize: 13, color: FP_GRAY_500, fontWeight: 700 }}>3 / 3</div>
        <div style={{ width: 40 }} />
      </div>

      <div style={{ position: "relative", padding: "32px 28px 0", textAlign: "center" }}>
        <div style={{ position: "relative", width: 156, height: 156, margin: "0 auto" }}>
          <div style={{ width: 156, height: 156, borderRadius: 999, background: "linear-gradient(135deg, #FFCCA8 0%, #FFB582 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 60, fontWeight: 700, color: "#6E4944", boxShadow: "0 8px 24px rgba(0,19,43,.10)" }}>지원</div>
          <div style={{ position: "absolute", bottom: 4, right: 4, width: 48, height: 48, borderRadius: 99, background: FP_BLUE, border: "4px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(49,130,246,.4)" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>

        <div style={{ marginTop: 28, fontSize: 17, fontWeight: 700, color: FP_BLUE }}>등록 완료</div>
        <div style={{ marginTop: 6, fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          이제 얼굴로{"\n"}바로 출근할 수 있어요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FP_GRAY_600, lineHeight: 1.5 }}>
          내일 아침, 본사 7층 라운지의{"\n"}FacePass 키오스크에서 출근해보세요
        </div>
      </div>

      <div style={{ padding: "28px 20px 0" }}>
        <div style={{ background: FP_GRAY_100, borderRadius: 20, padding: "18px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FP_GRAY_600, fontWeight: 600 }}>이름</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>김지원</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FP_GRAY_600, fontWeight: 600 }}>사번 / 부서</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>EMP-0142 · 프로덕트 디자인</div>
          </div>
          <div style={{ height: 1, background: FP_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FP_GRAY_600, fontWeight: 600 }}>등록 시각</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: FP_GRAY_900 }}>2026.04.29 14:23</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />
      <div style={{ padding: "16px 20px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ width: "100%", height: 56, borderRadius: 16, border: 0, background: FP_BLUE, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>완료</button>
        <button style={{ width: "100%", height: 48, borderRadius: 14, border: 0, background: "transparent", color: FP_GRAY_600, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>다시 등록하기</button>
      </div>
      <HomeIndicator />
    </div>
  );
}

Object.assign(window, { ScreenIdle, ScreenCamera, ScreenRecognizing, ScreenSuccess, ScreenFailure, ScreenEnrollIntro, ScreenEnrollCapture, ScreenEnrollDone });
