import { useNavigate } from "react-router-dom";
import { Search, Bell, MessageCircle, ChevronDown } from "lucide-react";

export default function ProfileHeader() {
  const navigate = useNavigate();

  // ── Real user from localStorage ───────────────────────
  let user = null;
  try {
    const stored = localStorage.getItem("user");
    if (stored) user = JSON.parse(stored);
  } catch (_) {}

  const userName  = user?.name?.split(" ")[0] || "Guest";
  const userPhoto = user?.photo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}&background=14B8A6&color=fff&size=128`;

  return (
    <div style={{
      display: "flex", justifyContent: "space-between",
      alignItems: "center", marginBottom: "16px",
    }}>
      {/* Search */}
      <div style={{
        width: "460px", background: "#fff", borderRadius: "18px",
        padding: "14px 18px", display: "flex", alignItems: "center",
        gap: "12px", boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
      }}>
        <Search size={20} color="#64748b" />
        <input
          type="text"
          placeholder="Search rides, places or users..."
          style={{
            border: "none", outline: "none", width: "100%",
            fontSize: "15px", color: "#08244b", background: "transparent",
          }}
        />
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={iconBtn} onClick={() => navigate("/notifications")}>
          <Bell size={20} />
        </div>
        <div style={iconBtn} onClick={() => navigate("/messages")}>
          <MessageCircle size={20} />
        </div>

        {/* User Profile — clickable */}
        <div
          onClick={() => navigate("/profile")}
          style={{
            display: "flex", alignItems: "center", gap: "12px",
            background: "#fff", padding: "8px 14px", borderRadius: "50px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)", cursor: "pointer",
          }}
        >
          <img
            src={userPhoto}
            alt="Profile"
            style={{ width: "42px", height: "42px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ fontWeight: "600", color: "#08244b", fontSize: "15px" }}>
            {userName}
          </span>
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
}

const iconBtn = {
  width: "46px", height: "46px", borderRadius: "50%", background: "#fff",
  display: "flex", justifyContent: "center", alignItems: "center",
  boxShadow: "0 4px 16px rgba(0,0,0,0.05)", cursor: "pointer",
};