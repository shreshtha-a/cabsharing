import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  HiOutlineHome, HiOutlineChatAlt2, HiOutlineUser,
  HiOutlineBell, HiOutlineCog, HiOutlineRefresh, HiOutlineLogout,
} from "react-icons/hi";
import { FaCarSide } from "react-icons/fa";
import api from "../utils/api";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [user,     setUser]     = useState(null);
  const [unread,   setUnread]   = useState(0); // real notification count

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Re-read user every route change (catches post-login nav)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}
  }, [location.pathname]);

  // Fetch unread notification count when logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    api.get("/notifications")
      .then(res => {
        const notifications = res.data?.notifications || [];
        setUnread(notifications.filter(n => !n.isRead).length);
      })
      .catch(() => {}); // silently ignore — sidebar shouldn't crash on notif failure
  }, [location.pathname]);

  if (isMobile) return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    navigate("/");
  };

  const userName  = user?.name  || "Guest";
  const userEmail = user?.email || "Not logged in";
  const userPhoto =
    localStorage.getItem("profileImage") ||
    user?.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=14B8A6&color=fff&size=128`;

  const menuItems = [
    { name: "Home",            path: "/home",            icon: <HiOutlineHome size={22} /> },
    { name: "My Rides",        path: "/rides",           icon: <FaCarSide size={18} /> },
    { name: "Messages",        path: "/messages",        icon: <HiOutlineChatAlt2 size={22} /> },
    { name: "Recurring Rides", path: "/recurring-rides", icon: <HiOutlineRefresh size={22} /> },
    { name: "Notifications",   path: "/notifications",   icon: <HiOutlineBell size={22} />, badge: unread > 0 ? unread : null },
    { name: "Profile",         path: "/profile",         icon: <HiOutlineUser size={22} /> },
    { name: "Settings",        path: "/settings",        icon: <HiOutlineCog size={22} /> },
  ];

  return (
    <aside style={styles.sidebar}>
      <div>
        {/* Logo */}
        <div style={styles.logoSection}>
          <h1 style={styles.logo}>Hop<span style={{ color: "#18C4C7" }}>in</span></h1>
          <p style={styles.tagline}>Going your way, anyways.</p>
        </div>

        {/* User Card */}
        <div style={styles.userCard} onClick={() => navigate("/profile")}>
          <img
            src={userPhoto}
            alt="avatar"
            style={styles.userAvatar}
            onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=14B8A6&color=fff`; }}
          />
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userName}</div>
            <div style={styles.userEmail}>{userEmail}</div>
          </div>
        </div>

        {/* Menu */}
        <nav>
          {menuItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({ ...styles.navItem, ...(isActive ? styles.activeNav : {}) })}
            >
              <div style={styles.icon}>{item.icon}</div>
              <span>{item.name}</span>
              {item.badge != null && (
                <div style={styles.badge}>{item.badge}</div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          <HiOutlineLogout size={20} />
          <span>Log Out</span>
        </button>

        <div style={styles.inviteCard}>
          <h3 style={styles.inviteTitle}>Invite friends,<br />earn rewards</h3>
          <p style={styles.inviteText}>Give ₹100, get ₹100*</p>
          <button style={styles.inviteButton}>Invite Now →</button>
          <div style={styles.inviteIllustration}>🎁</div>
        </div>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: "250px", minWidth: "250px", height: "100vh", position: "sticky", top: 0,
    background: "#FFFFFF", padding: "20px", boxSizing: "border-box",
    display: "flex", flexDirection: "column", justifyContent: "space-between",
    borderRight: "1px solid #EEF2F7", zIndex: 100, overflowY: "auto",
  },
  logoSection: { marginBottom: "16px" },
  logo: { margin: 0, fontSize: "48px", fontWeight: "800", color: "#0F2454", lineHeight: "1" },
  tagline: { marginTop: "8px", fontSize: "14px", color: "#7A869A", fontWeight: "500" },
  userCard: {
    display: "flex", alignItems: "center", gap: "10px",
    background: "#F0FDFA", borderRadius: "16px", padding: "10px 12px",
    marginBottom: "16px", border: "1px solid #99F6E4",
    cursor: "pointer", transition: "background 0.15s",
  },
  userAvatar: { width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover", flexShrink: 0 },
  userInfo: { overflow: "hidden" },
  userName: { fontWeight: "700", color: "#0F2454", fontSize: "14px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  userEmail: { fontSize: "11px", color: "#64748B", marginTop: "2px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  navItem: {
    display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px",
    borderRadius: "18px", marginBottom: "8px", textDecoration: "none",
    color: "#20345D", fontWeight: "500", fontSize: "15px",
    transition: "all 0.25s ease", position: "relative",
  },
  activeNav: { background: "#EDF9F9", color: "#12B7B5", fontWeight: "700" },
  icon: { display: "flex", alignItems: "center", justifyContent: "center" },
  badge: {
    marginLeft: "auto", minWidth: "26px", height: "26px", borderRadius: "50%",
    background: "#DDF8F3", color: "#11B5A4", display: "flex",
    alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700",
    padding: "0 4px",
  },
  logoutBtn: {
    display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px",
    borderRadius: "18px", marginBottom: "8px", border: "none", background: "none",
    color: "#E24B4A", fontWeight: "600", fontSize: "15px", cursor: "pointer", width: "100%",
  },
  inviteCard: { background: "#F3FBFA", borderRadius: "26px", padding: "20px", marginTop: "8px" },
  inviteTitle: { margin: 0, color: "#122B58", fontSize: "24px", lineHeight: "1.2", fontWeight: "700" },
  inviteText: { marginTop: "10px", color: "#6B7280", fontSize: "14px" },
  inviteButton: {
    marginTop: "10px", width: "100%", border: "none", borderRadius: "999px",
    padding: "14px", cursor: "pointer", color: "#fff", fontWeight: "600",
    background: "linear-gradient(90deg,#0D9399,#1AC6D2)",
  },
  inviteIllustration: {
    marginTop: "18px", height: "120px", borderRadius: "18px",
    background: "#E9F9F7", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: "64px",
  },
};