import React, { useState, useEffect } from "react";

import ProfileHeader from "../components/ProfileHeader";
import ProfileHeroCard from "../components/ProfileHeroCard";
import PersonalInfoCard from "../components/PersonalInfoCard";
import RidePreferencesCard from "../components/RidePreferencesCard";
import EmergencyContactsCard from "../components/EmergencyContactsCard";
import VerificationCard from "../components/VerificationCard";

export default function Profile() {
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
const isTablet = windowWidth >= 768 && windowWidth < 1024;
const isDesktop = windowWidth >= 1024;

  const styles = {
    page: {
      width: "100%",
      padding: isMobile ? "12px" : "20px",
      background: "#F7F8FA",
      minHeight: "100vh",
      boxSizing: "border-box",
      overflowX: "hidden",
    },

    heroWrapper: {
      marginTop: "20px",
      width: "100%",
    },

    cardsGrid: {
      display: "grid",
      gridTemplateColumns: isMobile
        ? "1fr"
        : "1fr 1fr",
      gap: isMobile ? "16px" : "20px",
      marginTop: "20px",
      alignItems: "start",
    },
  };

  return (
    <div style={styles.page}>
      {/* Top Header */}
      <ProfileHeader />

      {/* Hero Card */}
      <div style={styles.heroWrapper}>
        <ProfileHeroCard />
      </div>

      {/* Cards Section */}
      <div style={styles.cardsGrid}>
        <PersonalInfoCard />

        <RidePreferencesCard />

        <EmergencyContactsCard />

        <VerificationCard />
      </div>
    </div>
  );
}