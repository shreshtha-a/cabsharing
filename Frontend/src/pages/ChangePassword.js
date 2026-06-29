import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teal = "#00897B";
const tealLight = "#e6f4f2";
const tealDark = "#00695C";

// ─── Shield + lock SVG illustration ───────────────────────
function ShieldIllustration() {
  return (
    <div style={{ position: "relative", width: 220, height: 250, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="220" height="210" viewBox="0 0 220 210" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft mint background circle */}
        <circle cx="110" cy="105" r="90" fill="#cceae5" />

        {/* Scattered decorative dots */}
        <circle cx="26"  cy="68"  r="5.5" fill="#80cbc4" opacity="0.75" />
        <circle cx="193" cy="75"  r="4"   fill={teal}    opacity="0.45" />
        <circle cx="188" cy="150" r="6.5" fill="#80cbc4" opacity="0.60" />
        <circle cx="32"  cy="155" r="4"   fill={teal}    opacity="0.38" />
        <circle cx="58"  cy="22"  r="3"   fill="#b2dfdb" opacity="0.70" />
        <circle cx="164" cy="20"  r="3.5" fill="#80cbc4" opacity="0.60" />
        <circle cx="204" cy="112" r="3"   fill="#b2dfdb" opacity="0.50" />
        <circle cx="16"  cy="112" r="4"   fill="#b2dfdb" opacity="0.50" />

        {/* Shield body */}
        <path
          d="M110 32 L157 55 L157 118 Q157 160 110 180 Q63 160 63 118 L63 55 Z"
          fill={teal}
        />
        {/* Subtle inner depth on shield */}
        <path
          d="M110 44 L149 65 L149 118 Q149 152 110 169 Q71 152 71 118 L71 65 Z"
          fill={tealDark}
          opacity="0.18"
        />

        {/* Lock body – white rounded rect */}
        <rect x="89" y="108" width="42" height="34" rx="7" fill="white" />

        {/* Lock shackle – U arc */}
        <path
          d="M96 108 L96 91 Q110 76 124 91 L124 108"
          stroke="white"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Keyhole */}
        <circle cx="110" cy="121" r="5.5" fill={teal} />
        <rect   x="107.2" y="121" width="5.5" height="10" rx="2" fill={teal} />
      </svg>

      {/* *** password pill badge */}
      <div style={{
        position: "absolute",
        bottom: 10,
        right: 4,
        background: "#fff",
        borderRadius: 30,
        padding: "7px 22px",
        boxShadow: "0 3px 14px rgba(0,0,0,0.11)",
        display: "flex",
        alignItems: "center",
        gap: 6,
        letterSpacing: 5,
      }}>
        <span style={{ color: teal, fontSize: 18, fontWeight: 900, lineHeight: 1 }}>* * *</span>
      </div>
    </div>
  );
}

// ─── Eye icon ─────────────────────────────────────────────
function EyeIcon({ visible }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {visible ? (
        <>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
          <line x1="1" y1="1" x2="23" y2="23" />
        </>
      ) : (
        <>
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </>
      )}
    </svg>
  );
}

// ─── Requirement check badge ───────────────────────────────
function CheckBadge({ met }) {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" style={{ flexShrink: 0 }}>
      <circle cx="8.5" cy="8.5" r="8.5" fill={met ? teal : "#e5e7eb"} />
      <path d="M5.5 9 L7.5 11 L12 6" fill="none" stroke="white" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Shared compact styles ─────────────────────────────────
const s = {
  iconBtn: {
    position: "relative",
    background: "#f3f4f6",
    border: "none",
    borderRadius: "50%",
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 18,
  },
  dot: (color) => ({
    position: "absolute",
    top: 5,
    right: 5,
    background: color,
    color: "#fff",
    borderRadius: 99,
    fontSize: 10,
    fontWeight: 700,
    minWidth: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  avatar: {
    width: 42,
    height: 42,
    borderRadius: "50%",
    background: "linear-gradient(135deg,#80cbc4,#00897B)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    flexShrink: 0,
  },
  label: {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#1a2332",
    marginBottom: 9,
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "13px 48px 13px 16px",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    fontSize: 13.5,
    color: "#1a2332",
    background: "#fff",
    fontFamily: "'Inter','Segoe UI',sans-serif",
    transition: "border-color 0.15s, box-shadow 0.15s",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: 14,
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
  },
};

// ─── Main component ────────────────────────────────────────
export default function ChangePassword() {
  const navigate = useNavigate();

  const [currentPwd, setCurrentPwd]   = useState("");
  const [newPwd,     setNewPwd]       = useState("");
  const [confirmPwd, setConfirmPwd]   = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew,     setShowNew]     = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const checks = {
    uppercase: /[A-Z]/.test(newPwd),
    lowercase: /[a-z]/.test(newPwd),
    number:    /[0-9]/.test(newPwd),
    special:   /[!@#$%^&*]/.test(newPwd),
  };

  const requirements = [
    { key: "uppercase", label: "Uppercase (A-Z)" },
    { key: "lowercase", label: "Lowercase (a-z)" },
    { key: "number",    label: "Number (0-9)" },
    { key: "special",   label: "Special Character (!@#$%^&*)" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafb", fontFamily: "'Inter','Segoe UI',sans-serif", color: "#1a2332" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .cp-input:focus  { border-color: ${teal} !important; box-shadow: 0 0 0 3px ${tealLight} !important; }
        .cp-back:hover   { color: ${teal} !important; }
        .cp-cancel:hover { background: #f3f4f6 !important; }
        .cp-submit:hover { background: ${tealDark} !important; }
      `}</style>

      {/* ── Top bar ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 36px 16px 36px" }}>
        <button
          className="cp-back"
          onClick={() => navigate("/settings")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "#1a2332",
            fontFamily: "inherit", transition: "color 0.15s",
          }}
        >
          <span style={{ fontSize: 20, lineHeight: 1, marginTop: -1 }}>←</span>
          Back to Security &amp; Privacy
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={s.iconBtn}>☀️</button>
          <button style={{ ...s.iconBtn, position: "relative" }}>
            💬<span style={s.dot(teal)}>2</span>
          </button>
          <button style={{ ...s.iconBtn, position: "relative" }}>
            🔔<span style={s.dot("#ef4444")}>3</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={s.avatar}>AS</div>
            <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1a2332", whiteSpace: "nowrap" }}>Ananya Sharma</span>
            <span style={{ color: "#9ca3af" }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div style={{ padding: "8px 36px 48px 36px", maxWidth: 960 }}>

        {/* Page title */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a2332", lineHeight: 1.2 }}>Change Password</h1>
          <p style={{ fontSize: 13.5, color: "#6b7280", marginTop: 8 }}>
            Update your password regularly to keep your account secure.
          </p>
        </div>

        {/* ── Main card ── */}
        <div style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 1px 12px rgba(0,0,0,0.07)",
          display: "flex",
          overflow: "hidden",
          marginBottom: 20,
        }}>
          {/* Left: Illustration panel */}
          <div style={{
            width: 310,
            minWidth: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "36px 28px",
            borderRight: "1px solid #f3f4f6",
            background: "#fdfdfd",
          }}>
            <ShieldIllustration />
          </div>

          {/* Right: Form panel */}
          <div style={{ flex: 1, padding: "40px 44px" }}>

            {/* Current Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={s.label}>Current Password</label>
              <div style={s.inputWrap}>
                <input
                  className="cp-input"
                  type={showCurrent ? "text" : "password"}
                  value={currentPwd}
                  onChange={e => setCurrentPwd(e.target.value)}
                  placeholder="Enter your current password"
                  style={s.input}
                />
                <button style={s.eyeBtn} onClick={() => setShowCurrent(v => !v)}>
                  <EyeIcon visible={showCurrent} />
                </button>
              </div>
            </div>

            {/* New Password */}
            <div style={{ marginBottom: 24 }}>
              <label style={s.label}>New Password</label>
              <div style={s.inputWrap}>
                <input
                  className="cp-input"
                  type={showNew ? "text" : "password"}
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  placeholder="Enter your new password"
                  style={s.input}
                />
                <button style={s.eyeBtn} onClick={() => setShowNew(v => !v)}>
                  <EyeIcon visible={showNew} />
                </button>
              </div>

              {/* Password requirements */}
              <div style={{ marginTop: 11 }}>
                <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 9 }}>
                  Password must be at least 8 characters and include
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px" }}>
                  {requirements.map(req => (
                    <div key={req.key} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <CheckBadge met={checks[req.key]} />
                      <span style={{
                        fontSize: 12.5,
                        color: checks[req.key] ? teal : "#6b7280",
                        fontWeight: checks[req.key] ? 600 : 400,
                        transition: "color 0.2s",
                      }}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confirm New Password */}
            <div style={{ marginBottom: 36 }}>
              <label style={s.label}>Confirm New Password</label>
              <div style={s.inputWrap}>
                <input
                  className="cp-input"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                  placeholder="Confirm your new password"
                  style={s.input}
                />
                <button style={s.eyeBtn} onClick={() => setShowConfirm(v => !v)}>
                  <EyeIcon visible={showConfirm} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
              <button
                className="cp-cancel"
                onClick={() => navigate("/settings")}
                style={{
                  padding: "12px 34px",
                  borderRadius: 10,
                  border: "1.5px solid #e5e7eb",
                  background: "#fff",
                  color: "#1a2332",
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                Cancel
              </button>
              <button
                className="cp-submit"
                style={{
                  padding: "12px 34px",
                  borderRadius: 10,
                  border: "none",
                  background: teal,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "background 0.15s",
                }}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>

        {/* ── Security tip card ── */}
        <div style={{
          background: "#fff",
          borderRadius: 14,
          padding: "18px 24px",
          display: "flex",
          alignItems: "center",
          gap: 16,
          boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
        }}>
          <div style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: tealLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
            flexShrink: 0,
          }}>
            🔒
          </div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#1a2332" }}>Keep your account secure</div>
            <div style={{ fontSize: 12.5, color: "#6b7280", marginTop: 3 }}>
              Avoid using common passwords and don't share your password with anyone.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}