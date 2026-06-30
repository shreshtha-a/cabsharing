import React from "react";
import { FaCarSide, FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroRoad from "../../assets/hero-road.png";
export default function HeroBanner() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user") || "{}");

  const firstName = user?.name
    ? user.name.split(" ")[0]
    : "Traveller";

  return (
    <div style={styles.banner}>

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
  <img
    src={heroRoad}
    alt="Hero Road"
    style={styles.heroImage}
  />
</div>
    </div>
  );
}

const styles = {
  banner: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "30px",
    padding: "20px 28px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FFFFFF",
    marginBottom: "28px",
    minHeight: "170px",
    boxShadow: "0 12px 30px rgba(15,36,84,.08)",
  },


  left: {
    width: "58%",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "999px",
    background:"#EDFDFB",
    backdropFilter: "blur(8px)",
    fontSize: "13px",
    fontWeight: "700",
    marginBottom: "20px",
    color:"#14B8A6",
  },

  heading: {
    margin: 0,
    fontSize: "44px",
    lineHeight: 1.15,
    fontWeight: "800",
  },

  name: {
    color:"#14B8A6",
  },

  description: {
    marginTop: "18px",
    fontSize: "17px",
    lineHeight: 1.8,
    maxWidth: "520px",
    opacity: ".95",
     color: "#64748B",
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
  width: "42%",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  overflow: "hidden",
},

heroImage: {
  width: "430px",
  maxWidth: "100%",
  objectFit: "contain",
  transform: "translate(30px, -10px)",
},
};