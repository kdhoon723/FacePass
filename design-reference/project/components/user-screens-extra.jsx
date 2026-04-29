// FacePass — Extra mobile screens (edge cases & fallbacks)
// Each screen renders into a 390×844 frame.

const FX_BLUE = "#3182F6";
const FX_BLUE_WEAK = "#E8F2FE";
const FX_GRAY_900 = "#191F28";
const FX_GRAY_700 = "#333D4B";
const FX_GRAY_600 = "#4E5968";
const FX_GRAY_500 = "#6B7684";
const FX_GRAY_400 = "#8B95A1";
const FX_GRAY_300 = "#B0B8C1";
const FX_GRAY_200 = "#E5E8EB";
const FX_GRAY_100 = "#F2F4F6";
const FX_RED = "#EF4452";
const FX_AMBER = "#F59E0B";

// ──────────────────────────────────────────────────────────────
// X1 · 사번 폴백 — 얼굴 인식 실패 시 사번으로 출근 인증
// ──────────────────────────────────────────────────────────────
function ScreenEmpNo() {
  const digits = ["1", "4", "2", "", "", ""];
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FX_GRAY_900, position: "relative", overflow: "hidden" }}>
      <StatusBar />

      {/* Top bar */}
      <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FX_GRAY_100, border: 0, color: FX_GRAY_900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ fontSize: 15, fontWeight: 700 }}>사번으로 인증</div>
        <div style={{ width: 40 }} />
      </div>

      {/* Title */}
      <div style={{ padding: "20px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          사번 6자리를 입력해주세요
        </div>
        <div style={{ marginTop: 8, fontSize: 14, color: FX_GRAY_500, lineHeight: 1.5 }}>
          얼굴 인식이 어려운 경우 사용해요
        </div>
      </div>

      {/* PIN dots */}
      <div style={{ padding: "32px 28px 0", display: "flex", justifyContent: "center", gap: 14 }}>
        {digits.map((d, i) => (
          <div key={i} style={{ width: 44, height: 56, borderRadius: 12, background: FX_GRAY_100, border: `1.5px solid ${d ? FX_BLUE : FX_GRAY_200}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: FX_GRAY_900 }}>
            {d}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, textAlign: "center", fontSize: 13, color: FX_GRAY_500 }}>
        EMP-<span style={{ color: FX_GRAY_900, fontWeight: 700 }}>142</span>___
      </div>

      <div style={{ flex: 1 }} />

      {/* Action mode pills */}
      <div style={{ padding: "0 24px 16px", display: "flex", justifyContent: "center", gap: 8 }}>
        <div style={{ display: "flex", background: FX_GRAY_100, borderRadius: 999, padding: 3 }}>
          <div style={{ padding: "8px 16px", borderRadius: 999, background: "#fff", color: FX_GRAY_900, fontSize: 13, fontWeight: 700, boxShadow: "0 1px 3px rgba(0,19,43,.06)" }}>출근</div>
          <div style={{ padding: "8px 16px", color: FX_GRAY_500, fontSize: 13, fontWeight: 700 }}>퇴근</div>
        </div>
      </div>

      {/* Numeric keypad */}
      <div style={{ background: FX_GRAY_100, padding: "12px 4px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((n, i) => (
            <button key={i} disabled={!n} style={{
              height: 54, border: 0, background: "transparent", fontSize: n === "⌫" ? 22 : 28,
              fontWeight: 500, color: FX_GRAY_900, fontFamily: "inherit", cursor: n ? "pointer" : "default",
              opacity: n ? 1 : 0,
            }}>{n}</button>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// X2 · 권한 안내 (Priming) — 시스템 다이얼로그 띄우기 전 설명
// ──────────────────────────────────────────────────────────────
function ScreenPermPrime() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FX_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, background: "radial-gradient(ellipse at center, rgba(49,130,246,.10) 0%, rgba(49,130,246,0) 65%)" }} />
      <StatusBar />

      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FX_GRAY_100, border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: FX_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Hero camera illustration */}
      <div style={{ position: "relative", padding: "20px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 156, height: 156 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: FX_BLUE_WEAK }} />
          <div style={{ position: "absolute", inset: 24, borderRadius: 99, background: FX_BLUE, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(49,130,246,.35)" }}>
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
          </div>
        </div>
      </div>

      <div style={{ padding: "32px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          카메라 권한이{"\n"}필요해요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FX_GRAY_600, lineHeight: 1.55 }}>
          얼굴을 인식해 출퇴근을 자동으로 기록해요.{"\n"}촬영된 이미지는 기기 밖으로 전송되지 않아요.
        </div>
      </div>

      <div style={{ padding: "28px 24px 0" }}>
        <div style={{ background: FX_GRAY_100, borderRadius: 18, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FX_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, t: "1초 안에 인식", d: "별도 입력 없이 빠르게 출근" },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FX_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, t: "기기에서만 처리", d: "이미지는 서버로 전송되지 않아요" },
            { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={FX_BLUE} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>, t: "언제든 해제 가능", d: "설정 → 권한에서 변경할 수 있어요" },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: FX_BLUE_WEAK, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {row.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: FX_GRAY_900 }}>{row.t}</div>
                <div style={{ fontSize: 13, color: FX_GRAY_500, marginTop: 2, lineHeight: 1.45 }}>{row.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ width: "100%", height: 56, borderRadius: 16, border: 0, background: FX_BLUE, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
          카메라 권한 허용
        </button>
        <button style={{ width: "100%", height: 48, borderRadius: 14, border: 0, background: "transparent", color: FX_GRAY_500, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
          나중에 하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// X3 · 권한 거부됨 — 설정 앱으로 보내는 안내
// ──────────────────────────────────────────────────────────────
function ScreenPermDenied() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FX_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, background: "radial-gradient(ellipse at center, rgba(245,158,11,.10) 0%, rgba(245,158,11,0) 65%)" }} />
      <StatusBar />

      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FX_GRAY_100, border: 0, color: FX_GRAY_900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <div style={{ width: 40 }} />
      </div>

      {/* Locked camera illustration */}
      <div style={{ position: "relative", padding: "16px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 156, height: 156 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "rgba(245,158,11,.12)" }} />
          <div style={{ position: "absolute", inset: 28, borderRadius: 99, background: "#fff", border: `1px solid ${FX_GRAY_200}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,19,43,.08)" }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={FX_GRAY_400} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
              <circle cx="12" cy="13" r="4"/>
            </svg>
            <div style={{ position: "absolute", bottom: -8, right: -8, width: 44, height: 44, borderRadius: 99, background: FX_AMBER, display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #fff", boxShadow: "0 4px 12px rgba(245,158,11,.4)" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "36px 28px 0", textAlign: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          카메라 권한이{"\n"}꺼져 있어요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FX_GRAY_600, lineHeight: 1.55 }}>
          얼굴 인식 출근을 사용하려면{"\n"}설정에서 카메라 권한을 허용해주세요
        </div>
      </div>

      {/* Settings path hint */}
      <div style={{ padding: "28px 24px 0" }}>
        <div style={{ background: FX_GRAY_100, borderRadius: 18, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: FX_GRAY_500, letterSpacing: "0.02em", textTransform: "uppercase" }}>설정 경로</div>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, fontSize: 14, color: FX_GRAY_900, fontWeight: 600 }}>
            <span style={{ padding: "5px 10px", background: "#fff", borderRadius: 8, border: `1px solid ${FX_GRAY_200}` }}>설정</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={FX_GRAY_400} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            <span style={{ padding: "5px 10px", background: "#fff", borderRadius: 8, border: `1px solid ${FX_GRAY_200}` }}>FacePass</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={FX_GRAY_400} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            <span style={{ padding: "5px 10px", background: FX_BLUE_WEAK, borderRadius: 8, border: `1px solid ${FX_BLUE}`, color: FX_BLUE }}>카메라</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ width: "100%", height: 56, borderRadius: 16, border: 0, background: FX_BLUE, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          설정 앱 열기
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </button>
        <button style={{ width: "100%", height: 48, borderRadius: 14, border: 0, background: FX_GRAY_100, color: FX_GRAY_700, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
          사번으로 출근하기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// X4 · 초대 링크 만료/오류
// ──────────────────────────────────────────────────────────────
function ScreenInviteError() {
  return (
    <div style={{ width: 390, height: 844, background: "#fff", display: "flex", flexDirection: "column", fontFamily: "var(--font-body)", color: FX_GRAY_900, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 700, height: 460, background: "radial-gradient(ellipse at center, rgba(239,68,82,.10) 0%, rgba(239,68,82,0) 65%)" }} />
      <StatusBar />

      <div style={{ padding: "10px 16px", display: "flex", justifyContent: "flex-end" }}>
        <button style={{ width: 40, height: 40, borderRadius: 99, background: FX_GRAY_100, border: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: FX_GRAY_900 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>

      {/* Broken link illustration */}
      <div style={{ position: "relative", padding: "16px 0 0", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 156, height: 156 }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 99, background: "rgba(239,68,82,.10)" }} />
          <div style={{ position: "absolute", inset: 28, borderRadius: 99, background: "#fff", border: `1px solid ${FX_GRAY_200}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 24px rgba(0,19,43,.08)" }}>
            <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke={FX_RED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              <line x1="2" y1="2" x2="22" y2="22" stroke={FX_RED} strokeWidth="2.4" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ padding: "36px 28px 0", textAlign: "center" }}>
        <div style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 999, background: "rgba(239,68,82,.12)", color: FX_RED, fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
          만료된 링크
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          이 등록 링크는{"\n"}더 이상 사용할 수 없어요
        </div>
        <div style={{ marginTop: 12, fontSize: 15, color: FX_GRAY_600, lineHeight: 1.55 }}>
          보안을 위해 등록 링크는 발급 후 72시간 동안만 유효해요.
          관리자에게 새 링크를 요청해주세요.
        </div>
      </div>

      {/* Detail card */}
      <div style={{ padding: "28px 24px 0" }}>
        <div style={{ background: FX_GRAY_100, borderRadius: 18, padding: "16px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}>발급일</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_GRAY_900 }}>2026.04.25 09:12</div>
          </div>
          <div style={{ height: 1, background: FX_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}>만료</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_RED }}>2026.04.28 09:12 (1일 전)</div>
          </div>
          <div style={{ height: 1, background: FX_GRAY_200, margin: "4px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}>
            <div style={{ fontSize: 13, color: FX_GRAY_500, fontWeight: 600 }}>요청 담당자</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: FX_GRAY_900 }}>이수민 (HR)</div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: "12px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button style={{ width: "100%", height: 56, borderRadius: 16, border: 0, background: FX_BLUE, color: "#fff", fontSize: 17, fontWeight: 700, fontFamily: "inherit", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          담당자에게 새 링크 요청
        </button>
        <button style={{ width: "100%", height: 48, borderRadius: 14, border: 0, background: "transparent", color: FX_GRAY_500, fontSize: 14, fontWeight: 700, fontFamily: "inherit", cursor: "pointer" }}>
          도움말 보기
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

Object.assign(window, { ScreenEmpNo, ScreenPermPrime, ScreenPermDenied, ScreenInviteError });
