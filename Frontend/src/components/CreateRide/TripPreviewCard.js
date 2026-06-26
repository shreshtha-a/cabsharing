import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaChair,
  FaMoneyBillWave,
  FaRoute,
} from "react-icons/fa";

export default function TripPreviewCard() {
  return (
    <div
      style={{
        flex: 1,
        background: "#FFFFFF",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Top */}
      <div
        style={{
          background: "linear-gradient(135deg,#14B8A6,#0F766E)",
          padding: "25px",
          color: "#fff",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "700",
          }}
        >
          Trip Preview
        </h2>

        <p
          style={{
            marginTop: "8px",
            opacity: 0.9,
            fontSize: "14px",
          }}
        >
          Your ride summary will appear here.
        </p>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "24px",
        }}
      >
        <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
          <FaMapMarkerAlt color="#14B8A6" />
          <div>
            <strong>Pickup</strong>
            <p style={{ margin: "4px 0", color: "#64748B" }}>
              Not selected
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
          <FaRoute color="#2563EB" />
          <div>
            <strong>Destination</strong>
            <p style={{ margin: "4px 0", color: "#64748B" }}>
              Not selected
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
          <FaCalendarAlt color="#14B8A6" />
          <div>
            <strong>Date</strong>
            <p style={{ margin: "4px 0", color: "#64748B" }}>
              Select date
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
          <FaClock color="#14B8A6" />
          <div>
            <strong>Departure</strong>
            <p style={{ margin: "4px 0", color: "#64748B" }}>
              Select time
            </p>
          </div>
        </div>

        <div style={{ marginBottom: "18px", display: "flex", gap: "12px" }}>
          <FaChair color="#14B8A6" />
          <div>
            <strong>Seats</strong>
            <p style={{ margin: "4px 0", color: "#64748B" }}>
              0 Available
            </p>
          </div>
        </div>

        <hr
          style={{
            border: "none",
            borderTop: "1px solid #E2E8F0",
            margin: "22px 0",
          }}
        />

        <div
          style={{
            background: "#ECFDF5",
            borderRadius: "14px",
            padding: "18px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "12px",
            }}
          >
            <span style={{ color: "#475569" }}>
              Estimated Earnings
            </span>

            <FaMoneyBillWave color="#14B8A6" />
          </div>

          <h2
            style={{
              margin: 0,
              color: "#059669",
              fontSize: "30px",
              fontWeight: "700",
            }}
          >
            ₹0
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#64748B",
              fontSize: "13px",
            }}
          >
            Based on price per seat
          </p>
        </div>
      </div>
    </div>
  );
}