import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backdrop from "../assets/hopin-backdrop.png";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

export default function HeroSection() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
  }, []);

  const isMobile  = windowWidth < 768;
  const userName  = user?.name?.split(" ")[0] || "there";
  const userPhoto = localStorage.getItem("profileImage") ||
    user?.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=14B8A6&color=fff&size=128`;

  const styles = {
    hero: {
      height: isMobile ? "230px" : "290px",
      borderRadius: isMobile ? "20px" : "28px",
      overflow: "hidden", position: "relative",
      backgroundImage: `url(${backdrop})`,
      backgroundSize: "cover", backgroundPosition: "75% center",
      padding: isMobile ? "18px" : "28px 32px", boxSizing: "border-box",
    },
    overlay: {
      position: "absolute", inset: 0,
      background: "linear-gradient(to right, rgba(255,255,255,0.12), rgba(255,255,255,0))",
    },
    content: { position: "relative", zIndex: 2, maxWidth: isMobile ? "260px" : "450px" },
    greeting: { fontSize: isMobile ? "13px" : "16px", fontWeight: "500", color: "#0B2242", marginBottom: isMobile ? "8px" : "12px" },
    heading: { fontSize: isMobile ? "28px" : "42px", fontWeight: "800", lineHeight: "1.05", color: "#08244D", margin: 0, letterSpacing: "-1px" },
    highlight: { color: "#18B7B1" },
    badge: {
      marginTop: isMobile ? "10px" : "16px", display: "inline-flex", alignItems: "center",
      flexWrap: "wrap", padding: isMobile ? "8px 12px" : "10px 18px", background: "#fff",
      borderRadius: "999px", boxShadow: "0 6px 18px rgba(0,0,0,0.08)", color: "#20345D",
      fontSize: isMobile ? "11px" : "13px", fontWeight: "500", maxWidth: "100%",
    },
    topRight: {
      position: "absolute", top: isMobile ? "12px" : "18px", right: isMobile ? "12px" : "22px",
      display: "flex", alignItems: "center", gap: isMobile ? "6px" : "10px", zIndex: 5,
    },
    circleButton: {
      width: isMobile ? "34px" : "48px", height: isMobile ? "34px" : "48px",
      borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center",
      justifyContent: "center", boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      fontSize: isMobile ? "14px" : "18px", cursor: "pointer",
    },
    profile: {
      background: "#fff", borderRadius: "999px",
      padding: isMobile ? "4px 8px" : "6px 10px",
      display: "flex", alignItems: "center", gap: "8px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      cursor: "pointer",          // ← clickable
      transition: "opacity 0.15s",
    },
    avatar: { width: isMobile ? "28px" : "38px", height: isMobile ? "28px" : "38px", borderRadius: "50%", objectFit: "cover" },
    profileName: { fontWeight: "600", color: "#102A43", fontSize: isMobile ? "12px" : "16px", display: isMobile ? "none" : "block" },
  };

  return (
    <div style={styles.hero}>
      <div style={styles.overlay} />

      <div style={styles.topRight}>
        <div style={styles.circleButton} onClick={() => navigate("/notifications")}>🔔</div>
        <div style={styles.circleButton} onClick={() => navigate("/messages")}>💬</div>

        {/* Clickable profile → /profile */}
        <div style={styles.profile} onClick={() => navigate("/profile")}>
          <img src={userPhoto} alt="profile" style={styles.avatar} />
          <span style={styles.profileName}>{userName}</span>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.greeting}>{getGreeting()}, {userName}! 👋</div>
        <h1 style={styles.heading}>
          Where are you<br />heading <span style={styles.highlight}>today?</span>
        </h1>
        <div style={styles.badge}>Best matches • Lower fares • Trusted drivers</div>
      </div>
    </div>
  );
}