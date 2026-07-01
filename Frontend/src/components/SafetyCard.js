import { NavLink, useNavigate } from "react-router-dom";
import {
  MdVerifiedUser,
  MdDirectionsCar,
  MdPeople,
  MdLocationOn,
  MdPhone,
  MdStar,
  MdLock,
  MdCheckCircle,
  MdChevronRight,
  MdHeadsetMic,
  MdWarningAmber,
  MdSecurity,
  MdGppGood,
} from "react-icons/md";
import LandingNav from "./landing/LandingNav";
import Footer from "./landing/Footer";

const C = {
  navy: "#061B4D",
  teal: "#14B8A6",
  tealBg: "#E6F9F7",
  slate: "#42526E",
  white: "#FFFFFF",
  rose: "#EF4444",
  roseBg: "#FFF8F8",
  border: "#E2E8F0",
  shadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const safetyFeatures = [
  {
    Icon: MdVerifiedUser,
    title: "Verified Drivers",
    desc: "Every driver is verified with ID proof, phone number, background checks and more.",
  },
  {
    Icon: MdDirectionsCar,
    title: "Verified Vehicles (Drivers)",
    desc: "All vehicles offered by drivers are verified for RC, Insurance, PUC and roadworthiness.",
  },
  {
    Icon: MdPeople,
    title: "Verified Passengers",
    desc: "Passengers who offer rides also go through verification to ensure a trusted community.",
  },
  {
    Icon: MdLocationOn,
    title: "Live Ride Tracking",
    desc: "Share your live location with family and friends during your ride.",
  },
  {
    Icon: MdGppGood,
    title: "SOS Emergency",
    desc: "One-tap SOS button alerts our team and your emergency contacts instantly.",
  },
  {
    Icon: MdPhone,
    title: "Emergency Contacts",
    desc: "Add your trusted contacts. They'll be notified in case of any emergency.",
  },
  {
    Icon: MdStar,
    title: "Ratings & Reviews",
    desc: "Riders and drivers are rated after every ride to maintain a trusted community.",
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
  { Icon: MdSecurity, value: "10M+", label: "Safe Rides Completed" },
  { Icon: MdPeople,   value: "500K+", label: "Verified Drivers" },
  { Icon: MdDirectionsCar, value: "300K+", label: "Verified Vehicles" },
  { Icon: MdPeople,   value: "250K+", label: "Verified Passengers" },
  { Icon: MdStar,     value: "4.8/5", label: "Average Rating" },
];

/* ── reusable badge ── */
function IconBadge({ Icon, size = 24, bg = C.tealBg, color = C.teal, badgeSize = 48 }) {
  return (
    <div style={{
      width: badgeSize, height: badgeSize, borderRadius: "50%",
      background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <Icon size={size} style={{ color }} />
    </div>
  );
}

/* ── tick row ── */
function Tick({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
      <MdCheckCircle size={18} style={{ color: C.teal, flexShrink: 0, marginTop: 2 }} />
      <span style={{ fontSize: 14, color: C.slate, lineHeight: "1.55" }}>{text}</span>
    </div>
  );
}

/* ── card wrapper ── */
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.white, border: `1.5px solid ${C.border}`,
      borderRadius: 20, padding: 28, boxShadow: C.shadow, ...style,
    }}>
      {children}
    </div>
  );
}

export default function Safety() {
  const navigate = useNavigate();

  return (
    <>
      <LandingNav />

      {/* ─── HERO ─── */}
      <section style={{
        background: `linear-gradient(135deg, ${C.tealBg} 0%, #F0FDF9 60%, #FFFFFF 100%)`,
        paddingTop: 130, paddingBottom: 64,
      }}>
        <div style={{
          maxWidth: 1300, margin: "0 auto", padding: "0 32px",
          display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48,
        }}>
          {/* left */}
          <div style={{ flex: "1 1 340px" }}>
            <h1 style={{
              fontSize: "clamp(2.2rem,5vw,3.6rem)", fontWeight: 800,
              lineHeight: 1.1, margin: 0, color: C.navy,
            }}>
              Safe Rides.<br />
              <span style={{ color: C.teal }}>Every Time.</span>
            </h1>
            <p style={{ marginTop: 18, fontSize: 16, lineHeight: 1.75, color: C.slate, maxWidth: 420 }}>
              At Hopin, your safety is at the heart of everything we do.
              Whether you're riding with us or offering a ride, we make sure
              every journey is safe and secure.
            </p>
            <div style={{
              marginTop: 28, display: "inline-flex", alignItems: "center", gap: 10,
              background: C.tealBg, border: `1.5px solid ${C.teal}`,
              borderRadius: 12, padding: "12px 20px",
              color: "#0D9488", fontWeight: 600, fontSize: 14,
            }}>
              <MdSecurity size={20} />
              All Drivers. All Vehicles. Verified.
            </div>
          </div>

          {/* right – shield graphic */}
          <div style={{
            flex: "1 1 280px", display: "flex", alignItems: "center",
            justifyContent: "center", position: "relative", height: 300,
          }}>
            <MdSecurity size={240} style={{ color: C.teal, opacity: 0.15, position: "absolute" }} />
            <MdSecurity size={180} style={{ color: C.teal, opacity: 0.45, position: "absolute" }} />
            <MdCheckCircle size={68} style={{ color: C.teal, position: "relative", zIndex: 2 }} />

            {[
              { Icon: MdDirectionsCar, top: "8%",  left: "4%" },
              { Icon: MdVerifiedUser,  top: "2%",  left: "42%" },
              { Icon: MdLocationOn,    top: "48%", right: "2%" },
              { Icon: MdPeople,        bottom: "8%", right: "8%" },
            ].map(({ Icon, ...pos }, i) => (
              <div key={i} style={{
                position: "absolute", ...pos, width: 46, height: 46,
                borderRadius: "50%", background: C.white,
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3,
              }}>
                <Icon size={22} style={{ color: C.teal }} />
              </div>
            ))}
            {/* SOS badge as text */}
            <div style={{
              position: "absolute", top: "8%", right: "4%",
              width: 46, height: 46, borderRadius: "50%",
              background: C.white, boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3,
            }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: C.rose }}>SOS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW WE KEEP YOU SAFE ─── */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "64px 32px" }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", flexWrap: "wrap", gap: 8, marginBottom: 36,
        }}>
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800, margin: 0 }}>
            How We Keep You Safe
          </h2>
          <p style={{ color: C.slate, fontSize: 14, margin: 0 }}>
            Advanced safety. Verified trust. Peace of mind.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
          gap: 18,
        }}>
          {safetyFeatures.map(({ Icon, title, desc }) => (
            <div
              key={title}
              style={{
                background: C.white, border: `1.5px solid ${C.border}`,
                borderRadius: 18, padding: "22px 18px", boxShadow: C.shadow,
                transition: "box-shadow .2s, transform .2s", cursor: "default",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(20,184,166,.15)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = C.shadow;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <IconBadge Icon={Icon} />
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: "14px 0 8px" }}>{title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: C.slate, margin: 0 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── THREE CARDS ─── */}
      <section style={{
        maxWidth: 1300, margin: "0 auto", padding: "0 32px 64px",
        display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 24,
      }}>

        {/* Safety Tips */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <MdSecurity size={22} style={{ color: C.teal }} />
            <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Safety Tips for Riders</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {safetyTips.map(t => <Tick key={t} text={t} />)}
          </div>
          <div
            onClick={() => navigate("/safety-tips")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              marginTop: 18, color: C.teal, fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            View all safety tips <MdChevronRight size={18} />
          </div>
        </Card>

        {/* Emergency */}
        <Card style={{ background: C.roseBg, borderColor: "#FECACA" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <MdWarningAmber size={22} style={{ color: C.rose }} />
            <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>In Case of Emergency</h3>
          </div>
          <p style={{ fontSize: 13, color: C.slate, marginBottom: 18, marginTop: 4 }}>
            We're here to help you, 24/7.
          </p>

          {[
            {
              label: "Press SOS Button in the app",
              sub: "Instant help and alerts",
              bg: C.rose,
              dot: <span style={{ fontSize: 9, fontWeight: 800, color: "#fff" }}>SOS</span>,
            },
            {
              label: "Contact Support",
              sub: "Our support team is always available",
              bg: C.navy,
              dot: <MdHeadsetMic size={16} style={{ color: "#fff" }} />,
            },
          ].map(({ label, sub, bg, dot }) => (
            <button
              key={label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                width: "100%", background: C.white, border: `1.5px solid ${C.border}`,
                borderRadius: 14, padding: "13px 15px", marginBottom: 12,
                cursor: "pointer", textAlign: "left",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", background: bg, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {dot}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: C.navy }}>{label}</p>
                  <p style={{ margin: 0, fontSize: 12, color: C.slate }}>{sub}</p>
                </div>
              </div>
              <MdChevronRight size={18} style={{ color: "#94A3B8" }} />
            </button>
          ))}

          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            color: C.rose, fontWeight: 700, fontSize: 14, marginTop: 4,
          }}>
            National Emergency Number
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <MdPhone size={16} /> 112
            </span>
          </div>
        </Card>

        {/* Privacy */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
            <MdLock size={22} style={{ color: C.teal }} />
            <h3 style={{ fontWeight: 700, fontSize: 16, margin: 0 }}>Safety & Privacy</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {privacyPoints.map(p => <Tick key={p} text={p} />)}
          </div>
          <div
            onClick={() => navigate("/privacy")}
            style={{
              display: "inline-flex", alignItems: "center", gap: 4,
              marginTop: 18, color: C.teal, fontWeight: 600, fontSize: 14, cursor: "pointer",
            }}
          >
            Read our Privacy Policy <MdChevronRight size={18} />
          </div>
        </Card>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "0 32px 80px" }}>
        <Card>
          <h3 style={{ fontWeight: 800, fontSize: 20, margin: "0 0 4px" }}>Trusted by Thousands</h3>
          <p style={{ color: C.slate, fontSize: 14, margin: "0 0 28px" }}>
            Building a safe and trusted ride-sharing community every day.
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))",
            gap: 24,
          }}>
            {stats.map(({ Icon, value, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <IconBadge Icon={Icon} badgeSize={44} />
                <div>
                  <p style={{ fontWeight: 800, fontSize: 20, margin: 0, color: C.navy }}>{value}</p>
                  <p style={{ fontSize: 12, color: C.slate, margin: 0 }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Footer />
    </>
  );
}