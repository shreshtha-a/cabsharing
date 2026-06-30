import React from "react";

export default function RideDetailsModal({ ride, onClose }) {
  if (!ride) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Ride Details</h2>

        <div style={styles.row}>
          <strong>Date</strong>
          <span>{ride.date}</span>
        </div>

        <div style={styles.row}>
          <strong>Time</strong>
          <span>{ride.time}</span>
        </div>

        <div style={styles.row}>
          <strong>From</strong>
          <span>{ride.from}</span>
        </div>

        <div style={styles.row}>
          <strong>To</strong>
          <span>{ride.to}</span>
        </div>

        <div style={styles.row}>
          <strong>Fare</strong>
          <span>₹{ride.price}</span>
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
    width: "420px",
    background: "#fff",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: "0 20px 50px rgba(0,0,0,.15)",
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
};