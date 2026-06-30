import React, { useState } from "react";
import HeroBanner from "../components/rides/HeroBanner";
import StatsCards from "../components/rides/StatsCards";
export default function MyRides() {
    const [stats] = useState({
  upcoming: 3,
  completed: 12,
  cancelled: 2,
  earnings: 2430,
});
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Rides</h1>
        <p style={styles.subtitle}>
          View and manage all your rides in one place.
        </p>
      </div>

    <HeroBanner />

<StatsCards stats={stats} />

<div style={styles.content}>
</div>
    </div>
  );
}

const styles = {
  page: {
    padding: "32px",
    minHeight: "100vh",
    background: "#F8FAFC",
  },

  header: {
    marginBottom: "28px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: "800",
    color: "#0F2454",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "16px",
    color: "#64748B",
  },

  content: {
    background: "#FFFFFF",
    borderRadius: "24px",
    border: "1px solid #E8EEF5",
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 30px rgba(15,36,84,0.05)",
  },

  placeholder: {
    color: "#94A3B8",
    fontSize: "18px",
    fontWeight: "600",
  },
};
