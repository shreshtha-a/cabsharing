import React from "react";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaWallet,
} from "react-icons/fa";

const iconMap = {
  upcoming: <FaCalendarAlt size={22} />,
  completed: <FaCheckCircle size={22} />,
  cancelled: <FaTimesCircle size={22} />,
  earnings: <FaWallet size={22} />,
};

const colors = {
  upcoming: "#14B8A6",
  completed: "#10B981",
  cancelled: "#EF4444",
  earnings: "#8B5CF6",
};

export default function StatsCards({ stats }) {
  const cards = [
    {
      key: "upcoming",
      title: "Upcoming Rides",
      value: stats.upcoming,
      subtitle: "Scheduled trips",
    },
    {
      key: "completed",
      title: "Completed Rides",
      value: stats.completed,
      subtitle: "All time",
    },
    {
      key: "cancelled",
      title: "Cancelled Rides",
      value: stats.cancelled,
      subtitle: "All time",
    },
    {
      key: "earnings",
      title: "Total Earnings",
      value: `₹${stats.earnings}`,
      subtitle: "From offered rides",
    },
  ];

  return (
    <div style={styles.wrapper}>
      {cards.map((card) => (
        <div key={card.key} style={styles.card}>
          <div
            style={{
              ...styles.iconBox,
              background: `${colors[card.key]}15`,
              color: colors[card.key],
            }}
          >
            {iconMap[card.key]}
          </div>

          <div>
            <div style={styles.title}>{card.title}</div>
            <div style={styles.value}>{card.value}</div>
            <div style={styles.subtitle}>{card.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "18px",
    marginBottom: "28px",
  },

  card: {
    background: "#fff",
    borderRadius: "22px",
    padding: "22px",
    display: "flex",
    gap: "18px",
    alignItems: "center",
    boxShadow: "0 10px 25px rgba(15,36,84,.06)",
    border: "1px solid #EEF2F7",
    transition: ".25s",
  },

  iconBox: {
    width: "58px",
    height: "58px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  title: {
    color: "#64748B",
    fontSize: "14px",
    fontWeight: "600",
  },

  value: {
    marginTop: "6px",
    fontSize: "28px",
    fontWeight: "800",
    color: "#0F2454",
  },

  subtitle: {
    marginTop: "5px",
    color: "#94A3B8",
    fontSize: "13px",
  },
};