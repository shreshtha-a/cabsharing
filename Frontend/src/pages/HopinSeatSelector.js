import { useState } from "react";

// ── Design tokens (matching app theme) ────────────────────────────────────
const teal = "#0B9E8E";
const tealLight = "#E6F7F6";
const tealDark = "#097A6D";
const textPrimary = "#1A1A2E";
const textSecondary = "#6B7280";
const borderColor = "#E5E7EB";
const bgPage = "#F8FAFA";
const white = "#FFFFFF";
const red = "#EF4444";

// ── Seat data ──────────────────────────────────────────────────────────────
const SEATS = {
  rearLeft:  { id: "rearLeft",  label: "Rear Left Seat",  price: 150 },
  rearRight: { id: "rearRight", label: "Rear Right Seat", price: 150 },
};
const BASE_FARE = 120;

// ── Car top-view SVG ───────────────────────────────────────────────────────
function CarTopView({ selected, onSelect }) {
  const rlSel = selected === "rearLeft";
  const rrSel = selected === "rearRight";

  return (
    <svg viewBox="0 0 320 480" width="240" height="360" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8eaed" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="240" rx="130" ry="220" fill="#00000010" />
      <rect x="40" y="60" width="240" height="360" rx="70" fill="url(#bodyGrad)" stroke="#d0d3da" strokeWidth="2" />
      <rect x="75" y="85"  width="170" height="80" rx="20" fill="#1a2e4488" />
      <rect x="75" y="315" width="170" height="80" rx="20" fill="#1a2e4488" />
      <rect x="60" y="170" width="200" height="140" rx="8" fill="#1a2e44cc" />
      {/* Front seats – occupied */}
      <rect x="75"  y="180" width="68" height="55" rx="10" fill="#9ba0ab" />
      <rect x="177" y="180" width="68" height="55" rx="10" fill="#9ba0ab" />
      {/* Rear left */}
      <rect
        x="75" y="250" width="68" height="55" rx="10"
        fill={rlSel ? "#9ef0e0" : teal}
        style={{ cursor: "pointer" }}
        onClick={() => onSelect("rearLeft")}
      />
      {rlSel && (
        <>
          <circle cx="109" cy="277" r="14" fill={teal} />
          <text x="109" y="282" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
        </>
      )}
      {/* Rear right */}
      <rect
        x="177" y="250" width="68" height="55" rx="10"
        fill={rrSel ? "#9ef0e0" : teal}
        style={{ cursor: "pointer" }}
        onClick={() => onSelect("rearRight")}
      />
      {rrSel && (
        <>
          <circle cx="211" cy="277" r="14" fill={teal} />
          <text x="211" y="282" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
        </>
      )}
      {/* Steering wheel */}
      <circle cx="109" cy="210" r="14" fill="none" stroke="#ffffff80" strokeWidth="3" />
      <circle cx="109" cy="210" r="4"  fill="#ffffff80" />
      {/* Dash lines */}
      <line x1="75"  y1="277" x2="20"  y2="277" stroke={teal+"80"} strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="245" y1="277" x2="300" y2="277" stroke={teal+"80"} strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="75"  y1="207" x2="20"  y2="207" stroke="#88888840" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="245" y1="207" x2="300" y2="207" stroke="#88888840" strokeWidth="1.5" strokeDasharray="4,3" />
      {/* Wheels */}
      <rect x="18"  y="100" width="22" height="50" rx="8" fill="#444" />
      <rect x="280" y="100" width="22" height="50" rx="8" fill="#444" />
      <rect x="18"  y="330" width="22" height="50" rx="8" fill="#444" />
      <rect x="280" y="330" width="22" height="50" rx="8" fill="#444" />
      {/* Lights */}
      <rect x="65"  y="62"  width="40" height="12" rx="4" fill="#fff7aa88" />
      <rect x="215" y="62"  width="40" height="12" rx="4" fill="#fff7aa88" />
      <rect x="65"  y="406" width="40" height="12" rx="4" fill="#ff444488" />
      <rect x="215" y="406" width="40" height="12" rx="4" fill="#ff444488" />
    </svg>
  );
}

// ── Seat card button ───────────────────────────────────────────────────────
function SeatCard({ seat, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", gap: 10, alignItems: "center",
        borderRadius: 12, padding: "10px 16px",
        border: isSelected ? `2px solid ${teal}` : `2px solid ${borderColor}`,
        background: isSelected ? tealLight : white,
        cursor: "pointer", minWidth: 150, transition: "all 0.15s",
      }}
    >
      <span style={{ fontSize: 22 }}>💺</span>
      <div style={{ textAlign: "left" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{seat.label}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: teal }}>₹{seat.price}</div>
      </div>
    </button>
  );
}

// ── Legend dot ─────────────────────────────────────────────────────────────
function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 16, height: 16, borderRadius: 4, background: color }} />
      <span style={{ fontSize: 12.5, color: textSecondary }}>{label}</span>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────
export default function SeatSelector() {
  const [selected, setSelected] = useState("rearLeft");

  const seatFare  = selected ? SEATS[selected].price : 0;
  const totalFare = BASE_FARE + seatFare;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: bgPage, minHeight: "100vh", padding: "28px 28px 40px" }}>

      {/* Page header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: textPrimary, margin: 0 }}>
          Select Your <span style={{ color: teal }}>Seat</span>
        </h1>
        <p style={{ fontSize: 13, color: textSecondary, marginTop: 5 }}>
          Choose your preferred seat and enjoy a comfortable ride
        </p>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* ── LEFT: Ride info ──────────────────────────────────────────── */}
        <div style={{ width: 280, minWidth: 260, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Ride Card */}
          <div style={{ background: white, borderRadius: 16, padding: "18px 20px", border: `1px solid ${borderColor}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 12 }}>Your Ride</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: teal, border: `2px solid ${tealLight}`, flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>Noida Sector 62</span>
              </div>
              <div style={{ width: 2, height: 16, background: borderColor, marginLeft: 4, marginLeft: 4 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: red, border: "2px solid #FEE2E2", flexShrink: 0 }} />
                <span style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>Sharda University</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 14, flexWrap: "wrap" }}>
              {[["Date", "24 May, 2024"], ["Time", "08:30 AM"], ["Vehicle", "4 Seater"]].map(([l, v]) => (
                <div key={l}>
                  <div style={{ fontSize: 10, color: textSecondary }}>{l}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: textPrimary }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Eco banner */}
          <div style={{
            background: "linear-gradient(120deg, #e8fbf5, #d4f5ea)",
            borderRadius: 14, padding: "12px 14px",
            border: "1px solid #c0edd9",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#16a07a" }}>🌿 Eco Friendly Ride</div>
              <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 3 }}>You are saving 2.4 kg CO₂</div>
            </div>
            <span style={{ fontSize: 22 }}>🌲🌲</span>
          </div>

          {/* Fare info */}
          <div style={{ background: white, borderRadius: 16, padding: "18px 20px", border: `1px solid ${borderColor}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary, marginBottom: 12 }}>Fare Information</div>
            {[["Base Fare", `₹${BASE_FARE}`], ["Seat Fare", `₹${seatFare}`]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${borderColor}` }}>
                <span style={{ fontSize: 13, color: textSecondary }}>{l}</span>
                <span style={{ fontSize: 13, color: textPrimary }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Total Fare</span>
              <span style={{ fontSize: 17, fontWeight: 800, color: teal }}>₹{totalFare}</span>
            </div>
          </div>

          {/* Safety */}
          <div style={{
            display: "flex", gap: 10, alignItems: "flex-start",
            background: white, borderRadius: 14, padding: "14px 16px", border: `1px solid ${borderColor}`,
          }}>
            <span style={{ fontSize: 20 }}>🛡️</span>
            <div>
              <div style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>Your safety is our priority.</div>
              <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 2 }}>All our rides are insured and verified.</div>
            </div>
          </div>

          <button style={{
            alignSelf: "flex-start", background: "none",
            border: `1.5px solid ${borderColor}`, borderRadius: 10,
            padding: "8px 18px", fontSize: 13, fontWeight: 600,
            color: textPrimary, cursor: "pointer",
          }}>
            ← Back
          </button>
        </div>

        {/* ── RIGHT: Seat selector ─────────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 300, background: white, borderRadius: 16, padding: "22px 24px", border: `1px solid ${borderColor}` }}>

          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: textSecondary }}>Seat Map</div>
            <div style={{
              background: tealLight, border: `1px solid ${teal}33`,
              borderRadius: 20, padding: "5px 14px",
              fontSize: 12, fontWeight: 600, color: teal,
            }}>🛡️ Secure &amp; Safe</div>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
            <LegendItem color={teal}     label="Available" />
            <LegendItem color="#9ba0ab"  label="Occupied"  />
            <LegendItem color="#9ef0e0"  label="Selected"  />
          </div>

          {/* Front seat labels */}
          <div style={{ display: "flex", justifyContent: "space-between", maxWidth: 460, marginBottom: 6 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 18 }}>🎮</span>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>Driver Seat</span>
              </div>
              <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "#e8eaed", color: textSecondary, fontWeight: 500 }}>Occupied</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 12.5, fontWeight: 600, color: textPrimary }}>Front Passenger</span>
                <span style={{ fontSize: 18 }}>👤</span>
              </div>
              <span style={{ fontSize: 11, padding: "2px 10px", borderRadius: 20, background: "#e8eaed", color: textSecondary, fontWeight: 500 }}>Occupied</span>
            </div>
          </div>

          {/* Car diagram */}
          <div style={{ display: "flex", justifyContent: "center", margin: "8px 0" }}>
            <CarTopView selected={selected} onSelect={setSelected} />
          </div>

          {/* Rear seat cards */}
          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, maxWidth: 460, marginBottom: 16, flexWrap: "wrap" }}>
            <SeatCard seat={SEATS.rearLeft}  isSelected={selected === "rearLeft"}  onClick={() => setSelected("rearLeft")}  />
            <SeatCard seat={SEATS.rearRight} isSelected={selected === "rearRight"} onClick={() => setSelected("rearRight")} />
          </div>

          {/* Tip */}
          <p style={{ fontSize: 12, color: textSecondary, textAlign: "center", marginBottom: 16 }}>
            💺 Window seats have more legroom and a better view.
          </p>

          {/* Bottom confirm bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            background: bgPage, borderRadius: 14, padding: "14px 18px",
            border: `1px solid ${borderColor}`, flexWrap: "wrap", gap: 12,
          }}>
            <div>
              <div style={{ fontSize: 11, color: textSecondary }}>Selected Seat</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>
                {selected ? SEATS[selected].label : "—"}
              </div>
            </div>
            <div style={{ marginLeft: 8 }}>
              <div style={{ fontSize: 11, color: textSecondary }}>Total Fare</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: textPrimary }}>₹{totalFare}</div>
            </div>
            <button style={{
              marginLeft: "auto",
              background: `linear-gradient(90deg, ${teal}, ${tealDark})`,
              color: white, border: "none", borderRadius: 12,
              padding: "13px 24px", fontSize: 14, fontWeight: 700,
              cursor: "pointer", letterSpacing: 0.2, whiteSpace: "nowrap",
            }}>
              Confirm &amp; Continue →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}