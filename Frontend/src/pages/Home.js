import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import HeroSection from "../components/HeroSection";
import DriverCard from "../components/DriverCard";
import SafetyCard from "../components/SafetyCard";
import SOSCard from "../components/SOSCard";

export default function Home() {
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1200;

  const styles = {
    homePage: {
      padding: isMobile ? "12px" : "24px",
      background: "#F8FAFC",
      minHeight: "100vh",
      overflowX: "hidden",
    },

    actionSection: {
      display: "flex",
      justifyContent: "center",
      gap: "18px",
      marginTop: "-35px",
      marginBottom: "32px",
      position: "relative",
      zIndex: 20,
      flexWrap: "wrap",
    },

    actionCard: {
      width: isMobile ? "100%" : "420px",
      height: "82px",
      background: "#FFFFFF",
      borderRadius: "16px",
      padding: "12px 16px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      transition: "all 0.25s ease",
      boxShadow: "0 4px 16px rgba(15,45,82,0.10)",
      border: "1px solid #E5E7EB",
      position: "relative",
    },

    contentSection: {
      display: "flex",
      flexDirection: isTablet || isMobile ? "column" : "row",
      gap: "24px",
      marginTop: "16px",
      alignItems: "flex-start",
    },

    driversGrid: {
      width: "100%",
      flex: 1,
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : isTablet
        ? "repeat(2,1fr)"
        : "repeat(3,1fr)",
      gap: "20px",
    },

    rightPanel: {
      width: isTablet || isMobile ? "100%" : "320px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.homePage}>
      <HeroSection />

      {/* FIND RIDE + OFFER RIDE */}
      <div style={styles.actionSection}>

        {/* FIND RIDE */}
        <div style={styles.actionCard} onClick={() => navigate("/find-ride")}>
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#F0FDFA",
              border: "1.5px solid #99F6E4",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              flexShrink: 0,
            }}
          >
            🔍
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>
              Find a Ride
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
              Search verified rides near you
            </div>
          </div>

          {/* Popular badge */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "52px",
              background: "#FFF7ED",
              border: "1px solid #FED7AA",
              borderRadius: "20px",
              padding: "2px 8px",
              fontSize: "11px",
              fontWeight: "600",
              color: "#EA580C",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              whiteSpace: "nowrap",
            }}
          >
            🔥 Popular
          </div>

          {/* Arrow button */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#14B8A6,#2DD4BF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              flexShrink: 0,
            }}
          >
            →
          </div>
        </div>

        {/* OFFER RIDE */}
        <div style={styles.actionCard} onClick={() => navigate("/offer-ride")}>
          {/* Icon */}
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: "#F0F4FF",
              border: "1.5px solid #C7D2FE",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "22px",
              flexShrink: 0,
            }}
          >
            🚘
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>
              Offer a Ride
            </div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>
              Publish your trip &amp; earn
            </div>
          </div>

          {/* Earn Money badge */}
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "52px",
              background: "#F0FDF4",
              border: "1px solid #BBF7D0",
              borderRadius: "20px",
              padding: "2px 8px",
              fontSize: "11px",
              fontWeight: "600",
              color: "#16A34A",
              whiteSpace: "nowrap",
            }}
          >
            💰 Earn Money
          </div>

          {/* Arrow button */}
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#14B8A6,#2DD4BF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "700",
              flexShrink: 0,
            }}
          >
            →
          </div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div style={styles.contentSection}>
        <div style={styles.driversGrid}>
          <DriverCard
            name="Rahul Sharma"
            rating="4.9"
            route="Agra → Delhi"
            price="299"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600"
            preferences={["Calm", "Music Lover", "Pet Friendly"]}
          />
          <DriverCard
            name="Neha Verma"
            rating="4.8"
            route="Agra → Noida"
            price="249"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
            preferences={["Female Driver", "Verified", "Safe"]}
          />
          <DriverCard
            name="Aman Singh"
            rating="5.0"
            route="Agra → Gurgaon"
            price="349"
            image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600"
            preferences={["Talkative", "On Time", "Clean Car"]}
          />
          <DriverCard
            name="Priya Kapoor"
            rating="4.7"
            route="Agra → Mathura"
            price="199"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600"
            preferences={["Friendly", "Music Lover", "Verified"]}
          />
          <DriverCard
            name="Arjun Mehta"
            rating="4.9"
            route="Agra → Jaipur"
            price="399"
            image="https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600"
            preferences={["Eco Friendly", "Smooth Ride", "Non-stop"]}
          />
          <DriverCard
            name="Karan Malhotra"
            rating="4.8"
            route="Agra → Lucknow"
            price="499"
            image="https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600"
            preferences={["Experienced", "Quiet", "Clean Car"]}
          />
        </div>

        <div style={styles.rightPanel}>
          <SafetyCard />
          <SOSCard />
        </div>
      </div>
    </div>
  );
}