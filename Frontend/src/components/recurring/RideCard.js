export default function RideCard({ rides, selectedRide, setSelectedRide, toggleRide, addRide }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {rides.map(ride => {
        const isSelected = selectedRide === ride.id;
        return (
          <div
            key={ride.id}
            onClick={() => setSelectedRide(ride.id)}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "16px",
              border: isSelected ? "2px solid #14B8A6" : "1px solid #E5E7EB",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: isSelected ? "0 4px 16px rgba(20,184,166,0.12)" : "none",
            }}
          >
            {/* Top row: title + status badge + toggle */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "14px" }}>{ride.active ? "☀️" : "🌙"}</span>
                <span style={{ fontSize: "13px", fontWeight: "700", color: "#0F2D52" }}>{ride.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{
                  fontSize: "10px", fontWeight: "700", padding: "2px 8px", borderRadius: "20px",
                  background: ride.active ? "#F0FDFA" : "#FFF7ED",
                  color: ride.active ? "#0F6E56" : "#EA580C",
                  border: ride.active ? "1px solid #99F6E4" : "1px solid #FED7AA"
                }}>
                  {ride.active ? "Active" : "Paused"}
                </span>
                {/* Toggle */}
                <div
                  onClick={e => { e.stopPropagation(); toggleRide(ride.id); }}
                  style={{
                    width: "36px", height: "20px", borderRadius: "10px",
                    background: ride.active ? "#14B8A6" : "#CBD5E1",
                    position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0
                  }}
                >
                  <div style={{
                    position: "absolute", top: "2px",
                    left: ride.active ? "18px" : "2px",
                    width: "16px", height: "16px", borderRadius: "50%",
                    background: "#fff", transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                  }} />
                </div>
              </div>
            </div>

            {/* Time */}
            <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F2D52", lineHeight: 1.1, margin: "6px 0 4px" }}>{ride.time}</div>

            {/* Days */}
            <div style={{ fontSize: "11px", color: "#94A3B8", marginBottom: "12px" }}>
              {ride.id === 1 ? "Mon · Tue · Wed · Thu · Fri" : "Mon · Wed · Fri"}
            </div>

            {/* Route dots */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14B8A6", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#475569", fontWeight: "500" }}>{ride.pickup}</span>
              </div>
              <div style={{ width: "1px", height: "10px", background: "#E5E7EB", marginLeft: "3.5px" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#475569", fontWeight: "500" }}>{ride.drop}</span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Create Recurring Ride */}
      <button
        onClick={addRide}
        style={{
          width: "100%", background: "#fff", border: "1.5px dashed #CBD5E1",
          borderRadius: "16px", padding: "14px", cursor: "pointer",
          fontSize: "13px", fontWeight: "600", color: "#64748B",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
          transition: "all 0.2s"
        }}
      >
        + Create Recurring Ride
      </button>

      {/* Bottom trust badges */}
      <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
        <div style={{ flex: 1, background: "#F8FAFC", borderRadius: "12px", padding: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "16px" }}>🔒</span>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#0F2D52" }}>Secure Payment</div>
            <div style={{ fontSize: "9px", color: "#94A3B8" }}>Your payment details are encrypted</div>
          </div>
        </div>
        <div style={{ flex: 1, background: "#F8FAFC", borderRadius: "12px", padding: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ fontSize: "16px" }}>💬</span>
          <div>
            <div style={{ fontSize: "10px", fontWeight: "700", color: "#0F2D52" }}>24/7 Support</div>
            <div style={{ fontSize: "9px", color: "#94A3B8" }}>We're here to help anytime</div>
          </div>
        </div>
      </div>
      <div style={{ background: "#F8FAFC", borderRadius: "12px", padding: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
        <span style={{ fontSize: "16px" }}>💚</span>
        <div>
          <div style={{ fontSize: "10px", fontWeight: "700", color: "#0F2D52" }}>Refund Protected</div>
          <div style={{ fontSize: "9px", color: "#94A3B8" }}>Easy refunds if ride is cancelled</div>
        </div>
      </div>
    </div>
  );
}