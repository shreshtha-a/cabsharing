import React from "react";

export default function RideList() {
  return (
    <div style={styles.container}>
      Ride List Area
    </div>
  );
}

const styles = {
  container: {
    background: "#FFFFFF",
    borderRadius: "24px",
    border: "1px solid #E8EEF5",
    minHeight: "450px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 10px 30px rgba(15,36,84,0.05)",
    color: "#94A3B8",
    fontWeight: "600",
  },
};