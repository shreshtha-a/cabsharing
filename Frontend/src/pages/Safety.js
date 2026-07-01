import { NavLink } from "react-router-dom";
import {
  MdVerifiedUser,
  MdDirectionsCar,
  MdPeople,
  MdLocationOn,
  MdSos,
  MdPhone,
  MdStar,
  MdLock,
  MdCheckCircle,
  MdChevronRight,
  MdHeadsetMic,
  MdWarning,
  MdShield,
} from "react-icons/md";

const safetyFeatures = [
  {
    Icon: MdVerifiedUser,
    title: "Verified Drivers",
    description:
      "Every driver is verified with ID proof, phone number, background checks and more.",
  },
  {
    Icon: MdDirectionsCar,
    title: "Verified Vehicles (Drivers)",
    description:
      "All vehicles offered by drivers are verified for RC, Insurance, PUC and roadworthiness.",
  },
  {
    Icon: MdPeople,
    title: "Verified Passengers",
    description:
      "Passengers who offer rides also go through verification to ensure a trusted community.",
  },
  {
    Icon: MdLocationOn,
    title: "Live Ride Tracking",
    description:
      "Share your live location with family and friends during your ride.",
  },
  {
    Icon: MdSos,
    title: "SOS Emergency",
    description:
      "One-tap SOS button alerts our team and your emergency contacts instantly.",
  },
  {
    Icon: MdPhone,
    title: "Emergency Contacts",
    description:
      "Add your trusted contacts. They'll be notified in case of any emergency.",
  },
  {
    Icon: MdStar,
    title: "Ratings & Reviews",
    description:
      "Riders and drivers are rated after every ride to maintain a trusted community.",
  },
];

const safetyTips = [
  "Always verify driver details and vehicle number.",
  "Share your trip details with family or friends.",
  "Sit in the back seat for your comfort and safety.",
  "Avoid sharing OTPs or personal information.",
  "Report any suspicious activity immediately.",
];

const privacyPoints = [
  "Your data is secure and never shared with anyone.",
  "We use encrypted systems to protect your personal information.",
  "You can block users and report any issues directly in the app.",
];

const stats = [
  { Icon: MdShield, value: "10M+", label: "Safe Rides Completed" },
  { Icon: MdPeople, value: "500K+", label: "Verified Drivers" },
  { Icon: MdDirectionsCar, value: "300K+", label: "Verified Vehicles" },
  { Icon: MdPeople, value: "250K+", label: "Verified Passengers" },
  { Icon: MdStar, value: "4.8/5", label: "Average Rating" },
];

const colors = {
  navy: "#061B4D",
  teal: "#14B8A6",
  tealLight: "#E6F9F7",
  tealMid: "#A7F3D0",
  slate: "#42526E",
  slateLight: "#CBD5E1",
  white: "#FFFFFF",
  roseLight: "#FEF2F2",
  rose: "#EF4444",
};

export default function Safety() {
  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: colors.navy }}>

      {/* ── HERO ── */}
      <section
        style={{
          background: `linear-gradient(135deg, ${colors.tealLight} 0%, #F0FDF9 60%, #FFFFFF 100%)`,
          paddingTop: "120px",
          paddingBottom: "64px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "0 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            gap: "48px",
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div>
            <h1
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                fontWeight: "800",
                lineHeight: 1.1,
                margin: 0,
                color: colors.navy,
              }}
            >
              Safe Rides.
              <br />
              <span style={{ color: colors.teal }}>Every Time.</span>
            </h1>
            <p
              style={{
                marginTop: "20px",
                fontSize: "16px",
                lineHeight: "1.75",
                color: colors.slate,
                maxWidth: "420px",
              }}
            >
              At Hopin, your safety is at the heart of everything we do.
              Whether you're riding with us or offering a ride, we make sure
              every journey is safe and secure.
            </p>
            <div
              style={{
                marginTop: "28px",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                background: colors.tealLight,
                border: `1.5px solid ${colors.teal}`,
                borderRadius: "12px",
                padding: "12px 20px",
                color: "#0D9488",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              <MdShield size={20} />
              All Drivers. All Vehicles. Verified.
            </div>
          </div>

          {/* Right — shield illustration */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: "340px",
            }}
          >
            {/* big shield */}
            <MdShield
              size={260}
              style={{ color: colors.teal, opacity: 0.2, position: "absolute" }}
            />
            <MdShield
              size={200}
              style={{ color: colors.teal, opacity: 0.55, position: "absolute" }}
            />
            <MdCheckCircle
              size={72}
              style={{ color: colors.teal, position: "absolute", zIndex: 2 }}
            />

            {/* floating badges */}
            {[
              { Icon: MdDirectionsCar, top: "10%", left: "5%" },
              { Icon: MdVerifiedUser, top: "4%", left: "42%" },
              {
                Icon: () => (
                  <span style={{ fontSize: "9px", fontWeight: "800", color: colors.rose }}>
                    SOS
                  </span>
                ),
                top: "10%",
                right: "5%",
              },
              { Icon: MdLocationOn, top: "50%", right: "2%" },
              { Icon: MdPeople, bottom: "10%", right: "10%" },
            ].map(({ Icon, ...pos }, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: colors.white,
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 3,
                }}
              >
                <Icon size={22} style={{ color: colors.teal }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW WE KEEP YOU SAFE ── */}
      <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "64px 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "40px",
          }}
        >
          <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: "800", margin: 0 }}>
            How We Keep You Safe
          </h2>
          <p style={{ color: colors.slate, fontSize: "14px", margin: 0 }}>
            Advanced safety. Verified trust. Peace of mind.
          </p>
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {safetyFeatures.map(({ Icon, title, description }) => (
            <div
              key={title}
              style={{
                background: colors.white,
                border: "1.5px solid #E2E8F0",
                borderRadius: "18px",
                padding: "24px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(20,184,166,0.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: colors.tealLight,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <Icon size={24} style={{ color: colors.teal }} />
              </div>
              <h3 style={{ fontSize: "15px", fontWeight: "700", margin: "0 0 8px" }}>
                {title}
              </h3>
              <p style={{ fontSize: "13px", lineHeight: "1.65", color: colors.slate, margin: 0 }}>
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── THREE CARDS ROW ── */}
      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "0 32px 64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
        }}
      >
        {/* Safety Tips */}
        <div
          style={{
            background: colors.white,
            border: "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <MdShield size={22} style={{ color: colors.teal }} />
            <h3 style={{ fontWeight: "700", fontSize: "16px", margin: 0 }}>
              Safety Tips for Riders
            </h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {safetyTips.map((tip) => (
              <div key={tip} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MdCheckCircle
                  size={18}
                  style={{ color: colors.teal, flexShrink: 0, marginTop: "2px" }}
                />
                <span style={{ fontSize: "14px", color: colors.slate, lineHeight: "1.5" }}>
                  {tip}
                </span>
              </div>
            ))}
          </div>
          <NavLink
            to="/safety-tips"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "20px",
              color: colors.teal,
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            View all safety tips <MdChevronRight size={18} />
          </NavLink>
        </div>

        {/* Emergency */}
        <div
          style={{
            background: "#FFF8F8",
            border: "1.5px solid #FECACA",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
            <MdWarning size={22} style={{ color: colors.rose }} />
            <h3 style={{ fontWeight: "700", fontSize: "16px", margin: 0 }}>
              In Case of Emergency
            </h3>
          </div>
          <p style={{ fontSize: "13px", color: colors.slate, marginBottom: "20px", marginTop: "4px" }}>
            We're here to help you, 24/7.
          </p>

          {[
            {
              label: "Press SOS Button in the app",
              sub: "Instant help and alerts",
              iconBg: colors.rose,
              iconContent: (
                <span style={{ fontSize: "9px", fontWeight: "800", color: "#fff" }}>SOS</span>
              ),
            },
            {
              label: "Contact Support",
              sub: "Our support team is always available",
              iconBg: colors.navy,
              iconContent: <MdHeadsetMic size={16} style={{ color: "#fff" }} />,
            },
          ].map(({ label, sub, iconBg, iconContent }) => (
            <button
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: colors.white,
                border: "1.5px solid #E2E8F0",
                borderRadius: "14px",
                padding: "14px 16px",
                marginBottom: "12px",
                cursor: "pointer",
                textAlign: "left",
                boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)")}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.05)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: iconBg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {iconContent}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: "600", fontSize: "14px", color: colors.navy }}>
                    {label}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: colors.slate }}>{sub}</p>
                </div>
              </div>
              <MdChevronRight size={18} style={{ color: "#94A3B8" }} />
            </button>
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: colors.rose,
              fontWeight: "700",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            National Emergency Number
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MdPhone size={16} /> 112
            </span>
          </div>
        </div>

        {/* Privacy */}
        <div
          style={{
            background: colors.white,
            border: "1.5px solid #E2E8F0",
            borderRadius: "20px",
            padding: "28px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
            <MdLock size={22} style={{ color: colors.teal }} />
            <h3 style={{ fontWeight: "700", fontSize: "16px", margin: 0 }}>Safety & Privacy</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {privacyPoints.map((point) => (
              <div key={point} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                <MdCheckCircle
                  size={18}
                  style={{ color: colors.teal, flexShrink: 0, marginTop: "2px" }}
                />
                <span style={{ fontSize: "14px", color: colors.slate, lineHeight: "1.5" }}>
                  {point}
                </span>
              </div>
            ))}
          </div>
          <NavLink
            to="/privacy"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              marginTop: "20px",
              color: colors.teal,
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "14px",
            }}
          >
            Read our Privacy Policy <MdChevronRight size={18} />
          </NavLink>
        </div>
      </section>

      {/* ── TRUSTED STATS ── */}
      <section style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 32px 80px" }}>
        <div
          style={{
            background: colors.white,
            border: "1.5px solid #E2E8F0",
            borderRadius: "22px",
            padding: "40px 36px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ fontWeight: "800", fontSize: "20px", margin: "0 0 4px" }}>
            Trusted by Thousands
          </h3>
          <p style={{ color: colors.slate, fontSize: "14px", margin: "0 0 32px" }}>
            Building a safe and trusted ride-sharing community every day.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "24px",
            }}
          >
            {stats.map(({ Icon, value, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: colors.tealLight,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={22} style={{ color: colors.teal }} />
                </div>
                <div>
                  <p style={{ fontWeight: "800", fontSize: "20px", margin: 0, color: colors.navy }}>
                    {value}
                  </p>
                  <p style={{ fontSize: "12px", color: colors.slate, margin: 0 }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESPONSIVE OVERRIDES ── */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}