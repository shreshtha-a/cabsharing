import React, { useState, useEffect } from "react";
import { HiStar, HiLocationMarker } from "react-icons/hi";

export default function DriverCard({
  name,
  rating,
  route,
  price,
  image,
  preferences = [],
}) {
  const [windowWidth, setWindowWidth] = useState(
    window.innerWidth
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  const isMobile = windowWidth < 768;

  const styles = {
    card: {
      background: "#fff",
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
      transition: "0.3s",
      cursor: "pointer",
    },

    image: {
      width: "100%",
      height: isMobile ? "200px" : "170px",
      objectFit: "cover",
    },

    content: {
      padding: isMobile ? "14px" : "16px",
    },

    topRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },

    name: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "700",
      color: "#0F172A",
    },

    rating: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
      color: "#F59E0B",
      fontWeight: "600",
      fontSize: isMobile ? "13px" : "15px",
    },

    route: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
      color: "#64748B",
      fontSize: isMobile ? "13px" : "14px",
      marginBottom: "12px",
    },

    preferences: {
      display: "flex",
      flexWrap: "wrap",
      gap: "6px",
      marginBottom: "16px",
    },

    chip: {
      background: "#F8FAFC",
      border: "1px solid #E2E8F0",
      borderRadius: "999px",
      padding: "5px 10px",
      fontSize: isMobile ? "10px" : "11px",
      fontWeight: "500",
      color: "#475569",
    },

    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "10px",
      marginTop: "4px",
    },

    priceContainer: {
      display: "flex",
      flexDirection: "column",
    },

    price: {
      fontSize: isMobile ? "24px" : "30px",
      fontWeight: "800",
      color: "#0B8A8F",
      lineHeight: "1",
    },

    seatText: {
      fontSize: "12px",
      color: "#64748B",
      marginTop: "4px",
    },

    button: {
      border: "none",
      borderRadius: "10px",
      padding: isMobile
        ? "8px 12px"
        : "8px 14px",
      minWidth: isMobile ? "90px" : "100px",
      height: isMobile ? "36px" : "40px",
      background:
        "linear-gradient(90deg,#0B8A8F,#12C2C8)",
      color: "#fff",
      cursor: "pointer",
      fontWeight: "600",
      fontSize: isMobile ? "12px" : "13px",
      transition: "0.3s",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      flexShrink: 0,
    },
  };

  const handleBookRide = () => {
    alert(`Booking ride with ${name}`);
  };

  return (
    <div style={styles.card}>
      <img
        src={image}
        alt={name}
        style={styles.image}
      />

      <div style={styles.content}>
        <div style={styles.topRow}>
          <div style={styles.name}>{name}</div>

          <div style={styles.rating}>
            <HiStar />
            {rating}
          </div>
        </div>

        <div style={styles.route}>
          <HiLocationMarker />
          {route}
        </div>

        <div style={styles.preferences}>
          {preferences.map((pref, index) => (
            <div
              key={index}
              style={styles.chip}
            >
              {pref}
            </div>
          ))}
        </div>

        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            <div style={styles.price}>
              ₹{price}
            </div>

            <div style={styles.seatText}>
              per seat
            </div>
          </div>

          <button
            style={styles.button}
            onClick={handleBookRide}
          >
            Book Ride
          </button>
        </div>
      </div>
    </div>
  );
}