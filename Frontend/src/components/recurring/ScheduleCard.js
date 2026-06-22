import { useState } from "react";

export default function ScheduleCard() {
  const [selectedDays, setSelectedDays] = useState([
    "M",
    "T",
    "W",
    "Th",
    "F",
  ]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(
        selectedDays.filter((d) => d !== day)
      );
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const days = [
    "M",
    "T",
    "W",
    "Th",
    "F",
    "S",
    "Su",
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "24px",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        border: "1px solid #E5E7EB",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.03)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "24px",
        }}
      >
        <span style={{ fontSize: "22px" }}>
          📅
        </span>

        <h3
          style={{
            margin: 0,
            fontSize: "22px",
            color: "#0F2D52",
            fontWeight: "700",
          }}
        >
          Schedule
        </h3>
      </div>

      {/* Time Inputs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "18px",
          marginBottom: "24px",
          width: "100%",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600",
            }}
          >
            Pickup Time
          </label>

          <input
            type="time"
            defaultValue="08:15"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid #CBD5E1",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#475569",
              fontWeight: "600",
            }}
          >
            Arrive By (Optional)
          </label>

          <input
            type="time"
            defaultValue="09:00"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              borderRadius: "14px",
              border: "1px solid #CBD5E1",
              fontSize: "16px",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Repeat On */}
      <div
        style={{
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            marginBottom: "12px",
            fontWeight: "600",
            color: "#475569",
          }}
        >
          Repeat On
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() => toggleDay(day)}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",
                transition: "0.2s",
                background:
                  selectedDays.includes(day)
                    ? "#14B8A6"
                    : "#F1F5F9",
                color:
                  selectedDays.includes(day)
                    ? "#fff"
                    : "#64748B",
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {/* Valid Until */}
      <div>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            color: "#475569",
            fontWeight: "600",
          }}
        >
          Valid Until
        </label>

        <input
          type="date"
          defaultValue="2026-06-23"
          style={{
            width: "100%",
            maxWidth: "260px",
            boxSizing: "border-box",
            padding: "14px",
            borderRadius: "14px",
            border: "1px solid #CBD5E1",
            fontSize: "15px",
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}