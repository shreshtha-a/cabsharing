import heroVideo from "../../assets/videos/hero-video.mp4";
import hopinLogo from "../../assets/HopinLogo.png";
import RegistrationForm from "./RegistrationForm";
import FeatureBar from "./FeatureBar";

import {
  FaWallet,
  FaShieldAlt,
  FaClock,
  FaHeadset,
} from "react-icons/fa";

export default function DriverHero() {
  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
        
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          padding: "clamp(20px,3vw,45px)",
          display: "flex",
          flexDirection: "column",
          justifyContent:"flex-start"
        }}
      >
        {/* Logo */}
        <img
          src={hopinLogo}
          alt="Hopin"
          style={{
            width: "clamp(140px,11vw,180px)",
            mixBlendMode: "multiply",
          }}
        />

        <p
          style={{
            color: "#64748B",
            marginTop: "5px",
            marginBottom: "0px",
            fontSize: "clamp(14px,1.2vw,18px)",
          }}
        >
             Together. Every Mile.
        </p>

        {/* Heading */}
        <h1
          style={{
            marginTop: "25px",
            marginBottom: "0px",
            fontSize: "clamp(36px,4vw,52px)",
            lineHeight: 1,
            color: "#061B4D",
            fontWeight: "800",
          }}
        >
          Better Rides
          <br />
          When{" "}
          <span
            style={{
              color: "#14B8A6",
              fontSize: "45px",
            }}
          >
            Shared
          </span>
        </h1>

        <p
          style={{
            marginTop: "5px",
            marginBottom: "0px",
            color: "#475569",
            fontSize: "20px",
            lineHeight: 1.5,
            maxWidth: "550px",
          }}
        >
          Drive together, earn more,
          <br />
          and build a trusted community.
        </p>

        {/* Features */}
        <div
          style={{
            width: "min(520px,45vw)",
            display: "grid",
            gridTemplateColumns:"1fr 1fr",
            gap: "0px",
            marginTop: "35px",
            background: "rgba(255, 255, 255, 0.18)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",

            border: "1px solid rgba(255,255,255,0.25)",
            borderRadius: "18px",

            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          }}
        >
          <Feature
            icon={<FaWallet />}
            title="High Earnings"
            text="Earn more with shared rides"
          />

          <Feature
            icon={<FaShieldAlt />}
            title="Trusted Platform"
            text="Verified users"
          />

          <Feature
            icon={<FaClock />}
            title="Flexible Hours"
            text="Drive when you want"
          />

          <Feature
            icon={<FaHeadset />}
            title="24/7 Support"
            text="We're here anytime"
          />
        </div>

        <div style={{ flex: 1 }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 532px",
            gap: "40px",
            alignItems: "start",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "clamp(20px,2vw,35px)",
              right: "clamp(20px,2vw,40px)",
              zIndex: 5,
            }}
          >
            <RegistrationForm />
            </div>
        </div>

        <div
          style={{
            marginTop: "25px",
          }}
        >
          <FeatureBar />
      </div>
        </div>

       
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "5px",
        alignItems: "center",
        borderRadius: "18px",
        padding: "14px 18px",
      }}
    >
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#ECFDF5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#14B8A6",
          fontSize: "22px",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            fontWeight: "700",
            color: "#0F172A",
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: "13px",
            color: "#0F172A",
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}