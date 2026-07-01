import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiList,
  FiCreditCard,
  FiMapPin,
  FiEdit3,
  FiSliders,
  FiSend,
  FiUsers,
  FiUser,
  FiFileText,
  FiCalendar,
  FiCheckCircle,
  FiMessageCircle,
  FiFlag,
  FiStar,
  FiTruck,
  FiShield,
} from "react-icons/fi";
import { GiCarSeat, GiSteeringWheel, GiWallet } from "react-icons/gi";
import LandingNav from "../components/LandingNav";

// ---------- Static content ----------

const findRideSteps = [
  { icon: FiSearch, label: "Search Route" },
  { icon: FiList, label: "Compare Rides" },
  { icon: GiCarSeat, label: "Book Your Seat" },
  { icon: FiCreditCard, label: "Secure Payment" },
  { icon: FiMapPin, label: "Travel Together" },
];

const shareRideSteps = [
  { icon: FiEdit3, label: "Enter Trip Details" },
  { icon: FiSliders, label: "Set Ride Preferences" },
  { icon: FiTruck, label: "Add Vehicle Details" },
  { icon: FiSend, label: "Publish Ride" },
  { icon: FiUsers, label: "Accept Passengers" },
];

const becomeDriverSteps = [
  { icon: FiUser, label: "Register as Driver" },
  { icon: FiFileText, label: "Verify Documents" },
  { icon: FiTruck, label: "Add Vehicle" },
  { icon: FiCalendar, label: "Accept Bookings" },
  { icon: GiWallet, label: "Start Earning" },
];

const rideJourneySteps = [
  { icon: FiTruck, label: "A user publishes a ride" },
  { icon: FiSearch, label: "Passengers search the route" },
  { icon: GiCarSeat, label: "Seat booking" },
  { icon: FiCheckCircle, label: "Booking confirmation" },
  { icon: FiCreditCard, label: "Secure payment" },
  { icon: FiMessageCircle, label: "In-app chat" },
  { icon: FiMapPin, label: "Live ride tracking" },
  { icon: FiFlag, label: "Destination reached" },
  { icon: FiStar, label: "Ratings & reviews" },
];

// ---------- Small building blocks ----------

function MiniStep({ icon: Icon, label, mobile }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "8px",
        width: mobile ? "70px" : "82px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#14B8A6",
          fontSize: "18px",
          boxShadow: "0 2px 6px rgba(6,27,77,0.06)",
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <span
        style={{
          fontSize: "13px",
          fontWeight: 600,
          color: "#334155",
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function StepConnector({ mobile }) {
  return (
    <div
      style={{
        flex: mobile ? "0 0 14px" : 1,
        minWidth: mobile ? "14px" : "20px",
        height: 0,
        borderTop: "2px dashed #CBD5E1",
        marginTop: "21px",
        alignSelf: "flex-start",
      }}
    />
  );
}

function HowItWorksCard({
  badgeIcon: BadgeIcon,
  badgeColor,
  badgeBg,
  title,
  titleColor,
  description,
  steps,
  ctaLabel,
  ctaColor,
  ctaTo,
  mobile,
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        flex: "1 1 300px",
        minWidth: mobile ? "100%" : "300px",
        background: "#F8FBFB",
        border: "1px solid #E7EEF0",
        borderRadius: "18px",
        padding: mobile ? "24px 20px" : "28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "14px",
          background: badgeBg,
          color: badgeColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
        }}
      >
        <BadgeIcon />
      </div>

      <div>
        <h3
          style={{
            margin: 0,
            fontSize: "20px",
            fontWeight: 800,
            color: titleColor,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            margin: "8px 0 0",
            fontSize: "14.5px",
            color: "#5B6B84",
            lineHeight: 1.5,
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: mobile ? "10px" : "6px",
          flexWrap: mobile ? "wrap" : "nowrap",
          rowGap: "16px",
        }}
      >
        {steps.map((s) => (
          <MiniStep key={s.label} icon={s.icon} label={s.label} mobile={mobile} />
        ))}
      </div>

      <button
        onClick={() => navigate(ctaTo)}
        style={{
          marginTop: "4px",
          background: ctaColor,
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          padding: "13px 20px",
          fontSize: "15px",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

function WhoCard({ icon: Icon, iconBg, title, titleColor, description, mobile }) {
  return (
    <div
      style={{
        flex: "1 1 320px",
        minWidth: mobile ? "100%" : "320px",
        background: "#FFFFFF",
        border: "1px solid #E7EEF0",
        borderRadius: "16px",
        padding: mobile ? "20px" : "22px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: mobile ? "72px" : "96px",
          height: mobile ? "72px" : "96px",
          borderRadius: "16px",
          background: iconBg,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: mobile ? "30px" : "38px",
          flexShrink: 0,
        }}
      >
        <Icon />
      </div>
      <div>
        <h4 style={{ margin: 0, fontSize: "17px", fontWeight: 800, color: titleColor }}>
          {title}
        </h4>
        <p style={{ margin: "6px 0 0", fontSize: "14px", color: "#5B6B84", lineHeight: 1.5 }}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ---------- Hero illustration ----------

function HeroIllustration({ mobile }) {
  return (
    <svg
      viewBox="0 0 520 300"
      style={{ width: "100%", maxWidth: mobile ? "360px" : "520px", height: "auto" }}
    >
      <ellipse cx="260" cy="255" rx="230" ry="30" fill="#EAF6F3" />
      {/* buildings */}
      <rect x="20" y="120" width="46" height="130" rx="6" fill="#E3F2EF" />
      <rect x="440" y="90" width="56" height="160" rx="6" fill="#E3F2EF" />
      {/* car body */}
      <rect x="230" y="175" width="220" height="60" rx="18" fill="#14B8A6" />
      <rect x="255" y="150" width="150" height="45" rx="14" fill="#0EA79A" />
      <circle cx="270" cy="238" r="18" fill="#061B4D" />
      <circle cx="415" cy="238" r="18" fill="#061B4D" />
      <circle cx="270" cy="238" r="7" fill="#CBD5E1" />
      <circle cx="415" cy="238" r="7" fill="#CBD5E1" />
      {/* people */}
      <circle cx="95" cy="140" r="20" fill="#0F766E" />
      <rect x="72" y="160" width="46" height="70" rx="18" fill="#14B8A6" />
      <circle cx="160" cy="130" r="18" fill="#F59E0B" />
      <rect x="140" y="148" width="40" height="65" rx="16" fill="#FBBF24" />
      <circle cx="360" cy="115" r="20" fill="#0F172A" />
      <rect x="337" y="135" width="46" height="72" rx="18" fill="#2563EB" />
      {/* location pins */}
      <path d="M180 60 c0 16 -16 26 -16 44 c0 -18 -16 -28 -16 -44 a16 16 0 1 1 32 0z" fill="#14B8A6" />
      <circle cx="164" cy="60" r="6" fill="#fff" />
      <path d="M400 40 c0 16 -16 26 -16 44 c0 -18 -16 -28 -16 -44 a16 16 0 1 1 32 0z" fill="#061B4D" />
      <circle cx="384" cy="40" r="6" fill="#fff" />
      {/* connecting dashed path */}
      <path
        d="M100 120 C 180 40, 320 20, 380 60"
        fill="none"
        stroke="#14B8A6"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.6"
      />
    </svg>
  );
}

// ---------- Page ----------

export default function HowItWorks() {
  const [mobile, setMobile] = useState(window.innerWidth <= 900);
  const [tablet, setTablet] = useState(
    window.innerWidth <= 1180 && window.innerWidth > 900
  );
  const navigate = useNavigate();

  useEffect(() => {
    const onResize = () => {
      setMobile(window.innerWidth <= 900);
      setTablet(window.innerWidth <= 1180 && window.innerWidth > 900);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", position: "relative" }}>
      <LandingNav />

      {/* HERO */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: mobile ? "150px 24px 40px" : "170px 48px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
          flexDirection: mobile ? "column" : "row",
          textAlign: mobile ? "center" : "left",
        }}
      >
        <div style={{ flex: "1 1 420px", maxWidth: "560px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: mobile ? "34px" : "44px",
              fontWeight: 800,
              color: "#061B4D",
              lineHeight: 1.15,
              letterSpacing: "-1px",
            }}
          >
            How <span style={{ color: "#14B8A6" }}>HopIn</span> Works
          </h1>
          <p
            style={{
              marginTop: "16px",
              fontSize: "17px",
              color: "#5B6B84",
              lineHeight: 1.6,
            }}
          >
            Simple steps to connect, travel and save together.
          </p>
        </div>

        <div style={{ flex: "1 1 420px", display: "flex", justifyContent: "center" }}>
          <HeroIllustration mobile={mobile} />
        </div>
      </section>

      {/* THREE MAIN CARDS */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: mobile ? "0 20px" : "0 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "22px",
            flexWrap: "wrap",
          }}
        >
          <HowItWorksCard
            badgeIcon={FiSearch}
            badgeColor="#14B8A6"
            badgeBg="#DFF7F3"
            title="1. Find a Ride"
            titleColor="#0F766E"
            description="Book a seat with trusted travelers."
            steps={findRideSteps}
            ctaLabel="Find a Ride"
            ctaColor="#0F9D8B"
            ctaTo="/search"
            mobile={mobile}
          />
          <HowItWorksCard
            badgeIcon={FiTruck}
            badgeColor="#16A34A"
            badgeBg="#DCFCE7"
            title="2. Share Your Ride"
            titleColor="#0F766E"
            description="Have empty seats? Offer your journey and split travel costs."
            steps={shareRideSteps}
            ctaLabel="Offer a Ride"
            ctaColor="#22C55E"
            ctaTo="/offer-ride"
            mobile={mobile}
          />
          <HowItWorksCard
            badgeIcon={GiSteeringWheel}
            badgeColor="#2563EB"
            badgeBg="#DBEAFE"
            title="3. Become a Driver"
            titleColor="#061B4D"
            description="Drive regularly and earn with HopIn."
            steps={becomeDriverSteps}
            ctaLabel="Become a Driver"
            ctaColor="#2563EB"
            ctaTo="/driver-registration"
            mobile={mobile}
          />
        </div>
      </section>

      {/* HOW A RIDE HAPPENS */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "40px auto 0",
          padding: mobile ? "24px 20px" : "30px 48px",
        }}
      >
        <div
          style={{
            background: "#F8FBFB",
            border: "1px solid #E7EEF0",
            borderRadius: "18px",
            padding: mobile ? "24px 18px" : "28px 34px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 800, color: "#061B4D" }}>
            How a Ride Happens
          </h3>

          <div
            style={{
              marginTop: "26px",
              display: "flex",
              alignItems: "flex-start",
              overflowX: mobile || tablet ? "auto" : "visible",
              gap: mobile ? "6px" : "4px",
              paddingBottom: mobile || tablet ? "8px" : 0,
            }}
          >
            {rideJourneySteps.map((s, i) => (
              <div key={s.label} style={{ display: "flex", alignItems: "flex-start" }}>
                <MiniStep icon={s.icon} label={s.label} mobile={mobile} />
                {i < rideJourneySteps.length - 1 && <StepConnector mobile={mobile} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO CAN OFFER A RIDE */}
      <section
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: mobile ? "24px 20px 60px" : "30px 48px 80px",
        }}
      >
        <div
          style={{
            background: "#F8FBFB",
            border: "1px solid #E7EEF0",
            borderRadius: "18px",
            padding: mobile ? "24px 18px" : "28px 34px",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "19px", fontWeight: 800, color: "#061B4D" }}>
            Who Can Offer a Ride?
          </h3>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <WhoCard
              icon={FiUsers}
              iconBg="linear-gradient(135deg,#14B8A6,#0F766E)"
              title="Passenger Ride Sharing"
              titleColor="#0F766E"
              description="Already travelling to your destination? Publish your journey and share empty seats with other verified passengers."
              mobile={mobile}
            />
            <WhoCard
              icon={FiShield}
              iconBg="linear-gradient(135deg,#2563EB,#061B4D)"
              title="Professional Driver"
              titleColor="#061B4D"
              description="Looking to earn regularly? Register as a verified HopIn Driver and receive ride bookings."
              mobile={mobile}
            />
          </div>
        </div>
      </section>
    </div>
  );
}