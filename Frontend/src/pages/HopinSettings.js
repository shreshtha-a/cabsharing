import { useState } from "react";

const teal = "#00897B";
const tealLight = "#e6f4f2";
const tealDark = "#00695C";

const styles = {
  root: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafb",
    color: "#1a2332",
  },
  sidebar: {
    width: 210,
    minWidth: 210,
    background: "#fff",
    borderRight: "1px solid #eef0f3",
    display: "flex",
    flexDirection: "column",
    padding: "28px 0 20px 0",
    position: "sticky",
    top: 0,
    height: "100vh",
    overflowY: "auto",
  },
  logo: {
    padding: "0 24px 28px 24px",
  },
  logoText: {
    fontSize: 28,
    fontWeight: 800,
    color: "#1a2332",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  logoAccent: { color: teal },
  logoPin: { color: teal, fontSize: 20 },
  logoTagline: {
    fontSize: 11.5,
    color: "#6b7280",
    marginTop: 3,
    fontStyle: "italic",
  },
  navList: { listStyle: "none", padding: 0, margin: 0, flex: 1 },
  navItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "11px 24px",
    cursor: "pointer",
    borderRadius: active ? "0 24px 24px 0" : 0,
    background: active ? tealLight : "transparent",
    color: active ? teal : "#374151",
    fontWeight: active ? 600 : 400,
    fontSize: 14.5,
    marginRight: 16,
    transition: "background 0.15s",
    position: "relative",
  }),
  badge: {
    background: teal,
    color: "#fff",
    borderRadius: 99,
    fontSize: 11,
    fontWeight: 700,
    minWidth: 19,
    height: 19,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    padding: "0 5px",
  },
  sidebarBottom: {
    padding: "16px 0",
    borderTop: "1px solid #eef0f3",
    marginTop: 8,
  },
  inviteBanner: {
    margin: "20px 12px 8px 12px",
    borderRadius: 16,
    background: "linear-gradient(155deg, #e8f5f3 0%, #c8ece7 100%)",
    overflow: "hidden",
    padding: "18px 16px 0 16px",
    position: "relative",
  },
  inviteTitle: { fontSize: 15, fontWeight: 700, color: "#1a2332", lineHeight: 1.3 },
  inviteAccent: { color: teal },
  inviteDesc: { fontSize: 12, color: "#4b5563", margin: "6px 0 10px 0", lineHeight: 1.5 },
  inviteImg: {
    width: "100%",
    height: 90,
    objectFit: "cover",
    borderRadius: "0 0 12px 12px",
    display: "block",
    background: "linear-gradient(180deg,#b2dfdb 0%,#80cbc4 100%)",
  },
  inviteBtn: {
    width: "calc(100% - 24px)",
    margin: "10px 12px",
    background: teal,
    color: "#fff",
    border: "none",
    borderRadius: 30,
    padding: "13px 0",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    letterSpacing: 0.2,
  },
  main: {
    flex: 1,
    minWidth: 0,
    padding: "32px 36px 48px 36px",
    maxWidth: 860,
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  pageTitle: { fontSize: 26, fontWeight: 800, color: "#1a2332" },
  pageSubtitle: { fontSize: 13, color: "#6b7280", marginTop: 3 },
  topIcons: { display: "flex", alignItems: "center", gap: 14 },
  iconBtn: {
    position: "relative",
    background: "#f3f4f6",
    border: "none",
    borderRadius: 50,
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#374151",
  },
  notifDot: (color) => ({
    position: "absolute",
    top: 5,
    right: 5,
    background: color,
    color: "#fff",
    borderRadius: 99,
    fontSize: 10,
    fontWeight: 700,
    minWidth: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
    background: "linear-gradient(135deg,#80cbc4,#00897B)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    cursor: "pointer",
    overflow: "hidden",
  },
  section: {
    background: "#fff",
    borderRadius: 18,
    padding: "28px 28px 8px 28px",
    marginBottom: 24,
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  sectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    background: tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal,
    fontSize: 22,
    flexShrink: 0,
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: "#1a2332" },
  sectionDesc: { fontSize: 12.5, color: "#6b7280", marginTop: 2 },
  sectionInner: {
    display: "flex",
    gap: 24,
    alignItems: "flex-start",
  },
  settingsList: { flex: 1, minWidth: 0 },
  settingsRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: 14,
    cursor: "pointer",
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "#f8fafb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#4b5563",
    fontSize: 17,
    flexShrink: 0,
  },
  rowText: { flex: 1, minWidth: 0 },
  rowTitle: { fontSize: 14, fontWeight: 600, color: "#1a2332" },
  rowDesc: { fontSize: 12, color: "#6b7280", marginTop: 1 },
  rowRight: { display: "flex", alignItems: "center", gap: 10 },
  enabledBadge: {
    background: tealLight,
    color: teal,
    fontSize: 12,
    fontWeight: 700,
    borderRadius: 8,
    padding: "3px 10px",
    border: `1px solid ${teal}33`,
  },
  chevron: { color: "#9ca3af", fontSize: 16 },
  sectionPromo: {
    width: 160,
    minWidth: 140,
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "0 0 8px 0",
  },
  promoIcon: {
    width: 80,
    height: 80,
    borderRadius: "50%",
    background: tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 36,
    marginBottom: 10,
  },
  promoTitle: { fontSize: 14.5, fontWeight: 700, color: "#1a2332", lineHeight: 1.3 },
  promoDesc: { fontSize: 11.5, color: "#6b7280", marginTop: 5, lineHeight: 1.5 },
  // App Prefs row with control
  prefRow: {
    display: "flex",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: 14,
  },
  toggleGroup: {
    display: "flex",
    border: `1.5px solid ${teal}`,
    borderRadius: 10,
    overflow: "hidden",
  },
  toggleBtn: (active) => ({
    padding: "6px 18px",
    background: active ? teal : "#fff",
    color: active ? "#fff" : teal,
    border: "none",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  selectControl: {
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "6px 12px",
    fontSize: 13,
    color: "#1a2332",
    background: "#fff",
    cursor: "pointer",
    appearance: "none",
    paddingRight: 28,
  },
  colorCircle: {
    width: 26,
    height: 26,
    borderRadius: "50%",
    background: teal,
    border: "2.5px solid #fff",
    boxShadow: "0 0 0 1.5px " + teal,
    cursor: "pointer",
  },
  // Support & Legal
  supportGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0 32px",
  },
  supportCol: {},
  supportColTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#9ca3af",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 10,
    paddingTop: 4,
  },
  supportRow: {
    display: "flex",
    alignItems: "center",
    padding: "13px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: 12,
    cursor: "pointer",
  },
  footer: {
    background: "#fff",
    borderRadius: 14,
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
    marginTop: 8,
  },
  footerLeft: { display: "flex", alignItems: "center", gap: 14 },
  footerIcon: {
    width: 38,
    height: 38,
    borderRadius: "50%",
    background: tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal,
    fontSize: 20,
  },
  footerTitle: { fontSize: 14, fontWeight: 700, color: "#1a2332" },
  footerDesc: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  learnMoreBtn: {
    border: `1.5px solid ${teal}`,
    background: "#fff",
    color: teal,
    borderRadius: 30,
    padding: "9px 22px",
    fontWeight: 700,
    fontSize: 13.5,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
  },
};

const navItems = [
  { icon: "🏠", label: "Home" },
  { icon: "🗺️", label: "Find a Ride" },
  { icon: "🚗", label: "My Rides" },
  { icon: "💬", label: "Messages", badge: 2 },
  { icon: "👛", label: "Wallet" },
  { icon: "🎁", label: "Offers" },
  { icon: "👤", label: "Profile" },
  { icon: "⚙️", label: "Settings", active: true },
  { icon: "❓", label: "Help & Support" },
];

function NavItem({ icon, label, badge, active }) {
  return (
    <li style={styles.navItem(active)}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <span>{label}</span>
      {badge && <span style={styles.badge}>{badge}</span>}
    </li>
  );
}

function SettingsRow({ icon, title, desc, right, last }) {
  return (
    <div style={{ ...styles.settingsRow, borderBottom: last ? "none" : "1px solid #f3f4f6" }}>
      <div style={styles.rowIcon}>{icon}</div>
      <div style={styles.rowText}>
        <div style={styles.rowTitle}>{title}</div>
        <div style={styles.rowDesc}>{desc}</div>
      </div>
      <div style={styles.rowRight}>
        {right}
        <span style={styles.chevron}>›</span>
      </div>
    </div>
  );
}

function SupportRow({ icon, title, desc, last }) {
  return (
    <div style={{ ...styles.supportRow, borderBottom: last ? "none" : "1px solid #f3f4f6" }}>
      <div style={{ ...styles.rowIcon, background: "#f8fafb" }}>{icon}</div>
      <div style={styles.rowText}>
        <div style={styles.rowTitle}>{title}</div>
        <div style={styles.rowDesc}>{desc}</div>
      </div>
      <span style={styles.chevron}>›</span>
    </div>
  );
}

// Landscape SVG for invite banner
function RoadSVG() {
  return (
    <svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: 90, display: "block", borderRadius: "0 0 10px 10px" }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b2ebf2" />
          <stop offset="100%" stopColor="#80deea" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a5d6a7" />
          <stop offset="100%" stopColor="#66bb6a" />
        </linearGradient>
      </defs>
      <rect width="180" height="60" fill="url(#sky)" />
      <rect y="55" width="180" height="35" fill="url(#ground)" />
      {/* Mountains */}
      <polygon points="0,55 30,20 60,55" fill="#80cbc4" opacity="0.8" />
      <polygon points="30,55 65,15 100,55" fill="#4db6ac" opacity="0.7" />
      <polygon points="80,55 110,22 140,55" fill="#80cbc4" opacity="0.8" />
      {/* Trees */}
      {[10, 25, 150, 165].map((x, i) => (
        <g key={i}>
          <rect x={x + 3} y="50" width="3" height="8" fill="#5d4037" />
          <polygon points={`${x},55 ${x + 4.5},42 ${x + 9},55`} fill="#388e3c" />
        </g>
      ))}
      {/* Road */}
      <path d="M65,90 Q90,55 115,90" fill="#607d8b" opacity="0.9" />
      <path d="M73,90 Q90,58 107,90" fill="#546e7a" opacity="0.7" />
      {/* Teal road glow */}
      <path d="M88,90 Q90,60 92,90" stroke={teal} strokeWidth="1.5" fill="none" opacity="0.8" />
      {/* Car */}
      <g transform="translate(80,70)">
        <rect x="0" y="0" width="20" height="9" rx="3" fill="#eceff1" />
        <rect x="3" y="-4" width="14" height="6" rx="2" fill="#cfd8dc" />
        <circle cx="4" cy="9" r="2.5" fill="#37474f" />
        <circle cx="16" cy="9" r="2.5" fill="#37474f" />
        <rect x="1" y="1" width="5" height="4" rx="1" fill="#80deea" opacity="0.8" />
        <rect x="14" y="1" width="5" height="4" rx="1" fill="#80deea" opacity="0.8" />
      </g>
      {/* Pin */}
      <g transform="translate(103,48)">
        <circle cx="5" cy="5" r="5" fill={teal} />
        <circle cx="5" cy="5" r="2.5" fill="#fff" />
        <line x1="5" y1="10" x2="5" y2="15" stroke={teal} strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function HopinSettings() {
  const [appearance, setAppearance] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [location, setLocation] = useState("Always Allow");
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <div style={styles.root}>
      {/* Responsive CSS injected */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        .hopin-sidebar { display: flex !important; }
        .hopin-hamburger { display: none !important; }
        @media (max-width: 768px) {
          .hopin-sidebar { display: none !important; }
          .hopin-sidebar.open { display: flex !important; position: fixed; z-index: 100; top: 0; left: 0; height: 100vh; box-shadow: 4px 0 24px rgba(0,0,0,0.13); }
          .hopin-hamburger { display: flex !important; }
          .hopin-main { padding: 20px 14px 40px 14px !important; }
          .hopin-section-inner { flex-direction: column !important; }
          .hopin-promo { display: none !important; }
          .hopin-support-grid { grid-template-columns: 1fr !important; }
          .hopin-footer { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .hopin-topbar { margin-bottom: 18px !important; }
        }
        @media (max-width: 480px) {
          .hopin-main { padding: 14px 8px 32px 8px !important; }
        }
        .settings-row:hover { background: #f8fafb; border-radius: 10px; }
        .nav-item-hover:hover { background: ${tealLight}; border-radius: 0 24px 24px 0; }
        .learn-more-btn:hover { background: ${tealLight} !important; }
        .invite-btn:hover { background: ${tealDark} !important; }
      `}</style>

      {/* Sidebar */}
      <div
        className={`hopin-sidebar${mobileNav ? " open" : ""}`}
        style={styles.sidebar}
      >
        <div style={styles.logo}>
          <div style={styles.logoText}>
            Hop<span style={styles.logoAccent}>i</span>n
            <span style={styles.logoPin}>📍</span>
          </div>
          <div style={styles.logoTagline}>Going <em style={{ color: teal, fontStyle: "normal", fontWeight: 600 }}>your</em> way, anyway.</div>
        </div>

        <ul style={styles.navList}>
          {navItems.map((item) => (
            <li
              key={item.label}
              className="nav-item-hover"
              style={styles.navItem(item.active)}
            >
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge && <span style={styles.badge}>{item.badge}</span>}
            </li>
          ))}
        </ul>

        <div style={styles.sidebarBottom}>
          <li className="nav-item-hover" style={{ ...styles.navItem(false), listStyle: "none" }}>
            <span style={{ fontSize: 18 }}>↪️</span>
            <span>Logout</span>
          </li>
          <li className="nav-item-hover" style={{ ...styles.navItem(false), color: "#ef4444", listStyle: "none" }}>
            <span style={{ fontSize: 18 }}>🗑️</span>
            <span style={{ color: "#ef4444" }}>Delete Account</span>
          </li>
        </div>

        {/* Invite banner */}
        <div style={styles.inviteBanner}>
          <div style={styles.inviteTitle}>
            Better Rides<br />When <span style={styles.inviteAccent}>Shared</span>
          </div>
          <div style={styles.inviteDesc}>Together, we go further and create a better tomorrow.</div>
          <RoadSVG />
        </div>
        <button className="invite-btn" style={styles.inviteBtn}>
          Invite Friends &nbsp;→
        </button>
      </div>

      {/* Overlay for mobile nav */}
      {mobileNav && (
        <div
          onClick={() => setMobileNav(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.25)", zIndex: 99 }}
        />
      )}

      {/* Main */}
      <div className="hopin-main" style={styles.main}>
        {/* Topbar */}
        <div className="hopin-topbar" style={styles.topbar}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Hamburger for mobile */}
            <button
              className="hopin-hamburger"
              onClick={() => setMobileNav(!mobileNav)}
              style={{ ...styles.iconBtn, display: "none" }}
            >
              ☰
            </button>
            <div>
              <div style={styles.pageTitle}>Settings</div>
              <div style={styles.pageSubtitle}>Manage your preferences and account settings</div>
            </div>
          </div>
          <div style={styles.topIcons}>
            <button style={styles.iconBtn}>
              ☀️
            </button>
            <button style={{ ...styles.iconBtn, position: "relative" }}>
              💬
              <span style={styles.notifDot(teal)}>2</span>
            </button>
            <button style={{ ...styles.iconBtn, position: "relative" }}>
              🔔
              <span style={styles.notifDot("#ef4444")}>3</span>
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={styles.avatar}>AS</div>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1a2332", whiteSpace: "nowrap" }}>Ananya Sharma</span>
              <span style={{ color: "#9ca3af" }}>▾</span>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionIcon}>🛡️</div>
            <div>
              <div style={styles.sectionTitle}>Security &amp; Privacy</div>
              <div style={styles.sectionDesc}>Manage your account security and privacy preferences</div>
            </div>
          </div>
          <div className="hopin-section-inner" style={styles.sectionInner}>
            <div style={styles.settingsList}>
              {[
                { icon: "🔒", title: "Change Password", desc: "Update your password regularly to keep your account safe.", right: null },
                { icon: "📍", title: "Two-Factor Authentication", desc: "Add an extra layer of security to your account.", right: <span style={styles.enabledBadge}>Enabled</span> },
                { icon: "🕐", title: "Login Activity", desc: "View your recent login activity and devices.", right: null },
                { icon: "📱", title: "Manage Devices", desc: "View and manage devices connected to your account.", right: null },
                { icon: "👥", title: "Manage Blocked Users", desc: "View and manage users you have blocked.", right: null, last: true },
              ].map((row, i, arr) => (
                <div
                  key={row.title}
                  className="settings-row"
                  style={{ ...styles.settingsRow, borderBottom: i === arr.length - 1 ? "none" : "1px solid #f3f4f6" }}
                >
                  <div style={styles.rowIcon}>{row.icon}</div>
                  <div style={styles.rowText}>
                    <div style={styles.rowTitle}>{row.title}</div>
                    <div style={styles.rowDesc}>{row.desc}</div>
                  </div>
                  <div style={styles.rowRight}>
                    {row.right}
                    <span style={styles.chevron}>›</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="hopin-promo" style={styles.sectionPromo}>
              <div style={styles.promoIcon}>🛡️</div>
              <div style={styles.promoTitle}>Your security is our priority.</div>
              <div style={styles.promoDesc}>Keep your account protected and secure.</div>
            </div>
          </div>
        </div>

        {/* App Preferences */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionIcon}>📱</div>
            <div>
              <div style={styles.sectionTitle}>App Preferences</div>
              <div style={styles.sectionDesc}>Customize your app experience</div>
            </div>
          </div>
          <div className="hopin-section-inner" style={styles.sectionInner}>
            <div style={styles.settingsList}>
              {/* Appearance */}
              <div className="settings-row" style={styles.prefRow}>
                <div style={styles.rowIcon}>☀️</div>
                <div style={styles.rowText}>
                  <div style={styles.rowTitle}>Appearance</div>
                  <div style={styles.rowDesc}>Choose light or dark mode</div>
                </div>
                <div style={styles.toggleGroup}>
                  {["Light", "Dark"].map((opt) => (
                    <button
                      key={opt}
                      style={styles.toggleBtn(appearance === opt)}
                      onClick={() => setAppearance(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              {/* Language */}
              <div className="settings-row" style={styles.prefRow}>
                <div style={styles.rowIcon}>🌐</div>
                <div style={styles.rowText}>
                  <div style={styles.rowTitle}>Language</div>
                  <div style={styles.rowDesc}>Select your preferred language</div>
                </div>
                <div style={{ position: "relative" }}>
                  <select
                    style={styles.selectControl}
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    {["English", "Hindi", "Spanish", "French"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280", fontSize: 12 }}>▾</span>
                </div>
              </div>
              {/* Location */}
              <div className="settings-row" style={styles.prefRow}>
                <div style={styles.rowIcon}>📍</div>
                <div style={styles.rowText}>
                  <div style={styles.rowTitle}>Location Permissions</div>
                  <div style={styles.rowDesc}>Manage location access for better experience</div>
                </div>
                <div style={{ position: "relative" }}>
                  <select
                    style={styles.selectControl}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    {["Always Allow", "Ask Each Time", "Never"].map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                  <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6b7280", fontSize: 12 }}>▾</span>
                </div>
              </div>
              {/* Theme Color */}
              <div className="settings-row" style={styles.prefRow}>
                <div style={styles.rowIcon}>🎨</div>
                <div style={styles.rowText}>
                  <div style={styles.rowTitle}>Theme Color</div>
                  <div style={styles.rowDesc}>Choose your preferred app theme</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={styles.colorCircle} />
                  <span style={{ color: "#9ca3af", fontSize: 13 }}>▾</span>
                </div>
              </div>
              {/* Accessibility */}
              <div className="settings-row" style={{ ...styles.prefRow, borderBottom: "none" }}>
                <div style={styles.rowIcon}>♿</div>
                <div style={styles.rowText}>
                  <div style={styles.rowTitle}>Accessibility</div>
                  <div style={styles.rowDesc}>Adjust app accessibility settings</div>
                </div>
                <span style={styles.chevron}>›</span>
              </div>
            </div>
            <div className="hopin-promo" style={styles.sectionPromo}>
              <div style={{ ...styles.promoIcon, fontSize: 32 }}>📱</div>
              <div style={styles.promoTitle}>Personalize your experience.</div>
              <div style={styles.promoDesc}>Adjust your app settings just the way you like.</div>
            </div>
          </div>
        </div>

        {/* Support & Legal */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <div style={styles.sectionIcon}>🎧</div>
            <div>
              <div style={styles.sectionTitle}>Support &amp; Legal</div>
              <div style={styles.sectionDesc}>Get help and know your rights</div>
            </div>
          </div>
          <div className="hopin-support-grid" style={styles.supportGrid}>
            <div style={styles.supportCol}>
              <div style={styles.supportColTitle}>Support</div>
              {[
                { icon: "❓", title: "Help Center", desc: "Find answers to common questions" },
                { icon: "💬", title: "Contact Support", desc: "Chat or email our support team" },
                { icon: "⚠️", title: "Report an Issue", desc: "Report a bug or provide feedback", last: true },
              ].map((row, i, arr) => (
                <div
                  key={row.title}
                  className="settings-row"
                  style={{ ...styles.supportRow, borderBottom: i === arr.length - 1 ? "none" : "1px solid #f3f4f6" }}
                >
                  <div style={styles.rowIcon}>{row.icon}</div>
                  <div style={styles.rowText}>
                    <div style={styles.rowTitle}>{row.title}</div>
                    <div style={styles.rowDesc}>{row.desc}</div>
                  </div>
                  <span style={styles.chevron}>›</span>
                </div>
              ))}
            </div>
            <div style={styles.supportCol}>
              <div style={styles.supportColTitle}>Legal</div>
              {[
                { icon: "📄", title: "Terms & Conditions", desc: "Read our terms and conditions" },
                { icon: "🔒", title: "Privacy Policy", desc: "Learn how we protect your data" },
                { icon: "👥", title: "Community Guidelines", desc: "Our community rules and standards", last: true },
              ].map((row, i, arr) => (
                <div
                  key={row.title}
                  className="settings-row"
                  style={{ ...styles.supportRow, borderBottom: i === arr.length - 1 ? "none" : "1px solid #f3f4f6" }}
                >
                  <div style={styles.rowIcon}>{row.icon}</div>
                  <div style={styles.rowText}>
                    <div style={styles.rowTitle}>{row.title}</div>
                    <div style={styles.rowDesc}>{row.desc}</div>
                  </div>
                  <span style={styles.chevron}>›</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer banner */}
        <div className="hopin-footer" style={styles.footer}>
          <div style={styles.footerLeft}>
            <div style={styles.footerIcon}>🛡️</div>
            <div>
              <div style={styles.footerTitle}>Your safety and privacy are our top priority.</div>
              <div style={styles.footerDesc}>Hopin is committed to providing a secure and trusted platform for all users.</div>
            </div>
          </div>
          <button className="learn-more-btn" style={styles.learnMoreBtn}>
            Learn More &nbsp;→
          </button>
        </div>
      </div>
    </div>
  );
}