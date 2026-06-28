import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function AuthSuccess() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Signing you in...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token  = params.get("token");
    const error  = params.get("error");

    if (error || !token) {
      setStatus("Login failed. Redirecting...");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    localStorage.setItem("token", token);

    api.get("/auth/me")
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data.user));
        setStatus("Welcome! Redirecting...");
        navigate("/home");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setStatus("Something went wrong. Redirecting...");
        setTimeout(() => navigate("/"), 2000);
      });
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#F0FDFA", fontFamily: "Inter, sans-serif",
    }}>
      <div style={{
        background: "#fff", borderRadius: 24, padding: "40px 48px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)", textAlign: "center",
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🚗</div>
        <h2 style={{ color: "#0F2D52", margin: "0 0 8px", fontSize: 22, fontWeight: 700 }}>Hopin</h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: 15 }}>{status}</p>
        <div style={{ marginTop: 24, width: 40, height: 4, borderRadius: 2, background: "linear-gradient(90deg,#14B8A6,#0F2D52)", margin: "24px auto 0" }} />
      </div>
    </div>
  );
}