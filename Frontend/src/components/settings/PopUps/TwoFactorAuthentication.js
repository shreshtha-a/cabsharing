import { useState } from "react";
import { FaShieldAlt, FaTimes } from "react-icons/fa";

export default function TwoFactorModal({ onClose,  setTwoFactorStatus,}) {
  const [status, setStatus] = useState("enabled");

  return (
    
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "18px",
          padding: "28px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 15,
            right: 15,
            border: "none",
            background: "none",
            cursor: "pointer",
          }}
        >
          <FaTimes />
        </button>

        <div style={{ textAlign: "center", marginBottom: "25px" }}>
          <FaShieldAlt size={40} color="#14B8A6" />
          <h2 style={{ margin: "12px 0 5px" }}>Two-Factor Authentication</h2>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Choose your preferred security option.
          </p>
        </div>

        <label style={{ display: "block", marginBottom: "12px" }}>
          <input
            type="radio"
            name="2fa"
            checked={status === "enabled"}
            onChange={() => setStatus("enabled")
              
            }
            style={{ accentColor: "#14B8A6" }}
          />
          <span style={{ marginLeft: "8px" }}
          >Enabled</span>
        </label>

        <label style={{ display: "block", marginBottom: "24px" }}>
          <input
            type="radio"
            name="2fa"
            checked={status === "disabled"}
            onChange={() => setStatus("disabled")}
            style={{ accentColor: "#14B8A6" }}
          />
          <span style={{ marginLeft: "8px" }}>Disabled</span>
        </label>

        <button
          onClick={() => {
          setTwoFactorStatus(
            status === "enabled" ? "Enabled" : "Disabled"
          );
          onClose();
          }}
          style={{
            width: "100%",
            padding: "12px",
            background: "#14B8A6",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}