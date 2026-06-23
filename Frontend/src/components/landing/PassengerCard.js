import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import CreatePassengerModal from "./CreatePassengerModal";

export default function PassengerCard() {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "250px",
          minHeight: "300px",
          background: "rgba(255,255,255,0.97)",
          borderRadius: "24px",
          border: "1px solid rgba(20,184,166,0.25)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
          padding: "18px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "#14B8A6",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "30px",
          }}
        >
          <FaUsers />
        </div>

        {/* Title */}
        <p
          style={{
            textAlign: "center",
            marginTop: "18px",
            marginBottom: "4px",
            color: "#64748B",
            fontSize: "15px",
          }}
        >
          I'm a
        </p>

        <h2
          style={{
            textAlign: "center",
            color: "#14B8A6",
            fontSize: "28px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Passenger
        </h2>

        {/* Divider */}
        <div
          style={{
            width: "50px",
            height: "3px",
            background: "#14B8A6",
            borderRadius: "50px",
            margin: "14px auto 22px",
          }}
        />

        {/* Features */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            flex: 1,
          }}
        >
          {["Find rides", "Connect with drivers", "Save money"].map((feat) => (
            <div
              key={feat}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "#334155",
                fontSize: "15px",
              }}
            >
              <FaCheckCircle color="#14B8A6" />
              <span>{feat}</span>
            </div>
          ))}
        </div>

        {/* Button — opens signup modal */}
        <button
          onClick={() => setShowSignup(true)}
          style={{
            marginTop: "22px",
            height: "48px",
            width: "100%",
            border: "none",
            borderRadius: "14px",
            background: "#14B8A6",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Find a Ride
        </button>
      </div>

      {/* Signup modal — mounts outside the card so z-index works */}
      {showSignup && (
        <CreatePassengerModal
          onClose={() => setShowSignup(false)}
          onLogin={() => setShowSignup(false)}
          onDone={() => {
            setShowSignup(false);
            navigate("/search");
          }}
        />
      )}
    </>
  );
}