import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaCarSide, FaCheckCircle } from "react-icons/fa";
import CreateDriverModal from "./CreateDriverModal";

export default function DriverCard() {
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
        border: "1px solid rgba(37,99,235,0.25)",
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
          background: "#2563EB",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "30px",
        }}
      >
        <FaCarSide />
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
          color: "#2563EB",
          fontSize: "28px",
          fontWeight: "700",
          margin: 0,
        }}
      >
        Driver
      </h2>

      <div
        style={{
          width: "50px",
          height: "3px",
          background: "#2563EB",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#334155",
            fontSize: "15px",
          }}
        >
          <FaCheckCircle color="#2563EB" />
          <span>Publish rides</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#334155",
            fontSize: "15px",
          }}
        >
          <FaCheckCircle color="#2563EB" />
          <span>Earn from empty seats</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "#334155",
            fontSize: "15px",
          }}
        >
          <FaCheckCircle color="#2563EB" />
          <span>Build trust</span>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setShowSignup(true)}
        style={{
          marginTop: "22px",
          height: "48px",
          border: "none",
          borderRadius: "14px",
          background: "#2563EB",
          color: "#FFFFFF",
          fontSize: "15px",
          fontWeight: "600",
          cursor: "pointer",
          width: "100%",
        }}
      >
        Offer a Ride
      </button>
    </div>
  
    {showSignup && (
    <CreateDriverModal
        onClose={() => setShowSignup(false)}
        onLogin={() => setShowSignup(false)}
        onDone={() => {
            setShowSignup(false);
            navigate("/home");   // or whatever page drivers should see
        }}
    />
    )}
    </>
  );
}