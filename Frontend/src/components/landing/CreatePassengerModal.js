import { useState, useRef, useEffect } from "react";

const S = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 1000,
    boxSizing: "border-box",
  },
  modal: {
    background: "#fff",
    borderRadius: 20,
    padding: "32px 28px 24px",
    width: "100%",
    maxWidth: 420,
    boxSizing: "border-box",
    position: "relative",
    boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  closeBtn: {
    position: "absolute",
    top: 16,
    right: 16,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#94A3B8",
    fontSize: 20,
    lineHeight: 1,
    padding: 4,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: { textAlign: "center", marginBottom: 24 },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: "50%",
    background: "#E6F7F4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: 26,
    color: "#1D9E75",
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginBottom: 6,
  },
  title: { margin: 0, fontSize: 20, fontWeight: 700, color: "#0F2D52" },
  badge: {
    fontSize: 12,
    fontWeight: 600,
    background: "#E6F7F4",
    color: "#0F6E56",
    borderRadius: 20,
    padding: "2px 10px",
    whiteSpace: "nowrap",
  },
  subtitle: { margin: 0, fontSize: 14, color: "#64748B" },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: "#374151",
    display: "block",
    marginBottom: 6,
  },
  required: { color: "#E24B4A" },
  inputWrap: { position: "relative" },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 16,
    color: "#94A3B8",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px 10px 38px",
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    fontSize: 14,
    color: "#0F2D52",
    outline: "none",
    transition: "border-color 0.15s",
  },
  inputError: { borderColor: "#E24B4A" },
  errMsg: { fontSize: 12, color: "#E24B4A", marginTop: 4, display: "block" },
  field: { marginBottom: 16 },
  phoneRow: { display: "flex", gap: 8 },
  selectWrap: { position: "relative" },
  select: {
    padding: "10px 28px 10px 10px",
    borderRadius: 10,
    border: "1px solid #E5E7EB",
    fontSize: 14,
    color: "#0F2D52",
    appearance: "none",
    cursor: "pointer",
    minWidth: 72,
    background: "#fff",
    outline: "none",
  },
  selectArrow: {
    position: "absolute",
    right: 8,
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: 12,
    color: "#94A3B8",
    pointerEvents: "none",
  },
  genderRow: { display: "flex", gap: 8 },
  genderOpt: (active) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "10px 8px",
    borderRadius: 10,
    border: active ? "1.5px solid #1D9E75" : "1px solid #E5E7EB",
    background: active ? "#E6F7F4" : "#fff",
    cursor: "pointer",
    fontSize: 13,
    color: "#0F2D52",
    fontWeight: active ? 600 : 400,
    transition: "all 0.15s",
    userSelect: "none",
  }),
  genderDot: (active) => ({
    width: 16,
    height: 16,
    borderRadius: "50%",
    border: active ? "none" : "1.5px solid #CBD5E1",
    background: active ? "#1D9E75" : "transparent",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 10,
  }),
  checkRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    marginBottom: 10,
    userSelect: "none",
  },
  checkbox: (checked) => ({
    width: 18,
    height: 18,
    borderRadius: 5,
    border: checked ? "none" : "1.5px solid #CBD5E1",
    background: checked ? "#1D9E75" : "transparent",
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 11,
    transition: "all 0.15s",
  }),
  checkLabel: { fontSize: 13, color: "#64748B" },
  link: { color: "#1D9E75", textDecoration: "none", fontWeight: 600 },
  primaryBtn: {
    width: "100%",
    padding: 13,
    borderRadius: 12,
    background: "#0F2D52",
    color: "#fff",
    border: "none",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    marginBottom: 16,
    transition: "opacity 0.15s",
  },
  divider: { textAlign: "center", position: "relative", marginBottom: 16 },
  dividerLine: {
    height: 1,
    background: "#E5E7EB",
    position: "absolute",
    top: "50%",
    width: "100%",
  },
  dividerText: {
    position: "relative",
    background: "#fff",
    padding: "0 12px",
    fontSize: 12,
    color: "#94A3B8",
  },
  googleBtn: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    background: "#fff",
    border: "1px solid #E5E7EB",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    color: "#374151",
    marginBottom: 20,
    transition: "background 0.15s",
  },
  footerText: { textAlign: "center", fontSize: 13, color: "#64748B", margin: 0 },
  otpGrid: { display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 },
  otpBox: (filled) => ({
    width: 46,
    height: 54,
    textAlign: "center",
    fontSize: 22,
    fontWeight: 700,
    color: "#0F2D52",
    borderRadius: 10,
    border: filled ? "2px solid #1D9E75" : "1px solid #E5E7EB",
    outline: "none",
    background: "#fff",
    caretColor: "#1D9E75",
  }),
  successIcon: {
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "#E6F7F4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
    fontSize: 32,
  },
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.6 2.5 30.1 0 24 0 14.8 0 6.9 5.4 3 13.3l7.8 6C12.5 13.2 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.9-2.2 5.4-4.7 7l7.3 5.7c4.3-4 6.8-9.9 6.8-16.7z" />
      <path fill="#FBBC05" d="M10.8 28.7A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.7-4.7L2.4 13.3A23.9 23.9 0 0 0 0 24c0 3.8.9 7.4 2.4 10.7l8.4-6z" />
      <path fill="#34A853" d="M24 48c6.1 0 11.2-2 14.9-5.4l-7.3-5.7c-2 1.4-4.6 2.2-7.6 2.2-6.2 0-11.5-4.2-13.4-9.9l-7.8 6C6.9 42.6 14.8 48 24 48z" />
    </svg>
  );
}

function Step1({ onContinue, onGoogleSignup, onLogin }) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", countryCode: "+91", gender: "",
  });
  const [checks, setChecks] = useState({ tc: false, rsp: false });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Please enter your full name.";
    if (!form.email.trim() || !form.email.includes("@"))
      errs.email = "Please enter a valid email.";
    if (!/^\d{10}$/.test(form.phone.trim()))
      errs.phone = "Please enter a valid 10-digit number.";
    if (!form.gender) errs.gender = "Please select a gender.";
    if (!checks.tc || !checks.rsp)
      errs.checks = "Please accept both agreements to continue.";
    return errs;
  };

  const handleContinue = () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onContinue(form);
  };

  const genderOptions = [
    { value: "male",   label: "Male",   icon: "♂", color: "#378ADD" },
    { value: "female", label: "Female", icon: "♀", color: "#D4537E" },
    { value: "other",  label: "Other",  icon: "⊙", color: "#7F77DD" },
  ];

  return (
    <div>
      <div style={S.field}>
        <label style={S.label}>Full Name <span style={S.required}>*</span></label>
        <div style={S.inputWrap}>
          <span style={S.inputIcon}>👤</span>
          <input
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            style={{ ...S.input, ...(errors.name ? S.inputError : {}) }}
          />
        </div>
        {errors.name && <span style={S.errMsg}>{errors.name}</span>}
      </div>

      <div style={S.field}>
        <label style={S.label}>Email Address <span style={S.required}>*</span></label>
        <div style={S.inputWrap}>
          <span style={S.inputIcon}>✉️</span>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            style={{ ...S.input, ...(errors.email ? S.inputError : {}) }}
          />
        </div>
        {errors.email && <span style={S.errMsg}>{errors.email}</span>}
      </div>

      <div style={S.field}>
        <label style={S.label}>Mobile Number <span style={S.required}>*</span></label>
        <div style={S.phoneRow}>
          <div style={S.selectWrap}>
            <select
              value={form.countryCode}
              onChange={(e) => set("countryCode", e.target.value)}
              style={S.select}
            >
              {["+91", "+1", "+44", "+971", "+65"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <span style={S.selectArrow}>▾</span>
          </div>
          <div style={{ ...S.inputWrap, flex: 1 }}>
            <span style={S.inputIcon}>📞</span>
            <input
              type="tel"
              placeholder="9876543210"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              style={{ ...S.input, ...(errors.phone ? S.inputError : {}) }}
            />
          </div>
        </div>
        {errors.phone && <span style={S.errMsg}>{errors.phone}</span>}
      </div>

      <div style={{ marginBottom: 20 }}>
        <label style={S.label}>Gender <span style={S.required}>*</span></label>
        <div style={S.genderRow}>
          {genderOptions.map((g) => (
            <div
              key={g.value}
              style={S.genderOpt(form.gender === g.value)}
              onClick={() => set("gender", g.value)}
            >
              <div style={S.genderDot(form.gender === g.value)}>
                {form.gender === g.value && "✓"}
              </div>
              <span style={{ fontSize: 15, color: g.color }}>{g.icon}</span>
              {g.label}
            </div>
          ))}
        </div>
        {errors.gender && <span style={S.errMsg}>{errors.gender}</span>}
      </div>

      <div style={{ marginBottom: 20 }}>
        {[
          { key: "tc",  label: "Terms & Conditions" },
          { key: "rsp", label: "Ride Sharing Policy" },
        ].map(({ key, label }) => (
          <div
            key={key}
            style={S.checkRow}
            onClick={() => {
              setChecks((c) => ({ ...c, [key]: !c[key] }));
              setErrors((e) => ({ ...e, checks: false }));
            }}
          >
            <div style={S.checkbox(checks[key])}>
              {checks[key] && "✓"}
            </div>
            <span style={S.checkLabel}>
              I agree to the{" "}
              <a href="#" style={S.link} onClick={(e) => e.stopPropagation()}>{label}</a>
            </span>
          </div>
        ))}
        {errors.checks && <span style={S.errMsg}>{errors.checks}</span>}
      </div>

      <button style={S.primaryBtn} onClick={handleContinue}>Continue</button>

      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>or continue with</span>
      </div>

      <button style={S.googleBtn} onClick={onGoogleSignup}>
        <GoogleIcon />
        Sign up with Google
      </button>

      <p style={S.footerText}>
        Already have an account?{" "}
        <a href="#" style={S.link} onClick={(e) => { e.preventDefault(); onLogin(); }}>
          Login
        </a>
      </p>
    </div>
  );
}

function Step2({ phone, onVerify }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(false);
  const [resent, setResent] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => { refs[0].current?.focus(); }, []); // eslint-disable-line

  const handleChange = (i, val) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    setError(false);
    if (digit && i < 5) refs[i + 1].current?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs[i - 1].current?.focus();
  };

  const handleVerify = () => {
    if (otp.join("").length < 6) { setError(true); return; }
    onVerify();
  };

  const handleResend = (e) => {
    e.preventDefault();
    setResent(true);
    setOtp(["", "", "", "", "", ""]);
    refs[0].current?.focus();
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ ...S.avatar, margin: "0 auto 12px" }}>📱</div>
      <p style={{ ...S.subtitle, marginBottom: 24 }}>
        We sent a 6-digit code to {phone}
      </p>
      <div style={S.otpGrid}>
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={refs[i]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            style={S.otpBox(!!digit)}
          />
        ))}
      </div>
      {error && (
        <p style={{ ...S.errMsg, textAlign: "center", marginBottom: 12 }}>
          Enter all 6 digits to verify.
        </p>
      )}
      <button style={S.primaryBtn} onClick={handleVerify}>Verify &amp; Continue</button>
      <p style={S.footerText}>
        Didn't receive it?{" "}
        <a
          href="#"
          style={{
            ...S.link,
            ...(resent ? { color: "#94A3B8", pointerEvents: "none" } : {}),
          }}
          onClick={handleResend}
        >
          {resent ? "Sent!" : "Resend"}
        </a>
      </p>
    </div>
  );
}

function Step3({ onDone }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={S.successIcon}>✅</div>
      <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0F2D52", margin: "0 0 8px" }}>
        Account created!
      </h2>
      <p style={{ ...S.subtitle, marginBottom: 28 }}>
        Welcome aboard. You're ready to hop in.
      </p>
      <button style={S.primaryBtn} onClick={onDone}>Start booking rides</button>
    </div>
  );
}

const STEP_META = [
  { badge: "1/3", icon: "👤", title: "Create Passenger Account", sub: "Let's get to know you better" },
  { badge: "2/3", icon: "📱", title: "Verify your number", sub: "Enter the OTP we just sent you" },
  { badge: "3/3", icon: "✅", title: "You're all set", sub: "" },
];

export default function CreatePassengerModal({ onClose, onLogin, onDone }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  const reset = () => { setStep(1); setPhone(""); };

  const handleClose = () => { reset(); onClose?.(); };
  const handleLogin = () => { reset(); onLogin?.(); };

  const meta = STEP_META[step - 1];

  return (
    <div
      style={S.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div style={S.modal} role="dialog" aria-modal="true" aria-label="Create Passenger Account">
        <button style={S.closeBtn} onClick={handleClose} aria-label="Close">✕</button>

        <div style={S.header}>
          <div style={S.avatar}>{meta.icon}</div>
          <div style={S.titleRow}>
            <h1 style={S.title}>{meta.title}</h1>
            <span style={S.badge}>{meta.badge}</span>
          </div>
          {meta.sub && <p style={S.subtitle}>{meta.sub}</p>}
        </div>

        {step === 1 && (
          <Step1
            onContinue={(form) => {
              setPhone(`${form.countryCode} ${form.phone}`);
              setStep(2);
            }}
            onGoogleSignup={() => setStep(3)}
            onLogin={handleLogin}
          />
        )}
        {step === 2 && (
          <Step2 phone={phone} onVerify={() => setStep(3)} />
        )}
        {step === 3 && (
          <Step3 onDone={() => { reset(); onDone?.(); }} />
        )}
      </div>
    </div>
  );
}