import { useState } from "react";

// ─── SVG Icons ───────────────────────────────────────────────────────────────
const PinIcon = ({ color = "#13C9B8", size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

const GpsIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
    <circle cx="12" cy="12" r="8" strokeDasharray="2 2"/>
  </svg>
);

const CalendarIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
);

const ClockIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const SeatIcon = ({ size = 18, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2zM4 22c0-4.418 3.582-8 8-8s8 3.582 8 8"/>
    <path d="M17 14v4h2"/>
  </svg>
);

const ChevronDown = ({ size = 16, color = "#6B7280" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const ArrowRight = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

const ShieldIcon = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <path d="M12 2l7 4v5c0 5-3.5 9-7 10C8.5 20 5 16 5 11V6l7-4z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
);

const TreesIcon = () => (
  <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
    <polygon points="30,5 10,40 50,40" fill="#13C9B8" opacity="0.7"/>
    <polygon points="30,18 12,48 48,48" fill="#0FA89F" opacity="0.8"/>
    <rect x="27" y="48" width="6" height="8" fill="#0FA89F"/>
    <polygon points="15,10 2,38 28,38" fill="#13C9B8" opacity="0.5" transform="translate(-2,5)"/>
    <rect x="12" y="42" width="5" height="6" fill="#13C9B8" opacity="0.5" transform="translate(-2,5)"/>
  </svg>
);

const MoneyIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v12M9 9h4.5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15"/>
  </svg>
);

const ShareIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <path d="M8.59 13.51l6.83 3.98M15.41 6.51L8.59 10.49"/>
  </svg>
);

const LeafIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <path d="M17 8C8 10 5.9 16.17 3.82 19.34C3.59 19.7 3.81 20.17 4.23 20.2C8.31 20.49 11.62 18.92 14.34 16.48C16.73 14.35 18 11.5 18 8.5V4C15.59 4 13 5 11 7"/>
    <path d="M3 21c.98-1.98 2-4 3-6"/>
  </svg>
);

const PeopleIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#13C9B8" strokeWidth="1.8">
    <circle cx="9" cy="7" r="3"/>
    <circle cx="15" cy="7" r="3"/>
    <path d="M3 21v-2a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v2"/>
  </svg>
);

const VerifyIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#13C9B8" strokeWidth="1.5" opacity="0.3"/>
    <path d="M20 4l13 7v8c0 8.5-5.5 14-13 16C7.5 33 2 27.5 2 19V11l18-7z" fill="#E8FAF9" stroke="#13C9B8" strokeWidth="1.5"/>
    <path d="M14 20l4 4 8-8" stroke="#13C9B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CardIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#13C9B8" strokeWidth="1.5" opacity="0.3"/>
    <rect x="8" y="13" width="24" height="16" rx="3" fill="#E8FAF9" stroke="#13C9B8" strokeWidth="1.5"/>
    <path d="M8 18h24" stroke="#13C9B8" strokeWidth="2"/>
    <rect x="12" y="23" width="6" height="2" rx="1" fill="#13C9B8"/>
    <rect x="20" y="23" width="4" height="2" rx="1" fill="#13C9B8" opacity="0.5"/>
  </svg>
);

const SupportIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#13C9B8" strokeWidth="1.5" opacity="0.3"/>
    <circle cx="20" cy="18" r="7" fill="#E8FAF9" stroke="#13C9B8" strokeWidth="1.5"/>
    <path d="M13 25c0 4 14 4 14 0" stroke="#13C9B8" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 16c0-1.657 1.343-3 3-3s3 1.343 3 3v4" stroke="#13C9B8" strokeWidth="1.5"/>
    <path d="M14 20h-1a2 2 0 0 0 0 4h1M26 20h1a2 2 0 0 1 0 4h-1" stroke="#13C9B8" strokeWidth="1.5"/>
  </svg>
);

const CommunityIcon = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="#13C9B8" strokeWidth="1.5" opacity="0.3"/>
    <circle cx="16" cy="16" r="4" fill="#E8FAF9" stroke="#13C9B8" strokeWidth="1.5"/>
    <circle cx="26" cy="16" r="4" fill="#E8FAF9" stroke="#13C9B8" strokeWidth="1.5"/>
    <path d="M8 30c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#13C9B8" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M24 24c1.2-.63 2.56-1 4-1 3.314 0 6 2.686 6 6" stroke="#13C9B8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LocationNavIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#13C9B8">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </svg>
);

// ─── Scenic Road SVG (replaces the image placeholder) ────────────────────────
const ScenicRoadImage = () => (
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "12px" }}>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B8D4F0"/>
        <stop offset="60%" stopColor="#D4E8F8"/>
        <stop offset="100%" stopColor="#E8F4FC"/>
      </linearGradient>
      <linearGradient id="mountain" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7A9BB5"/>
        <stop offset="100%" stopColor="#5E7A8F"/>
      </linearGradient>
      <linearGradient id="mountain2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8BAEC4"/>
        <stop offset="100%" stopColor="#6B8DA3"/>
      </linearGradient>
      <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8C8C8"/>
        <stop offset="100%" stopColor="#888"/>
      </linearGradient>
      <linearGradient id="water" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5AAFD6"/>
        <stop offset="50%" stopColor="#7BC4E2"/>
        <stop offset="100%" stopColor="#5AAFD6"/>
      </linearGradient>
      <linearGradient id="forest" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3A7D44"/>
        <stop offset="100%" stopColor="#2E6338"/>
      </linearGradient>
      <linearGradient id="forest2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#4A8F55"/>
        <stop offset="100%" stopColor="#3A7040"/>
      </linearGradient>
    </defs>
    {/* Sky */}
    <rect width="400" height="200" fill="url(#sky)"/>
    {/* Snow caps */}
    <polygon points="60,20 90,70 30,70" fill="white" opacity="0.85"/>
    <polygon points="120,10 160,75 80,75" fill="white" opacity="0.7"/>
    <polygon points="270,5 310,70 230,70" fill="white" opacity="0.75"/>
    <polygon points="330,15 365,65 295,65" fill="white" opacity="0.65"/>
    {/* Mountains back */}
    <polygon points="0,100 80,40 160,95 240,50 320,90 400,45 400,130 0,130" fill="url(#mountain2)"/>
    {/* Mountains front */}
    <polygon points="0,120 60,60 130,110 200,65 270,105 340,60 400,90 400,150 0,150" fill="url(#mountain)"/>
    {/* Water/Lake */}
    <ellipse cx="200" cy="135" rx="80" ry="15" fill="url(#water)" opacity="0.85"/>
    {/* Forest left */}
    <rect x="0" y="120" width="120" height="80" fill="url(#forest)"/>
    <polygon points="0,120 20,80 40,120" fill="#3A7D44"/>
    <polygon points="20,120 40,75 60,120" fill="#4A8F55"/>
    <polygon points="40,120 60,78 80,120" fill="#3A7D44"/>
    <polygon points="60,120 80,82 100,120" fill="#4A8F55"/>
    <polygon points="80,120 100,76 120,120" fill="#3A7D44"/>
    {/* Forest right */}
    <rect x="280" y="120" width="120" height="80" fill="url(#forest)"/>
    <polygon points="280,120 300,80 320,120" fill="#4A8F55"/>
    <polygon points="300,120 320,75 340,120" fill="#3A7D44"/>
    <polygon points="320,120 340,79 360,120" fill="#4A8F55"/>
    <polygon points="340,120 360,83 380,120" fill="#3A7D44"/>
    <polygon points="360,120 380,78 400,120" fill="#4A8F55"/>
    {/* Road */}
    <path d="M160,200 Q185,145 195,130 Q200,125 205,130 Q215,145 240,200Z" fill="url(#road)"/>
    {/* Road markings */}
    <path d="M200,145 L200,155" stroke="white" strokeWidth="2" opacity="0.7"/>
    <path d="M200,160 L200,170" stroke="white" strokeWidth="2" opacity="0.7"/>
    <path d="M200,175 L200,185" stroke="white" strokeWidth="2" opacity="0.7"/>
    {/* Road guard rail */}
    <path d="M165,195 Q185,148 195,133" stroke="#AAA" strokeWidth="2" fill="none"/>
    {/* White Car */}
    <g transform="translate(185,152) rotate(-5)">
      <rect x="0" y="6" width="32" height="14" rx="3" fill="white" stroke="#DDD" strokeWidth="0.5"/>
      <rect x="5" y="2" width="22" height="12" rx="3" fill="white" stroke="#DDD" strokeWidth="0.5"/>
      <rect x="8" y="3" width="8" height="8" rx="1" fill="#A8D4E8" opacity="0.8"/>
      <rect x="18" y="3" width="7" height="8" rx="1" fill="#A8D4E8" opacity="0.8"/>
      <circle cx="6" cy="20" r="3.5" fill="#444"/>
      <circle cx="6" cy="20" r="2" fill="#888"/>
      <circle cx="26" cy="20" r="3.5" fill="#444"/>
      <circle cx="26" cy="20" r="2" fill="#888"/>
      <rect x="0" y="10" width="3" height="4" rx="1" fill="#FFE080"/>
      <rect x="29" y="10" width="3" height="4" rx="1" fill="#FF6060"/>
    </g>
    {/* Teal path/route line on road */}
    <path d="M200,150 Q200,155 200,165 Q200,175 200,190" stroke="#13C9B8" strokeWidth="3" fill="none" strokeDasharray="5,4" opacity="0.8"/>
  </svg>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HopinOfferRide() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState("");
  const [rideType, setRideType] = useState("oneWay");
  const [price, setPrice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={styles.page}>
      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          {/* Logo */}
          <div style={styles.logo}>
            <span style={styles.logoText}>
              Hop<span style={styles.logoTeal}>in</span>
              <span style={styles.logoPin}><LocationNavIcon /></span>
            </span>
            <div style={styles.logoSub}>Going <span style={styles.teal}>your</span> way anyway.</div>
          </div>

          {/* Desktop Nav Links */}
          <div style={styles.navLinks}>
            <a href="#" style={{ ...styles.navLink, ...styles.navLinkActive }}>Offer a Ride</a>
            <a href="#" style={styles.navLink}>Find a Ride</a>
            <a href="#" style={styles.navLink}>Safety</a>
            <a href="#" style={styles.navLink}>How It Works</a>
            <a href="#" style={styles.navLink}>About Us</a>
            <a href="#" style={styles.navLink}>Blog</a>
          </div>

          {/* Auth Buttons */}
          <div style={styles.authBtns}>
            <button style={styles.loginBtn}>Log In</button>
            <button style={styles.signupBtn}>Sign Up</button>
          </div>

          {/* Hamburger */}
          <button style={styles.hamburger} onClick={() => setMenuOpen(o => !o)}>
            <span style={styles.hamburgerLine}/>
            <span style={styles.hamburgerLine}/>
            <span style={styles.hamburgerLine}/>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {["Offer a Ride","Find a Ride","Safety","How It Works","About Us","Blog"].map(link => (
              <a key={link} href="#" style={styles.mobileLink}>{link}</a>
            ))}
            <div style={styles.mobileBtns}>
              <button style={styles.loginBtn}>Log In</button>
              <button style={styles.signupBtn}>Sign Up</button>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO SECTION ── */}
      <main style={styles.main}>
        <div style={styles.container}>
          <div style={styles.grid}>

            {/* ── LEFT: FORM ── */}
            <div style={styles.formCard}>
              {/* Header */}
              <div style={styles.formHeader}>
                <div>
                  <h1 style={styles.heroTitle}>
                    Offer <span style={styles.teal}>Ride</span>
                  </h1>
                  <p style={styles.heroSubtitle}>Share your journey and help others travel together.</p>
                </div>
                <div style={styles.verifiedBadge}>
                  <ShieldIcon size={32} />
                  <div>
                    <div style={styles.verifiedTitle}>Verified &amp; Safe</div>
                    <div style={styles.verifiedSub}>All rides are verified for your safety.</div>
                  </div>
                </div>
              </div>

              {/* Step Progress */}
              <div style={styles.steps}>
                {[
                  { n: 1, label: "Trip Details", active: true },
                  { n: 2, label: "Ride Preferences", active: false },
                  { n: 3, label: "Vehicle Details", active: false },
                  { n: 4, label: "Review & Publish", active: false },
                ].map((step, i, arr) => (
                  <div key={step.n} style={styles.stepWrapper}>
                    <div style={styles.stepItem}>
                      <div style={step.active ? styles.stepCircleActive : styles.stepCircle}>
                        {step.n}
                      </div>
                      <span style={step.active ? styles.stepLabelActive : styles.stepLabel}>
                        {step.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && <div style={styles.stepDivider}/>}
                  </div>
                ))}
              </div>

              {/* From / To */}
              <div style={styles.locationBlock}>
                <div style={styles.routeLine}>
                  <div style={styles.routeDot}><PinIcon size={22}/></div>
                  <div style={styles.routeVLine}/>
                  <div style={styles.routeDotBlue}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#2563EB">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                </div>
                <div style={styles.inputsBlock}>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>From</label>
                    <div style={styles.inputWrapper}>
                      <input
                        style={styles.input}
                        placeholder="Enter starting location"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                      />
                      <span style={styles.inputIcon}><GpsIcon /></span>
                    </div>
                  </div>
                  <div style={styles.fieldGroup}>
                    <label style={styles.label}>To</label>
                    <div style={styles.inputWrapper}>
                      <input
                        style={styles.input}
                        placeholder="Enter destination"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                      />
                      <span style={styles.inputIcon}><GpsIcon /></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date / Time / Seats */}
              <div style={styles.row3}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Date of Travel</label>
                  <div style={styles.selectWrapper}>
                    <span style={styles.selectIcon}><CalendarIcon /></span>
                    <select style={styles.select} value={date} onChange={e => setDate(e.target.value)}>
                      <option value="">Select date</option>
                      {Array.from({ length: 30 }, (_, i) => {
                        const d = new Date(); d.setDate(d.getDate() + i + 1);
                        return <option key={i} value={d.toISOString().slice(0,10)}>
                          {d.toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
                        </option>;
                      })}
                    </select>
                    <span style={styles.selectChevron}><ChevronDown /></span>
                  </div>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Departure Time</label>
                  <div style={styles.selectWrapper}>
                    <span style={styles.selectIcon}><ClockIcon /></span>
                    <select style={styles.select} value={time} onChange={e => setTime(e.target.value)}>
                      <option value="">Select time</option>
                      {["06:00 AM","07:00 AM","08:00 AM","09:00 AM","10:00 AM","11:00 AM",
                        "12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM",
                        "06:00 PM","07:00 PM","08:00 PM","09:00 PM","10:00 PM"].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                    <span style={styles.selectChevron}><ChevronDown /></span>
                  </div>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Available Seats</label>
                  <div style={styles.selectWrapper}>
                    <span style={styles.selectIcon}><SeatIcon /></span>
                    <select style={styles.select} value={seats} onChange={e => setSeats(e.target.value)}>
                      <option value="">Select seats</option>
                      {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} seat{n>1?"s":""}</option>)}
                    </select>
                    <span style={styles.selectChevron}><ChevronDown /></span>
                  </div>
                </div>
              </div>

              {/* Ride Type & Price */}
              <div style={styles.row2}>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Ride Type</label>
                  <div style={styles.toggleGroup}>
                    <button
                      style={rideType === "oneWay" ? styles.toggleActive : styles.toggleInactive}
                      onClick={() => setRideType("oneWay")}
                    >One Way</button>
                    <button
                      style={rideType === "roundTrip" ? styles.toggleActive : styles.toggleInactive}
                      onClick={() => setRideType("roundTrip")}
                    >Round Trip</button>
                  </div>
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.label}>Estimated Price per Seat</label>
                  <div style={styles.priceWrapper}>
                    <span style={styles.rupee}>₹</span>
                    <input
                      style={styles.priceInput}
                      placeholder="Enter amount"
                      type="number"
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                    />
                  </div>
                  <p style={styles.priceSub}>Suggested price will be shown to riders</p>
                </div>
              </div>

              {/* Tip + CTA */}
              <div style={styles.ctaRow}>
                <div style={styles.tipBox}>
                  <TreesIcon />
                  <p style={styles.tipText}>
                    <span style={styles.tipLabel}>Tip: </span>
                    More details help riders connect with you faster!
                  </p>
                </div>
                <button style={styles.saveBtn}>
                  Save &amp; Continue <span style={{ marginLeft: 8 }}><ArrowRight /></span>
                </button>
              </div>
            </div>

            {/* ── RIGHT: TRIP PREVIEW ── */}
            <div style={styles.rightCol}>
              {/* Trip Preview Card */}
              <div style={styles.previewCard}>
                <h3 style={styles.previewTitle}>Your Trip Preview</h3>
                <div style={styles.previewImg}>
                  <ScenicRoadImage />
                </div>
                <div style={styles.previewRoute}>
                  <div style={styles.previewRouteLeft}>
                    <div style={styles.previewStop}>
                      <span style={styles.previewDotTeal}/>
                      <div>
                        <div style={styles.previewStopLabel}>Starting Point</div>
                        <div style={styles.previewStopVal}>{from || "Not selected"}</div>
                      </div>
                    </div>
                    <div style={styles.previewVLine}/>
                    <div style={styles.previewStop}>
                      <span style={styles.previewDotBlue}/>
                      <div>
                        <div style={styles.previewStopLabel}>Destination</div>
                        <div style={styles.previewStopVal}>{to || "Not selected"}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={styles.previewMeta}>
                  <div style={styles.previewMetaItem}>
                    <CalendarIcon size={16} color="#9CA3AF"/>
                    <span style={styles.previewMetaLabel}>Date</span>
                    <span style={styles.previewMetaVal}>{date || "– – – –"}</span>
                  </div>
                  <div style={styles.previewMetaItem}>
                    <ClockIcon size={16} color="#9CA3AF"/>
                    <span style={styles.previewMetaLabel}>Time</span>
                    <span style={styles.previewMetaVal}>{time || "–:–– ––"}</span>
                  </div>
                  <div style={styles.previewMetaItem}>
                    <SeatIcon size={16} color="#9CA3AF"/>
                    <span style={styles.previewMetaLabel}>Seats</span>
                    <span style={styles.previewMetaVal}>{seats || "––"}</span>
                  </div>
                </div>
              </div>

              {/* Why Offer a Ride */}
              <div style={styles.whyCard}>
                <h3 style={styles.whyTitle}>Why Offer a Ride?</h3>
                <div style={styles.whyList}>
                  {[
                    { icon: <MoneyIcon />, text: "Earn extra money" },
                    { icon: <ShareIcon />, text: "Share travel costs" },
                    { icon: <LeafIcon />, text: "Reduce carbon footprint" },
                    { icon: <PeopleIcon />, text: "Meet new people" },
                  ].map(item => (
                    <div key={item.text} style={styles.whyItem}>
                      {item.icon}
                      <span style={styles.whyText}>{item.text}</span>
                    </div>
                  ))}
                </div>
                <div style={styles.whyTreeDecor}>
                  <svg viewBox="0 0 120 80" width="120" height="80">
                    <polygon points="60,5 20,65 100,65" fill="#13C9B8" opacity="0.2"/>
                    <polygon points="60,22 24,72 96,72" fill="#13C9B8" opacity="0.3"/>
                    <rect x="55" y="72" width="10" height="8" fill="#13C9B8" opacity="0.3"/>
                    <polygon points="25,15 0,60 50,60" fill="#13C9B8" opacity="0.12"/>
                    <rect x="20" y="60" width="8" height="6" fill="#13C9B8" opacity="0.12"/>
                    <polygon points="95,12 75,55 115,55" fill="#13C9B8" opacity="0.15"/>
                    <rect x="91" y="55" width="8" height="6" fill="#13C9B8" opacity="0.15"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TRUST BADGES ── */}
        <div style={styles.trustBar}>
          <div style={styles.trustContainer}>
            {[
              { icon: <VerifyIcon />, title: "Verified Users", sub: "All users are verified for your safety" },
              { icon: <CardIcon />, title: "Secure Payments", sub: "Safe & hassle-free transactions" },
              { icon: <SupportIcon />, title: "24/7 Support", sub: "We're here whenever you need us" },
              { icon: <CommunityIcon />, title: "Community Driven", sub: "Building a better travel community together" },
            ].map(b => (
              <div key={b.title} style={styles.trustItem}>
                {b.icon}
                <div>
                  <div style={styles.trustTitle}>{b.title}</div>
                  <div style={styles.trustSub}>{b.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Responsive styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        select { appearance: none; -webkit-appearance: none; }
        input:focus, select:focus { outline: 2px solid #13C9B8; outline-offset: 0; }
        button:focus { outline: 2px solid #13C9B8; }
        @media (max-width: 1024px) {
          .grid { grid-template-columns: 1fr !important; }
          .rightCol { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
        }
        @media (max-width: 768px) {
          .navLinks { display: none !important; }
          .authBtns { display: none !important; }
          .hamburger { display: flex !important; }
          .row3 { grid-template-columns: 1fr !important; }
          .row2 { grid-template-columns: 1fr !important; }
          .rightCol { grid-template-columns: 1fr !important; }
          .ctaRow { flex-direction: column !important; gap: 16px !important; }
          .steps { gap: 4px !important; }
          .stepDivider { width: 16px !important; }
          .heroTitle { font-size: 32px !important; }
          .trustContainer { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .steps { flex-wrap: wrap !important; }
          .stepDivider { display: none !important; }
          .trustContainer { grid-template-columns: 1fr !important; }
          .formHeader { flex-direction: column !important; gap: 12px !important; }
          .verifiedBadge { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const teal = "#13C9B8";
const tealDark = "#0FA89F";
const navy = "#1A2332";
const gray = "#6B7280";
const lightGray = "#F5F7FA";
const borderColor = "#E5E7EB";
const white = "#FFFFFF";

const styles = {
  page: { minHeight: "100vh", background: lightGray, fontFamily: "'Inter', sans-serif" },

  // NAV
  nav: { background: white, borderBottom: `1px solid ${borderColor}`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 1px 8px rgba(0,0,0,0.05)" },
  navInner: { maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", gap: 32, justifyContent: "space-between" },
  logo: { display: "flex", flexDirection: "column", gap: 0 },
  logoText: { fontSize: 26, fontWeight: 800, color: navy, letterSpacing: "-0.5px", display: "flex", alignItems: "center", gap: 1 },
  logoTeal: { color: teal },
  logoPin: { display: "inline-flex", marginLeft: 1, marginTop: -4 },
  logoSub: { fontSize: 11, color: gray, fontWeight: 400, letterSpacing: "0.01em", marginTop: -2 },
  teal: { color: teal },

  navLinks: { display: "flex", gap: 28, flex: 1, justifyContent: "center", className: "navLinks" },
  navLink: { fontSize: 14, fontWeight: 500, color: "#374151", textDecoration: "none", padding: "4px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
  navLinkActive: { color: teal, borderBottom: `2px solid ${teal}` },

  authBtns: { display: "flex", gap: 12, alignItems: "center", className: "authBtns" },
  loginBtn: { background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 500, color: navy, padding: "8px 16px" },
  signupBtn: { background: teal, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: white, padding: "10px 22px", borderRadius: 8, transition: "background 0.2s" },

  hamburger: { display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 },
  hamburgerLine: { display: "block", width: 22, height: 2, background: navy, borderRadius: 2 },
  mobileMenu: { background: white, borderTop: `1px solid ${borderColor}`, padding: 16, display: "flex", flexDirection: "column", gap: 8 },
  mobileLink: { fontSize: 15, fontWeight: 500, color: "#374151", textDecoration: "none", padding: "10px 12px", borderRadius: 8 },
  mobileBtns: { display: "flex", gap: 12, padding: "8px 0" },

  // MAIN
  main: { paddingBottom: 0 },
  container: { maxWidth: 1280, margin: "0 auto", padding: "32px 24px" },
  grid: { display: "grid", gridTemplateColumns: "1fr 380px", gap: 24, alignItems: "start", className: "grid" },

  // FORM CARD
  formCard: { background: white, borderRadius: 16, padding: 32, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" },

  formHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28, flexWrap: "wrap", gap: 16, className: "formHeader" },
  heroTitle: { fontSize: 40, fontWeight: 800, color: navy, lineHeight: 1.1, className: "heroTitle" },
  heroSubtitle: { fontSize: 14, color: gray, marginTop: 6, fontWeight: 400 },

  verifiedBadge: { display: "flex", alignItems: "center", gap: 10, background: "#F0FFFE", border: `1px solid #B2EDEA`, borderRadius: 10, padding: "10px 14px", className: "verifiedBadge" },
  verifiedTitle: { fontSize: 13, fontWeight: 700, color: navy },
  verifiedSub: { fontSize: 11, color: gray },

  // STEPS
  steps: { display: "flex", alignItems: "center", marginBottom: 28, className: "steps" },
  stepWrapper: { display: "flex", alignItems: "center", flex: 1 },
  stepItem: { display: "flex", alignItems: "center", gap: 8, flexShrink: 0 },
  stepCircleActive: { width: 28, height: 28, borderRadius: "50%", background: teal, color: white, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  stepCircle: { width: 28, height: 28, borderRadius: "50%", background: "#E5E7EB", color: gray, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  stepLabelActive: { fontSize: 13, fontWeight: 600, color: navy, whiteSpace: "nowrap" },
  stepLabel: { fontSize: 12, fontWeight: 500, color: gray, whiteSpace: "nowrap" },
  stepDivider: { flex: 1, height: 1.5, background: "#E5E7EB", margin: "0 8px", minWidth: 20, className: "stepDivider" },

  // LOCATION INPUTS
  locationBlock: { display: "flex", gap: 12, marginBottom: 20 },
  routeLine: { display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 28, gap: 0 },
  routeDot: { display: "flex", alignItems: "center" },
  routeVLine: { width: 2, flex: 1, background: "#D1D5DB", minHeight: 28, margin: "4px 0" },
  routeDotBlue: { display: "flex", alignItems: "center" },
  inputsBlock: { flex: 1, display: "flex", flexDirection: "column", gap: 12 },

  fieldGroup: { display: "flex", flexDirection: "column", gap: 6 },
  label: { fontSize: 13, fontWeight: 600, color: "#374151" },
  inputWrapper: { position: "relative" },
  input: { width: "100%", padding: "11px 40px 11px 14px", border: `1.5px solid ${borderColor}`, borderRadius: 10, fontSize: 14, color: navy, background: white, transition: "border 0.2s" },
  inputIcon: { position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center" },

  // ROW 3
  row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20, className: "row3" },
  selectWrapper: { position: "relative", display: "flex", alignItems: "center" },
  selectIcon: { position: "absolute", left: 12, display: "flex", alignItems: "center", pointerEvents: "none" },
  select: { width: "100%", padding: "11px 36px 11px 38px", border: `1.5px solid ${borderColor}`, borderRadius: 10, fontSize: 14, color: navy, background: white, cursor: "pointer" },
  selectChevron: { position: "absolute", right: 12, display: "flex", alignItems: "center", pointerEvents: "none" },

  // ROW 2
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24, className: "row2" },
  toggleGroup: { display: "flex", background: "#F3F4F6", borderRadius: 10, padding: 4, gap: 0 },
  toggleActive: { flex: 1, padding: "10px 0", background: teal, color: white, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer" },
  toggleInactive: { flex: 1, padding: "10px 0", background: "none", color: gray, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: "pointer" },

  priceWrapper: { display: "flex", alignItems: "center", border: `1.5px solid ${borderColor}`, borderRadius: 10, overflow: "hidden", background: white },
  rupee: { padding: "11px 12px", fontSize: 16, color: "#374151", fontWeight: 600, borderRight: `1px solid ${borderColor}`, background: "#FAFAFA" },
  priceInput: { flex: 1, padding: "11px 14px", border: "none", fontSize: 14, color: navy, background: "transparent" },
  priceSub: { fontSize: 11, color: gray, marginTop: 4 },

  // CTA
  ctaRow: { display: "flex", alignItems: "center", gap: 16, justifyContent: "space-between", background: "#F0FFFE", border: `1px solid #B2EDEA`, borderRadius: 12, padding: "14px 20px", className: "ctaRow" },
  tipBox: { display: "flex", alignItems: "center", gap: 12 },
  tipText: { fontSize: 14, color: "#374151", fontWeight: 400 },
  tipLabel: { color: teal, fontWeight: 700 },
  saveBtn: { display: "flex", alignItems: "center", gap: 4, background: teal, color: white, border: "none", borderRadius: 10, padding: "13px 26px", fontSize: 15, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, transition: "background 0.2s" },

  // RIGHT
  rightCol: { display: "flex", flexDirection: "column", gap: 16, className: "rightCol" },

  previewCard: { background: white, borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" },
  previewTitle: { fontSize: 16, fontWeight: 700, color: navy, marginBottom: 14 },
  previewImg: { borderRadius: 12, overflow: "hidden", marginBottom: 16 },
  previewRoute: { marginBottom: 14 },
  previewRouteLeft: { display: "flex", flexDirection: "column", gap: 0 },
  previewStop: { display: "flex", alignItems: "flex-start", gap: 10 },
  previewDotTeal: { display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: teal, marginTop: 4, flexShrink: 0 },
  previewDotBlue: { display: "inline-block", width: 12, height: 12, borderRadius: "50%", background: "#2563EB", marginTop: 4, flexShrink: 0 },
  previewVLine: { width: 2, height: 20, background: "#E5E7EB", marginLeft: 5, marginTop: 2, marginBottom: 2 },
  previewStopLabel: { fontSize: 12, fontWeight: 600, color: "#374151" },
  previewStopVal: { fontSize: 12, color: gray, marginTop: 1 },
  previewMeta: { display: "flex", gap: 0, borderTop: `1px solid ${borderColor}`, paddingTop: 14, justifyContent: "space-between" },
  previewMetaItem: { display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 },
  previewMetaLabel: { fontSize: 11, color: gray, fontWeight: 500 },
  previewMetaVal: { fontSize: 12, color: navy, fontWeight: 600 },

  whyCard: { background: white, borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", position: "relative", overflow: "hidden" },
  whyTitle: { fontSize: 15, fontWeight: 700, color: navy, marginBottom: 14 },
  whyList: { display: "flex", flexDirection: "column", gap: 12 },
  whyItem: { display: "flex", alignItems: "center", gap: 12 },
  whyText: { fontSize: 14, color: "#374151", fontWeight: 500 },
  whyTreeDecor: { position: "absolute", bottom: -8, right: -8, opacity: 0.8 },

  // TRUST
  trustBar: { background: white, borderTop: `1px solid ${borderColor}`, padding: "28px 24px", marginTop: 8 },
  trustContainer: { maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, className: "trustContainer" },
  trustItem: { display: "flex", alignItems: "center", gap: 14 },
  trustTitle: { fontSize: 14, fontWeight: 700, color: navy, marginBottom: 3 },
  trustSub: { fontSize: 12, color: gray, lineHeight: 1.4 },
};