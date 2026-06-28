import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const teal = "#0B9E8E";
const tealLight = "#E6F7F6";
const tealDark = "#097A6D";
const textPrimary = "#1A1A2E";
const textSecondary = "#6B7280";
const borderColor = "#E5E7EB";
const bgPage = "#F8FAFA";
const white = "#FFFFFF";
const red = "#EF4444";
const green = "#10B981";

const IconHeadphones = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/>
  </svg>
);
const IconBell = ({ color }) => (
  <svg width="18" height="18" fill="none" stroke={color || textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
  </svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconCopy = () => (
  <svg width="16" height="16" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);
const IconPin = () => (
  <svg width="17" height="17" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z"/><circle cx="12" cy="8" r="2.25"/>
  </svg>
);
const IconMsg = () => (
  <svg width="17" height="17" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
);
const IconPhone = () => (
  <svg width="17" height="17" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconShare = () => (
  <svg width="17" height="17" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="17" height="17" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconShield = ({ size = 20 }) => (
  <svg width={size} height={size} fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11C5.5 20.74 2 16 2 11V5l10-3z"/>
  </svg>
);
const IconRefund = () => (
  <svg width="20" height="20" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/>
  </svg>
);
const IconUsers = () => (
  <svg width="20" height="20" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconDistance = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12"/><polyline points="8 7 3 12 8 17"/><polyline points="16 7 21 12 16 17"/>
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconSeatSm = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 11V6a2 2 0 012-2h12a2 2 0 012 2v5"/><path d="M4 11h16v6H4z"/><path d="M8 17v3M16 17v3"/>
  </svg>
);

function GPay() {
  return (
    <svg width="22" height="22" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
      <text x="5" y="24" fontSize="13" fontWeight="800" fill="#4285F4">G</text>
      <text x="15" y="24" fontSize="11" fontWeight="700" fill="#34A853">P</text>
      <text x="23" y="24" fontSize="11" fontWeight="700" fill="#EA4335">a</text>
    </svg>
  );
}

const confettiDots = [
  {x:60,y:80,c:"#FCD34D",s:8,d:true},{x:120,y:55,c:"#34D399",s:6,d:false},
  {x:185,y:100,c:"#60A5FA",s:7,d:true},{x:250,y:45,c:"#F472B6",s:5,d:false},
  {x:310,y:90,c:"#FCD34D",s:6,d:true},{x:370,y:65,c:"#A78BFA",s:8,d:false},
  {x:430,y:50,c:"#34D399",s:5,d:true},{x:490,y:95,c:"#F87171",s:7,d:false},
  {x:550,y:60,c:"#FCD34D",s:6,d:true},{x:615,y:85,c:"#60A5FA",s:8,d:false},
  {x:670,y:48,c:"#F472B6",s:5,d:true},{x:730,y:100,c:"#34D399",s:7,d:false},
  {x:80,y:200,c:"#A78BFA",s:5,d:true},{x:155,y:215,c:"#F87171",s:6,d:false},
  {x:650,y:205,c:"#FCD34D",s:5,d:true},{x:735,y:190,c:"#60A5FA",s:7,d:false},
  {x:38,y:148,c:"#34D399",s:4,d:true},{x:775,y:148,c:"#F472B6",s:6,d:false},
];

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText("HPN78291");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: ${bgPage}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
        .ps-fade { opacity: 0; transform: translateY(14px); transition: opacity 0.5s ease, transform 0.5s ease; }
        .ps-fade.in { opacity: 1; transform: translateY(0); }
        .ps-action-btn:hover { background: ${tealLight} !important; border-color: ${teal} !important; color: ${teal} !important; }
        .ps-track-btn:hover { background: ${tealDark} !important; }
        @media (max-width: 900px) {
          .ps-layout { flex-direction: column !important; }
          .ps-right { width: 100% !important; min-width: unset !important; }
          .ps-action-row { flex-wrap: wrap !important; }
          .ps-footer-bar { flex-wrap: wrap !important; }
          .ps-footer-item:not(:first-child) { border-left: none !important; border-top: 1px solid ${borderColor} !important; padding-top: 12px !important; }
        }
        @media (max-width: 600px) {
          .ps-outer { padding: 14px !important; }
          .ps-topbar { padding: 12px 16px !important; }
          .ps-need-help span { display: none; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: bgPage, fontFamily: "'Inter', sans-serif" }}>

        {/* ── Top bar (no sidebar) ─────────────────────────────── */}
        <div className="ps-topbar" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "13px 32px", background: white, borderBottom: `1px solid ${borderColor}`,
          position: "sticky", top: 0, zIndex: 10,
        }}>
          {/* Logo */}
          <div style={{ cursor: "pointer" }} onClick={() => navigate("/home")}>
            <div style={{ fontSize: 28, fontWeight: 800, color: textPrimary, lineHeight: 1, letterSpacing: -0.5 }}>
              Hop<span style={{ color: teal }}>in</span>
              <span style={{ color: teal, fontSize: 9, marginLeft: 1 }}>●</span>
            </div>
            <div style={{ fontSize: 11, color: teal, fontWeight: 600, marginTop: 1 }}>Together. Every Mile.</div>
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="ps-need-help" style={{
              display: "flex", alignItems: "center", gap: 7,
              border: `1px solid ${borderColor}`, borderRadius: 30, padding: "8px 16px",
              background: white, cursor: "pointer", fontSize: 13.5, fontWeight: 500, color: textPrimary,
            }}>
              <IconHeadphones /><span>Need help?</span>
            </button>
            <div style={{ position: "relative" }}>
              <button style={{ width: 38, height: 38, borderRadius: "50%", border: `1px solid ${borderColor}`, background: white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <IconBell />
              </button>
              <span style={{ position: "absolute", top: -2, right: -2, background: red, color: white, borderRadius: 99, fontSize: 9, fontWeight: 700, minWidth: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", border: `1.5px solid ${white}` }}>3</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#a8edea,#fed6e3)", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: tealDark }}>AR</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: textPrimary, lineHeight: 1 }}>Aryan Rastogi</div>
                <div style={{ fontSize: 11, color: teal, fontWeight: 600, marginTop: 2 }}>Level 3</div>
              </div>
              <IconChevronDown />
            </div>
          </div>
        </div>

        {/* ── Page content ─────────────────────────────────────── */}
        <div className="ps-outer" style={{ padding: "28px 32px 48px", maxWidth: 1200, margin: "0 auto" }}>
          <div className="ps-layout" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

            {/* ── LEFT ──────────────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Success hero */}
              <div className={`ps-fade${visible ? " in" : ""}`} style={{
                background: white, borderRadius: 20, border: `1px solid ${borderColor}`,
                overflow: "hidden", position: "relative", textAlign: "center", padding: "52px 32px 40px",
              }}>
                {/* Confetti */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 800 280" preserveAspectRatio="xMidYMid slice">
                  {confettiDots.map((d, i) => (
                    d.d
                      ? <rect key={i} x={d.x-d.s/2} y={d.y-d.s/2} width={d.s} height={d.s} fill={d.c} opacity="0.7" transform={`rotate(45 ${d.x} ${d.y})`} rx="1"/>
                      : <circle key={i} cx={d.x} cy={d.y} r={d.s/2} fill={d.c} opacity="0.65"/>
                  ))}
                </svg>

                {/* Big check */}
                <div style={{ position: "relative", zIndex: 2, display: "inline-flex", marginBottom: 22 }}>
                  <div style={{
                    width: 88, height: 88, borderRadius: "50%",
                    background: "linear-gradient(135deg, #10B981, #059669)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 8px 32px rgba(16,185,129,0.35)",
                  }}>
                    <svg width="44" height="44" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                </div>

                <div style={{ position: "relative", zIndex: 2 }}>
                  <h1 style={{ fontSize: 28, fontWeight: 800, margin: "0 0 8px" }}>
                    <span style={{ color: teal }}>Payment</span>{" "}<span style={{ color: green }}>Successful!</span>
                  </h1>
                  <p style={{ fontSize: 17, fontWeight: 600, color: textPrimary, margin: "0 0 8px" }}>Your ride has been confirmed</p>
                  <p style={{ fontSize: 13.5, color: textSecondary, lineHeight: 1.65, margin: "0 0 22px" }}>
                    Thank you for choosing Hopin.<br />We're excited to have you on board! 🎉
                  </p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: tealLight, border: `1.5px solid ${teal}33`, borderRadius: 30, padding: "9px 20px" }}>
                    <span style={{ fontSize: 13.5, color: textSecondary }}>Booking ID:</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: teal }}>HPN78291</span>
                    <button onClick={handleCopy} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", padding: 0 }}>
                      {copied
                        ? <svg width="16" height="16" fill="none" stroke={green} strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                        : <IconCopy />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Savings banner */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>🎁</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: teal }}>You saved ₹20 on this ride!</div>
                  <div style={{ fontSize: 12.5, color: textSecondary, marginTop: 2 }}>Thanks for using HOPIN10 promo code</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>HOPIN10</span>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="12" height="12" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "22px 22px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary, marginBottom: 22 }}>What happens next?</div>

                {/* Steps */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  {[
                    { icon: null, label: "Payment Completed", sub: "Just now", filled: true },
                    { icon: null, label: "Seat Reserved",     sub: "Just now", filled: true },
                    { icon: "🚗", label: "Driver Arriving",  sub: "In ~8 min", filled: false },
                    { icon: "🏁", label: "Ride Starts",      sub: "08:30 AM",  filled: false },
                    { icon: "📍", label: "You Reach",        sub: "~09:15 AM", filled: false },
                  ].map((step, i, arr) => (
                    <div key={step.label} style={{ display: "flex", alignItems: "flex-start", flex: 1 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                        <div style={{
                          width: 46, height: 46, borderRadius: "50%", marginBottom: 8,
                          background: step.filled ? teal : "#F3F4F6",
                          border: `2px solid ${step.filled ? teal : borderColor}`,
                          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                        }}>
                          {step.filled
                            ? <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                            : step.icon}
                        </div>
                        <div style={{ fontSize: 11.5, fontWeight: 600, color: step.filled ? textPrimary : textSecondary, textAlign: "center", lineHeight: 1.3 }}>{step.label}</div>
                        <div style={{ fontSize: 11, color: step.filled ? teal : textSecondary, marginTop: 3, textAlign: "center" }}>{step.sub}</div>
                      </div>
                      {i < arr.length - 1 && (
                        <div style={{
                          marginTop: 22, flexShrink: 0, height: 2, flex: 1,
                          background: step.filled ? teal : "transparent",
                          backgroundImage: step.filled ? "none" : `repeating-linear-gradient(to right, ${borderColor} 0, ${borderColor} 6px, transparent 6px, transparent 12px)`,
                        }}/>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action buttons */}
                <div className="ps-action-row" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button className="ps-track-btn" style={{
                    display: "flex", alignItems: "center", gap: 8,
                    background: teal, color: white, border: "none", borderRadius: 12,
                    padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "background 0.15s",
                  }}><IconPin /> Track Driver Live</button>
                  {[
                    { icon: <IconMsg />,      label: "Message Driver" },
                    { icon: <IconPhone />,    label: "Call Driver" },
                    { icon: <IconShare />,    label: "Share Ride" },
                    { icon: <IconCalendar />, label: "Add to Calendar" },
                  ].map(btn => (
                    <button key={btn.label} className="ps-action-btn" style={{
                      display: "flex", alignItems: "center", gap: 7,
                      background: white, color: textPrimary,
                      border: `1.5px solid ${borderColor}`, borderRadius: 12,
                      padding: "11px 16px", fontSize: 13.5, fontWeight: 500,
                      cursor: "pointer", transition: "all 0.15s",
                    }}>{btn.icon} {btn.label}</button>
                  ))}
                </div>

                {/* Notification tip */}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18, background: tealLight, borderRadius: 10, padding: "11px 16px" }}>
                  <IconBell color={tealDark} />
                  <span style={{ fontSize: 13, color: tealDark, fontWeight: 500 }}>You will receive a notification when your driver arrives.</span>
                </div>
              </div>

              {/* Footer trust badges */}
              <div className="ps-footer-bar" style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "18px 22px", display: "flex", flexWrap: "wrap" }}>
                {[
                  { icon: <IconShield />,  title: "Secure Payment",        desc: "Your payment details are encrypted" },
                  { icon: <IconHeadphones />, title: "24/7 Support",       desc: "We're here to help anytime" },
                  { icon: <IconRefund />,  title: "Refund Protected",       desc: "Easy refunds if ride is cancelled" },
                  { icon: <IconUsers />,   title: "Trusted by 10L+ riders", desc: "Thank you for riding with Hopin" },
                ].map((item, i) => (
                  <div key={item.title} className="ps-footer-item" style={{
                    flex: 1, minWidth: 130, display: "flex", alignItems: "flex-start", gap: 10,
                    padding: "0 16px", borderLeft: i > 0 ? `1px solid ${borderColor}` : "none",
                  }}>
                    <div style={{ width: 34, height: 34, borderRadius: 8, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT ─────────────────────────────────────────── */}
            <div className="ps-right" style={{ width: 320, minWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Ride Details */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${borderColor}` }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Ride Details</div>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: green }}/>
                      <div style={{ width: 1.5, height: 36, background: borderColor, margin: "3px 0" }}/>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: red }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Sharda University</div>
                            <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 1 }}>Knowledge Park III, Greater Noida, UP</div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, marginLeft: 8, flexShrink: 0 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: teal, background: tealLight, borderRadius: 6, padding: "2px 8px" }}>Pickup</span>
                            <span style={{ fontSize: 11.5, color: textSecondary }}>08:30 AM</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Noida Sector 62</div>
                            <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 1 }}>Noida, Uttar Pradesh</div>
                          </div>
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, marginLeft: 8, flexShrink: 0 }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: red, background: "#FEE2E2", borderRadius: 6, padding: "2px 8px" }}>Drop</span>
                            <span style={{ fontSize: 11.5, color: textSecondary }}>09:15 AM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: `1px solid ${borderColor}`, flexWrap: "wrap", gap: 8 }}>
                    {[{icon:<IconDistance/>,val:"22 km"},{icon:<IconClock/>,val:"~45 min"},{icon:<IconSeatSm/>,val:"1 Seat"}].map((item,i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        {item.icon}<span style={{ fontSize: 12.5, color: textSecondary, fontWeight: 500 }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Driver & Vehicle */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "18px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary, marginBottom: 14 }}>Driver &amp; Vehicle</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#a8edea,#fed6e3)", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 700, color: tealDark }}>RK</div>
                    <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: green, border: `2px solid ${white}` }}/>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: textPrimary }}>Rohit Kumar</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                      <span style={{ fontSize: 14, color: "#F59E0B" }}>★</span>
                      <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>4.8</span>
                      <span style={{ fontSize: 12, color: textSecondary }}>(120 rides)</span>
                    </div>
                  </div>
                  <button style={{ width: 38, height: 38, borderRadius: "50%", border: `1.5px solid ${borderColor}`, background: tealLight, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconPhone />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, background: bgPage, borderRadius: 12, padding: "12px" }}>
                  <div style={{ width: 64, height: 44, borderRadius: 8, background: "#E0F2F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="52" height="26" viewBox="0 0 52 26" fill="none">
                      <rect x="2" y="10" width="48" height="12" rx="6" fill="#B2DFDB"/>
                      <rect x="9" y="4" width="34" height="10" rx="5" fill="#E0F2F1"/>
                      <rect x="12" y="5" width="10" height="7" rx="2" fill="#B2EBF2" opacity="0.9"/>
                      <rect x="25" y="5" width="12" height="7" rx="2" fill="#B2EBF2" opacity="0.8"/>
                      <circle cx="13" cy="22" r="5" fill="#37474F"/><circle cx="13" cy="22" r="2.5" fill="#90A4AE"/>
                      <circle cx="39" cy="22" r="5" fill="#37474F"/><circle cx="39" cy="22" r="2.5" fill="#90A4AE"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>White Honda City</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginTop: 2, fontWeight: 600, letterSpacing: 0.5 }}>UP16 AB 1234</div>
                  </div>
                </div>
              </div>

              {/* Your Seat */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "18px 20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary, marginBottom: 14 }}>Your Seat</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 12, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
                      <rect x="6" y="2" width="28" height="24" rx="7" fill="#80CBC4"/>
                      <rect x="4" y="26" width="32" height="15" rx="6" fill="#4DB6AC"/>
                      <rect x="2" y="38" width="9" height="10" rx="3" fill="#00897B"/>
                      <rect x="29" y="38" width="9" height="10" rx="3" fill="#00897B"/>
                      <rect x="9" y="5" width="22" height="16" rx="5" fill="#B2DFDB"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: textPrimary }}>A2 (Window)</div>
                    <div style={{ fontSize: 12.5, color: textSecondary, marginTop: 2 }}>Seat next to window</div>
                    <span style={{ display: "inline-block", marginTop: 7, fontSize: 11.5, fontWeight: 700, color: teal, background: tealLight, borderRadius: 8, padding: "4px 12px", border: `1px solid ${teal}33` }}>Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Payment Details */}
              <div style={{ background: white, borderRadius: 16, border: `1px solid ${borderColor}`, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Payment Details</div>
                  <span style={{ fontSize: 11.5, fontWeight: 700, color: green, background: "#D1FAE5", borderRadius: 20, padding: "3px 10px" }}>Paid</span>
                </div>
                {[
                  { label: "Payment Method", value: <span style={{ display:"flex",alignItems:"center",gap:4 }}>UPI <GPay/></span> },
                  { label: "Paid Amount",    value: "₹120", bold: true },
                  { label: "Transaction ID", value: "pay_QR8xY9zL2k", mono: true },
                  { label: "Paid on",        value: "12 May 2025, 08:26 AM" },
                ].map((row, i, arr) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: i < arr.length - 1 ? `1px solid ${borderColor}` : "none" }}>
                    <span style={{ fontSize: 13, color: textSecondary }}>{row.label}</span>
                    <span style={{ fontSize: row.bold ? 15 : 13, fontWeight: row.bold ? 800 : 500, color: row.bold ? textPrimary : textSecondary, fontFamily: row.mono ? "monospace" : "inherit", display: "flex", alignItems: "center", gap: 4 }}>{row.value}</span>
                  </div>
                ))}
                <button style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 14, background: "none", border: "none", cursor: "pointer", color: teal, fontSize: 13.5, fontWeight: 600, padding: 0 }}>
                  <IconDownload /> Download Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}