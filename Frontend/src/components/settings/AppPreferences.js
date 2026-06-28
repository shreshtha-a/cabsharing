import { useState } from "react";
import {
  FaCog,
  FaToggleOn,
  FaToggleOff,
  FaGlobe,
  FaMoon,
  FaTextHeight,
} from "react-icons/fa";

export default function AppPreference() {
  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoUpdate: true,
    animations: true,
  });

  const toggle = (key) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
        marginBottom: "24px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "#EEF4FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#14B8A6",
            fontSize: "20px",
          }}
        >
          <FaCog />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>App Preferences</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Customize your app experience.
          </p>
        </div>
      </div>

      {/* Language */}

      <div style={rowStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaGlobe color="#14B8A6" />
          <span>Language</span>
        </div>

        <select
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            padding: "6px 10px",
          }}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Font Size */}

      <div style={rowStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaTextHeight color="#14B8A6" />
          <span>Font Size</span>
        </div>

        <select
          style={{
            border: "1px solid #D1D5DB",
            borderRadius: "8px",
            padding: "6px 10px",
          }}
        >
          <option>Small</option>
          <option selected>Medium</option>
          <option>Large</option>
        </select>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Dark Mode */}

      <div style={rowStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaMoon color="#14B8A6" />
          <span>Dark Mode</span>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("darkMode")}
        >
          {preferences.darkMode ? (
            <FaToggleOn size={30} color="#14B8A6"/>
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Auto Update */}

      <div style={rowStyle}>
        <span>Auto Update</span>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("autoUpdate")}
        >
          {preferences.autoUpdate ? (
            <FaToggleOn size={30} color="#14B8A6" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Animations */}

      <div style={rowStyle}>
        <span>Enable Animations</span>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("animations")}
        >
          {preferences.animations ? (
            <FaToggleOn size={30} color="#14B8A6" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>
    </div>
  );
}