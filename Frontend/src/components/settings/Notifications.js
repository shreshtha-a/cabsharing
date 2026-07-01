import { useState } from "react";
import { FaBell, FaToggleOn, FaToggleOff } from "react-icons/fa";

export default function Notifications() {
  const [rideNotifications, setRideNotifications] = useState({
    bookingConfirmed: true,
    driverArriving: true,
    rideStarted: true,
    rideCompleted: true,
  });

  const [promoNotifications, setPromoNotifications] = useState({
    cashbackOffers: true,
    referralRewards: true,
    promoCodes: true,
  });

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  };

  const cardStyle = {
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    padding: "18px",
    background: "#fff",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "25px",
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
          <FaBell />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Notifications</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Choose which notifications you'd like to receive.
          </p>
        </div>
      </div>

      {/* Two Columns */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Ride Notifications */}

        <div style={cardStyle}>
          <h4 style={{ marginTop: 0 }}>Ride Notifications</h4>

          {Object.entries(rideNotifications).map(([key, value]) => (
            <div key={key} style={rowStyle}>
              <span>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
              </span>

              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setRideNotifications({
                    ...rideNotifications,
                    [key]: !value,
                  })
                }
              >
                {value ? (
                  <FaToggleOn size={30} color="#14B8A6" />
                ) : (
                  <FaToggleOff size={30} color="#BDBDBD" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Notifications */}

        <div style={cardStyle}>
          <h4 style={{ marginTop: 0 }}>Promotional Notifications</h4>

          {Object.entries(promoNotifications).map(([key, value]) => (
            <div key={key} style={rowStyle}>
              <span>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
              </span>

              <div
                style={{ cursor: "pointer" }}
                onClick={() =>
                  setPromoNotifications({
                    ...promoNotifications,
                    [key]: !value,
                  })
                }
              >
                {value ? (
                  <FaToggleOn size={30} color="#14B8A6" />
                ) : (
                  <FaToggleOff size={30} color="#BDBDBD" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}