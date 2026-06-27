import { useState } from "react";
import { FaCarSide } from "react-icons/fa";
import FormInput from "./FormInput";
import OtpModal from "./OtpModal";

export default function RegistrationForm() {
  const [showOtp, setShowOtp] = useState(false);

  return (
    <>
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "clamp(18px,2vw,28px)",
          width: "clamp(420px,36vw,560px)",
          maxHeight: "78vh",
          overflowY: "auto",
            
          boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* Driver Icon */}
        <div
          style={{
            width: "clamp(60px,5vw,80px)",
            height: "clamp(60px,5vw,80px)",
            fontSize: "clamp(24px,2vw,34px)",
            margin: "0 auto",
            borderRadius: "30%",
            background: "#14B8A6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
          }}
        >
          <FaCarSide />
        </div>

        {/* Heading */}
        <h1
          style={{
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "2px",
            color: "#0F172A",
            fontSize: "clamp(18px,1.7vw,28px)",
          }}
        >
          Join as a Driver 👋
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            marginBottom: "0px",
            fontSize : "10px",
          }}
        >
          Register and start earning with Hopin
        </p>

        {/* Personal Information */}
        <h3 style={{ 
            marginBottom: "5px",
            fontSize: "15px",
        }}>
          Personal Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <FormInput placeholder="Full Name" />
          <FormInput placeholder="Phone Number" />
        </div>

        <div style={{ marginTop: "5px" }}>
          <FormInput placeholder="Email Address" fullWidth />
        </div>

        {/* Vehicle Information */}

        <h3
          style={{
            marginTop: "10px",
            marginBottom: "5px",
            fontSize: "clamp(14px,1.2vw,17px)",
          }}
        >
          Vehicle Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <FormInput placeholder="Vehicle Model" />
          <FormInput placeholder="Vehicle Number" />
          <FormInput placeholder="Vehicle Type" />
          <FormInput placeholder="Color" />
        </div>

        {/* Documents */}

        <h3
          style={{
            marginTop: "10px",
            marginBottom: "5px",
            fontSize: "15px",
          }}
        >
          Driving Documents
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5px",
          }}
        >
          <FormInput placeholder="Driving License Number" />
          <FormInput placeholder="Upload License" />

          <FormInput placeholder="RC Number" />
          <FormInput placeholder="Upload RC" />
        </div>

        {/* Checkbox */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            alignItems: "center",
            fontSize:"10px",
          }}
        >
          <input type="checkbox" />

          <span style={{
            color: "#475569" 
            
          }}>
            I agree to the Terms & Conditions
            and Privacy Policy
          </span>
        </div>

        {/* Button */}

        <button
          onClick={() => setShowOtp(true)}
          style={{
            width: "100%",
            height: "clamp(40px,5vh,52px)",
            fontSize: "clamp(14px,1.2vw,17px)",
            marginTop: "16px",
            border: "none",
            borderRadius: "16px",
            background: "#14B8A6",
            color: "#fff",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Register as Driver →
        </button>

      </div>

      {showOtp && (
        <OtpModal
          onClose={() => setShowOtp(false)}
        />
      )}
    </>
  );
}