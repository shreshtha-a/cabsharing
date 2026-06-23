import { useState, useEffect } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const DAYS_SHORT  = ["M", "T", "W", "T", "F", "S", "S"];
const DAYS_LONG   = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const PREF_FIELDS = [
  { label: "Ride vibe",        field: "rideVibe",    options: ["Quiet", "Chatty", "Music OK"] },
  { label: "Gender Preference",field: "gender",      options: ["No Preference", "Female Only", "Male Only"] },
  { label: "Vehicle type",     field: "vehicleType", options: ["Any", "Sedan", "SUV", "Hatchback"] },
  { label: "Max fare per seat",field: "maxFare",     options: ["Any", "₹100", "₹150", "₹200", "₹300"] },
  { label: "Seats to book",    field: "seats",       options: ["1 Seat", "2 Seats", "3 Seats"] },
  { label: "Matching",         field: "matching",    options: ["Verified riders only", "All riders"] },
];

const INITIAL_RIDES = [
  {
    id: 1,
    title:       "Morning Commute",
    time:        "08:15",
    arriveBy:    "09:00",
    pickup:      "Sharda University",
    drop:        "Noida Sector 62",
    active:      true,
    days:        [true, true, true, true, true, false, false],
    validUntil:  "2026-06-23",
    rideVibe:    "Quiet",
    gender:      "No Preference",
    vehicleType: "Any",
    maxFare:     "Any",
    seats:       "1 Seat",
    matching:    "Verified riders only",
    promoCode:   "HOPIN10",
    promoApplied:true,
  },
  {
    id: 2,
    title:       "Evening Return",
    time:        "18:30",
    arriveBy:    "19:15",
    pickup:      "Noida Sector 62",
    drop:        "Sharda University",
    active:      false,
    days:        [true, false, true, false, true, false, false],
    validUntil:  "2026-06-23",
    rideVibe:    "Chatty",
    gender:      "No Preference",
    vehicleType: "Any",
    maxFare:     "₹150",
    seats:       "1 Seat",
    matching:    "Verified riders only",
    promoCode:   "",
    promoApplied:false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt12(t24) {
  if (!t24) return "—";
  const [h, m] = t24.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12  = h % 12 || 12;
  return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

function activeDayString(days) {
  return DAYS_LONG.filter((_, i) => days[i]).join(" · ") || "No days selected";
}

// ─── Sub-components (all receive ride data + updater as props) ───────────────

function ScheduleCard({ ride, updateRide }) {
  const toggleDay = (i) => {
    const next = [...ride.days];
    next[i] = !next[i];
    updateRide("days", next);
  };

  return (
    <div style={card}>
      <SectionHeader icon="📅" label="Schedule" />

      {/* Ride Name */}
      <FieldLabel>Ride Name</FieldLabel>
      <input
        value={ride.title}
        onChange={e => updateRide("title", e.target.value)}
        style={inputBase}
      />

      {/* Times */}
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <div style={{ flex: 1 }}>
          <FieldLabel>Pickup Time</FieldLabel>
          <TimeInput value={ride.time} onChange={v => updateRide("time", v)} />
        </div>
        <div style={{ flex: 1 }}>
          <FieldLabel>Arrive by <span style={{ color: "#CBD5E1", fontWeight: 400 }}>(optional)</span></FieldLabel>
          <TimeInput value={ride.arriveBy} onChange={v => updateRide("arriveBy", v)} />
        </div>
      </div>

      {/* Days */}
      <div style={{ marginTop: 18 }}>
        <FieldLabel>Repeat on</FieldLabel>
        <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
          {DAYS_SHORT.map((d, i) => (
            <button
              key={i}
              onClick={() => toggleDay(i)}
              style={{
                width: 36, height: 36, borderRadius: "50%", border: "none",
                cursor: "pointer", flexShrink: 0, fontSize: 13, fontWeight: 700,
                transition: "all 0.18s",
                background: ride.days[i] ? "#0F2D52" : "#F1F5F9",
                color:      ride.days[i] ? "#fff"    : "#94A3B8",
              }}
            >{d}</button>
          ))}
        </div>
      </div>

      {/* Valid until */}
      <div style={{ marginTop: 18 }}>
        <FieldLabel>Valid until <span style={{ color: "#CBD5E1", fontWeight: 400 }}>(leave blank for indefinite)</span></FieldLabel>
        <div style={{ ...inputRow, marginTop: 6 }}>
          <input
            type="date"
            value={ride.validUntil}
            onChange={e => updateRide("validUntil", e.target.value)}
            style={{ ...inputBase, border: "none", padding: 0, marginBottom: 0 }}
          />
          <span style={{ color: "#94A3B8" }}>📅</span>
        </div>
      </div>
    </div>
  );
}

function RouteCard({ ride, updateRide }) {
  return (
    <div style={card}>
      <SectionHeader icon="📍" label="Route" />
      <div style={{ display: "flex", gap: 12 }}>
        {/* Dot spine */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#14B8A6" }} />
          <div style={{ width: 2, flex: 1, background: "#E5E7EB", margin: "4px 0" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#F59E0B" }} />
        </div>
        {/* Inputs */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <FieldLabel>Pickup</FieldLabel>
            <input
              value={ride.pickup}
              onChange={e => updateRide("pickup", e.target.value)}
              placeholder="Enter pickup location"
              style={inputBase}
            />
            <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
              <Chip>🛣️ 22 km</Chip>
              <Chip>⏱ ~45 min</Chip>
              <Chip>₹130 org fare/seat</Chip>
            </div>
          </div>
          <div>
            <FieldLabel>Drop</FieldLabel>
            <input
              value={ride.drop}
              onChange={e => updateRide("drop", e.target.value)}
              placeholder="Enter drop location"
              style={inputBase}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferencesCard({ ride, updateRide }) {
  const [editing, setEditing] = useState(false);
  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <SectionHeader icon="⚙️" label="Preferences: The Usual" noMargin />
        <button
          onClick={() => setEditing(e => !e)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#14B8A6", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}
        >
          ✏️ {editing ? "Save" : "Edit"}
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {PREF_FIELDS.map(({ label, field, options }) => (
          <div key={field}>
            <FieldLabel>{label}</FieldLabel>
            {editing ? (
              <select
                value={ride[field]}
                onChange={e => updateRide(field, e.target.value)}
                style={{ border: "1px solid #E5E7EB", borderRadius: 8, padding: "6px 8px", fontSize: 13, fontWeight: 600, color: "#0F2D52", background: "#fff", outline: "none", width: "100%", cursor: "pointer", marginTop: 4 }}
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0F2D52", marginTop: 4 }}>{ride[field]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function RideSummaryCard({ ride, updateRide }) {
  const baseFare      = 150;
  const platformFee   = 10;
  const promoDiscount = ride.promoApplied ? -20 : 0;
  const walletDeduct  = -20;
  const total         = baseFare + platformFee + promoDiscount + walletDeduct;

  return (
    <div style={card}>
      <SectionHeader icon="🧾" label="Ride Summary" />

      {/* Map banner */}
      <div style={{ borderRadius: 14, overflow: "hidden", height: 90, marginBottom: 14, position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400"
          alt="map"
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }}
        />
        <div style={{ position: "absolute", inset: 0, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#14B8A6" }} />
            <span style={mapLabel}>{ride.pickup}</span>
            <span style={mapMeta}>Pickup · {fmt12(ride.time)}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#F59E0B" }} />
            <span style={mapLabel}>{ride.drop}</span>
            <span style={mapMeta}>Drop · {fmt12(ride.arriveBy)}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 8, padding: "10px 0", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", marginBottom: 14 }}>
        {[
          { icon: "🛣️", val: "22 km" },
          { icon: "⏱",  val: "~45 min" },
          { icon: "🧍", val: ride.seats || "1 Seat" },
        ].map(s => (
          <div key={s.val} style={{ flex: 1, display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
            <span style={{ fontSize: 13 }}>{s.icon}</span>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#0F2D52" }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Fare */}
      <div style={{ fontSize: 13, fontWeight: 700, color: "#0F2D52", marginBottom: 10 }}>Estimated Fare</div>
      <FareRow label="Base Fare"    value={`₹${baseFare}`} />
      <FareRow label="Platform Fee" value={`₹${platformFee}`} />

      {/* Promo */}
      <div style={{ display: "flex", gap: 8, margin: "12px 0 8px" }}>
        <input
          value={ride.promoCode}
          onChange={e => { updateRide("promoCode", e.target.value); updateRide("promoApplied", false); }}
          placeholder="Apply Promo Code"
          style={{ flex: 1, border: "1px dashed #CBD5E1", borderRadius: 10, padding: "8px 12px", fontSize: 13, color: "#0F2D52", outline: "none", background: "#F8FAFC" }}
        />
        <button
          onClick={() => ride.promoCode && updateRide("promoApplied", true)}
          style={{ background: "#0F2D52", color: "#fff", border: "none", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
        >Apply</button>
      </div>

      {ride.promoApplied && (
        <>
          <FareRow label="Promo Discount"  value={`-₹${Math.abs(promoDiscount)}`} green />
          <FareRow label="Wallet Deduction" value={`-₹${Math.abs(walletDeduct)}`}  green />
        </>
      )}

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#0F2D52", borderTop: "1px solid #F1F5F9", paddingTop: 10, marginTop: 4, marginBottom: 2 }}>
        <span style={{ fontSize: 14 }}>Total Payable</span>
        <span style={{ fontSize: 22 }}>₹{total}</span>
      </div>
      <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 14 }}>(inclusive of all taxes)</div>

      <button style={{ width: "100%", background: "linear-gradient(135deg,#14B8A6,#0F2D52)", border: "none", borderRadius: 14, padding: 14, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        💳 Pay ₹{total} via UPI
        <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: 24, height: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
      </button>
      <div style={{ textAlign: "center", fontSize: 10, color: "#94A3B8", marginTop: 8 }}>🔒 Secured by Razorpay · 256-bit SSL</div>
    </div>
  );
}

function WalletCard() {
  return (
    <div style={card}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <SectionHeader icon="👛" label="Wallet & Rewards" noMargin />
        <button style={{ background: "none", border: "none", color: "#14B8A6", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>View All</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
        {[
          { val: "₹240",    label: "Wallet Balance",   badge: "Add Money", badgeBg: "#0F2D52", badgeColor: "#fff" },
          { val: "₹50",     label: "Cashback Pending", badge: "Pending",   badgeBg: "#FEF3C7", badgeColor: "#B45309" },
          { val: "HOPIN10", label: "20% off up to ₹30",badge: "Active",    badgeBg: "#F0FDFA", badgeColor: "#0F6E56" },
        ].map(w => (
          <div key={w.label} style={{ background: "#F8FAFC", borderRadius: 14, padding: 12, textAlign: "center" }}>
            <div style={{ fontSize: w.val.startsWith("₹") ? 18 : 13, fontWeight: 800, color: "#0F2D52" }}>{w.val}</div>
            <div style={{ fontSize: 10, color: "#64748B", margin: "2px 0 8px" }}>{w.label}</div>
            <div style={{ background: w.badgeBg, color: w.badgeColor, borderRadius: 8, padding: "4px 6px", fontSize: 10, fontWeight: 600, cursor: "pointer" }}>{w.badge}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#F0FDFA", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18 }}>💚</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0F6E56" }}>Refund Protected</div>
          <div style={{ fontSize: 11, color: "#64748B" }}>Easy refunds if ride is cancelled</div>
        </div>
      </div>
    </div>
  );
}

// ─── Tiny shared atoms ────────────────────────────────────────────────────────

function SectionHeader({ icon, label, noMargin }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: noMargin ? 0 : 20 }}>
      <div style={{ width: 32, height: 32, borderRadius: 10, background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{icon}</div>
      <span style={{ fontSize: 15, fontWeight: 700, color: "#0F2D52" }}>{label}</span>
    </div>
  );
}

function FieldLabel({ children }) {
  return <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, marginBottom: 4 }}>{children}</div>;
}

function TimeInput({ value, onChange }) {
  return (
    <div style={inputRow}>
      <input
        type="time"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ border: "none", outline: "none", fontSize: 18, fontWeight: 700, color: "#0F2D52", background: "transparent", flex: 1, minWidth: 0 }}
      />
      <span style={{ color: "#94A3B8" }}>🕐</span>
    </div>
  );
}

function Chip({ children }) {
  return <span style={{ fontSize: 11, color: "#94A3B8" }}>{children}</span>;
}

function FareRow({ label, value, green }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
      <span style={{ color: "#64748B" }}>{label}</span>
      <span style={{ fontWeight: 600, color: green ? "#16A34A" : "#0F2D52" }}>{value}</span>
    </div>
  );
}

// ─── Shared style tokens ──────────────────────────────────────────────────────

const card     = { background: "#fff", borderRadius: 24, padding: 24, border: "1px solid #E5E7EB" };
const inputBase = { border: "1px solid #E5E7EB", borderRadius: 10, padding: "10px 12px", fontSize: 14, fontWeight: 600, color: "#0F2D52", outline: "none", width: "100%", boxSizing: "border-box", marginTop: 4 };
const inputRow  = { display: "flex", alignItems: "center", border: "1px solid #E5E7EB", borderRadius: 12, padding: "10px 12px", gap: 8, marginTop: 4 };
const mapLabel  = { fontSize: 11, fontWeight: 700, color: "#0F2D52", background: "rgba(255,255,255,0.88)", padding: "2px 8px", borderRadius: 20 };
const mapMeta   = { fontSize: 10, color: "#64748B", background: "rgba(255,255,255,0.88)", padding: "2px 6px", borderRadius: 20 };

// ─── Root component ───────────────────────────────────────────────────────────

export default function RecurringRide() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const h = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const isMobile = windowWidth < 900;

  const [rides,      setRides]      = useState(INITIAL_RIDES);
  const [selectedId, setSelectedId] = useState(1);

  // Returns the currently selected ride object
  const selected = rides.find(r => r.id === selectedId);

  // Update a single field on the selected ride
  const updateRide = (field, value) =>
    setRides(prev => prev.map(r => r.id === selectedId ? { ...r, [field]: value } : r));

  // Toggle active on any ride (from the left card)
  const toggleActive = (id) =>
    setRides(prev => prev.map(r => r.id === id ? { ...r, active: !r.active } : r));

  const addRide = () => {
    const newRide = {
      id:          Date.now(),
      title:       "New Ride",
      time:        "09:00",
      arriveBy:    "10:00",
      pickup:      "Pickup Location",
      drop:        "Drop Location",
      active:      true,
      days:        [true, false, true, false, true, false, false],
      validUntil:  "",
      rideVibe:    "Quiet",
      gender:      "No Preference",
      vehicleType: "Any",
      maxFare:     "Any",
      seats:       "1 Seat",
      matching:    "Verified riders only",
      promoCode:   "",
      promoApplied:false,
    };
    setRides(prev => [...prev, newRide]);
    setSelectedId(newRide.id);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FBFC", padding: isMobile ? 16 : "20px 24px", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#0F2D52", padding: 0 }}>←</button>
          <div>
            <h1 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F2D52" }}>Recurring Rides</h1>
            <p style={{ margin: 0, fontSize: 12, color: "#94A3B8" }}>Set once. Ride every day. Hoppin handles the rest.</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 13, color: "#64748B", cursor: "pointer" }}>💬 Need help?</span>
          <div style={{ position: "relative", cursor: "pointer" }}>
            <span style={{ fontSize: 20 }}>🔔</span>
            <div style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, background: "#EF4444", borderRadius: "50%", border: "2px solid #F8FBFC" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, padding: "4px 10px 4px 4px", cursor: "pointer" }}>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="avatar" style={{ width: 28, height: 28, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0F2D52" }}>Aryan Rastogi</div>
              <div style={{ fontSize: 10, color: "#14B8A6", fontWeight: 600 }}>Level 3</div>
            </div>
            <span style={{ fontSize: 11, color: "#94A3B8" }}>▾</span>
          </div>
        </div>
      </div>

      {/* ── 3-column grid ──────────────────────────────────────────────────── */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "260px 1fr 340px", gap: 20, alignItems: "start" }}>

        {/* ── Col 1: Ride selector list ───────────────────────────────────── */}
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#94A3B8", letterSpacing: 1, marginBottom: 14 }}>MY RECURRING RIDES</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

            {rides.map(ride => {
              const isSelected = ride.id === selectedId;
              return (
                <div
                  key={ride.id}
                  onClick={() => setSelectedId(ride.id)}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: 16,
                    border: isSelected ? "2px solid #14B8A6" : "1px solid #E5E7EB",
                    cursor: "pointer",
                    boxShadow: isSelected ? "0 4px 16px rgba(20,184,166,0.12)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {/* Top row: icon + title + badge + toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 14 }}>{ride.active ? "☀️" : "🌙"}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#0F2D52" }}>{ride.title}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                        background: ride.active ? "#F0FDFA" : "#FFF7ED",
                        color:      ride.active ? "#0F6E56" : "#EA580C",
                        border:     ride.active ? "1px solid #99F6E4" : "1px solid #FED7AA",
                      }}>
                        {ride.active ? "Active" : "Paused"}
                      </span>
                      {/* Toggle */}
                      <div
                        onClick={e => { e.stopPropagation(); toggleActive(ride.id); }}
                        style={{ width: 36, height: 20, borderRadius: 10, background: ride.active ? "#14B8A6" : "#CBD5E1", position: "relative", cursor: "pointer", transition: "background 0.2s", flexShrink: 0 }}
                      >
                        <div style={{ position: "absolute", top: 2, left: ride.active ? 18 : 2, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#0F2D52", margin: "6px 0 2px" }}>{fmt12(ride.time)}</div>

                  {/* Active days */}
                  <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 10 }}>
                    {activeDayString(ride.days)}
                  </div>

                  {/* Route dots */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#14B8A6", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{ride.pickup}</span>
                    </div>
                    <div style={{ width: 1, height: 8, background: "#E5E7EB", marginLeft: 3.5 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F59E0B", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{ride.drop}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Add new */}
            <button
              onClick={addRide}
              style={{ background: "#fff", border: "1.5px dashed #CBD5E1", borderRadius: 16, padding: 14, cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#64748B", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}
            >
              + Create Recurring Ride
            </button>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 8 }}>
              {[{ icon: "🔒", title: "Secure Payment", sub: "Your payment details are encrypted" },
                { icon: "💬", title: "24/7 Support",   sub: "We're here to help anytime" }].map(b => (
                <div key={b.title} style={{ flex: 1, background: "#F8FAFC", borderRadius: 12, padding: 10, display: "flex", alignItems: "flex-start", gap: 6 }}>
                  <span style={{ fontSize: 14 }}>{b.icon}</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#0F2D52" }}>{b.title}</div>
                    <div style={{ fontSize: 9, color: "#94A3B8" }}>{b.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>💚</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#0F2D52" }}>Refund Protected</div>
                <div style={{ fontSize: 9, color: "#94A3B8" }}>Easy refunds if ride is cancelled</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Col 2: Edit panel (bound to selected ride) ─────────────────── */}
        {selected && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <ScheduleCard    ride={selected} updateRide={updateRide} />
            <RouteCard       ride={selected} updateRide={updateRide} />
            <PreferencesCard ride={selected} updateRide={updateRide} />
          </div>
        )}

        {/* ── Col 3: Summary + Wallet (bound to selected ride) ───────────── */}
        {selected && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <RideSummaryCard ride={selected} updateRide={updateRide} />
            <WalletCard />
          </div>
        )}
      </div>
    </div>
  );
}