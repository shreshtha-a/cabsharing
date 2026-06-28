import { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
  FaCheckCircle,
} from "react-icons/fa";

export default function ChangePasswordModal({ onClose }) {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
   const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "#fff",
          borderRadius: "22px",
          padding: "35px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
          position: "relative",
        }}
      >
        {/* Close */}

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            background: "#F3F4F6",
            border: "none",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <FaTimes />
        </button>

        {/* Header */}

        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div
            style={{
              width: "75px",
              height: "75px",
              margin: "0 auto",
              background: "#E6FFFB",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FaLock size={28} color="#14B8A6" />
          </div>

          <h2
            style={{
              marginTop: "18px",
              marginBottom: "8px",
            }}
          >
            Change Password
          </h2>

          <p
            style={{
              color: "#6B7280",
              fontSize: "15px",
            }}
          >
            Create a strong password to keep your account secure.
          </p>
        </div>

        {/* Current Password */}

        <PasswordField
          label="Current Password"
          show={showCurrent}
          toggle={() => setShowCurrent(!showCurrent)}
        />

        {/* New Password */}

        <PasswordField
          label="New Password"
          show={showNew}
          toggle={() => setShowNew(!showNew)}
        />

        {/* Confirm */}

        <PasswordField
          label="Confirm Password"
          show={showConfirm}
          toggle={() => setShowConfirm(!showConfirm)}
        />

        {/* Password Tips */}

        <div
          style={{
            marginTop: "25px",
            background: "#F8FAFC",
            borderRadius: "12px",
            padding: "15px",
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontWeight: "600",
            }}
          >
            Password Requirements
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <FaCheckCircle color="#14B8A6" />
            Minimum 8 characters
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            <FaCheckCircle color="#14B8A6" />
            One uppercase letter
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaCheckCircle color="#14B8A6" />
            One special character
          </div>
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "12px 24px",
              borderRadius: "10px",
              border: "1px solid #D1D5DB",
              background: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Cancel
          </button>

          <button
            style={{
              padding: "12px 26px",
              borderRadius: "10px",
              border: "none",
              background: "#14B8A6",
              color: "#fff",
              cursor: "pointer",
              fontWeight: "600",
            }}
            onClick={ onClose}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
}

function PasswordField({ label, show, toggle }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          fontWeight: "600",
        }}
      >
        {label}
      </label>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #D1D5DB",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <input
          type={show ? "text" : "password"}
          placeholder={label}
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "14px",
            fontSize: "15px",
          }}
        />

        <button
          onClick={toggle}
          style={{
            border: "none",
            background: "transparent",
            cursor: "pointer",
            padding: "0 16px",
          }}
        >
          {show ? (
            <FaEyeSlash color="#6B7280" />
          ) : (
            <FaEye color="#6B7280" />
          )}
        </button>
      </div>
    </div>
  );
}