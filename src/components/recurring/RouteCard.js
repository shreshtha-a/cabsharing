export default function RouteCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #E5E7EB" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>📍</div>
        <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Route</span>
      </div>

      {/* Pickup */}
      <div style={{ marginBottom: "8px" }}>
        <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "600", marginBottom: "6px" }}>Pickup</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "3px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#14B8A6" }} />
            <div style={{ width: "1.5px", height: "32px", background: "#E5E7EB" }} />
          </div>
          <div>
            <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F2D52" }}>Sharda University</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px", flexWrap: "wrap" }}>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>🛣️ 22 km</span>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>⏱ ~45 min</span>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>₹130 org fare/seat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drop */}
      <div>
        <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "600", marginBottom: "6px", marginLeft: "20px" }}>Drop</div>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
          <div style={{ paddingTop: "3px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F59E0B" }} />
          </div>
          <div style={{ fontSize: "14px", fontWeight: "700", color: "#0F2D52" }}>Noida Sector 62</div>
        </div>
      </div>
    </div>
  );
}