import React, { useState, useEffect } from "react";
import {
  HiLocationMarker,
  HiSwitchVertical,
} from "react-icons/hi";

export default function RideSearchCard() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
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

  const swapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  const handleSearch = () => {
    if (!pickup || !drop) {
      alert("Please enter pickup and destination");
      return;
    }

    alert(
      `Searching rides from ${pickup} to ${drop}`
    );
  };

  const styles = {
    card: {
      background: "#fff",
      borderRadius: isMobile ? "18px" : "24px",
      padding: isMobile ? "12px" : "8px 16px",
      boxShadow:
        "0 15px 40px rgba(0,0,0,0.10)",
      position: "relative",
      zIndex: 20,
      marginTop: isMobile ? "-20px" : "-45px",
      maxWidth: isMobile ? "100%" : "820px",
      marginLeft: "auto",
      marginRight: "auto",
      transition: "all 0.3s ease",
    },

    row: {
      display: "flex",
      flexDirection: isMobile
        ? "column"
        : "row",
      alignItems: isMobile
        ? "stretch"
        : "center",
      justifyContent: "space-between",
      gap: isMobile ? "10px" : "12px",
      marginBottom: "8px",
    },

    locationBox: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: isMobile
        ? "10px"
        : "6px 8px",
      borderRadius: "12px",
      background: isMobile
        ? "#F8FAFC"
        : "transparent",
    },

    icon: {
      fontSize: isMobile
        ? "20px"
        : "18px",
      flexShrink: 0,
    },

    content: {
      flex: 1,
    },

    label: {
      fontSize: isMobile
        ? "11px"
        : "10px",
      color: "#64748B",
      marginBottom: "2px",
      fontWeight: "500",
    },

    input: {
      border: "none",
      outline: "none",
      width: "100%",
      fontSize: isMobile
        ? "15px"
        : "14px",
      fontWeight: "700",
      color: "#0F172A",
      background: "transparent",
      padding: 0,
      marginBottom: "2px",
    },

    subText: {
      fontSize: isMobile
        ? "11px"
        : "10px",
      color: "#64748B",
    },

    swapButton: {
      width: isMobile ? "42px" : "34px",
      height: isMobile ? "42px" : "34px",
      borderRadius: "50%",
      border: "none",
      background: "#F8FAFC",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile
        ? "16px"
        : "12px",
      boxShadow:
        "0 4px 10px rgba(0,0,0,0.08)",
      alignSelf: "center",
      flexShrink: 0,
    },

    searchButton: {
      width: "100%",
      height: isMobile ? "46px" : "38px",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: isMobile
        ? "15px"
        : "14px",
      fontWeight: "600",
      color: "#fff",
      background:
        "linear-gradient(90deg,#0B8A8F,#12C2C8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.row}>
        <div style={styles.locationBox}>
          <HiLocationMarker
            style={styles.icon}
            color="#14B8A6"
          />

          <div style={styles.content}>
            <div style={styles.label}>
              Pickup
            </div>

            <input
              type="text"
              value={pickup}
              onChange={(e) =>
                setPickup(e.target.value)
              }
              placeholder="Current Location"
              style={styles.input}
            />

            <div style={styles.subText}>
              Use my location
            </div>
          </div>
        </div>

        <button
          style={styles.swapButton}
          onClick={swapLocations}
        >
          <HiSwitchVertical />
        </button>

        <div style={styles.locationBox}>
          <HiLocationMarker
            style={styles.icon}
            color="#F59E0B"
          />

          <div style={styles.content}>
            <div style={styles.label}>
              Drop
            </div>

            <input
              type="text"
              value={drop}
              onChange={(e) =>
                setDrop(e.target.value)
              }
              placeholder="Where to?"
              style={styles.input}
            />

            <div style={styles.subText}>
              Enter destination
            </div>
          </div>
        </div>
      </div>

      <button
        style={styles.searchButton}
        onClick={handleSearch}
      >
        Find My Best Ride →
      </button>
    </div>
  );
}