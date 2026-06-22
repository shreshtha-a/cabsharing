import React, { useState, useEffect } from "react";

export default function SOSCard() {
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
      padding: isMobile ? "18px" : "22px",
      boxShadow:
        "0 10px 30px rgba(0,0,0,0.05)",
      width: "100%",
      boxSizing: "border-box",
    },

    title: {
      fontSize: isMobile ? "20px" : "24px",
      fontWeight: "700",
      color: "#0F172A",
      marginBottom: "8px",
    },

    subtitle: {
      color: "#64748B",
      fontSize: isMobile ? "13px" : "14px",
      marginBottom: "18px",
    },

    button: {
      width: "100%",
      height: isMobile ? "44px" : "50px",
      border: "none",
      borderRadius: "14px",
      cursor: "pointer",
      color: "#fff",
      fontWeight: "600",
      fontSize: isMobile ? "14px" : "16px",
      background:
        "linear-gradient(90deg,#0B8A8F,#12C2C8)",
      marginBottom: "20px",
      transition: "0.3s",
    },

    sosContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    sosLight: {
      width: isMobile ? "100px" : "120px",
      height: isMobile ? "100px" : "120px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(255,0,0,0.15) 0%, rgba(255,0,0,0.03) 70%)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    sosButton: {
      width: isMobile ? "70px" : "80px",
      height: isMobile ? "70px" : "80px",
      borderRadius: "50%",
      background:
        "linear-gradient(180deg,#ff6b6b,#e53935)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "800",
      fontSize: isMobile ? "22px" : "26px",
      boxShadow:
        "0 10px 25px rgba(229,57,53,0.4)",
    },
  };

  const handleSOS = () => {
    alert("🚨 Emergency SOS Activated");
  };

  return (
    <div style={styles.card}>
      <div style={styles.title}>
        Need help?
      </div>

      <div style={styles.subtitle}>
        We're here 24/7
      </div>

      <button
        style={styles.button}
        onClick={handleSOS}
      >
        Open SOS →
      </button>

      <div style={styles.sosContainer}>
        <div style={styles.sosLight}>
          <div style={styles.sosButton}>
            SOS
          </div>
        </div>
      </div>
    </div>
  );
}