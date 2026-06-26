import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";

export default function CreateRideHeader() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "15px",
      }}
    >
      {/* Left Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <button
          onClick={() => navigate("/home")}
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            border: "none",
            background: "#FFFFFF",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            cursor: "pointer",
            color: "#0F172A",
            fontSize: "18px",
          }}
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "30px",
              fontWeight: "800",
              color: "#0F172A",
              paddingTop: "20px",
            }}
          >
            Offer{" "}
            <span style={{ color: "#14B8A6" }}>
              Ride
            </span>
          </h1>

          <p
            style={{
              marginTop: "8px",
              color: "#64748B",
              fontSize: "15px",
            }}
          >
            Share your trip and help fellow travelers reach their destination.
          </p>
        </div>
      </div>

      {/* Right Side */ }
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          background: "#FFFFFF",
          padding: "14px 20px",
          borderRadius: "18px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        }}
      >
        <div
          style={{
            width: "52px",
            height: "52px",
            borderRadius: "50%",
            background: "#ECFDF5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#14B8A6",
            fontSize: "22px",
          }}
        >
          <FaShieldAlt />
        </div>

        <div>
          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#0F172A",
            }}
          >
            Verified Driver
          </h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#64748B",
              fontSize: "13px",
            }}
          >
            Safe • Trusted • Secure
          </p>
        </div>
      </div>
    </div>
  );
}