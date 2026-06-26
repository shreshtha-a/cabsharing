import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaGoogle,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import CreatePassengerModal from "./CreatePassengerModal";
import CreateDriverModal from "./CreateDriverModal";

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  if (!isOpen && !showSignup) return null;

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    navigate("/home");
    onClose();
  };

  const handleGoogleLogin = () => {
    navigate("/home");
    onClose();
  };

  const handleCreateAccount = () => {
    setShowSignup(true);
  };

  const handleSignupClose = () => {
    setShowSignup(false);
    onClose();
  };

  const handleSignupDone = () => {
    setShowSignup(false);
    onClose();
    navigate("/home");
  };

  // If signup modal is open, render it instead
  if (showSignup) {
    return (
      <CreatePassengerModal
        onClose={handleSignupClose}
        onLogin={() => setShowSignup(false)} // go back to login
        onDone={handleSignupDone}
      />
    );
  }

  return (
    <>
      {/* BACKDROP */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(8px)",
          zIndex: 999,
        }}
      />

      {/* MODAL */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "92%",
          maxWidth: "440px",
          background: "#FFFFFF",
          borderRadius: "28px",
          padding: "30px",
          zIndex: 1000,
          boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
          boxSizing: "border-box",
        }}
      >
        {/* CLOSE */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "18px",
            border: "none",
            background: "none",
            fontSize: "26px",
            cursor: "pointer",
            color: "#0F172A",
          }}
        >
          ×
        </button>

        {/* ICON */}
        <div
          style={{
            width: "75px",
            height: "75px",
            borderRadius: "50%",
            background: "#14B8A6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            color: "#FFFFFF",
            fontSize: "28px",
          }}
        >
          <FaUsers />
        </div>

        {/* TITLE */}
        <h2
          style={{
            textAlign: "center",
            color: "#061B4D",
            margin: 0,
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          Welcome Back! 👋
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#64748B",
            fontSize: "15px",
            marginTop: "12px",
            marginBottom: "28px",
          }}
        >
          Login to continue your journey with Hopin
        </p>

        {/* EMAIL */}
        <div style={{ position: "relative", marginBottom: "14px" }}>
          <FaEnvelope
            style={{ position: "absolute", left: "14px", top: "16px", color: "#94A3B8" }}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email or Phone Number"
            style={{
              width: "100%",
              height: "50px",
              paddingLeft: "42px",
              paddingRight: "12px",
              border: "1px solid #CBD5E1",
              borderRadius: "12px",
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ position: "relative", marginBottom: "12px" }}>
          <FaLock
            style={{ position: "absolute", left: "14px", top: "16px", color: "#94A3B8" }}
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={{
              width: "100%",
              height: "50px",
              paddingLeft: "42px",
              paddingRight: "42px",
              border: "1px solid #CBD5E1",
              borderRadius: "12px",
              outline: "none",
              fontSize: "14px",
              boxSizing: "border-box",
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "12px",
              top: "14px",
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#94A3B8",
              fontSize: "16px",
            }}
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
        </div>

        {/* FORGOT PASSWORD */}
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <button
            onClick={() => alert("Forgot Password feature will be added later")}
            style={{
              border: "none",
              background: "none",
              color: "#14B8A6",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Forgot Password?
          </button>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            height: "52px",
            border: "none",
            borderRadius: "12px",
            background: "#14B8A6",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          Login to Hopin
          <FaArrowRight />
        </button>

        {/* DIVIDER */}
        <div
          style={{
            textAlign: "center",
            margin: "22px 0",
            color: "#94A3B8",
            fontSize: "14px",
          }}
        >
          or continue with
        </div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            height: "50px",
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            background: "#FFFFFF",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "500",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* SIGNUP — now opens CreatePassengerModal */}
        <div
          style={{
            marginTop: "25px",
            textAlign: "center",
            fontSize: "14px",
            color: "#64748B",
          }}
        >
          New to Hopin?{" "}
          <button
            onClick={handleCreateAccount}
            style={{
              border: "none",
              background: "none",
              color: "#14B8A6",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Create Account →
          </button>
        </div>
      </div>
    </>
  );
}