import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function OtpModal({ userId, email, onClose }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleVerify = async () => {
    setError("");
    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }
    setVerifying(true);
    try {
      const { data } = await api.post("/drivers/verify-otp", { userId, otp });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onClose();
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const handleResend = async () => {
    setError("");
    setInfo("");
    setResending(true);
    try {
      await api.post("/drivers/resend-otp", { userId });
      setInfo("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 }}>
      <div style={{ width: "420px", background: "#fff", borderRadius: "24px", padding: "35px", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,.15)" }}>
        <div style={{ width: "70px", height: "70px", margin: "0 auto 20px", borderRadius: "50%", background: "#14B8A6", color: "#fff", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "28px" }}>
          ✓
        </div>

        <h2 style={{ margin: 0, color: "#0F172A" }}>Verify Your Email</h2>
        <p style={{ color: "#64748B", marginTop: "12px" }}>
          Enter the 6-digit code sent to <b>{email}</b>
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter OTP"
          style={{
            width: "100%", height: "55px", marginTop: "25px", borderRadius: "14px",
            border: "1px solid #CBD5E1", textAlign: "center", fontSize: "24px",
            letterSpacing: "8px", outline: "none", boxSizing: "border-box",
          }}
        />

        {error && <p style={{ color: "#EF4444", fontSize: "13px", marginTop: "10px" }}>{error}</p>}
        {info && <p style={{ color: "#14B8A6", fontSize: "13px", marginTop: "10px" }}>{info}</p>}

        <button
          onClick={handleVerify}
          disabled={verifying}
          style={{
            width: "100%", height: "52px", marginTop: "24px", border: "none", borderRadius: "14px",
            background: verifying ? "#94A3B8" : "#14B8A6", color: "#fff", fontSize: "16px",
            cursor: verifying ? "not-allowed" : "pointer", fontWeight: "600",
          }}
        >
          {verifying ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={handleResend}
          disabled={resending}
          style={{ marginTop: "14px", border: "none", background: "none", color: "#14B8A6", cursor: "pointer", fontSize: "14px", fontWeight: "600" }}
        >
          {resending ? "Resending..." : "Resend OTP"}
        </button>

        <button onClick={onClose} style={{ display: "block", margin: "10px auto 0", border: "none", background: "none", color: "#64748B", cursor: "pointer", fontSize: "15px" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}