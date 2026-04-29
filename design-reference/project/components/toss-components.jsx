// Inline styles, no JSX imports. Lucide via CDN substitute (flagged in README).
const TossButton = ({ label = "버튼", size = "xl", variant = "brand", disabled, full, onClick }) => {
  const sizes = {
    xl: { h: 56, px: 28, r: 16, fs: 17 },
    l:  { h: 48, px: 22, r: 14, fs: 17 },
    m:  { h: 40, px: 16, r: 10, fs: 15 },
    s:  { h: 32, px: 12, r: 8,  fs: 13 },
  };
  const variants = {
    brand:   { bg: "#3182F6", color: "#fff" },
    neutral: { bg: "rgba(7,25,76,0.05)", color: "rgba(3,18,40,.7)" },
    inverse: { bg: "#fff", color: "#2365CF", shadow: "inset 0 0 0 1px rgba(0,29,58,.18)" },
    danger:  { bg: "#EF4452", color: "#fff" },
  };
  const sz = sizes[size]; const v = variants[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      height: sz.h, padding: `0 ${sz.px}px`, borderRadius: sz.r, fontSize: sz.fs,
      background: v.bg, color: v.color, boxShadow: v.shadow || "none",
      border: 0, fontWeight: 700, fontFamily: "inherit", cursor: disabled ? "default":"pointer",
      opacity: disabled ? 0.3 : 1, width: full ? "100%" : "auto",
      transition: "transform .15s cubic-bezier(.32,.72,0,1), opacity .15s",
      display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
    }}
    onMouseDown={(e)=>!disabled&&(e.currentTarget.style.transform="scale(.97)")}
    onMouseUp={(e)=>e.currentTarget.style.transform="scale(1)"}
    onMouseLeave={(e)=>e.currentTarget.style.transform="scale(1)"}
    >{label}</button>
  );
};

const TossTopBar = ({ title, onBack, right }) => (
  <div style={{ height: 56, display: "flex", alignItems: "center", padding: "0 8px", background: "#fff", position:"sticky", top:0, zIndex:5 }}>
    {onBack && <button onClick={onBack} aria-label="back" style={{width:44,height:44,border:0,background:"transparent",cursor:"pointer",fontSize:22,color:"#191F28"}}>‹</button>}
    <div style={{flex:1,fontWeight:700,fontSize:17,color:"#191F28",textAlign:"center",paddingRight:onBack?44:0}}>{title}</div>
    {right || <div style={{width:44}}/>}
  </div>
);

const TossListRow = ({ icon, iconBg="#E8F2FE", iconColor="#3182F6", title, subtitle, accessory, onClick }) => (
  <div onClick={onClick} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 20px",cursor:onClick?"pointer":"default",background:"#fff"}}>
    <div style={{width:40,height:40,borderRadius:14,background:iconBg,color:iconColor,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:18,flexShrink:0}}>{icon}</div>
    <div style={{flex:1,display:"flex",flexDirection:"column",gap:2,minWidth:0}}>
      <div style={{fontWeight:700,fontSize:17,color:"rgba(0,12,30,.8)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{title}</div>
      {subtitle && <div style={{fontSize:13,color:"rgba(0,19,43,.58)"}}>{subtitle}</div>}
    </div>
    {accessory && <div style={{fontSize:15,color:"rgba(0,19,43,.58)",fontWeight:500}}>{accessory}</div>}
    {onClick && !accessory && <div style={{color:"rgba(0,25,54,.31)",fontWeight:700,fontSize:18}}>›</div>}
  </div>
);

const TossCard = ({ children, padding=20, style={} }) => (
  <div style={{background:"#fff",borderRadius:24,border:"1px solid rgba(0,0,0,.08)",padding,...style}}>{children}</div>
);

const TossChip = ({ children, selected, onClick }) => (
  <span onClick={onClick} style={{
    display:"inline-flex",alignItems:"center",height:36,padding:"0 14px",borderRadius:999,fontSize:14,fontWeight:700,
    background: selected ? "#191F28" : "#F2F4F6", color: selected ? "#fff" : "rgba(3,18,40,.7)", cursor:"pointer",
  }}>{children}</span>
);

const TossTabBar = ({ tabs, active, onChange }) => (
  <div style={{position:"sticky",bottom:0,background:"rgba(255,255,255,.94)",backdropFilter:"blur(12px)",borderTop:"1px solid rgba(0,0,0,.06)",display:"flex",height:83,paddingBottom:24,zIndex:10}}>
    {tabs.map((t,i)=>(
      <button key={t.key} onClick={()=>onChange(t.key)} style={{flex:1,border:0,background:"transparent",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,padding:"6px 0"}}>
        <div style={{fontSize:22,color: active===t.key ? "#191F28" : "#B0B8C1"}}>{t.icon}</div>
        <div style={{fontSize:11,fontWeight:700,color: active===t.key ? "#191F28" : "#B0B8C1"}}>{t.label}</div>
      </button>
    ))}
  </div>
);

const TossBottomCTA = ({ children }) => (
  <div style={{position:"sticky",bottom:0,padding:"12px 20px 24px",background:"linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 30%)"}}>
    {children}
  </div>
);

const TossSheet = ({ open, onClose, title, children }) => open ? (
  <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.5)",zIndex:20,display:"flex",alignItems:"flex-end",animation:"fadein .2s"}}>
    <div onClick={e=>e.stopPropagation()} style={{width:"100%",background:"#fff",borderTopLeftRadius:24,borderTopRightRadius:24,padding:"12px 0 24px",animation:"slideup .25s cubic-bezier(.32,.72,0,1)"}}>
      <div style={{width:36,height:5,background:"#E5E8EB",borderRadius:99,margin:"6px auto 14px"}}/>
      {title && <div style={{padding:"4px 20px 12px",fontWeight:700,fontSize:18,color:"#191F28"}}>{title}</div>}
      {children}
    </div>
  </div>
) : null;

Object.assign(window, { TossButton, TossTopBar, TossListRow, TossCard, TossChip, TossTabBar, TossBottomCTA, TossSheet });
