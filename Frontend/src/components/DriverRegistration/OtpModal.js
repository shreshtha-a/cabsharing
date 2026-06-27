import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpModal({ onClose }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
    // Later this will call the backend
    if (otp.length === 6) {
      onClose();
      navigate("/home");
    } else {
      alert("Please enter a valid 6-digit OTP");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          borderRadius: "24px",
          padding: "35px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,.15)",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            margin: "0 auto 20px",
            borderRadius: "50%",
            background: "#14B8A6",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "28px",
          }}
        >
          ✓
        </div>

        <h2
          style={{
            margin: 0,
            color: "#0F172A",
          }}
        >
          Verify OTP
        </h2>

        <p
          style={{
            color: "#64748B",
            marginTop: "12px",
          }}
        >
          Enter the 6-digit verification code sent to your phone.
        </p>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          style={{
            width: "100%",
            height: "55px",
            marginTop: "25px",
            borderRadius: "14px",
            border: "1px solid #CBD5E1",
            textAlign: "center",
            fontSize: "24px",
            letterSpacing: "8px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {}
        <button
          onClick={handleVerify}
          style={{
            width: "100%",
            height: "52px",
            marginTop: "24px",
            border: "none",
            borderRadius: "14px",
            background: "#14B8A6",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Verify OTP
        </button>

        <button
          onClick={onClose}
          style={{
            marginTop: "18px",
            border: "none",
            background: "none",
            color: "#64748B",
            cursor: "pointer",
            fontSize: "15px",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}