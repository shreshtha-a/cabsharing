import React from "react";
import { FaCarSide, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function HeroBanner() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "{}");

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : "Traveller";

  return (
    <div style={styles.banner}>
      <div style={styles.overlay} />

      <div style={styles.left}>
        <span style={styles.badge}>🚗 Hopin Ride Dashboard</span>

        <h1 style={styles.heading}>
          Welcome back,
          <br />
          <span style={styles.name}>{firstName}!</span>
        </h1>

        <p style={styles.description}>
          Manage your rides, monitor upcoming trips,
          and stay connected with your passengers —
          all from one place.
        </p>

        <button
          style={styles.button}
          onClick={() => navigate("/offer-ride")}
        >
          <FaPlusCircle />
          Offer a Ride
        </button>
      </div>

      <div style={styles.right}>
        <div style={styles.circle}>
          <FaCarSide size={95} color="white" />
        </div>

        <div style={styles.stat}>
          <h3>24</h3>
          <span>Total Rides</span>
        </div>

        <div style={styles.stat}>
          <h3>4.9 ★</h3>
          <span>Your Rating</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  banner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "30px",
    padding: "45px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background:
      "linear-gradient(135deg,#0F766E,#14B8A6,#22D3EE)",
    color: "#fff",
    marginBottom: "35px",
    minHeight: "270px",
    boxShadow: "0 20px 40px rgba(20,184,166,.25)",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top right, rgba(255,255,255,.18), transparent 45%)",
  },

  left: {
    width: "58%",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,.15)",
    backdropFilter: "blur(8px)",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  heading: {
    margin: 0,
    fontSize: "44px",
    lineHeight: 1.15,
    fontWeight: "800",
  },

  name: {
    color: "#DDFCF8",
  },

  description: {
    marginTop: "18px",
    fontSize: "17px",
    lineHeight: 1.8,
    maxWidth: "520px",
    opacity: ".95",
  },

  button: {
    marginTop: "28px",
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    border: "none",
    cursor: "pointer",
    padding: "15px 24px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "15px",
    color: "#0F766E",
    background: "#fff",
    transition: ".3s",
  },

  right: {
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
  },

  circle: {
    width: "170px",
    height: "170px",
    borderRadius: "50%",
    background: "rgba(255,255,255,.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)",
  },

  stat: {
    width: "170px",
    background: "rgba(255,255,255,.15)",
    borderRadius: "18px",
    padding: "16px",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
};