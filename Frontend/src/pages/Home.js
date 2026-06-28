import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { rideService } from "../services/rideService";

import HeroSection from "../components/HeroSection";
import SafetyCard from "../components/SafetyCard";
import SOSCard from "../components/SOSCard";

// ─── Helpers ──────────────────────────────────────────────
function getDriverPhoto(ride) {
  const photo = ride?.driver?.user?.photo;
  const name  = ride?.driver?.user?.name || "Driver";
  if (photo && photo.startsWith("http")) return photo;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14B8A6&color=fff&size=128`;
}

function getRidePreferenceTags(ride) {
  const tags = [];
  const p = ride?.preferences || {};
  if (p.petsAllowed)     tags.push("Pet Friendly");
  if (!p.smokingAllowed) tags.push("Non Smoker");
  if (p.musicAllowed)    tags.push("Music Lover");
  if (p.luggageAllowed)  tags.push("Luggage OK");
  return tags.slice(0, 3);
}

// ─── Driver Card (real data version) ──────────────────────
function RealDriverCard({ ride }) {
  const navigate    = useNavigate();
  const driverName  = ride?.driver?.user?.name  || "Driver";
  const driverPhoto = getDriverPhoto(ride);
  const rating      = ride?.driver?.averageRating || 0;
  const tags        = getRidePreferenceTags(ride);

  return (
    <div
      onClick={() => navigate("/find-ride")}
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        boxShadow: "0 4px 16px rgba(15,45,82,0.08)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(15,45,82,0.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 16px rgba(15,45,82,0.08)"; }}
    >
      {/* Photo */}
      <div style={{ position: "relative", height: "160px", background: "#F1F5F9" }}>
        <img
          src={driverPhoto}
          alt={driverName}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driverName)}&background=14B8A6&color=fff&size=200`; }}
        />
        {/* Rating badge */}
        <div style={{ position: "absolute", top: "10px", right: "10px", background: "rgba(255,255,255,0.95)", borderRadius: "20px", padding: "4px 10px", fontSize: "12px", fontWeight: "700", color: "#0F2D52", display: "flex", alignItems: "center", gap: "4px" }}>
          ⭐ {rating > 0 ? rating.toFixed(1) : "New"}
        </div>
        {/* Verified badge */}
        <div style={{ position: "absolute", bottom: "10px", left: "10px", background: "#14B8A6", color: "#fff", borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: "600" }}>✓ Verified</div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52", marginBottom: "2px" }}>{driverName}</div>
        <div style={{ fontSize: "12px", color: "#14B8A6", fontWeight: "600", marginBottom: "10px" }}>
          {ride.source?.address} → {ride.destination?.address}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "12px" }}>
          {tags.map(t => (
            <span key={t} style={{ background: "#F0FDFA", border: "1px solid #99F6E4", color: "#0F6E56", fontSize: "11px", padding: "2px 8px", borderRadius: "20px" }}>{t}</span>
          ))}
          {tags.length === 0 && (
            <span style={{ background: "#F0FDFA", border: "1px solid #99F6E4", color: "#0F6E56", fontSize: "11px", padding: "2px 8px", borderRadius: "20px" }}>🚘 {ride.availableSeats} seats left</span>
          )}
        </div>

        {/* Price row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <span style={{ fontSize: "18px", fontWeight: "800", color: "#0F2D52" }}>₹{ride.farePerSeat}</span>
            <span style={{ fontSize: "11px", color: "#64748B", marginLeft: "4px" }}>/ seat</span>
          </div>
          <div style={{ background: "linear-gradient(135deg,#14B8A6,#2DD4BF)", color: "#fff", borderRadius: "10px", padding: "6px 14px", fontSize: "12px", fontWeight: "600" }}>
            Book →
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Skeleton card for loading state ──────────────────────
function SkeletonCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", border: "1px solid #E5E7EB" }}>
      <div style={{ height: "160px", background: "linear-gradient(90deg,#F1F5F9 25%,#E2E8F0 50%,#F1F5F9 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
      <div style={{ padding: "14px 16px" }}>
        {[80, 60, 100].map((w, i) => (
          <div key={i} style={{ height: "12px", background: "#F1F5F9", borderRadius: "6px", width: `${w}%`, marginBottom: "10px" }} />
        ))}
      </div>
    </div>
  );
}

// ─── Main Home Component ───────────────────────────────────
export default function Home() {
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [rides,   setRides]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch a handful of recent scheduled rides for the featured section
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await rideService.getRides({ seats: 1 });
        setRides((res.data.rides || []).slice(0, 6));
      } catch (err) {
        setError("Could not load rides.");
      } finally {
        setLoading(false);
      }
    })();
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
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)",
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
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#F0FDFA", border: "1.5px solid #99F6E4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>🔍</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Find a Ride</div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>Search verified rides near you</div>
          </div>
          <div style={{ position: "absolute", top: "10px", right: "52px", background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: "20px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", color: "#EA580C", display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>🔥 Popular</div>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#14B8A6,#2DD4BF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "16px", fontWeight: "700", flexShrink: 0 }}>→</div>
        </div>

        {/* OFFER RIDE */}
        <div style={styles.actionCard} onClick={() => navigate("/offer-ride")}>
          <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "#F0F4FF", border: "1.5px solid #C7D2FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>🚘</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Offer Ride</div>
            <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>Publish your trip &amp; earn</div>
          </div>
          <div style={{ position: "absolute", top: "10px", right: "52px", background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: "20px", padding: "2px 8px", fontSize: "11px", fontWeight: "600", color: "#16A34A", whiteSpace: "nowrap" }}>💰 Earn Money</div>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg,#14B8A6,#2DD4BF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "16px", fontWeight: "700", flexShrink: 0 }}>→</div>
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div style={styles.contentSection}>
        <div style={{ flex: 1 }}>

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#0F2D52" }}>Available Rides</h2>
              <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#64748B" }}>Live from our platform</p>
            </div>
            <button onClick={() => navigate("/find-ride")} style={{ background: "none", border: "1px solid #14B8A6", color: "#14B8A6", borderRadius: "10px", padding: "6px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
              See All →
            </button>
          </div>

          <div style={styles.driversGrid}>
            {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

            {!loading && error && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#64748B" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>⚠️</div>
                <div>{error}</div>
                <button onClick={() => navigate("/find-ride")} style={{ marginTop: "12px", background: "#14B8A6", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 20px", fontWeight: "600", cursor: "pointer" }}>Browse All Rides</button>
              </div>
            )}

            {!loading && !error && rides.length === 0 && (
              <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "40px", color: "#64748B" }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🚗</div>
                <div style={{ fontWeight: "600", color: "#0F2D52", marginBottom: "6px" }}>No rides available yet</div>
                <div style={{ fontSize: "13px", marginBottom: "16px" }}>Be the first to offer a ride!</div>
                <button onClick={() => navigate("/offer-ride")} style={{ background: "linear-gradient(135deg,#14B8A6,#2DD4BF)", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: "600", cursor: "pointer" }}>Offer a Ride</button>
              </div>
            )}

            {!loading && !error && rides.map(ride => (
              <RealDriverCard key={ride._id} ride={ride} />
            ))}
          </div>
        </div>

        <div style={styles.rightPanel}>
          <SafetyCard />
          <SOSCard />
        </div>
      </div>
    </div>
  );
}