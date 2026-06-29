import React from "react";

export default function Messages() {
  return (
    <div
      style={{
        padding: "20px",
        background: "#F7F8FA",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          color: "#0F172A",
          marginBottom: "8px",
          fontSize: "34px",
          fontWeight: "700",
        }}
      >
        Messages
      </h1>

      <p
        style={{
          color: "#64748B",
          marginBottom: "30px",
          fontSize: "16px",
        }}
      >
        Chat with your ride connections
      </p>

      <div
        style={{
          height: "78vh",
          background: "#fff",
          borderRadius: "24px",
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#94A3B8",
          fontSize: "22px",
          fontWeight: "600",
        }}
      >
        Messages UI Coming...
      </div>
    </div>
  );
}