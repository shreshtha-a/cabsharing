import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ── Design tokens ──────────────────────────────────────────────────────────
const teal = "#0B9E8E";
const tealLight = "#E6F7F6";
const tealDark = "#097A6D";
const textPrimary = "#1A1A2E";
const textSecondary = "#6B7280";
const borderColor = "#E5E7EB";
const bgPage = "#F8FAFA";
const white = "#FFFFFF";
const red = "#EF4444";

// ── Inline SVG Icons ───────────────────────────────────────────────────────
const IconSearch = () => (
  <svg width="18" height="18" fill="none" stroke="#9CA3AF" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconSun = () => (
  <svg width="20" height="20" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const IconChat = () => (
  <svg width="20" height="20" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const IconBell = () => (
  <svg width="20" height="20" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
);
const IconChevron = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconChevronRight = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);
const IconCheck = () => (
  <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconCopy = () => (
  <svg width="16" height="16" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IconPhone = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconClock = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconSeat = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 11V6a2 2 0 012-2h12a2 2 0 012 2v5"/><path d="M4 11h16v6H4z"/><path d="M8 17v3M16 17v3"/>
  </svg>
);
const IconDistance = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><line x1="7" y1="12" x2="17" y2="12"/>
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11C5.5 20.74 2 16 2 11V5l10-3z"/>
  </svg>
);
const IconHeadphones = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);
const IconLock = () => (
  <svg width="14" height="14" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IconArrow = () => (
  <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" fill="none" stroke={textPrimary} strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

function TopBar() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 16,
      padding: "12px 28px", borderBottom: `1px solid ${borderColor}`,
      background: white, position: "sticky", top: 0, zIndex: 10,
    }}>
      <div style={{
        flex: 1, display: "flex", alignItems: "center", gap: 10,
        background: "#F9FAFB", border: `1px solid ${borderColor}`,
        borderRadius: 30, padding: "9px 18px", maxWidth: 480,
      }}>
        <IconSearch />
        <span style={{ fontSize: 14, color: "#9CA3AF" }}>Search rides, users or locations...</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" }}>
        <button style={iconBtn}><IconSun /></button>
        <div style={{ position: "relative" }}>
          <button style={iconBtn}><IconChat /></button>
          <span style={topBadge}>2</span>
        </div>
        <div style={{ position: "relative" }}>
          <button style={iconBtn}><IconBell /></button>
          <span style={{ ...topBadge, background: red }}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: "linear-gradient(135deg, #a8edea, #fed6e3)",
            border: `2px solid ${borderColor}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, color: tealDark,
          }}>AR</div>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>Aryan Rastogi</span>
          <IconChevron />
        </div>
      </div>
    </div>
  );
}

const iconBtn = {
  width: 36, height: 36, borderRadius: "50%", border: `1px solid ${borderColor}`,
  background: white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
};
const topBadge = {
  position: "absolute", top: -2, right: -2, background: teal, color: white,
  borderRadius: 99, fontSize: 9, fontWeight: 700, minWidth: 16, height: 16,
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "0 4px", border: `1.5px solid ${white}`,
};

function HeroBanner() {
  return (
    <div style={{
      background: "linear-gradient(135deg, #E8F8F7 0%, #C5EEE9 60%, #B2E8E2 100%)",
      borderRadius: 18, overflow: "hidden", position: "relative",
      display: "flex", alignItems: "center", minHeight: 170, marginBottom: 24,
    }}>
      <div style={{ flex: 1, padding: "28px 32px", zIndex: 2, position: "relative" }}>
        <div style={{
          width: 62, height: 62, borderRadius: "50%", background: teal,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(11,158,142,0.35)", marginBottom: 14,
          position: "relative",
        }}>
          <IconCheck />
          {[[-14,-8,"#FCD34D",7],[12,-16,"#34D399",5],[-10,14,"#60A5FA",6],[16,10,"#F472B6",5]].map(([dx,dy,c,r],i)=>(
            <div key={i} style={{ position:"absolute", left:`calc(50% + ${dx}px)`, top:`calc(50% + ${dy}px)`, width:r, height:r, borderRadius:"50%", background:c, transform:"translate(-50%,-50%)" }}/>
          ))}
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: textPrimary, margin: "0 0 6px" }}>Booking Confirmation</h1>
        <p style={{ fontSize: 13.5, color: textSecondary, margin: "0 0 14px", lineHeight: 1.5 }}>
          Please review your ride details before<br />proceeding to payment.
        </p>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: white, borderRadius: 30, padding: "7px 16px",
          border: `1px solid ${borderColor}`, boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
        }}>
          <span style={{ fontSize: 13, color: textSecondary }}>Booking ID:</span>
          <span style={{ fontSize: 13.5, fontWeight: 700, color: textPrimary }}>HPN78291</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}><IconCopy /></button>
        </div>
      </div>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "42%", overflow: "hidden" }}>
        <svg viewBox="0 0 500 170" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
          <defs><linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8EEE9"/><stop offset="100%" stopColor="#A5DDD7"/></linearGradient></defs>
          <rect width="500" height="170" fill="url(#sky2)"/>
          <polygon points="0,100 120,30 240,100" fill="#80CBC4" opacity="0.5"/>
          <polygon points="100,100 230,20 360,100" fill="#4DB6AC" opacity="0.4"/>
          <polygon points="250,100 380,35 500,100" fill="#80CBC4" opacity="0.45"/>
          {[20,45,400,430,460].map((x,i)=>(<g key={i}><rect x={x+4} y="78" width="4" height="24" fill="#5D4037" opacity="0.6"/><polygon points={`${x},100 ${x+6},72 ${x+12},100`} fill="#2E7D32" opacity="0.7"/></g>))}
          <rect x="0" y="115" width="500" height="55" fill="#607D8B" opacity="0.8"/>
          {[0,80,160,240,320,400].map((x,i)=>(<rect key={i} x={x+10} y="138" width="50" height="5" rx="2" fill="white" opacity="0.3"/>))}
        </svg>
        <svg viewBox="0 0 260 110" style={{ position: "absolute", bottom: 10, right: 10, width: "88%", zIndex: 2 }}>
          <rect x="20" y="55" width="220" height="42" rx="10" fill="#B2DFDB"/>
          <rect x="45" y="30" width="165" height="40" rx="10" fill="#E0F2F1"/>
          <rect x="55" y="34" width="48" height="28" rx="5" fill="#B2EBF2" opacity="0.85"/>
          <rect x="112" y="34" width="48" height="28" rx="5" fill="#B2EBF2" opacity="0.85"/>
          <rect x="168" y="34" width="35" height="28" rx="5" fill="#B2EBF2" opacity="0.7"/>
          <circle cx="72" cy="96" r="18" fill="#37474F"/><circle cx="72" cy="96" r="10" fill="#607D8B"/><circle cx="72" cy="96" r="5" fill="#90A4AE"/>
          <circle cx="185" cy="96" r="18" fill="#37474F"/><circle cx="185" cy="96" r="10" fill="#607D8B"/><circle cx="185" cy="96" r="5" fill="#90A4AE"/>
          <rect x="230" y="62" width="14" height="8" rx="3" fill="#FFF9C4" opacity="0.9"/>
          <circle cx="190" cy="18" r="12" fill={teal}/><circle cx="190" cy="18" r="6" fill="white"/>
          <line x1="190" y1="30" x2="190" y2="38" stroke={teal} strokeWidth="3"/>
        </svg>
      </div>
    </div>
  );
}

function ProgressSteps() {
  const steps = [
    { icon: "✓", label: "Booking Confirmed", sub: "Just now", done: true },
    { icon: "👤", label: "Driver Assigned", sub: "In 2 min", done: true },
    { icon: "🚗", label: "Driver Arriving", sub: "In 8 min", done: false },
    { icon: "🏁", label: "Ride Start", sub: "Soon", done: false },
  ];
  return (
    <div style={{
      background: white, borderRadius: 16, padding: "20px 24px",
      border: `1px solid ${borderColor}`, marginBottom: 24,
      display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12,
    }}>
      {steps.map((step, i) => (
        <div key={step.label} style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 120 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, flex: 1 }}>
            <div style={{
              width: 42, height: 42, borderRadius: "50%",
              background: step.done ? tealLight : "#F3F4F6",
              border: `2px solid ${step.done ? teal : borderColor}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: step.icon === "✓" ? 16 : 18, color: step.done ? teal : textSecondary, fontWeight: 700,
            }}>{step.icon}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: step.done ? textPrimary : textSecondary }}>{step.label}</div>
              <div style={{ fontSize: 12, color: step.done ? teal : textSecondary, marginTop: 2 }}>{step.sub}</div>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ height: 2, width: 32, background: i < 1 ? teal : borderColor, flexShrink: 0, marginBottom: 24, alignSelf: "flex-start", marginTop: 20 }}/>
          )}
        </div>
      ))}
    </div>
  );
}

export default function BookingConfirmation() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
        @media (max-width: 768px) {
          .bc-content { padding: 16px !important; }
          .bc-body-grid { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: bgPage, overflow: "hidden" }}>
        <TopBar />
        <div className="bc-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px 32px" }}>
          <HeroBanner />
          <ProgressSteps />

          <div className="bc-body-grid" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
            {/* LEFT column */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Trip Details */}
              <div style={{ background: white, borderRadius: 16, padding: "22px 24px", border: `1px solid ${borderColor}` }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: textPrimary, marginBottom: 18 }}>Trip Details</h2>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 16 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 3 }}>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: teal, border: `3px solid ${tealLight}` }}/>
                        <div style={{ width: 2, height: 32, background: borderColor, margin: "2px 0" }}/>
                        <div style={{ width: 14, height: 14, borderRadius: "50%", background: red, border: "3px solid #FEE2E2" }}/>
                      </div>
                      <div>
                        <div style={{ marginBottom: 16 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>Sharda University, Greater Noida</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: teal, background: tealLight, borderRadius: 6, padding: "2px 8px" }}>Pickup</span>
                          </div>
                          <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>Knowledge Park III, Greater Noida, UP</div>
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>Noida Sector 62</span>
                            <span style={{ fontSize: 11, fontWeight: 600, color: red, background: "#FEE2E2", borderRadius: 6, padding: "2px 8px" }}>Drop</span>
                          </div>
                          <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>Noida, Uttar Pradesh</div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, background: tealLight, borderRadius: 10, padding: "10px 14px" }}>
                      <IconClock />
                      <span style={{ fontSize: 13, color: tealDark, fontWeight: 500 }}>Estimated travel time: 45 min (32.4 km)</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 170 }}>
                    {[
                      { icon: <IconCalendar/>, label: "Date", value: "12 May 2025, Monday" },
                      { icon: <IconClock/>, label: "Time", value: "09:30 AM" },
                      { icon: <IconSeat/>, label: "Seats", value: "1 Seat" },
                      { icon: <IconDistance/>, label: "Distance", value: "32.4 km" },
                    ].map(item => (
                      <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                        <div>
                          <div style={{ fontSize: 11, color: textSecondary }}>{item.label}</div>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Fare Breakdown */}
              <div style={{ background: white, borderRadius: 16, padding: "22px 24px", border: `1px solid ${borderColor}` }}>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: textPrimary, marginBottom: 18 }}>Fare Breakdown</h2>
                <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    {[
                      { label: "Base Fare", value: "₹210.00", color: teal },
                      { label: "Platform Fee", value: "₹20.00", color: teal },
                      { label: "Discount Applied (HOPIN10)", value: "-₹23.00", color: red },
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${borderColor}` }}>
                        <span style={{ fontSize: 13.5, color: row.label.includes("Discount") ? red : textSecondary }}>{row.label}</span>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: row.color }}>{row.value}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Total Payable</span>
                      <span style={{ fontSize: 16, fontWeight: 800, color: textPrimary }}>₹207.00</span>
                    </div>
                  </div>
                  <div style={{ background: tealLight, borderRadius: 14, padding: "16px 18px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, minWidth: 160, textAlign: "center" }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: white, display: "flex", alignItems: "center", justifyContent: "center" }}><IconShield /></div>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: tealDark, lineHeight: 1.4 }}>Your payment is secure and encrypted</div>
                    <div style={{ fontSize: 11, color: textSecondary, lineHeight: 1.4 }}>We do not store your card or UPI details.</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, background: white, borderRadius: 8, padding: "6px 12px", border: `1px solid ${borderColor}` }}>
                      <IconShield /><span style={{ fontSize: 12, fontWeight: 600, color: tealDark }}>100% Safe &amp; Secure</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT column */}
            <div style={{ width: 300, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Driver & Vehicle */}
              <div style={{ background: white, borderRadius: 16, padding: "20px", border: `1px solid ${borderColor}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: textPrimary, marginBottom: 14 }}>Driver &amp; Vehicle</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, #a8edea, #fed6e3)", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: tealDark, flexShrink: 0 }}>RK</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: textPrimary }}>Rohit Kumar</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3 }}>
                      <span style={{ fontSize: 14, color: "#F59E0B" }}>★</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>4.8</span>
                      <span style={{ fontSize: 12, color: textSecondary }}>(120 rides)</span>
                    </div>
                  </div>
                  <button style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${borderColor}`, background: white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><IconPhone /></button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: bgPage, borderRadius: 12, padding: "12px" }}>
                  <div style={{ width: 56, height: 40, borderRadius: 8, background: "#E0F2F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="44" height="22" viewBox="0 0 44 22" fill="none">
                      <rect x="2" y="8" width="40" height="10" rx="5" fill="#B2DFDB"/>
                      <rect x="8" y="3" width="28" height="8" rx="4" fill="#E0F2F1"/>
                      <circle cx="11" cy="18" r="4" fill="#37474F"/><circle cx="33" cy="18" r="4" fill="#37474F"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>White Honda City</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginTop: 2, fontWeight: 500, letterSpacing: 0.5 }}>UP16 AB 1234</div>
                  </div>
                </div>
              </div>

              {/* Your Seat */}
              <div style={{ background: white, borderRadius: 16, padding: "20px", border: `1px solid ${borderColor}` }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: textPrimary, marginBottom: 14 }}>Your Seat</h3>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 60, height: 60, borderRadius: 12, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="36" height="44" viewBox="0 0 36 44" fill="none">
                      <rect x="6" y="2" width="24" height="22" rx="6" fill="#80CBC4"/>
                      <rect x="4" y="24" width="28" height="14" rx="5" fill="#4DB6AC"/>
                      <rect x="2" y="35" width="8" height="9" rx="3" fill="#00897B"/>
                      <rect x="26" y="35" width="8" height="9" rx="3" fill="#00897B"/>
                      <rect x="8" y="5" width="20" height="14" rx="4" fill="#B2DFDB"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: textPrimary }}>Front Seat</div>
                    <div style={{ fontSize: 12.5, color: textSecondary, marginTop: 2 }}>Seat next to driver</div>
                    <span style={{ display: "inline-block", marginTop: 6, fontSize: 11, fontWeight: 700, color: teal, background: tealLight, borderRadius: 6, padding: "3px 10px", border: `1px solid ${teal}33` }}>Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Policies */}
              <div style={{ background: white, borderRadius: 16, padding: "16px 20px", border: `1px solid ${borderColor}` }}>
                {[
                  { icon: <IconShield />, title: "Free Cancellation", desc: "Cancel up to 10 min before pickup" },
                  { icon: <IconHeadphones />, title: "24x7 Support", desc: "We're here to help you anytime" },
                  { icon: <IconShield />, title: "Ride Insurance", desc: "Your ride is insured for your safety" },
                ].map((item, i, arr) => (
                  <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < arr.length - 1 ? `1px solid ${borderColor}` : "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 1 }}>{item.desc}</div>
                    </div>
                    <IconChevronRight />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Bottom action bar ── */}
          <div style={{ background: white, borderRadius: 16, marginTop: 24, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
            <div style={{ display: "flex" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  flex: 1, padding: "18px 0", border: "none", background: white,
                  fontSize: 15, fontWeight: 600, color: textPrimary, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  borderRight: `1px solid ${borderColor}`,
                }}
              >
                <IconArrowLeft /> Back
              </button>
              <button
                onClick={() => navigate("/payment")}
                style={{
                  flex: 2, padding: "18px 0", border: "none",
                  background: `linear-gradient(90deg, ${teal}, ${tealDark})`,
                  fontSize: 15, fontWeight: 700, color: white, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  letterSpacing: 0.2,
                }}
              >
                Proceed to Payment <IconArrow />
              </button>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "10px 0", background: "#FAFAFA", borderTop: `1px solid ${borderColor}` }}>
              <IconLock />
              <span style={{ fontSize: 12, color: textSecondary }}>Secure checkout &bull; Multiple payment options</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}