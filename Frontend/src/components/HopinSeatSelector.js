import { useState } from "react";

const SEATS = {
  rearLeft: { id: "rearLeft", label: "Rear Left Seat", price: 150, position: "left" },
  rearRight: { id: "rearRight", label: "Rear Right Seat", price: 150, position: "right" },
};

const OCCUPIED = { driver: true, frontPassenger: true };

export default function HopinSeatSelector() {
  const [selected, setSelected] = useState("rearLeft");

  const BASE_FARE = 120;
  const seatFare = selected ? SEATS[selected].price : 0;
  const totalFare = BASE_FARE + seatFare;

  return (
    <div style={styles.page}>
      {/* Background */}
      <div style={styles.bg} />

      {/* Card */}
      <div style={styles.card}>
        {/* LEFT PANEL */}
        <div style={styles.leftPanel}>
          {/* Logo */}
          <div style={styles.logo}>
            <span style={styles.logoHop}>Hop</span>
            <span style={styles.logoIn}>in</span>
            <span style={styles.logoDot}>●</span>
          </div>
          <p style={styles.tagline}>Going <span style={styles.teal}>your way</span>, anyway.</p>

          {/* Ride Card */}
          <div style={styles.rideCard}>
            <p style={styles.rideTitle}>Your Ride</p>
            <div style={styles.routeRow}>
              <span style={styles.pinTeal}>📍</span>
              <span style={styles.routeText}>Noida Sector 62</span>
            </div>
            <div style={styles.routeLine} />
            <div style={styles.routeRow}>
              <span style={styles.pinGray}>⊙</span>
              <span style={styles.routeText}>Sharda University</span>
            </div>
            <div style={styles.rideMetaRow}>
              <div style={styles.rideMeta}>
                <span style={styles.metaLabel}>Date</span>
                <span style={styles.metaVal}>24 May, 2024</span>
              </div>
              <div style={styles.rideMeta}>
                <span style={styles.metaLabel}>Time</span>
                <span style={styles.metaVal}>08:30 AM</span>
              </div>
              <div style={styles.rideMeta}>
                <span style={styles.metaLabel}>Vehicle</span>
                <span style={styles.metaVal}>4 Seater</span>
              </div>
            </div>
          </div>

          {/* Eco Banner */}
          <div style={styles.ecoBanner}>
            <div>
              <p style={styles.ecoTitle}>🌿 Eco Friendly Ride</p>
              <p style={styles.ecoSub}>You are saving 2.4 kg CO₂</p>
            </div>
            <div style={styles.ecoTree}>🌲🌲</div>
          </div>

          {/* Fare */}
          <div style={styles.fareCard}>
            <p style={styles.fareTitle}>Fare Information</p>
            <div style={styles.fareRow}>
              <span style={styles.fareLabel}>Base Fare</span>
              <span style={styles.fareAmt}>₹{BASE_FARE}</span>
            </div>
            <div style={styles.fareRow}>
              <span style={styles.fareLabel}>Seat Fare</span>
              <span style={styles.fareAmt}>₹{seatFare}</span>
            </div>
            <div style={styles.fareDivider} />
            <div style={styles.fareRow}>
              <span style={styles.fareTotalLabel}>Total Fare</span>
              <span style={styles.fareTotalAmt}>₹{totalFare}</span>
            </div>
          </div>

          {/* Safety */}
          <div style={styles.safetyCard}>
            <span style={styles.safetyIcon}>🛡️</span>
            <div>
              <p style={styles.safetyTitle}>Your safety is our priority.</p>
              <p style={styles.safetySub}>All our rides are insured and verified.</p>
            </div>
          </div>

          {/* Back */}
          <button style={styles.backBtn}>← Back</button>
        </div>

        {/* DIVIDER */}
        <div style={styles.divider} />

        {/* RIGHT PANEL */}
        <div style={styles.rightPanel}>
          {/* Header */}
          <div style={styles.rightHeader}>
            <div>
              <h2 style={styles.selectTitle}>Select Your <span style={styles.teal}>Seat</span></h2>
              <p style={styles.selectSub}>Choose your preferred seat and enjoy a comfortable ride</p>
            </div>
            <div style={styles.secureBadge}>🛡️ Secure &amp; Safe</div>
          </div>

          {/* Legend */}
          <div style={styles.legend}>
            <LegendItem color="#16c9a5" label="Available" />
            <LegendItem color="#c5c8d0" label="Occupied" />
            <LegendItem color="#9ef0e0" label="Selected" />
          </div>

          {/* Car diagram area */}
          <div style={styles.carArea}>
            {/* Front labels */}
            <div style={styles.frontLabels}>
              <SeatLabel icon="🎮" title="Driver Seat" status="Occupied" occupied />
              <SeatLabel icon="👤" title="Front Passenger" status="Occupied" occupied align="right" />
            </div>

            {/* Car SVG top-view */}
            <div style={styles.carWrapper}>
              <CarTopView selected={selected} onSelect={setSelected} />
            </div>

            {/* Rear labels */}
            <div style={styles.rearLabels}>
              <SeatCard
                seat={SEATS.rearLeft}
                isSelected={selected === "rearLeft"}
                onClick={() => setSelected("rearLeft")}
              />
              <SeatCard
                seat={SEATS.rearRight}
                isSelected={selected === "rearRight"}
                onClick={() => setSelected("rearRight")}
              />
            </div>
          </div>

          {/* Tip */}
          <p style={styles.tip}>💺 Window seats have more legroom and a better view.</p>

          {/* Bottom bar */}
          <div style={styles.bottomBar}>
            <div style={styles.selectedInfo}>
              <span style={styles.selectedLabel}>Selected Seat</span>
              <span style={styles.selectedSeat}>{selected ? SEATS[selected].label : "—"}</span>
            </div>
            <div style={styles.totalInfo}>
              <span style={styles.selectedLabel}>Total Fare</span>
              <span style={styles.totalFareAmt}>₹{totalFare}</span>
            </div>
            <button style={styles.confirmBtn}>Confirm &amp; Continue →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <div style={{ width: 18, height: 18, borderRadius: 4, background: color }} />
      <span style={{ fontSize: 13, color: "#555" }}>{label}</span>
    </div>
  );
}

function SeatLabel({ icon, title, status, occupied, align }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: align === "right" ? "flex-end" : "flex-start", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 13, fontWeight: 600, color: "#1a2e44" }}>{title}</span>
      </div>
      <span style={{
        fontSize: 11, padding: "2px 10px", borderRadius: 20,
        background: occupied ? "#e8eaed" : "#d4f7ef",
        color: occupied ? "#888" : "#16c9a5", fontWeight: 500
      }}>{status}</span>
    </div>
  );
}

function SeatCard({ seat, isSelected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.seatCard,
        border: isSelected ? "2px solid #16c9a5" : "2px solid #e8eaed",
        background: isSelected ? "#f0fdf9" : "#fff",
      }}
    >
      <span style={{ fontSize: 22 }}>💺</span>
      <div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a2e44" }}>{seat.label}</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#16c9a5" }}>₹{seat.price}</div>
      </div>
    </button>
  );
}

function CarTopView({ selected, onSelect }) {
  const rearLeftSel = selected === "rearLeft";
  const rearRightSel = selected === "rearRight";

  return (
    <svg viewBox="0 0 320 480" width="260" height="390" xmlns="http://www.w3.org/2000/svg">
      {/* Car body */}
      <defs>
        <radialGradient id="bodyGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e8eaed" />
        </radialGradient>
      </defs>

      {/* Shadow */}
      <ellipse cx="160" cy="240" rx="130" ry="220" fill="#00000010" />

      {/* Car outline */}
      <rect x="40" y="60" width="240" height="360" rx="70" fill="url(#bodyGrad)" stroke="#d0d3da" strokeWidth="2" />

      {/* Windshield front */}
      <rect x="75" y="85" width="170" height="80" rx="20" fill="#1a2e4488" />
      {/* Windshield rear */}
      <rect x="75" y="315" width="170" height="80" rx="20" fill="#1a2e4488" />

      {/* Interior dark area */}
      <rect x="60" y="170" width="200" height="140" rx="8" fill="#1a2e44cc" />

      {/* Front seats (occupied = gray) */}
      <rect x="75" y="180" width="68" height="55" rx="10" fill="#9ba0ab" />
      <rect x="177" y="180" width="68" height="55" rx="10" fill="#9ba0ab" />

      {/* Rear left seat */}
      <rect
        x="75" y="250" width="68" height="55" rx="10"
        fill={rearLeftSel ? "#9ef0e0" : "#16c9a5"}
        style={{ cursor: "pointer", transition: "fill 0.2s" }}
        onClick={() => onSelect("rearLeft")}
      />
      {rearLeftSel && (
        <>
          <circle cx="109" cy="277" r="14" fill="#16c9a5" />
          <text x="109" y="282" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
        </>
      )}

      {/* Rear right seat */}
      <rect
        x="177" y="250" width="68" height="55" rx="10"
        fill={rearRightSel ? "#9ef0e0" : "#16c9a5"}
        style={{ cursor: "pointer", transition: "fill 0.2s" }}
        onClick={() => onSelect("rearRight")}
      />
      {rearRightSel && (
        <>
          <circle cx="211" cy="277" r="14" fill="#16c9a5" />
          <text x="211" y="282" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">✓</text>
        </>
      )}

      {/* Steering wheel */}
      <circle cx="109" cy="210" r="14" fill="none" stroke="#ffffff80" strokeWidth="3" />
      <circle cx="109" cy="210" r="4" fill="#ffffff80" />

      {/* Dashed lines to labels */}
      <line x1="75" y1="277" x2="20" y2="277" stroke="#16c9a580" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="245" y1="277" x2="300" y2="277" stroke="#16c9a580" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Front label lines */}
      <line x1="75" y1="207" x2="20" y2="207" stroke="#88888840" strokeWidth="1.5" strokeDasharray="4,3" />
      <line x1="245" y1="207" x2="300" y2="207" stroke="#88888840" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Wheels */}
      <rect x="18" y="100" width="22" height="50" rx="8" fill="#444" />
      <rect x="280" y="100" width="22" height="50" rx="8" fill="#444" />
      <rect x="18" y="330" width="22" height="50" rx="8" fill="#444" />
      <rect x="280" y="330" width="22" height="50" rx="8" fill="#444" />

      {/* Headlights */}
      <rect x="65" y="62" width="40" height="12" rx="4" fill="#fff7aa88" />
      <rect x="215" y="62" width="40" height="12" rx="4" fill="#fff7aa88" />
      {/* Tail lights */}
      <rect x="65" y="406" width="40" height="12" rx="4" fill="#ff444488" />
      <rect x="215" y="406" width="40" height="12" rx="4" fill="#ff444488" />
    </svg>
  );
}

// ---- Styles ----
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    background: "#d8e8f0",
    padding: "20px",
    boxSizing: "border-box",
  },
  bg: {
    position: "fixed", inset: 0,
    background: "linear-gradient(135deg, #b8d4e8 0%, #c8dfc8 50%, #a8c8d8 100%)",
    zIndex: 0,
  },
  card: {
    position: "relative", zIndex: 1,
    background: "#fff",
    borderRadius: 24,
    boxShadow: "0 20px 60px #00000025",
    display: "flex",
    width: "100%",
    maxWidth: 1100,
    minHeight: 680,
    overflow: "hidden",
  },
  leftPanel: {
    width: 320,
    minWidth: 280,
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    background: "#fff",
  },
  logo: { display: "flex", alignItems: "center", gap: 0, fontSize: 26, fontWeight: 800, letterSpacing: -1 },
  logoHop: { color: "#1a2e44" },
  logoIn: { color: "#1a2e44" },
  logoDot: { color: "#16c9a5", fontSize: 14, marginLeft: 1, marginBottom: 10 },
  tagline: { fontSize: 12, color: "#888", margin: 0, marginTop: -8 },
  teal: { color: "#16c9a5", fontWeight: 600 },
  rideCard: {
    background: "#f8f9fb", borderRadius: 14, padding: "14px 16px",
    border: "1px solid #eee",
  },
  rideTitle: { fontWeight: 700, fontSize: 13, color: "#1a2e44", margin: "0 0 10px" },
  routeRow: { display: "flex", alignItems: "center", gap: 8, margin: "4px 0" },
  routeLine: { width: 2, height: 16, background: "#ccc", marginLeft: 9, borderRadius: 2 },
  pinTeal: { fontSize: 14 },
  pinGray: { fontSize: 14, color: "#aaa" },
  routeText: { fontSize: 13, color: "#1a2e44", fontWeight: 500 },
  rideMetaRow: { display: "flex", gap: 10, marginTop: 12 },
  rideMeta: { display: "flex", flexDirection: "column", gap: 2 },
  metaLabel: { fontSize: 10, color: "#aaa", fontWeight: 500 },
  metaVal: { fontSize: 11, color: "#1a2e44", fontWeight: 600 },
  ecoBanner: {
    background: "linear-gradient(120deg, #e8fbf5, #d4f5ea)",
    borderRadius: 12, padding: "10px 14px",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    border: "1px solid #c0edd9",
  },
  ecoTitle: { fontSize: 12, fontWeight: 700, color: "#16a07a", margin: 0 },
  ecoSub: { fontSize: 11, color: "#555", margin: "3px 0 0" },
  ecoTree: { fontSize: 22, opacity: 0.7 },
  fareCard: { borderRadius: 12, border: "1px solid #eee", padding: "12px 14px" },
  fareTitle: { fontWeight: 700, fontSize: 13, color: "#1a2e44", margin: "0 0 10px" },
  fareRow: { display: "flex", justifyContent: "space-between", margin: "5px 0" },
  fareLabel: { fontSize: 12, color: "#888" },
  fareAmt: { fontSize: 12, color: "#333" },
  fareDivider: { height: 1, background: "#eee", margin: "8px 0" },
  fareTotalLabel: { fontSize: 13, fontWeight: 700, color: "#1a2e44" },
  fareTotalAmt: { fontSize: 16, fontWeight: 800, color: "#16c9a5" },
  safetyCard: {
    display: "flex", gap: 10, alignItems: "flex-start",
    background: "#f8f9fb", borderRadius: 12, padding: "10px 14px",
    border: "1px solid #eee",
  },
  safetyIcon: { fontSize: 18 },
  safetyTitle: { fontSize: 12, fontWeight: 600, color: "#1a2e44", margin: 0 },
  safetySub: { fontSize: 11, color: "#888", margin: "3px 0 0" },
  backBtn: {
    background: "none", border: "1.5px solid #e0e2e8",
    borderRadius: 10, padding: "8px 18px",
    fontSize: 13, fontWeight: 600, color: "#444",
    cursor: "pointer", alignSelf: "flex-start", marginTop: "auto",
  },
  divider: { width: 1, background: "#f0f0f0", flexShrink: 0 },
  rightPanel: {
    flex: 1, padding: "28px 32px", display: "flex",
    flexDirection: "column", gap: 16,
  },
  rightHeader: {
    display: "flex", justifyContent: "space-between", alignItems: "flex-start",
  },
  selectTitle: { fontSize: 26, fontWeight: 800, color: "#1a2e44", margin: 0 },
  selectSub: { fontSize: 13, color: "#888", margin: "4px 0 0" },
  secureBadge: {
    background: "#f8f9fb", border: "1.5px solid #eee",
    borderRadius: 20, padding: "6px 14px",
    fontSize: 12, fontWeight: 600, color: "#444",
  },
  legend: { display: "flex", gap: 20, alignItems: "center" },
  carArea: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 },
  frontLabels: {
    display: "flex", justifyContent: "space-between",
    width: "100%", maxWidth: 460, paddingBottom: 4,
  },
  carWrapper: { position: "relative" },
  rearLabels: {
    display: "flex", justifyContent: "space-between",
    width: "100%", maxWidth: 460, paddingTop: 4,
  },
  seatCard: {
    display: "flex", gap: 10, alignItems: "center",
    borderRadius: 12, padding: "10px 16px",
    cursor: "pointer", background: "#fff",
    transition: "all 0.2s", minWidth: 150,
  },
  tip: { fontSize: 12, color: "#666", textAlign: "center", margin: 0 },
  bottomBar: {
    display: "flex", alignItems: "center", gap: 20,
    background: "#f8f9fb", borderRadius: 16,
    padding: "14px 20px", marginTop: "auto",
    border: "1px solid #eee",
  },
  selectedInfo: { display: "flex", flexDirection: "column", gap: 2 },
  selectedLabel: { fontSize: 11, color: "#aaa", fontWeight: 500 },
  selectedSeat: { fontSize: 15, fontWeight: 700, color: "#1a2e44" },
  totalInfo: { display: "flex", flexDirection: "column", gap: 2 },
  totalFareAmt: { fontSize: 22, fontWeight: 800, color: "#1a2e44" },
  confirmBtn: {
    marginLeft: "auto",
    background: "#16c9a5",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "14px 28px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 0.2,
  },
};