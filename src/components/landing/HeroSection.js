import { useNavigate } from "react-router-dom";
import heroVideo from "../../assets/videos/hero-video.mp4";
import PassengerCard from "./PassengerCard";
import DriverCard from "./DriverCard";

export default function HeroSection() {
  const mobile = window.innerWidth < 768;
  const navigate = useNavigate();

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: mobile ? "1150px" : "720px",
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
          paddingTop: mobile ? "150px" : "180px",
          paddingLeft: mobile ? "24px" : "50px",
          paddingRight: mobile ? "24px" : "50px",
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: mobile ? "50px" : "40px",
        }}
      >
        {/* LEFT SIDE */}
        <div
          style={{
            maxWidth: mobile ? "100%" : "430px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#061B4D",
              fontWeight: "800",
              lineHeight: "1.03",
              letterSpacing: "-2px",
              fontSize: mobile ? "46px" : "56px",
            }}
          >
            Better Rides
            <br />
            When{" "}
            <span
              style={{
                color: "#14B8A6",
              }}
            >
              Shared
            </span>
          </h1>

          <p
            style={{
              marginTop: "18px",
              color: "#475569",
              lineHeight: "1.7",
              fontWeight: "500",
              fontSize: "16px",
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
            marginTop: mobile ? "0" : "25px",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#FFFFFF",
              fontSize: mobile ? "24px" : "20px",
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
              fontSize: "14px",
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
              flexDirection: mobile ? "column" : "row",
            }}
          >
            <PassengerCard />

            <DriverCard
              onClick={() => navigate("/signup-driver")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}