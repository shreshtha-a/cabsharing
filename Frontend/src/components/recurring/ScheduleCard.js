import { useState } from "react";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_KEYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ScheduleCard() {
  const [pickupTime, setPickupTime] = useState("08:15");
  const [arriveTime, setArriveTime] = useState("09:00");
  const [activeDays, setActiveDays] = useState([true, true, true, true, true, false, false]);
  const [validUntil, setValidUntil] = useState("2026-06-23");

  const toggleDay = (i) => {
    setActiveDays(prev => prev.map((d, idx) => idx === i ? !d : d));
  };

  return (
    <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #E5E7EB" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>📅</div>
        <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Schedule</span>
      </div>

      {/* Pickup + Arrive */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "600", marginBottom: "6px" }}>Pickup Time</div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "10px 12px" }}>
            <input
              type="time"
              value={pickupTime}
              onChange={e => setPickupTime(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "18px", fontWeight: "700", color: "#0F2D52", background: "transparent", flex: 1, minWidth: 0 }}
            />
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🕐</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "600", marginBottom: "6px" }}>Arrive by <span style={{ color: "#CBD5E1" }}>(optional)</span></div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "10px 12px" }}>
            <input
              type="time"
              value={arriveTime}
              onChange={e => setArriveTime(e.target.value)}
              style={{ border: "none", outline: "none", fontSize: "18px", fontWeight: "700", color: "#0F2D52", background: "transparent", flex: 1, minWidth: 0 }}
            />
            <span style={{ fontSize: "16px", color: "#94A3B8" }}>🕐</span>
          </div>
        </div>
      </div>

      {/* Repeat on */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "600", marginBottom: "10px" }}>Repeat on</div>
        <div style={{ display: "flex", gap: "6px" }}>
          {DAYS.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              style={{
                width: "36px", height: "36px", borderRadius: "50%", border: "none", cursor: "pointer",
                background: activeDays[i] ? "#0F2D52" : "#F1F5F9",
                color: activeDays[i] ? "#fff" : "#94A3B8",
                fontSize: "13px", fontWeight: "700", transition: "all 0.2s", flexShrink: 0
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Valid until */}
      <div>
        <div style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "600", marginBottom: "6px" }}>Valid until <span style={{ color: "#CBD5E1" }}>(leave blank for indefinite)</span></div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", border: "1px solid #E5E7EB", borderRadius: "12px", padding: "10px 12px" }}>
          <input
            type="date"
            value={validUntil}
            onChange={e => setValidUntil(e.target.value)}
            style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#0F2D52", background: "transparent", flex: 1 }}
          />
          <span style={{ fontSize: "16px", color: "#94A3B8" }}>📅</span>
        </div>
      </div>
    </div>
  );
}