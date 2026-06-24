import { useNavigate } from "react-router-dom";

export default function RecurringHeader() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
      {/* Left: back + title */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#0F2D52", padding: 0, lineHeight: 1 }}>←</button>
        <div>
          <h1 style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#0F2D52" }}>Recurring Rides</h1>
          <p style={{ margin: 0, fontSize: "12px", color: "#94A3B8" }}>Set once. Ride every day. Hoppin handles the rest.</p>
        </div>
      </div>

      {/* Right: help + bell + avatar */}
      <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748B", cursor: "pointer" }}>
          <span>💬</span> Need help?
        </div>
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: "20px" }}>🔔</span>
          <div style={{ position: "absolute", top: "-2px", right: "-2px", width: "8px", height: "8px", background: "#EF4444", borderRadius: "50%", border: "1.5px solid #fff" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "4px 10px 4px 4px", cursor: "pointer" }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="avatar" style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }} />
          <div>
            <div style={{ fontSize: "12px", fontWeight: "600", color: "#0F2D52", lineHeight: 1.2 }}>Aryan Rastogi</div>
            <div style={{ fontSize: "10px", color: "#14B8A6", fontWeight: "600" }}>Level 3</div>
          </div>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>▾</span>
        </div>
      </div>
    </div>
  );
}