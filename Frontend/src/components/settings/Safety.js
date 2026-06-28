import { useState } from "react";
import {
  FaShieldAlt,
  FaToggleOn,
  FaToggleOff,
  FaUserShield,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Safety() {
  const [settings, setSettings] = useState({
    liveLocation: true,
    emergencyContacts: true,
    rideVerification: false,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 0",
    borderBottom: "1px solid #E5E7EB",
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
            background: "#E6FFFB",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#14B8A6",
            fontSize: "20px",
          }}
        >
          <FaShieldAlt />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Safety</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Manage your ride safety and emergency preferences.
          </p>
        </div>
      </div>

      {/* Emergency Contacts */}

      <div style={rowStyle}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <FaPhoneAlt color="#14B8A6" />

          <div>
            <strong>Emergency Contacts</strong>

            <p
              style={{
                margin: "4px 0 0",
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Share your ride with trusted contacts.
            </p>
          </div>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("emergencyContacts")}
        >
          {settings.emergencyContacts ? (
            <FaToggleOn size={30} color="#14B8A6" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      {/* Live Location */}

      <div style={rowStyle}>
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <FaMapMarkerAlt color="#14B8A6" />

          <div>
            <strong>Live Location Sharing</strong>

            <p
              style={{
                margin: "4px 0 0",
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Allow trusted contacts to track your ride.
            </p>
          </div>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("liveLocation")}
        >
          {settings.liveLocation ? (
            <FaToggleOn size={30} color="#14B8A6" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      {/* Ride Verification */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <FaUserShield color="#14B8A6" />

          <div>
            <strong>Ride Verification</strong>

            <p
              style={{
                margin: "4px 0 0",
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Verify driver and vehicle before every ride.
            </p>
          </div>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => toggle("rideVerification")}
        >
          {settings.rideVerification ? (
            <FaToggleOn size={30} color="#14B8A6" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>

      {/* Safety Tip */}

      <div
        style={{
          marginTop: "24px",
          background: "#E6FFFB",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <strong style={{ color: "#14B8A6" }}>
          💡 Safety Tip
        </strong>

        <p
          style={{
            margin: "8px 0 0",
            color: "#374151",
            fontSize: "14px",
            lineHeight: "22px",
          }}
        >
          Always verify the driver's name, vehicle number and profile
          before starting your ride. Share your trip with a trusted
          contact whenever possible.
        </p>
      </div>
    </div>
  );
}