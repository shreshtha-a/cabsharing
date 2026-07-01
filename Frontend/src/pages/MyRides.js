import React, { useState, useEffect, useCallback, useMemo } from "react";
import HeroBanner from "../components/rides/HeroBanner";
import RideTabs from "../components/rides/RideTabs";
import RideList from "../components/rides/RideList";
import QuickActions from "../components/rides/QuickActions";
import EarningsCard from "../components/rides/EarningsCard";
import StatsCards from "../components/rides/StatsCards";
import { rideService, driverService } from "../services/rideServices";

// Map your backend's actual ride statuses into the 3 tabs the UI uses.
// Adjust these arrays if your backend uses different status strings.
const STATUS_MAP = {
  upcoming: ["scheduled", "ongoing"],
  completed: ["completed"],
  cancelled: ["cancelled"],
};

export default function MyRides() {
  const [activeTab, setActiveTab] = useState("upcoming");

  const [allRides, setAllRides] = useState([]);
  const [ridesLoading, setRidesLoading] = useState(true);
  const [ridesError, setRidesError] = useState(null);

  const [earnings, setEarnings] = useState(0);
  const [earningsLoading, setEarningsLoading] = useState(true);

  const fetchRides = useCallback(() => {
    setRidesLoading(true);
    setRidesError(null);
    rideService
      .getMyRides()
      .then((res) => setAllRides(res.data.rides || []))
      .catch((err) =>
        setRidesError(err.response?.data?.message || "Failed to load rides")
      )
      .finally(() => setRidesLoading(false));
  }, []);

  const fetchEarnings = useCallback(() => {
    setEarningsLoading(true);
    driverService
      .getEarnings()
      .then((res) => {
        // Adjust this if your earnings response shape differs
        setEarnings(res.data.totalEarnings ?? res.data.earnings ?? 0);
      })
      .catch(() => setEarnings(0)) // not every user is a driver — fail silently
      .finally(() => setEarningsLoading(false));
  }, []);

  useEffect(() => {
    fetchRides();
    fetchEarnings();
  }, [fetchRides, fetchEarnings]);

  // Derive stats from the full ride list
  const stats = useMemo(() => {
    const count = (statuses) =>
      allRides.filter((r) => statuses.includes(r.status)).length;
    return {
      upcoming: count(STATUS_MAP.upcoming),
      completed: count(STATUS_MAP.completed),
      cancelled: count(STATUS_MAP.cancelled),
      earnings,
    };
  }, [allRides, earnings]);

  // Filter rides for the active tab
  const visibleRides = useMemo(() => {
    const statuses = STATUS_MAP[activeTab] || [];
    return allRides.filter((r) => statuses.includes(r.status));
  }, [allRides, activeTab]);

  const handleCancelRide = async (rideId) => {
    try {
      await rideService.cancelRide(rideId);
      fetchRides(); // refresh after cancel
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel ride");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Rides</h1>
        <p style={styles.subtitle}>
          View and manage all your rides in one place.
        </p>
      </div>

      <HeroBanner />

      <RideTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <StatsCards stats={stats} loading={ridesLoading || earningsLoading} />

      <div style={styles.dashboard}>
        {ridesError ? (
          <div style={styles.errorBox}>
            <p>Couldn't load rides: {ridesError}</p>
            <button style={styles.retryButton} onClick={fetchRides}>
              Retry
            </button>
          </div>
        ) : (
          <RideList
            activeTab={activeTab}
            rides={visibleRides}
            loading={ridesLoading}
            onCancelRide={handleCancelRide}
          />
        )}

        <div style={styles.rightColumn}>
          <QuickActions />
          <EarningsCard earnings={earnings} loading={earningsLoading} />
        </div>
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
  dashboard: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr",
    gap: "24px",
    marginTop: "28px",
  },
  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  errorBox: {
    background: "#FFFFFF",
    borderRadius: "24px",
    border: "1px solid #FECACA",
    padding: "24px",
    color: "#DC2626",
    textAlign: "center",
  },
  retryButton: {
    marginTop: "12px",
    padding: "8px 16px",
    borderRadius: "8px",
    border: "none",
    background: "#0F2454",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
  },
};