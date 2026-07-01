import { useNavigate } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineClock,
  HiOutlineEye,
  HiArrowLeft,
  HiOutlineMail,
} from "react-icons/hi";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";
import {
  BsWallet2,
  BsCarFront,
  BsLeaf,
  BsShieldCheck,
  BsClockHistory,
} from "react-icons/bs";
import LandingNav from "../components/landing/LandingNav";

const NAVY = "#061B4D";
const TEAL = "#14B8A6";
const GRAY = "#42526E";
const BORDER = "#E5E9F0";
const BG = "#F8FAFC";

const tableOfContents = [
  "What is Hoppin?",
  "Why Choose Shared Rides?",
  "Benefits for Passengers",
  "Benefits for Drivers",
  "Safety Comes First",
  "Why Hoppin Stands Out",
  "The Future of Smarter Travel",
  "Ready to Ride Smarter?",
];

const benefits = [
  { icon: BsWallet2, text: "Save money by splitting travel costs." },
  { icon: BsCarFront, text: "Reduce the number of vehicles on the road." },
  { icon: BsLeaf, text: "Help lower fuel consumption and carbon emissions." },
  { icon: BsShieldCheck, text: "Travel with verified users for a trusted experience." },
  { icon: BsClockHistory, text: "Make everyday commuting more efficient." },
];

const relatedArticles = [
  { title: "5 Safety Tips Before Sharing a Ride", date: "May 10, 2025", read: "4 min read" },
  { title: "How Hoppin Makes Daily Commuting Affordable", date: "May 8, 2025", read: "5 min read" },
  { title: "Top Benefits of Carpooling for Students", date: "May 5, 2025", read: "4 min read" },
  { title: "Travel Green: How Shared Rides Help the Planet", date: "Apr 30, 2025", read: "3 min read" },
];

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 900 360"
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label="Illustration of two riders about to share a Hoppin cab"
    >
      <ellipse cx="450" cy="330" rx="420" ry="18" fill="#E8F5F2" />
      <circle cx="120" cy="90" r="60" fill="#E8F5F2" />
      <circle cx="800" cy="60" r="40" fill="#E8F5F2" />
      <g opacity="0.6">
        <path d="M60 300 L60 180 L90 180 L90 140 L120 140 L120 300 Z" fill="#CFE9E3" />
        <path d="M780 300 L780 160 L815 160 L815 110 L850 110 L850 300 Z" fill="#CFE9E3" />
      </g>
      {/* car body */}
      <g transform="translate(150,150)">
        <rect x="0" y="60" width="430" height="90" rx="18" fill={TEAL} />
        <path d="M40 60 C60 15 140 0 220 0 C290 0 330 20 355 60 Z" fill={TEAL} />
        <path d="M75 55 C90 25 145 12 210 12 C265 12 295 28 315 55 Z" fill="#0D9488" opacity="0.35" />
        <line x1="215" y1="12" x2="215" y2="55" stroke="#0D9488" strokeWidth="4" opacity="0.35" />
        <rect x="10" y="145" width="410" height="14" rx="6" fill="#0D9488" />
        <circle cx="90" cy="155" r="34" fill="#0F172A" />
        <circle cx="90" cy="155" r="14" fill="#CBD5E1" />
        <circle cx="350" cy="155" r="34" fill="#0F172A" />
        <circle cx="350" cy="155" r="14" fill="#CBD5E1" />
        <rect x="30" y="95" width="90" height="26" rx="6" fill="#FFFFFF" />
        <text x="75" y="113" fontSize="13" fontWeight="700" fill={NAVY} textAnchor="middle">HOPPIN</text>
        <circle cx="180" cy="70" r="10" fill="#FDE68A" />
        <circle cx="240" cy="70" r="10" fill="#FDE68A" />
        <circle cx="300" cy="70" r="10" fill="#FDE68A" />
      </g>
      {/* passenger 1 */}
      <g transform="translate(610,60)">
        <circle cx="45" cy="35" r="28" fill="#F4C7A1" />
        <path d="M20 20 C20 -5 70 -5 70 20 L70 35 L20 35 Z" fill="#1F2937" />
        <rect x="10" y="60" width="70" height="120" rx="24" fill={TEAL} />
        <rect x="0" y="70" width="26" height="60" rx="12" fill={TEAL} />
        <rect x="0" y="120" width="30" height="55" rx="10" fill="#0F172A" />
      </g>
      {/* passenger 2 */}
      <g transform="translate(700,90)">
        <circle cx="40" cy="32" r="26" fill="#8D5A3B" />
        <path d="M14 25 C14 -8 66 -8 66 25 C66 40 60 30 40 30 C20 30 14 40 14 25 Z" fill="#1F2937" />
        <rect x="6" y="55" width="66" height="110" rx="22" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
        <rect x="0" y="65" width="24" height="55" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      </g>
    </svg>
  );
}

function SidebarCard({ title, children }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        border: `1px solid ${BORDER}`,
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      <h3 style={{ margin: "0 0 16px", fontSize: "18px", fontWeight: 700, color: NAVY }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function BlogPost() {
  const navigate = useNavigate();

  return (
    <div style={{ background: BG, minHeight: "100vh" }}>
      <style>{`
        .blog-header-spacer { height: 150px; }
        .blog-shell {
          max-width: 1360px;
          margin: 0 auto;
          padding: 0 48px 64px;
          display: grid;
          grid-template-columns: minmax(0, 1fr) 340px;
          gap: 32px;
          align-items: start;
        }
        .blog-sidebar { position: sticky; top: 24px; display: flex; flex-direction: column; gap: 24px; }
        .toc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .toc-list li { display: flex; align-items: center; gap: 10px; }
        .toc-dot { width: 6px; height: 6px; border-radius: 50%; background: ${TEAL}; flex: none; }
        .toc-link { background: none; border: none; padding: 0; font-size: 14.5px; color: ${NAVY}; font-weight: 600; cursor: pointer; text-align: left; }
        .related-item { display: flex; gap: 12px; align-items: flex-start; cursor: pointer; }
        .related-thumb { width: 64px; height: 56px; border-radius: 10px; background: linear-gradient(135deg, ${TEAL}, #0D9488); flex: none; }
        .related-title { font-size: 14px; font-weight: 700; color: ${NAVY}; line-height: 1.3; margin: 0 0 4px; }
        .related-meta { font-size: 12.5px; color: #94A3B8; margin: 0; }
        .benefit-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 20px; }
        .benefit-item { text-align: center; }
        .share-btn { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 13px; }
        .newsletter-input { width: 100%; box-sizing: border-box; padding: 10px 12px; border-radius: 10px; border: 1px solid ${BORDER}; font-size: 14px; margin-bottom: 10px; }
        .subscribe-btn { width: 100%; background: ${TEAL}; color: #fff; border: none; border-radius: 10px; padding: 11px; font-weight: 700; cursor: pointer; font-size: 14px; }

        @media (max-width: 1100px) {
          .blog-shell { grid-template-columns: 1fr; }
          .blog-sidebar { position: static; }
        }
        @media (max-width: 900px) {
          .blog-header-spacer { height: 190px; }
        }
        @media (max-width: 640px) {
          .blog-shell { padding: 0 20px 48px; }
          .benefit-grid { grid-template-columns: repeat(2, 1fr); }
          .blog-title { font-size: 30px !important; }
        }
      `}</style>

      <LandingNav />
      <div className="blog-header-spacer" />

      <div className="blog-shell">
        {/* MAIN CONTENT */}
        <div>
          <button
            onClick={() => navigate("/")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: TEAL,
              fontWeight: 700,
              fontSize: "14px",
              cursor: "pointer",
              padding: 0,
              marginBottom: "20px",
            }}
          >
            <HiArrowLeft /> Back to Blog
          </button>

          <span
            style={{
              display: "inline-block",
              background: "#E8F5F2",
              color: TEAL,
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.05em",
              padding: "6px 12px",
              borderRadius: "999px",
              marginBottom: "16px",
            }}
          >
            TRAVEL TIPS
          </span>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <h1
              className="blog-title"
              style={{
                fontSize: "40px",
                fontWeight: 800,
                color: NAVY,
                lineHeight: 1.15,
                margin: 0,
                maxWidth: "620px",
              }}
            >
              Why Shared Rides Are the Smarter Way to Travel
            </h1>

            <div>
              <div style={{ fontSize: "13px", color: GRAY, fontWeight: 600, marginBottom: "8px" }}>
                Share:
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <span className="share-btn" style={{ background: "#3B5998" }}>
                  <FaFacebookF />
                </span>
                <span className="share-btn" style={{ background: "#1DA1F2" }}>
                  <FaTwitter />
                </span>
                <span className="share-btn" style={{ background: "#25D366" }}>
                  <FaWhatsapp />
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
              color: GRAY,
              fontSize: "14px",
              margin: "18px 0 28px",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HiOutlineCalendar /> May 15, 2025
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HiOutlineClock /> 6 min read
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <HiOutlineEye /> 1.2K views
            </span>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg,#F0FAF8,#E8F5F2)",
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "28px",
            }}
          >
            <HeroIllustration />
          </div>

          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#334155" }}>
            Travel today is about more than simply getting from one place to another.
            People want transportation that is affordable, convenient, reliable, and
            environmentally friendly. That's exactly what Hoppin is designed to deliver.
          </p>
          <p style={{ fontSize: "16px", lineHeight: 1.8, color: "#334155" }}>
            Hoppin brings passengers and drivers together through a simple cab-sharing
            platform, making every journey more efficient and rewarding for everyone
            involved.
          </p>

          <hr style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "28px 0" }} />

          <section id="what-is-hoppin" style={{ display: "flex", gap: "16px", marginBottom: "28px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "#E8F5F2",
                color: TEAL,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: "none",
                fontSize: "20px",
              }}
            >
              <FaUsers />
            </div>
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: NAVY, margin: "6px 0 12px" }}>
                What is Hoppin?
              </h2>
              <p style={{ fontSize: "15.5px", lineHeight: 1.8, color: "#334155", margin: "0 0 12px" }}>
                Hoppin is a ride-sharing platform that connects people who are traveling
                in the same direction and helps them share rides. Passengers can search
                for a ride, or offer a ride themselves so other passengers can join them
                on the way.
              </p>
              <p style={{ fontSize: "15.5px", lineHeight: 1.8, color: "#334155", margin: "0 0 12px" }}>
                Instead of booking an entire cab for yourself, you can share your journey
                with others heading to a similar destination. This helps passengers save
                money while allowing drivers to make better use of available seats and
                earn extra income from trips they are already taking.
              </p>
              <p style={{ fontSize: "15.5px", lineHeight: 1.8, color: "#334155", margin: 0 }}>
                Whether you're commuting to work, heading to college, traveling across
                the city, or planning a weekend trip, Hoppin makes shared travel simple,
                affordable, and convenient.
              </p>
            </div>
          </section>

          <hr style={{ border: "none", borderTop: `1px solid ${BORDER}`, margin: "28px 0" }} />

          <section id="why-choose-shared-rides">
            <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "12px",
                  background: "#E8F5F2",
                  color: TEAL,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flex: "none",
                  fontSize: "20px",
                }}
              >
                <FaShieldAlt />
              </div>
              <h2 style={{ fontSize: "22px", fontWeight: 800, color: NAVY, margin: "6px 0" }}>
                Why Choose Shared Rides?
              </h2>
            </div>

            <div className="benefit-grid">
              {benefits.map(({ icon: Icon, text }, i) => (
                <div className="benefit-item" key={i}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: "#E8F5F2",
                      color: TEAL,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 12px",
                      fontSize: "20px",
                    }}
                  >
                    <Icon />
                  </div>
                  <p style={{ fontSize: "13.5px", color: "#334155", lineHeight: 1.5, margin: 0 }}>
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* SIDEBAR */}
        <aside className="blog-sidebar">
          <SidebarCard title="About the Author">
            <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: TEAL,
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  flex: "none",
                }}
              >
                H
              </div>
              <div>
                <div style={{ fontWeight: 700, color: NAVY, marginBottom: "4px" }}>
                  Hoppin Team
                </div>
                <div style={{ fontSize: "13.5px", color: GRAY, lineHeight: 1.5 }}>
                  We're passionate about making travel affordable, safe and sustainable
                  for everyone.
                </div>
              </div>
            </div>
          </SidebarCard>

          <SidebarCard title="Table of Contents">
            <ul className="toc-list">
              {tableOfContents.map((item) => (
                <li key={item}>
                  <span className="toc-dot" />
                  <button
                    className="toc-link"
                    onClick={() => {
                      const el = document.getElementById(
                        item.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                      );
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </SidebarCard>

          <SidebarCard title="Related Articles">
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {relatedArticles.map((a) => (
                <div className="related-item" key={a.title}>
                  <div className="related-thumb" />
                  <div>
                    <p className="related-title">{a.title}</p>
                    <p className="related-meta">
                      {a.date} • {a.read}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate("/blog")}
              style={{
                marginTop: "16px",
                background: "none",
                border: "none",
                color: TEAL,
                fontWeight: 700,
                fontSize: "13.5px",
                cursor: "pointer",
                padding: 0,
              }}
            >
              View All Articles →
            </button>
          </SidebarCard>

          <div
            style={{
              background: "#E8F5F2",
              border: `1px solid ${BORDER}`,
              borderRadius: "16px",
              padding: "24px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: TEAL,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "12px",
                fontSize: "18px",
              }}
            >
              <HiOutlineMail />
            </div>
            <div style={{ fontWeight: 700, color: NAVY, marginBottom: "6px" }}>
              Stay Updated
            </div>
            <div style={{ fontSize: "13.5px", color: GRAY, marginBottom: "14px", lineHeight: 1.5 }}>
              Subscribe to our newsletter and never miss travel tips and updates.
            </div>
            <input className="newsletter-input" type="email" placeholder="Enter your email" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
        </aside>
      </div>
    </div>
  );
}