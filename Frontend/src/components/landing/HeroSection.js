import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import heroVideo from "../../assets/videos/hero-video.mp4";
import PassengerCard from "./PassengerCard";
import DriverCard from "./DriverCard";

// Reactive window width hook — updates on resize/orientation change
function useViewport() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    let frame;
    const handleResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      cancelAnimationFrame(frame);
    };
  }, []);

  return width;
}

export default function HeroSection() {
  const width = useViewport();
  const navigate = useNavigate();

  const isMobile = width < 768;   // phones
  const isTablet = width >= 768 && width < 1024; // tablets
  const stackLayout = width < 1024; // stack left/right below 1024px

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: stackLayout ? "auto" : "720px",
        overflow: "hidden",
      }}
    >
      {/* VIDEO */}
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
          zIndex: 0,
        }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0) 100%)",
          zIndex: 1,
        }}
      />

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1450px",
          margin: "0 auto",
          paddingTop: "clamp(100px, 14vw, 180px)",
          paddingBottom: stackLayout ? "50px" : "60px",
          paddingLeft: "clamp(16px, 4vw, 50px)",
          paddingRight: "clamp(16px, 4vw, 50px)",
          display: "flex",
          flexDirection: stackLayout ? "column" : "row",
          justifyContent: "space-between",
          alignItems: stackLayout ? "center" : "flex-start",
          gap: stackLayout ? "40px" : "40px",
          textAlign: stackLayout ? "center" : "left",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            maxWidth: stackLayout ? "100%" : "430px",
            width: "100%",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#061B4D",
              fontWeight: "800",
              lineHeight: "1.05",
              letterSpacing: "-1.5px",
              fontSize: "clamp(34px, 7vw, 56px)",
            }}
          >
            Better Rides
            <br />
            When{" "}
            <span style={{ color: "#14B8A6" }}>Shared</span>
          </h1>

          <p
            style={{
              marginTop: "18px",
              color: "#475569",
              lineHeight: "1.7",
              fontWeight: "500",
              fontSize: "clamp(14px, 2.2vw, 16px)",
            }}
          >
            Share rides, save money,
            <br />
            and travel together.
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div
          style={{
            width: "100%",
            maxWidth: "620px",
            textAlign: "center",
            marginTop: stackLayout ? "0" : "25px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#FFFFFF",
              fontSize: "clamp(18px, 3.5vw, 24px)",
              fontWeight: "700",
              textShadow: "0 3px 12px rgba(0,0,0,0.45)",
            }}
          >
            Choose How You Want to Get Started
          </h2>

          <p
            style={{
              marginTop: "10px",
              color: "#F8FAFC",
              fontSize: "clamp(12px, 2vw, 14px)",
              textShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            Pick your role and we'll personalize your experience
          </p>

          {/* CARDS */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "stretch",
              gap: "18px",
              marginTop: "24px",
              flexDirection: isMobile ? "column" : "row",
              flexWrap: "wrap",
            }}
          >
            <PassengerCard />
            <DriverCard onClick={() => navigate("/signup-driver")} />
          </div>
        </div>
      </div>
    </section>
  );
}
// jsjsjsxb