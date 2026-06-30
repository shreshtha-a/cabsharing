import React from "react";

export default function RideTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            ...styles.tab,
            ...(activeTab === tab.id ? styles.activeTab : {}),
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
  },

  tab: {
    padding: "14px 26px",
    borderRadius: "18px",
    border: "1px solid #E5E7EB",
    background: "#FFFFFF",
    color: "#64748B",
    fontWeight: "600",
    fontSize: "15px",
    cursor: "pointer",
    transition: "all .25s ease",
  },

  activeTab: {
    background: "#EDFDFB",
    color: "#14B8A6",
    border: "1px solid #14B8A6",
  },
};