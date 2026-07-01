import {
  FaGift,
  FaStar,
  FaMedal,
  FaTicketAlt,
  FaChevronRight,
} from "react-icons/fa";

export default function Rewards() {
  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #E5E7EB",
    cursor: "pointer",
  };

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
          <FaGift />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Rewards</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Earn points and unlock exclusive benefits.
          </p>
        </div>
      </div>

      {/* Reward Summary */}

      <div
        style={{
          background: "#E6FFFB",
          borderRadius: "14px",
          padding: "18px",
          marginBottom: "22px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#14B8A6",
            fontSize: "30px",
          }}
        >
          2,450
        </h2>

        <p
          style={{
            margin: "6px 0",
            color: "#374151",
          }}
        >
          Reward Points Available
        </p>

        <button
          style={{
            marginTop: "10px",
            background: "#14B8A6",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Redeem Points
        </button>
      </div>

      {/* Loyalty Level */}

      <div style={rowStyle}>
        <div style={leftStyle}>
          <FaMedal color="#14B8A6" />
          <span>Loyalty Level</span>
        </div>

        <div
          style={{
            color: "#14B8A6",
            fontWeight: "600",
          }}
        >
          Gold
        </div>
      </div>

      {/* Referral Rewards */}

      <div style={rowStyle}>
        <div style={leftStyle}>
          <FaStar color="#14B8A6" />
          <span>Referral Rewards</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      {/* Coupons */}

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
          <FaTicketAlt color="#14B8A6" />
          <span>Available Coupons</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>
    </div>
  );
}