import React from "react";

export default function DashboardLayout({ children, sidebar }) {
  return (
    <div style={styles.container}>
      <div style={styles.main}>
        {children}
      </div>

      <div style={styles.sidebar}>
        {sidebar}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "2.5fr 1fr",
    gap: "24px",
    marginTop: "28px",
    alignItems: "start",
  },

  main: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
};