import React from "react";

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={styles.toast}>
      ✅ {message}
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    background: "#14B8A6",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: "12px",
    fontWeight: "600",
    boxShadow: "0 12px 30px rgba(0,0,0,.15)",
    zIndex: 9999,
  },
};