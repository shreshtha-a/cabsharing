import { useState } from "react";
import { useNavigate } from "react-router-dom";
import scenicRoadImg from "./scenic-road.png";

// ── Icon Components ──────────────────────────────────────────────────────────

const PinIcon = ({ color = "#13C9B8", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

const GpsIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    <circle cx="12" cy="12" r="8" strokeDasharray="2 2" />
  </svg>
);

const CalIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const ClkIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const SeatIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
    <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8" />
  </svg>
);

const ChevDown = () => (
  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.5">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ShieldIcon = () => (
  <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <path d="M12 2l7 4v5c0 5-3.5 9-7 10C8.5 20 5 16 5 11V6l7-4z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

// ── Constants ────────────────────────────────────────────────────────────────

const teal  = "#13C9B8";
const navy  = "#1A2332";
const gray  = "#6B7280";
const white = "#FFFFFF";
const border = "#E5E7EB";

// ── StepBar (defined at module level, NOT inside JSX) ────────────────────────

function StepBar({ current }) {
  const steps = ["Trip Details", "Ride Preferences", "Vehicle Details", "Review & Publish"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
      {steps.map((label, i) => (
        <div
          key={label}
          style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: "50%",
                fontSize: 13, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: i <= current ? teal : "#E5E7EB",
                color: i <= current ? white : gray,
              }}
            >
              {i < current ? "✓" : i + 1}
            </div>
            <span
              style={{
                fontSize: 13,
                fontWeight: i === current ? 700 : 500,
                color: i === current ? navy : gray,
                whiteSpace: "nowrap",
              }}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1, height: 2,
                background: i < current ? teal : "#E5E7EB",
                margin: "0 10px", minWidth: 16,
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────

export default function HopinOfferRide() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("hopin_trip") || "{}");

  const [from,     setFrom]     = useState(saved.from     || "");
  const [to,       setTo]       = useState(saved.to       || "");
  const [date,     setDate]     = useState(saved.date     || "");
  const [time,     setTime]     = useState(saved.time     || "");
  const [seats,    setSeats]    = useState(saved.seats    || "");
  const [rideType, setRideType] = useState(saved.rideType || "oneWay");
  const [price,    setPrice]    = useState(saved.price    || "");
  const [error,    setError]    = useState("");

  const canProceed = from.trim() && to.trim() && date && time && seats && price;

  const handleContinue = () => {
    if (!canProceed) {
      setError("Please fill in all fields before continuing.");
      return;
    }
    localStorage.setItem("hopin_trip", JSON.stringify({ from, to, date, time, seats, rideType, price }));
    navigate("/ride-preferences");
  };

  // ── Inline styles ──
  const iStyle = {
    width: "100%", padding: "11px 14px 11px 38px",
    border: `1.5px solid ${border}`, borderRadius: 10,
    fontSize: 14, color: navy, background: white,
    outline: "none", boxSizing: "border-box",
  };
  const sStyle = {
    ...iStyle, paddingRight: 36,
    appearance: "none", WebkitAppearance: "none", cursor: "pointer",
  };
  const lStyle = { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 };
  const wrap   = { position: "relative" };
  const icoL   = { position: "absolute", left: 12,  top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" };
  const icoR   = { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" };

  const times = [
    "06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM",
    "12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM",
    "06:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM",
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#F5F7FA", fontFamily: "'Inter', sans-serif", padding: "32px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: navy, margin: 0 }}>
            Offer a <span style={{ color: teal }}>Ride</span>
          </h1>
          <p style={{ fontSize: 14, color: gray, marginTop: 6 }}>
            Share your journey and help others travel together.
          </p>
        </div>

        {/* Card */}
        <div style={{ background: white, borderRadius: 20, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
          <StepBar current={0} />

          {/* Section header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: navy, margin: 0 }}>Trip Details</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#F0FFFE", border: "1px solid #B2EDEA", borderRadius: 10, padding: "10px 14px" }}>
              <ShieldIcon />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: navy }}>Verified & Safe</div>
                <div style={{ fontSize: 11, color: gray }}>All rides verified for safety.</div>
              </div>
            </div>
          </div>

          {/* From / To */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={lStyle}>From</label>
              <div style={wrap}>
                <span style={icoL}><PinIcon size={16} /></span>
                <input
                  style={iStyle}
                  placeholder="Starting city or address"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
                <span style={icoR}><GpsIcon size={16} /></span>
              </div>
            </div>
            <div>
              <label style={lStyle}>To</label>
              <div style={wrap}>
                <span style={icoL}>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="#2563EB">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                  </svg>
                </span>
                <input
                  style={iStyle}
                  placeholder="Destination city or address"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
                <span style={icoR}><GpsIcon size={16} /></span>
              </div>
            </div>
          </div>

          {/* Date / Time / Seats */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
            <div>
              <label style={lStyle}>Date of Travel</label>
              <div style={wrap}>
                <span style={icoL}><CalIcon /></span>
                <input
                  type="date"
                  style={{ ...sStyle, paddingLeft: 38, paddingRight: 14 }}
                  value={date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label style={lStyle}>Departure Time</label>
              <div style={wrap}>
                <span style={icoL}><ClkIcon /></span>
                <select style={sStyle} value={time} onChange={e => setTime(e.target.value)}>
                  <option value="">Select time</option>
                  {times.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <span style={icoR}><ChevDown /></span>
              </div>
            </div>
            <div>
              <label style={lStyle}>Available Seats</label>
              <div style={wrap}>
                <span style={icoL}><SeatIcon /></span>
                <select style={sStyle} value={seats} onChange={e => setSeats(e.target.value)}>
                  <option value="">Select seats</option>
                  {[1, 2, 3, 4, 5, 6].map(n => (
                    <option key={n} value={n}>{n} seat{n > 1 ? "s" : ""}</option>
                  ))}
                </select>
                <span style={icoR}><ChevDown /></span>
              </div>
            </div>
          </div>

          {/* Ride Type / Price */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
            <div>
              <label style={lStyle}>Ride Type</label>
              <div style={{ display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 4 }}>
                {[["oneWay", "One Way"], ["roundTrip", "Round Trip"]].map(([val, lbl]) => (
                  <button
                    key={val}
                    onClick={() => setRideType(val)}
                    style={{
                      flex: 1, padding: "10px 0", border: "none", borderRadius: 8,
                      fontSize: 14, fontWeight: rideType === val ? 700 : 500,
                      cursor: "pointer",
                      background: rideType === val ? teal : "transparent",
                      color: rideType === val ? white : gray,
                      transition: "all 0.15s",
                    }}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label style={lStyle}>Price per Seat (₹)</label>
              <div style={{ display: "flex", border: `1.5px solid ${border}`, borderRadius: 10, overflow: "hidden" }}>
                <span style={{ padding: "11px 14px", fontSize: 16, fontWeight: 600, color: "#374151", borderRight: `1px solid ${border}`, background: "#FAFAFA" }}>₹</span>
                <input
                  type="number"
                  style={{ flex: 1, padding: "11px 14px", border: "none", fontSize: 14, color: navy, outline: "none", background: white }}
                  placeholder="e.g. 299"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                />
              </div>
              <p style={{ fontSize: 11, color: gray, margin: "4px 0 0" }}>Suggested price shown to riders</p>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "10px 16px", fontSize: 13, color: "#DC2626", marginBottom: 16 }}>
              ⚠️ {error}
            </div>
          )}

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <button
              onClick={handleContinue}
              disabled={!canProceed}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: canProceed ? teal : "#E5E7EB",
                color: canProceed ? white : gray,
                border: "none", borderRadius: 10,
                padding: "13px 28px", fontSize: 15, fontWeight: 700,
                cursor: canProceed ? "pointer" : "not-allowed",
                transition: "all 0.2s",
              }}
            >
              Continue to Ride Preferences →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}