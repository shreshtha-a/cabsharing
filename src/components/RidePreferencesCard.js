import { useState } from "react";
import {
  SlidersHorizontal,
  UserRound,
  Music,
  MessageCircle,
  Car,
  Pencil,
} from "lucide-react";

export default function RidePreferencesCard() {
  const [editing, setEditing] =
    useState(false);

  const [genderMatch, setGenderMatch] =
    useState(true);

  const [music, setMusic] =
    useState(true);

  const [vibe, setVibe] =
    useState("Chatty");

  const [vehicle, setVehicle] =
    useState("Any");

  const pillStyle = (active) => ({
    padding: "6px 12px",
    borderRadius: "999px",
    border: active
      ? "1px solid #9de7e8"
      : "1px solid #e5e7eb",
    background: active
      ? "#e8faf8"
      : "#fff",
    color: active
      ? "#0f766e"
      : "#1e3a8a",
    cursor: editing
      ? "pointer"
      : "default",
    fontSize: "12px",
    fontWeight: "500",
  });

  const Toggle = ({
    checked,
    onChange,
  }) => (
    <div
      onClick={() =>
        editing && onChange(!checked)
      }
      style={{
        width: "54px",
        height: "30px",
        borderRadius: "999px",
        background: checked
          ? "#14b8c4"
          : "#cbd5e1",
        position: "relative",
        cursor: editing
          ? "pointer"
          : "default",
      }}
    >
      <div
        style={{
          width: "24px",
          height: "24px",
          background: "#fff",
          borderRadius: "50%",
          position: "absolute",
          top: "3px",
          left: checked
            ? "27px"
            : "3px",
          transition: "0.2s",
        }}
      />
    </div>
  );

  const PreferenceRow = ({
    icon,
    title,
    subtitle,
    right,
  }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "38px 1fr auto",
        gap: "12px",
        alignItems: "center",
        padding: "10px 0",
        borderTop:
          "1px solid #f1f5f9",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#f8fafc",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>

      <div>
        <div
          style={{
            color: "#08244b",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {title}
        </div>

        <div
          style={{
            color: "#64748b",
            fontSize: "12px",
          }}
        >
          {subtitle}
        </div>
      </div>

      {right}
    </div>
  );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "16px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.04)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "#e8faf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SlidersHorizontal
              size={18}
              color="#14b8c4"
            />
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: "16px",
              color: "#08244b",
            }}
          >
            Ride Preferences
          </h3>
        </div>

        <button
          onClick={() =>
            setEditing(!editing)
          }
          style={{
            border: "1px solid #e5e7eb",
            background: "#fff",
            padding: "7px 12px",
            borderRadius: "12px",
            cursor: "pointer",
            display: "flex",
            gap: "6px",
            alignItems: "center",
          }}
        >
          <Pencil size={14} />
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      <PreferenceRow
        icon={
          <UserRound
            size={16}
            color="#1e3a8a"
          />
        }
        title="Gender Matching"
        subtitle="Only match me with same-gender riders"
        right={
          <Toggle
            checked={genderMatch}
            onChange={
              setGenderMatch
            }
          />
        }
      />

      <PreferenceRow
        icon={
          <Music
            size={16}
            color="#1e3a8a"
          />
        }
        title="Music in Ride"
        subtitle="Allow driver to play music"
        right={
          <Toggle
            checked={music}
            onChange={setMusic}
          />
        }
      />

      <PreferenceRow
        icon={
          <MessageCircle
            size={16}
            color="#1e3a8a"
          />
        }
        title="Chatty or Quiet"
        subtitle="Let co-passengers know your vibe"
        right={
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {[
              "Chatty",
              "Quiet",
              "No Preference",
            ].map((item) => (
              <div
                key={item}
                onClick={() =>
                  editing &&
                  setVibe(item)
                }
                style={pillStyle(
                  vibe === item
                )}
              >
                {item}
              </div>
            ))}
          </div>
        }
      />

      <PreferenceRow
        icon={
          <Car
            size={16}
            color="#1e3a8a"
          />
        }
        title="Preferred Vehicle Type"
        subtitle="Select your preferred vehicle type"
        right={
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            {[
              "Any",
              "Hatchback",
              "Sedan",
              "SUV",
            ].map((item) => (
              <div
                key={item}
                onClick={() =>
                  editing &&
                  setVehicle(item)
                }
                style={pillStyle(
                  vehicle === item
                )}
              >
                {item}
              </div>
            ))}
          </div>
        }
      />
    </div>
  );
}