import React, { useState, useEffect } from "react";
import {
  HiShieldCheck,
  HiCheckCircle,
} from "react-icons/hi";

export default function SafetyCard() {
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

    top: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: isMobile ? "14px" : "18px",
    },

    title: {
      fontSize: isMobile ? "16px" : "18px",
      fontWeight: "700",
      color: "#0F172A",
    },

    shield: {
      fontSize: isMobile ? "46px" : "58px",
      color: "#14B8A6",
      flexShrink: 0,
    },

    scoreContainer: {
      marginBottom: isMobile ? "16px" : "20px",
    },

    score: {
      fontSize: isMobile ? "34px" : "42px",
      fontWeight: "800",
      color: "#0B8A8F",
      lineHeight: 1,
    },

    scoreSmall: {
      fontSize: isMobile ? "18px" : "22px",
    },

    scoreText: {
      fontSize: isMobile ? "14px" : "16px",
      color: "#0F172A",
      fontWeight: "600",
      marginTop: "6px",
    },

    item: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "10px",
      color: "#334155",
      fontSize: isMobile ? "13px" : "14px",
      fontWeight: "500",
    },

    check: {
      color: "#14B8A6",
      fontSize: isMobile ? "16px" : "18px",
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.top}>
        <div style={styles.title}>
          Safety first, always
        </div>

        <HiShieldCheck style={styles.shield} />
      </div>

      <div style={styles.scoreContainer}>
        <div style={styles.score}>
          97
          <span style={styles.scoreSmall}>
            /100
          </span>
        </div>

        <div style={styles.scoreText}>
          High Safety Score
        </div>
      </div>

      <div style={styles.item}>
        <HiCheckCircle style={styles.check} />
        Identity verified
      </div>

      <div style={styles.item}>
        <HiCheckCircle style={styles.check} />
        Driving license verified
      </div>

      <div style={styles.item}>
        <HiCheckCircle style={styles.check} />
        Phone verified
      </div>

      <div style={styles.item}>
        <HiCheckCircle style={styles.check} />
        Background check
      </div>
    </div>
  );
}