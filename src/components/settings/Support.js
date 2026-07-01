import {
  FaHeadset,
  FaQuestionCircle,
  FaFileAlt,
  FaChevronRight,
  FaEnvelope,
  FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Support() {
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #E5E7EB",
    cursor: "pointer",
  };
  const navigate = useNavigate();

  const leftStyle = {
    display: "flex",
    alignItems: "center",
    gap: "14px",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        marginBottom: "24px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "#E6FFFB",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#14B8A6",
            fontSize: "20px",
          }}
        >
          <FaHeadset />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Support & Help</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Find answers and contact our support team.
          </p>
        </div>
      </div>

      {/* Help Center */}

      <div style={rowStyle}
      onClick={() => navigate("/help-center")}
      >
        <div style={leftStyle}>
          <FaQuestionCircle color="#14B8A6" />
          <span>Help Center</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      {/* Contact Support */}

      <div style={rowStyle}>
        <div style={leftStyle}>
          <FaEnvelope color="#14B8A6" />
          <span>Contact Support</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      {/* Privacy Policy */}

      <div style={rowStyle}>
        <div style={leftStyle}>
          <FaShieldAlt color="#14B8A6" />
          <span>Privacy Policy</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      {/* Terms & Conditions */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
          cursor: "pointer",
        }}
      >
        <div style={leftStyle}>
          <FaFileAlt color="#14B8A6" />
          <span>Terms & Conditions</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "22px",
          padding: "16px",
          borderRadius: "12px",
          background: "#F8FAFC",
          textAlign: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "13px",
            color: "#6B7280",
          }}
        >
          Need immediate assistance?
        </p>

        <button
          style={{
            marginTop: "12px",
            background: "#14B8A6",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Chat with Support
        </button>
      </div>
    </div>
  );
}