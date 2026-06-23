import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ALL_RIDES = [
  {
    id: 1,
    name: "Rahul Sharma",
    rating: 4.9,
    reviews: 132,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "08:00 AM",
    arrival: "11:00 AM",
    price: 299,
    seats: 3,
    tags: ["Music Lover", "Pet Friendly"],
    verified: true,
  },
  {
    id: 2,
    name: "Neha Verma",
    rating: 4.8,
    reviews: 87,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "09:30 AM",
    arrival: "12:30 PM",
    price: 279,
    seats: 2,
    tags: ["Female Driver", "Verified"],
    verified: true,
  },
  {
    id: 3,
    name: "Aman Singh",
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "10:00 AM",
    arrival: "01:00 PM",
    price: 299,
    seats: 4,
    tags: ["AC Car", "Non Smoker"],
    verified: true,
  },
  {
    id: 4,
    name: "Priya Kapoor",
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "11:00 AM",
    arrival: "02:00 PM",
    price: 249,
    seats: 1,
    tags: ["Friendly", "Music Lover"],
    verified: true,
  },
  {
    id: 5,
    name: "Arjun Mehta",
    rating: 4.9,
    reviews: 211,
    image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "12:00 PM",
    arrival: "03:00 PM",
    price: 319,
    seats: 3,
    tags: ["Eco Friendly", "Non-stop"],
    verified: true,
  },
  {
    id: 6,
    name: "Karan Malhotra",
    rating: 4.8,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=200",
    from: "Agra",
    to: "Delhi",
    departure: "02:00 PM",
    arrival: "05:00 PM",
    price: 289,
    seats: 2,
    tags: ["Experienced", "Clean Car"],
    verified: true,
  },
];

const POPULAR_ROUTES = [
  { from: "Delhi", to: "Jaipur", count: 128 },
  { from: "Bangalore", to: "Mysore", count: 96 },
  { from: "Mumbai", to: "Pune", count: 74 },
];

const WHY_ITEMS = [
  { icon: "💰", text: "Lower travel costs" },
  { icon: "✅", text: "Trusted & verified users" },
  { icon: "🔄", text: "Flexible ride options" },
  { icon: "🌿", text: "Eco-friendly travel" },
];

export default function FindRide() {
  const navigate = useNavigate();

  const [from, setFrom] = useState("Agra");
  const [to, setTo] = useState("Delhi");
  const [date, setDate] = useState("Today, Jun 23");
  const [seats, setSeats] = useState("1 Seat");
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recommended");
  const [showAll, setShowAll] = useState(false);
  const [bookedId, setBookedId] = useState(null);

  const [windowWidth] = useState(() => window.innerWidth);
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1100;
  const showSidebar = !isMobile && !isTablet;

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const getSortedRides = () => {
    let rides = [...ALL_RIDES];
    if (activeFilter === "Cheapest") rides.sort((a, b) => a.price - b.price);
    else if (activeFilter === "Earliest") rides.sort((a, b) => a.departure.localeCompare(b.departure));
    else if (activeFilter === "Top Rated") rides.sort((a, b) => b.rating - a.rating);
    if (sortBy === "Price: Low to High") rides.sort((a, b) => a.price - b.price);
    else if (sortBy === "Price: High to Low") rides.sort((a, b) => b.price - a.price);
    return rides;
  };

  const visibleRides = showAll ? getSortedRides() : getSortedRides().slice(0, 3);
  const hiddenCount = ALL_RIDES.length - 3;

  const handleBook = (id) => {
    setBookedId(id);
    setTimeout(() => setBookedId(null), 2000);
  };

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

          {/* FROM */}
          <div style={{ flex: "1 1 120px", minWidth: "100px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>From</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff", cursor: "pointer" }}>
              <span style={{ color: "#14B8A6", fontSize: "14px" }}>📍</span>
              <select value={from} onChange={e => setFrom(e.target.value)} style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                {["Agra", "Delhi", "Jaipur", "Mathura", "Noida", "Gurgaon"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* SWAP */}
          <button onClick={swapLocations} style={{ background: "#F0FDFA", border: "1px solid #99F6E4", borderRadius: "50%", width: "34px", height: "34px", cursor: "pointer", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: "2px" }}>⇄</button>

          {/* TO */}
          <div style={{ flex: "1 1 120px", minWidth: "100px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>To</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff", cursor: "pointer" }}>
              <span style={{ fontSize: "14px" }}>🏁</span>
              <select value={to} onChange={e => setTo(e.target.value)} style={{ border: "none", outline: "none", fontSize: "14px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                {["Delhi", "Agra", "Jaipur", "Mathura", "Noida", "Gurgaon", "Lucknow"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* DATE */}
          <div style={{ flex: "1 1 130px", minWidth: "110px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>Date</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ fontSize: "14px" }}>📅</span>
              <select value={date} onChange={e => setDate(e.target.value)} style={{ border: "none", outline: "none", fontSize: "13px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                <option>Today, Jun 23</option>
                <option>Tomorrow, Jun 24</option>
                <option>Wed, Jun 25</option>
                <option>Thu, Jun 26</option>
              </select>
            </div>
          </div>

          {/* SEATS */}
          <div style={{ flex: "1 1 100px", minWidth: "90px" }}>
            <label style={{ fontSize: "11px", color: "#64748B", display: "block", marginBottom: "4px" }}>Seats</label>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "8px 10px", background: "#fff" }}>
              <span style={{ fontSize: "14px" }}>🧍</span>
              <select value={seats} onChange={e => setSeats(e.target.value)} style={{ border: "none", outline: "none", fontSize: "13px", fontWeight: "600", color: "#0F2D52", background: "transparent", cursor: "pointer", flex: 1 }}>
                <option>1 Seat</option>
                <option>2 Seats</option>
                <option>3 Seats</option>
                <option>4 Seats</option>
              </select>
            </div>
          </div>

          {/* SEARCH BUTTON */}
          <button style={{ background: "linear-gradient(135deg,#14B8A6,#2DD4BF)", border: "none", borderRadius: "10px", padding: "10px 20px", color: "#fff", fontSize: "14px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", height: "40px", flexShrink: 0 }}>
            🔍 Search
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "16px" : "24px 32px", display: "flex", gap: "24px", alignItems: "flex-start" }}>

        {/* LEFT: Results */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Filter pills row */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "20px" }}>
            {filters.map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? "#0F2D52" : "#fff", color: activeFilter === f ? "#fff" : "#64748B", border: activeFilter === f ? "none" : "1px solid #E5E7EB", borderRadius: "20px", padding: "6px 16px", fontSize: "13px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s" }}>
                {f === "Filters" ? "⚙️ " : ""}{f}
              </button>
            ))}
            <button style={{ background: "#fff", color: "#64748B", border: "1px solid #E5E7EB", borderRadius: "20px", padding: "6px 14px", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
              ⚙️ Filters
            </button>

            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "13px", color: "#64748B" }}>{ALL_RIDES.length} rides found</span>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: "5px 10px", fontSize: "13px", color: "#0F2D52", background: "#fff", cursor: "pointer", outline: "none" }}>
                <option>Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Ride cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {visibleRides.map(ride => (
              <div key={ride.id} style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", padding: "16px 20px", display: "flex", gap: "16px", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap", boxShadow: "0 2px 8px rgba(15,45,82,0.04)", transition: "box-shadow 0.2s" }}>

                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <img src={ride.image} alt={ride.name} style={{ width: "56px", height: "56px", borderRadius: "50%", objectFit: "cover" }} />
                  {ride.verified && (
                    <div style={{ position: "absolute", bottom: 0, right: 0, background: "#14B8A6", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", border: "2px solid #fff" }}>✓</div>
                  )}
                </div>

                {/* Driver info */}
                <div style={{ minWidth: "130px", flexShrink: 0 }}>
                  <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>{ride.name}</div>
                  <div style={{ fontSize: "12px", color: "#64748B", marginTop: "2px" }}>⭐ {ride.rating} ({ride.reviews} rides)</div>
                  <div style={{ marginTop: "6px", background: "#F0FDFA", color: "#0F6E56", fontSize: "11px", fontWeight: "600", padding: "2px 8px", borderRadius: "20px", display: "inline-block" }}>✓ Verified User</div>
                </div>

                {/* Route */}
                <div style={{ flex: "1", minWidth: "120px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#14B8A6", flexShrink: 0 }}></div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.from}</span>
                    <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ride.departure}</span>
                  </div>
                  <div style={{ width: "1.5px", height: "16px", background: "#E5E7EB", marginLeft: "4px" }}></div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#0F2D52", flexShrink: 0 }}></div>
                    <span style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{ride.to}</span>
                    <span style={{ fontSize: "12px", color: "#94A3B8" }}>{ride.arrival}</span>
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", minWidth: isMobile ? "auto" : "180px" }}>
                  {ride.tags.map(t => (
                    <span key={t} style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>{t}</span>
                  ))}
                  <span style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", color: "#475569", fontSize: "11px", padding: "3px 10px", borderRadius: "20px" }}>🧍 {ride.seats} Seats Left</span>
                </div>

                {/* Price + Book */}
                <div style={{ textAlign: "right", flexShrink: 0, minWidth: "100px" }}>
                  <div style={{ fontSize: "20px", fontWeight: "700", color: "#0F2D52" }}>₹{ride.price}</div>
                  <div style={{ fontSize: "11px", color: "#64748B", marginBottom: "10px" }}>per seat</div>
                  <button onClick={() => handleBook(ride.id)} style={{ background: bookedId === ride.id ? "#14B8A6" : "#fff", color: bookedId === ride.id ? "#fff" : "#14B8A6", border: "1.5px solid #14B8A6", borderRadius: "10px", padding: "8px 18px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap" }}>
                    {bookedId === ride.id ? "✓ Booked!" : "Book Seat"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show more */}
          {!showAll && (
            <button onClick={() => setShowAll(true)} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "20px auto 0", background: "none", border: "none", cursor: "pointer", color: "#0F2D52", fontSize: "14px", fontWeight: "600" }}>
              ↓ {hiddenCount} more rides available
            </button>
          )}
          {showAll && (
            <button onClick={() => setShowAll(false)} style={{ display: "flex", alignItems: "center", gap: "8px", margin: "20px auto 0", background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: "13px" }}>
              ↑ Show less
            </button>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        {showSidebar && (
          <div style={{ width: "280px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Popular Routes */}
            <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #E5E7EB", overflow: "hidden" }}>
              <div style={{ padding: "16px 16px 0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Popular Routes</span>
                  <button style={{ background: "none", border: "none", color: "#14B8A6", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>View All</button>
                </div>
              </div>

              {/* Map banner */}
              <div style={{ position: "relative", height: "140px", background: "linear-gradient(135deg, #e8f5e9, #e3f2fd)", overflow: "hidden" }}>
                <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400" alt="Route" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "#fff", borderRadius: "20px", padding: "4px 14px", fontSize: "13px", fontWeight: "700", color: "#0F2D52", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>📍 Jaipur</div>
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
                <button style={{ width: "100%", marginTop: "10px", background: "none", border: "1.5px solid #14B8A6", borderRadius: "10px", padding: "8px", color: "#14B8A6", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>
                  View More Routes →
                </button>
              </div>
            </div>

            {/* Why Find a Ride */}
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