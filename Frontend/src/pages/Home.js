import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import RideSearchCard from "../components/RideSearchCard";
import DriverCard from "../components/DriverCard";
import SafetyCard from "../components/SafetyCard";
import SOSCard from "../components/SOSCard";

export default function Home() {
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
  const isTablet =
    windowWidth >= 768 && windowWidth < 1200;

  const styles = {
    homePage: {
      padding: isMobile ? "12px" : "24px",
      background: "#F8FAFC",
      minHeight: "100vh",
      overflowX: "hidden",
    },

    contentSection: {
      display: "flex",
      flexDirection: isTablet || isMobile
        ? "column"
        : "row",
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
        ? "repeat(2, 1fr)"
        : "repeat(3, 1fr)",
      gap: "20px",
    },

    rightPanel: {
      width:
        isTablet || isMobile
          ? "100%"
          : "320px",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      flexShrink: 0,
    },
  };

  return (
    <div style={styles.homePage}>
      <HeroSection />

      <RideSearchCard />

      <div style={styles.contentSection}>
        <div style={styles.driversGrid}>
          <DriverCard
            name="Rahul Sharma"
            rating="4.9"
            route="Agra → Delhi"
            price="299"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600"
            preferences={[
              "Calm",
              "Music Lover",
              "Pet Friendly",
            ]}
          />

          <DriverCard
            name="Neha Verma"
            rating="4.8"
            route="Agra → Noida"
            price="249"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600"
            preferences={[
              "Female Driver",
              "Verified",
              "Safe",
            ]}
          />

          <DriverCard
            name="Aman Singh"
            rating="5.0"
            route="Agra → Gurgaon"
            price="349"
            image="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600"
            preferences={[
              "Talkative",
              "On Time",
              "Clean Car",
            ]}
          />

          <DriverCard
            name="Priya Kapoor"
            rating="4.7"
            route="Agra → Mathura"
            price="199"
            image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600"
            preferences={[
              "Friendly",
              "Music Lover",
              "Verified",
            ]}
          />

          <DriverCard
            name="Arjun Mehta"
            rating="4.9"
            route="Agra → Jaipur"
            price="399"
            image="https://images.unsplash.com/photo-1504593811423-6dd665756598?w=600"
            preferences={[
              "Eco Friendly",
              "Smooth Ride",
              "Non-stop",
            ]}
          />

          <DriverCard
            name="Karan Malhotra"
            rating="4.8"
            route="Agra → Lucknow"
            price="499"
            image="https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=600"
            preferences={[
              "Experienced",
              "Quiet",
              "Clean Car",
            ]}
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