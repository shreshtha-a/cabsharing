import { useState, useRef, useEffect } from "react";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCar,
  FaPalette,
  FaIdCard,
  FaUpload,
  FaArrowRight,
  FaCheckCircle,
  FaArrowLeft,
} from "react-icons/fa";

const TEAL = "#10b7aa";

export default function DriverRegistrationPopup() {
  // step: "form" -> "otp" -> "success" -> (redirect to "home")
  const [step, setStep] = useState("form");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
  });
  const [sentCode, setSentCode] = useState(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [route, setRoute] = useState(null); // becomes "home" after redirect

  function updateField(key, value) {
    setFormData((f) => ({ ...f, [key]: value }));
  }

  // --- THIS IS THE FUNCTION TO REPLACE WITH A REAL BACKEND CALL ---
  // In production: POST formData.email to your server, which generates
  // the OTP, stores it (hashed, with expiry), and sends it via an email
  // provider (SES / SendGrid / Postmark / etc). Never generate or expose
  // the real code in frontend code.
  async function sendOtp(email) {
    setSending(true);
    setError("");
    await new Promise((r) => setTimeout(r, 700)); // simulate network latency
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setSentCode(code);
    setSending(false);
    // Demo-only: surfaced so you can test without a real inbox.
    console.log("[DEV ONLY] OTP for", email, "is:", code);
    return code;
  }

  function isEmailValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleRegisterClick(e) {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!isEmailValid(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    await sendOtp(formData.email);
    setStep("otp");
  }

  function handleVerified() {
    setStep("success");
  }

  // Redirect to home after success
  useEffect(() => {
    if (step === "success") {
      const t = setTimeout(() => setRoute("home"), 1400);
      return () => clearTimeout(t);
    }
  }, [step]);

  if (route === "home") {
    return <HomeScreen name={formData.fullName} />;
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "#fff",
        borderRadius: "20px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        margin: "auto",
      }}
    >
      {step === "form" && (
        <RegistrationForm
          formData={formData}
          updateField={updateField}
          onSubmit={handleRegisterClick}
          error={error}
          sending={sending}
        />
      )}

      {step === "otp" && (
        <OtpStep
          email={formData.email}
          sentCode={sentCode}
          onVerified={handleVerified}
          onResend={() => sendOtp(formData.email)}
          onBack={() => setStep("form")}
          sending={sending}
        />
      )}

      {step === "success" && <SuccessStep name={formData.fullName} />}
    </div>
  );
}

function RegistrationForm({ formData, updateField, onSubmit, error, sending }) {
  return (
    <form onSubmit={onSubmit}>
      {/* Logo */}
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <div
          style={{
            width: "55px",
            height: "55px",
            background: TEAL,
            borderRadius: "50%",
            margin: "0 auto 10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "22px",
          }}
        >
          🚗
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: "26px",
            fontWeight: "700",
            color: "#1f2937",
          }}
        >
          Join as a Driver 👋
        </h2>

        <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "14px" }}>
          Register and start earning with HopIn
        </p>
      </div>

      {/* Personal Information */}
      <SectionLabel>Personal Information</SectionLabel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <Input
          icon={<FaUser />}
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(v) => updateField("fullName", v)}
        />
        <Input
          icon={<FaPhone />}
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(v) => updateField("phone", v)}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <Input
          icon={<FaEnvelope />}
          placeholder="Email Address"
          type="email"
          value={formData.email}
          onChange={(v) => updateField("email", v)}
        />
      </div>

      {/* Vehicle Information */}
      <SectionLabel>Vehicle Information</SectionLabel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <Input icon={<FaCar />} placeholder="Vehicle Model" />
        <Input icon={<FaIdCard />} placeholder="Vehicle Number" />
        <Input icon={<FaCar />} placeholder="Vehicle Type" />
        <Input icon={<FaPalette />} placeholder="Color" />
      </div>

      {/* Driving Documents */}
      <SectionLabel>Driving Documents</SectionLabel>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
        <Input icon={<FaIdCard />} placeholder="Driving License Number" />
        <UploadBox text="Upload License" />

        <Input icon={<FaIdCard />} placeholder="RC Number (Registration)" />
        <UploadBox text="Upload RC" />
      </div>

      {/* Checkbox */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "18px",
          fontSize: "13px",
        }}
      >
        <input type="checkbox" required />
        <span>
          I agree to the{" "}
          <span style={{ color: TEAL, fontWeight: "600" }}>Terms & Conditions</span>{" "}
          and <span style={{ color: TEAL, fontWeight: "600" }}>Privacy Policy</span>
        </span>
      </div>

      {error && (
        <p style={{ color: "#dc2626", fontSize: "13px", marginTop: "10px", marginBottom: 0 }}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        style={{
          width: "100%",
          marginTop: "18px",
          background: TEAL,
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "14px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: sending ? "default" : "pointer",
          opacity: sending ? 0.7 : 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {sending ? "Sending code..." : "Register as Driver"}
        {!sending && <FaArrowRight />}
      </button>

      <p style={{ textAlign: "center", marginTop: "14px", color: "#6b7280", fontSize: "13px" }}>
        Already have an account?{" "}
        <span style={{ color: TEAL, fontWeight: "600", cursor: "pointer" }}>Login</span>
      </p>
    </form>
  );
}

function OtpStep({ email, sentCode, onVerified, onResend, onBack, sending }) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(30);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  function handleChange(i, val) {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    setError("");
    if (val && i < 5) inputsRef.current[i + 1]?.focus();
  }

  function handleKeyDown(i, e) {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputsRef.current[i - 1]?.focus();
    }
  }

  function handlePaste(e) {
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!text) return;
    e.preventDefault();
    const next = text.split("");
    while (next.length < 6) next.push("");
    setDigits(next);
    inputsRef.current[Math.min(text.length, 5)]?.focus();
  }

  function handleVerify() {
    const entered = digits.join("");
    if (entered.length < 6) {
      setError("Enter all 6 digits.");
      return;
    }
    if (entered !== sentCode) {
      setError("Incorrect code. Check your email and try again.");
      return;
    }
    onVerified();
  }

  async function handleResend() {
    setDigits(["", "", "", "", "", ""]);
    setError("");
    await onResend();
    setCooldown(30);
    inputsRef.current[0]?.focus();
  }

  return (
    <div>
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          color: "#6b7280",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          padding: 0,
          marginBottom: "16px",
        }}
      >
        <FaArrowLeft size={11} /> Back
      </button>

      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <div
          style={{
            width: "55px",
            height: "55px",
            background: "#e6f7f5",
            borderRadius: "50%",
            margin: "0 auto 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: TEAL,
            fontSize: "22px",
          }}
        >
          <FaEnvelope />
        </div>
        <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1f2937" }}>
          Verify your email
        </h2>
        <p style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}>
          We sent a 6-digit code to <strong style={{ color: "#1f2937" }}>{email}</strong>
        </p>
      </div>

      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }} onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => (inputsRef.current[i] = el)}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            inputMode="numeric"
            maxLength={1}
            style={{
              width: "44px",
              height: "52px",
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "600",
              border: `1.5px solid ${error ? "#dc2626" : "#e5e7eb"}`,
              borderRadius: "10px",
              outline: "none",
              color: "#1f2937",
            }}
          />
        ))}
      </div>

      {error && (
        <p style={{ color: "#dc2626", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
          {error}
        </p>
      )}

      <button
        onClick={handleVerify}
        style={{
          width: "100%",
          marginTop: "22px",
          background: TEAL,
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "14px",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Verify & Continue
      </button>

      <p style={{ textAlign: "center", marginTop: "16px", color: "#6b7280", fontSize: "13px" }}>
        {cooldown > 0 ? (
          <>Resend code in {cooldown}s</>
        ) : (
          <>
            Didn't get it?{" "}
            <span
              onClick={handleResend}
              style={{ color: TEAL, fontWeight: "600", cursor: "pointer" }}
            >
              {sending ? "Resending..." : "Resend code"}
            </span>
          </>
        )}
      </p>

      <p style={{ textAlign: "center", marginTop: "10px", color: "#9ca3af", fontSize: "11px" }}>
        Dev mode: check the console for the simulated code.
      </p>
    </div>
  );
}

function SuccessStep({ name }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "#e6f7f5",
          borderRadius: "50%",
          margin: "0 auto 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: TEAL,
          fontSize: "30px",
        }}
      >
        <FaCheckCircle />
      </div>
      <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "700", color: "#1f2937" }}>
        Email verified
      </h2>
      <p style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}>
        Welcome aboard, {name || "driver"}. Taking you home...
      </p>
    </div>
  );
}

function HomeScreen({ name }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "#fff",
        borderRadius: "20px",
        padding: "32px 24px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          background: TEAL,
          borderRadius: "50%",
          margin: "0 auto 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "22px",
        }}
      >
        🏠
      </div>
      <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "700", color: "#1f2937" }}>
        Home
      </h2>
      <p style={{ marginTop: "8px", color: "#6b7280", fontSize: "14px" }}>
        You're signed in as {name || "Driver"}. This is where your home screen / dashboard would
        load.
      </p>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <h4 style={{ color: "#374151", marginBottom: "12px", marginTop: "20px", fontSize: "14px" }}>
      {children}
    </h4>
  );
}

function Input({ icon, placeholder, value, onChange, type = "text" }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "8px",
      }}
    >
      <span style={{ color: "#9ca3af" }}>{icon}</span>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        style={{ border: "none", outline: "none", width: "100%", fontSize: "13px" }}
      />
    </div>
  );
}

function UploadBox({ text }) {
  return (
    <label
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        cursor: "pointer",
        color: "#6b7280",
        fontSize: "13px",
      }}
    >
      <FaUpload />
      {text}
      <input type="file" hidden />
    </label>
  );
}