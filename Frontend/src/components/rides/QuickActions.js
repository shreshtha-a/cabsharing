import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlinePlusCircle,
  HiOutlineCalendar,
  HiOutlineRefresh,
  HiChevronRight,
} from "react-icons/hi";

export default function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Offer a Ride",
      subtitle: "Publish your trip",
      icon: <HiOutlinePlusCircle size={22} />,
      path: "/offer-ride",
    },
    {
      title: "Schedule Ride",
      subtitle: "Plan upcoming trips",
      icon: <HiOutlineCalendar size={22} />,
      path: "/offer-ride",
    },
    {
      title: "Recurring Rides",
      subtitle: "Manage repeat rides",
      icon: <HiOutlineRefresh size={22} />,
      path: "/recurring-rides",
    },
  ];

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Quick Actions</h3>

      {actions.map((action) => (
        <div
          key={action.title}
          style={styles.item}
          onClick={() => navigate(action.path)}
        >
          <div style={styles.icon}>{action.icon}</div>

          <div style={{ flex: 1 }}>
            <div style={styles.name}>{action.title}</div>
            <div style={styles.subtitle}>{action.subtitle}</div>
          </div>

          <HiChevronRight color="#94A3B8" />
        </div>
      ))}
    </div>
  );
}

const styles = {
  card: {
    background: "#fff",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid #E8EEF5",
    boxShadow: "0 10px 30px rgba(15,36,84,.05)",
  },

  title: {
    margin: "0 0 20px",
    color: "#122B58",
    fontWeight: "700",
  },

  item: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "14px 0",
    cursor: "pointer",
    borderBottom: "1px solid #F1F5F9",
  },

  icon: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    background: "#EDFDFB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#14B8A6",
  },

  name: {
    fontWeight: "700",
    color: "#122B58",
  },

  subtitle: {
    color: "#64748B",
    fontSize: "13px",
    marginTop: "3px",
  },
};