import React, { useState, useEffect } from "react";
import backdrop from "../assets/hopin-backdrop.png";

export default function HeroSection() {
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
    hero: {
      height: isMobile ? "230px" : "290px",
      borderRadius: isMobile ? "20px" : "28px",
      overflow: "hidden",
      position: "relative",
      backgroundImage: `url(${backdrop})`,
      backgroundSize: "cover",
      backgroundPosition: "75% center",
      padding: isMobile ? "18px" : "28px 32px",
      boxSizing: "border-box",
    },

    overlay: {
      position: "absolute",
      inset: 0,
      background:
        "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0))",
    },

    content: {
      position: "relative",
      zIndex: 2,
      maxWidth: isMobile ? "260px" : "450px",
    },

    greeting: {
      fontSize: isMobile ? "13px" : "16px",
      fontWeight: "500",
      color: "#0B2242",
      marginBottom: isMobile ? "8px" : "12px",
    },

    heading: {
      fontSize: isMobile ? "28px" : "42px",
      fontWeight: "800",
      lineHeight: "1.05",
      color: "#08244D",
      margin: 0,
      letterSpacing: "-1px",
    },

    highlight: {
      color: "#18B7B1",
    },

    badge: {
      marginTop: isMobile ? "10px" : "16px",
      display: "inline-flex",
      alignItems: "center",
      flexWrap: "wrap",
      padding: isMobile ? "8px 12px" : "10px 18px",
      background: "#fff",
      borderRadius: "999px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      color: "#20345D",
      fontSize: isMobile ? "11px" : "13px",
      fontWeight: "500",
      maxWidth: "100%",
    },

    topRight: {
      position: "absolute",
      top: isMobile ? "12px" : "18px",
      right: isMobile ? "12px" : "22px",
      display: "flex",
      alignItems: "center",
      gap: isMobile ? "6px" : "10px",
      zIndex: 5,
    },

    circleButton: {
      width: isMobile ? "34px" : "48px",
      height: isMobile ? "34px" : "48px",
      borderRadius: "50%",
      background: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      fontSize: isMobile ? "14px" : "18px",
      cursor: "pointer",
    },

    profile: {
      background: "#fff",
      borderRadius: "999px",
      padding: isMobile ? "4px 8px" : "6px 10px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
    },

    avatar: {
      width: isMobile ? "28px" : "38px",
      height: isMobile ? "28px" : "38px",
      borderRadius: "50%",
      objectFit: "cover",
    },

    profileName: {
      fontWeight: "600",
      color: "#102A43",
      fontSize: isMobile ? "12px" : "16px",
      display: isMobile ? "none" : "block",
    },
  };

  return (
    <div style={styles.hero}>
      <div style={styles.overlay}></div>

      <div style={styles.topRight}>
        <div style={styles.circleButton}>🔔</div>
        <div style={styles.circleButton}>💬</div>

        <div style={styles.profile}>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            style={styles.avatar}
          />

          <span style={styles.profileName}>
            Harsh
          </span>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.greeting}>
          Good evening, Harsh! 👋
        </div>

        <h1 style={styles.heading}>
          Where are you
          <br />
          heading{" "}
          <span style={styles.highlight}>
            today?
          </span>
        </h1>

        <div style={styles.badge}>
          Best matches • Lower fares • Trusted drivers
        </div>
      </div>
    </div>
  );
}