import { useState } from "react";
import {
  FaLeaf,
  FaToggleOn,
  FaToggleOff,
  FaSeedling,
  FaTree,
} from "react-icons/fa";

export default function Sustainability() {
  const [settings, setSettings] = useState({
    carbonTracking: true,
    ecoSuggestions: true,
    greenRoutes: false,
  });

  const toggleSetting = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
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
            background: "#E8F8F2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#16A34A",
            fontSize: "20px",
          }}
        >
          <FaLeaf />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Sustainability</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Make your rides greener and track your environmental impact.
          </p>
        </div>
      </div>

      {/* Carbon Savings */}

      <div
        style={{
          background: "#F0FDF4",
          borderRadius: "14px",
          padding: "18px",
          marginBottom: "24px",
          border: "1px solid #BBF7D0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                color: "#15803D",
              }}
            >
              24 kg
            </h2>

            <p
              style={{
                margin: "6px 0 0",
                color: "#4B5563",
              }}
            >
              CO₂ emissions saved this month
            </p>
          </div>

          <FaTree
            size={42}
            color="#16A34A"
          />
        </div>
      </div>

      {/* Settings */}

      <div style={rowStyle}>
        <div>
          <strong>Carbon Footprint Tracking</strong>
          <p
            style={{
              margin: "4px 0",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Track emissions saved from ride sharing.
          </p>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleSetting("carbonTracking")}
        >
          {settings.carbonTracking ? (
            <FaToggleOn size={30} color="#16A34A" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      <div style={rowStyle}>
        <div>
          <strong>Eco-friendly Suggestions</strong>
          <p
            style={{
              margin: "4px 0",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Recommend greener ride options.
          </p>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleSetting("ecoSuggestions")}
        >
          {settings.ecoSuggestions ? (
            <FaToggleOn size={30} color="#16A34A" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      <div style={rowStyle}>
        <div>
          <strong>Prefer Green Routes</strong>
          <p
            style={{
              margin: "4px 0",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Prioritize routes with lower emissions.
          </p>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggleSetting("greenRoutes")}
        >
          {settings.greenRoutes ? (
            <FaToggleOn size={30} color="#16A34A" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "25px",
          padding: "16px",
          background: "#F9FAFB",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <FaSeedling
          size={24}
          color="#16A34A"
        />

        <p
          style={{
            margin: 0,
            color: "#4B5563",
            fontSize: "14px",
          }}
        >
          Every shared ride helps reduce traffic and carbon emissions. 🌱
        </p>
      </div>
    </div>
  );
}