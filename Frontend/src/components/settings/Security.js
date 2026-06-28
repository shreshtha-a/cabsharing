import { FaLock, FaHistory, FaUserShield, FaChevronRight } from "react-icons/fa";
import ChangePassword from "./PopUps/ChangePassword";
import TwoFactorAuthentication from "./PopUps/TwoFactorAuthentication"
import { useState } from "react";

export default function Security() {
  const itemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    cursor: "pointer",
    background: "#fff",
    transition: "0.3s"
  };

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorStatus, setTwoFactorStatus] = useState("Enabled");

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        marginBottom: "24px"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "24px" }}>
        <div
          style={{
            height: "46px",
            width: "46px",
            borderRadius: "50%",
            background: "#E6FFFB",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#14B8A6",
            fontSize: "20px"
          }}
        >
          <FaUserShield />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Security & Privacy</h3>
          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px"
            }}
          >
            Manage your account security and privacy preferences
          </p>
        </div>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px"
        }}
      >
        {/* Change Password */}
        <>
            <div style={itemStyle}
            onClick={() => setShowPasswordModal(true)}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
                <FaLock color="#14B8A6" />
                <span>Change Password</span>
            </div>
            <FaChevronRight color="#9CA3AF" />

            </div>

            {showPasswordModal && (
            <ChangePassword
            onClose={() => setShowPasswordModal(false)}
            />
            )}
        </>

        {/* Login Activity */}

        <div style={itemStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FaHistory color="#14B8A6" />
            <span>Login Activity</span>
          </div>

          <FaChevronRight color="#9CA3AF" />
        </div>

        {/* Two Factor */}
        <>
        <div style={itemStyle}
        onClick={() => setShowTwoFactorModal(true)}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <FaUserShield color="#14B8A6" />

            <span>Two-Factor Authentication</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span id="TwoFactorButton"
              style={{
                color: "#14B8A6",
                fontWeight: "600",
                fontSize: "14px"
              }}
            >
              {twoFactorStatus}
            </span>

            <FaChevronRight color="#9CA3AF" />
          </div>
        </div>

      {showTwoFactorModal && (
        <TwoFactorAuthentication
          onClose={() => setShowTwoFactorModal(false)}
          setTwoFactorStatus={setTwoFactorStatus}
        />
      )}
        </>

        {/* Blocked Users */}

        <div style={itemStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}
          >
            <FaUserShield color="#14B8A6" />

            <span>Manage Blocked Users</span>
          </div>

          <FaChevronRight color="#9CA3AF" />
        </div>
      </div>
    </div>
  );
}