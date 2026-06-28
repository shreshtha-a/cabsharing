import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { rideService, bookingService } from "../services/rideService";
import { getLocalRides } from "../utils/localRides";

const CITIES = ["Agra", "Delhi", "Jaipur", "Mathura", "Noida", "Gurgaon", "Lucknow", "Mumbai", "Pune", "Bangalore"];

const POPULAR_ROUTES = [
  { from: "Delhi",     to: "Jaipur", count: 128 },
  { from: "Bangalore", to: "Mysore", count: 96  },
  { from: "Mumbai",    to: "Pune",   count: 74  },
];

const WHY_ITEMS = [
  { icon: "💰", text: "Lower travel costs" },
  { icon: "✅", text: "Trusted & verified users" },
  { icon: "🔄", text: "Flexible ride options" },
  { icon: "🌿", text: "Eco-friendly travel" },
];

// ─── Helpers ──────────────────────────────────────────────
function formatTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

function getDriverPhoto(ride) {
  const photo = ride?.driver?.user?.photo;
  const name  = ride?.driver?.user?.name || "Driver";
  if (photo && photo.startsWith("http")) return photo;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=14B8A6&color=fff&size=128`;
}

function getRidePreferenceTags(ride) {
  const tags = [];
  const p = ride?.preferences || {};
  if (p.petsAllowed)    tags.push("Pet Friendly");
  if (!p.smokingAllowed) tags.push("Non Smoker");
  if (p.musicAllowed)   tags.push("Music Lover");
  if (p.luggageAllowed) tags.push("Luggage OK");
  if (p.genderPreference && p.genderPreference !== "any")
    tags.push(`${p.genderPreference === "female" ? "👩" : "👨"} Only`);
  return tags.slice(0, 3);
}

// ─── Local ride row (matches the same card style) ─────────
function LocalRideRow({ ride, isMobile }) {
  const navigate = useNavigate();
  const tags = [];
  const p = ride?.preferences || {};
  if (p.petsAllowed)     tags.push("Pet Friendly");
  if (!p.smokingAllowed) tags.push("Non Smoker");
  if (p.musicAllowed)    tags.push("Music Lover");

  return (
    <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap", boxShadow: "0 2px 8px rgba(15,45,82,0.04)" }}>
      {/* Avatar */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#14B8A6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", fontWeight: "700", color: "#fff" }}>
          {(ride.driverName || "D")[0].toUpperCase()}
        </div>
        <div style={{ position: "absolute", bottom: 0, right: 0, background: "#14B8A6", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", border: "2px solid #fff", color: "#fff" }}>✓</div>
      </div>

      {/* Driver info */}
      <div style={{ minWidth: "130px", flexShrink: 0 }}>
        <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>{ride.driverName || "Driver"}</div>
        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>🚘 {ride.vehicle?.name || "Car"} · {ride.vehicle?.plate || ""}</div>
        <div style={{ marginTop: "6px", background: "#F0FDFA", color: "#0F6E56", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", display: "inline-block" }}>✓ Driver</div>
      </div>

      {/* Route */}
      <div style={{ flex: "1", minWidth: "120px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#14B8A6", flexShrink: 0 }}></div>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.from}</span>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ride.time}</span>
        </div>
        <div style={{ width: "1.5px", height: "16px", background: "#E5E7EB", marginLeft: "4px" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0F2D52", flexShrink: 0 }}></div>
          <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.to}</span>
          <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ride.date}</span>
        </div>
      </div>

      {/* Tags */}
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", minWidth: isMobile ? "auto" : "180px" }}>
        {tags.map(t => <span key={t} style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>{t}</span>)}
        <span style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>🧍 {ride.seats} seats</span>
      </div>

      {/* Price */}
      <div style={{ textAlign: "right", flexShrink: 0, minWidth: "100px" }}>
        <div style={{ fontSize: "20px", fontWeight: "700", color: "#0F2D52" }}>₹{ride.price}</div>
        <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "10px" }}>per seat</div>
        <button
          onClick={() => navigate("/offer-ride")}
          style={{ background: "#fff", color: "#14B8A6", border: "1.5px solid #14B8A6", borderRadius: "10px", padding: "8px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
        >
          Contact
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────
export default function FindRide() {
  const navigate = useNavigate();

  const [from,  setFrom]  = useState("Agra");
  const [to,    setTo]    = useState("Delhi");
  const [date,  setDate]  = useState("");
  const [seats, setSeats] = useState(1);

  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy,       setSortBy]       = useState("Recommended");
  const [showAll,      setShowAll]      = useState(false);

  const [apiRides,    setApiRides]    = useState([]);
  const [localRides,  setLocalRides]  = useState([]);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [bookingState, setBookingState] = useState({});

  const [windowWidth] = useState(() => window.innerWidth);
  const isMobile   = windowWidth < 768;
  const isTablet   = windowWidth >= 768 && windowWidth < 1100;
  const showSidebar = !isMobile && !isTablet;

  // Load local rides on mount
  useEffect(() => {
    setLocalRides(getLocalRides());
  }, []);

  // ─── Fetch API rides ──────────────────────────────────
  const fetchRides = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { seats };
      if (from) params.source      = from;
      if (to)   params.destination = to;
      if (date) params.date        = date;
      const res = await rideService.getRides(params);
      setApiRides(res.data.rides || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load rides. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [from, to, date, seats]);

  useEffect(() => { fetchRides(); }, []); // eslint-disable-line

  // ─── Filter local rides by search criteria ────────────
  const filteredLocal = localRides.filter(ride => {
    const matchFrom = !from || ride.from?.toLowerCase().includes(from.toLowerCase());
    const matchTo   = !to   || ride.to?.toLowerCase().includes(to.toLowerCase());
    const matchDate = !date || ride.date === date;
    return matchFrom && matchTo && matchDate;
  });

  // ─── Sort & filter API rides ──────────────────────────
  const getSortedApiRides = () => {
    let r = [...apiRides];
    if (activeFilter === "Cheapest")  r.sort((a, b) => a.farePerSeat - b.farePerSeat);
    if (activeFilter === "Top Rated") r.sort((a, b) => (b.driver?.averageRating || 0) - (a.driver?.averageRating || 0));
    if (activeFilter === "Earliest")  r.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === "Price: Low to High") r.sort((a, b) => a.farePerSeat - b.farePerSeat);
    if (sortBy === "Price: High to Low") r.sort((a, b) => b.farePerSeat - a.farePerSeat);
    return r;
  };

  const sortedApi   = getSortedApiRides();
  const allRides    = [...filteredLocal, ...sortedApi];
  const totalCount  = allRides.length;
  const visible     = showAll ? allRides : allRides.slice(0, 3);
  const hiddenCount = totalCount - 3;

  // ─── Book a seat (API rides only) ─────────────────────
  const handleBook = async (ride) => {
    const token = localStorage.getItem("token");
    if (!token) { navigate("/"); return; }
    setBookingState(prev => ({ ...prev, [ride._id]: "loading" }));
    try {
      await bookingService.create({ ride: ride._id, seatsBooked: 1, totalAmount: ride.farePerSeat, farePerSeat: ride.farePerSeat });
      setBookingState(prev => ({ ...prev, [ride._id]: "done" }));
      setTimeout(() => { setBookingState(prev => ({ ...prev, [ride._id]: null })); fetchRides(); }, 2000);
    } catch (err) {
      setBookingState(prev => ({ ...prev, [ride._id]: null }));
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  const swapLocations = () => { setFrom(to); setTo(from); };
  const filters = ["All", "Cheapest", "Earliest", "Top Rated"];

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh", fontFamily: "Inter, sans-serif" }}>

      {/* TOP HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: isMobile ? "16px" : "20px 32px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#0F2D52", padding: 0, lineHeight: 1 }}>←</button>
            <h1 style={{ fontSize: "24px", fontWeight: "700", color: "#0F2D52", margin: 0 }}>Find a Ride</h1>
          </div>
          <p style={{ margin: 0, fontSize: "13px", color: "#64748B" }}>Search verified rides near you and travel together.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: "12px", padding: "10px 16px" }}>
          <span style={{ fontSize: "18px" }}>🛡️</span>
          <div>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F6E56" }}>Verified & Safe</div>
            <div style={{ fontSize: "11px", color: "#64748B" }}>All rides are verified for your safety.</div>
          </div>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: isMobile ? "12px 16px" : "16px 32px" }}>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 120px", minWidth: "100px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>From</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ color: "#14B8A6", fontSize: "14px" }}>📍</span>
              <select value={from} onChange={e => setFrom(e.target.value)} style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <button onClick={swapLocations} style={{ background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: "50%", width: "34px", height: "34px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: "2px" }}>⇄</button>

          <div style={{ flex: "1 1 120px", minWidth: "100px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>To</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ fontSize: "14px" }}>🏁</span>
              <select value={to} onChange={e => setTo(e.target.value)} style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div style={{ flex: "1 1 130px", minWidth: "110px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>Date</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ fontSize: "14px" }}>📅</span>
              <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ border: "none", outline: "none", fontSize: "13px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }} />
            </div>
          </div>

          <div style={{ flex: "1 1 100px", minWidth: "90px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>Seats</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ fontSize: "14px" }}>🧍</span>
              <select value={seats} onChange={e => setSeats(Number(e.target.value))} style={{ border: "none", outline: "none", fontSize: "13px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} {n === 1 ? "Seat" : "Seats"}</option>)}
              </select>
            </div>
          </div>

          <button onClick={fetchRides} disabled={loading} style={{ background: loading ? "#94A3B8" : "linear-gradient(135deg,#14B8A6,#2DD4BF)", border: "none", borderRadius: "10px", padding: "10px 20px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", gap: "6px", height: "40px", flexShrink: 0 }}>
            {loading ? "⏳ Searching…" : "🔍 Search"}
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "16px" : "24px 32px", display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* LEFT: Results */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? "#0F2D52" : "#fff", color: activeFilter === f ? "#fff" : "#64748B", border: activeFilter === f ? "none" : "1px solid #E5E7EB", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s" }}>{f}</button>
            ))}
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>{totalCount} ride{totalCount !== 1 ? "s" : ""} found</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: "5px 10px", fontSize: "13px", color: "#0F2D52", background: "#fff", cursor: "pointer", outline: "none" }}>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>🔍</div>
              <div style={{ fontSize: "15px", fontWeight: "600" }}>Searching for rides…</div>
            </div>
          )}

          {!loading && error && filteredLocal.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#EF4444" }}>
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚠️</div>
              <div style={{ fontSize: "15px", fontWeight: "600" }}>{error}</div>
              <button onClick={fetchRides} style={{ marginTop: "16px", background: "#14B8A6", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 24px", fontWeight: "600", cursor: "pointer" }}>Try Again</button>
            </div>
          )}

          {!loading && allRides.length === 0 && (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "#64748B" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>🚗</div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F2D52", marginBottom: "6px" }}>No rides found</div>
              <div style={{ fontSize: "13px" }}>Try different dates, cities, or fewer seats.</div>
            </div>
          )}

          {!loading && allRides.length > 0 && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {visible.map((ride, idx) => {
                  // Local ride
                  if (ride.id && !ride._id) {
                    return <LocalRideRow key={ride.id} ride={ride} isMobile={isMobile} />;
                  }

                  // API ride
                  const driverName  = ride.driver?.user?.name || "Driver";
                  const driverPhoto = getDriverPhoto(ride);
                  const rating      = ride.driver?.averageRating || 0;
                  const totalRides  = ride.driver?.totalRides || 0;
                  const tags        = getRidePreferenceTags(ride);
                  const bState      = bookingState[ride._id];

                  return (
                    <div key={ride._id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap", boxShadow: "0 2px 8px rgba(15,45,82,0.04)" }}>
                      <div style={{ position: "relative", flexShrink: 0 }}>
                        <img src={driverPhoto} alt={driverName} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }} onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(driverName)}&background=14B8A6&color=fff`; }} />
                        <div style={{ position: "absolute", bottom: 0, right: 0, background: "#14B8A6", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", border: "2px solid #fff", color: "#fff" }}>✓</div>
                      </div>
                      <div style={{ minWidth: "130px", flexShrink: 0 }}>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>{driverName}</div>
                        <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>⭐ {rating > 0 ? rating.toFixed(1) : "New"} {totalRides > 0 ? `(${totalRides} rides)` : ""}</div>
                        <div style={{ marginTop: "6px", background: "#F0FDFA", color: "#0F6E56", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", display: "inline-block" }}>✓ Verified</div>
                      </div>
                      <div style={{ flex: "1", minWidth: "120px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#14B8A6", flexShrink: 0 }}></div>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.source?.address}</span>
                          <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ride.time || formatTime(ride.date)}</span>
                        </div>
                        <div style={{ width: "1.5px", height: "16px", background: "#E5E7EB", marginLeft: "4px" }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                          <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0F2D52", flexShrink: 0 }}></div>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.destination?.address}</span>
                          <span style={{ fontSize: "12px", color: "#94A3B8" }}>{formatDate(ride.date)}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", minWidth: isMobile ? "auto" : "180px" }}>
                        {tags.map(t => <span key={t} style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>{t}</span>)}
                        <span style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>🧍 {ride.availableSeats} left</span>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, minWidth: "100px" }}>
                        <div style={{ fontSize: "20px", fontWeight: "700", color: "#0F2D52" }}>₹{ride.farePerSeat}</div>
                        <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "10px" }}>per seat</div>
                        <button
                          onClick={() => handleBook(ride)}
                          disabled={bState === "loading" || bState === "done" || ride.availableSeats < 1}
                          style={{ background: bState === "done" ? "#14B8A6" : "#fff", color: bState === "done" ? "#fff" : ride.availableSeats < 1 ? "#94A3B8" : "#14B8A6", border: `1.5px solid ${ride.availableSeats < 1 ? "#E5E7EB" : "#14B8A6"}`, borderRadius: "10px", padding: "8px 18px", fontSize: "13px", fontWeight: "600", cursor: bState || ride.availableSeats < 1 ? "not-allowed" : "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}
                        >
                          {bState === "loading" ? "Booking…" : bState === "done" ? "✓ Booked!" : ride.availableSeats < 1 ? "Full" : "Book Seat"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalCount > 3 && !showAll && (
                <button onClick={() => setShowAll(true)} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "20px auto 0", background: "none", border: "none", cursor: "pointer", color: "#0F2D52", fontSize: "14px", fontWeight: "600" }}>
                  ↓ {hiddenCount} more ride{hiddenCount !== 1 ? "s" : ""} available
                </button>
              )}
              {showAll && (
                <button onClick={() => setShowAll(false)} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "20px auto 0", background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: "13px" }}>↑ Show less</button>
              )}
            </>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        {showSidebar && (
          <div style={{ width: "280px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", overflow: "hidden" }}>
              <div style={{ padding: "16px 16px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Popular Routes</span>
                </div>
              </div>
              <div style={{ position: "relative", height: "140px", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400" alt="Route" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "13px", fontWeight: "700", color: "#0F2D52", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>📍 Popular</div>
              </div>
              <div style={{ padding: "12px 16px 16px" }}>
                {POPULAR_ROUTES.map((r, i) => (
                  <div key={i} onClick={() => { setFrom(r.from); setTo(r.to); }} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < POPULAR_ROUTES.length - 1 ? "1px solid #F1F5F9" : "none", cursor: "pointer" }}>
                    <span style={{ fontSize: "16px" }}>📍</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{r.from} → {r.to}</div>
                      <div style={{ fontSize: "11px", color: "#64748B" }}>{r.count} rides available</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "16px" }}>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52", marginBottom: "14px" }}>Why Find a Ride?</div>
              {WHY_ITEMS.map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: i < WHY_ITEMS.length - 1 ? "1px solid #F1F5F9" : "none" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{w.icon}</div>
                  <span style={{ fontSize: "13px", color: "#0F2D52", fontWeight: "500" }}>{w.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}