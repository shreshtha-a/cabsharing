import React from "react";

export default function RideDetailsModal({ ride, onClose }) {
  if (!ride) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>
  🚗 Ride Details
</h2>

       <div style={styles.statusContainer}>
  <span
  style={{
    ...styles.statusBadge,
    background:
      ride.status === "completed"
        ? "#DBEAFE"
        : ride.status === "cancelled"
        ? "#FEE2E2"
        : "#DCFCE7",

    color:
      ride.status === "completed"
        ? "#2563EB"
        : ride.status === "cancelled"
        ? "#DC2626"
        : "#16A34A",
  }}
>
  {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
</span>
</div>

<div style={styles.row}>
  <strong>📅 Date</strong>
  <span>{ride.date}</span>
</div>

<div style={styles.row}>
  <strong>🕒 Time</strong>
  <span>{ride.time}</span>
</div>

<div style={styles.row}>
  <strong>📍 Pickup</strong>
  <span>{ride.from}</span>
</div>

<div style={styles.row}>
  <strong>🏁 Destination</strong>
  <span>{ride.to}</span>
</div>

<div style={styles.row}>
  <strong>💺 Seats</strong>
  <span>2 Available</span>
</div>

<div style={styles.row}>
  <strong>🚘 Vehicle</strong>
  <span>Maruti Baleno</span>
</div>

<div style={styles.row}>
  <strong>💰 Fare</strong>
  <span>₹{ride.price}</span>
</div>

<div style={styles.row}>
  <strong>👤 Driver</strong>
  <span>You</span>
</div> 

        <button style={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "520px",
    background: "#fff",
    borderRadius: "28px",
    padding: "30px",
    boxShadow: "0 24px 60px rgba(15,36,84,.18)",
  },

  title: {
    marginTop: 0,
    marginBottom: "25px",
    color: "#122B58",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #F1F5F9",
  },

  button: {
    marginTop: "24px",
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "999px",
    background: "#14B8A6",
    color: "#fff",
    fontWeight: "700",
    cursor: "pointer",
  },

  statusContainer: {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "18px",
},

statusBadge: {
  background: "#DCFCE7",
  color: "#16A34A",
  padding: "6px 14px",
  borderRadius: "999px",
  fontWeight: "700",
  fontSize: "13px",
},
};