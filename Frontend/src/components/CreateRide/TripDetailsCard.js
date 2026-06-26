import { FaMapMarkerAlt, FaCalendarAlt, FaClock, FaChair, FaRupeeSign } from "react-icons/fa";

export default function TripDetailsCard() {
  return (
    <div
      style={{
        flex: 2,
        background: "#fff",
        borderRadius: "20px",
        padding: "30px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >

      {/* Pickup */}
      <label style={{ fontWeight: "600", color: "#334155" }}>
        Pickup Location
      </label>

      <div style={{ position: "relative", margin: "8px 0 20px" }}>
        <FaMapMarkerAlt
          style={{
            position: "absolute",
            left: "15px",
            top: "16px",
            color: "#14B8A6",
          }}
        />

        <input
          type="text"
          placeholder="Enter pickup location"
          style={{
            width: "100%",
            height: "48px",
            paddingLeft: "45px",
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Destination */}
      <label style={{ fontWeight: "600", color: "#334155" }}>
        Destination
      </label>

      <div style={{ position: "relative", margin: "8px 0 20px" }}>
        <FaMapMarkerAlt
          style={{
            position: "absolute",
            left: "15px",
            top: "16px",
            color: "#2563EB",
          }}
        />

        <input
          type="text"
          placeholder="Enter destination"
          style={{
            width: "100%",
            height: "48px",
            paddingLeft: "45px",
            borderRadius: "12px",
            border: "1px solid #CBD5E1",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* Date + Time */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
          marginBottom: "20px",
        }}
      >
        <div>
          <label style={{ fontWeight: "600", color: "#334155" }}>
            Date
          </label>

          <div style={{ position: "relative", marginTop: "8px" }}>
            <FaCalendarAlt
              style={{
                position: "absolute",
                left: "15px",
                top: "16px",
                color: "#14B8A6",
              }}
            />

            <input
              type="date"
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "45px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#334155" }}>
            Time
          </label>

          <div style={{ position: "relative", marginTop: "8px" }}>
            <FaClock
              style={{
                position: "absolute",
                left: "15px",
                top: "16px",
                color: "#14B8A6",
              }}
            />

            <input
              type="time"
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "45px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      {/* Seats + Price */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "18px",
          marginBottom: "30px",
        }}
      >
        <div>
          <label style={{ fontWeight: "600", color: "#334155" }}>
            Seats
          </label>

          <div style={{ position: "relative", marginTop: "8px" }}>
            <FaChair
              style={{
                position: "absolute",
                left: "15px",
                top: "16px",
                color: "#14B8A6",
              }}
            />

            <input
              type="number"
              placeholder="0"
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "45px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontWeight: "600", color: "#334155" }}>
            Price / Seat
          </label>

          <div style={{ position: "relative", marginTop: "8px" }}>
            <FaRupeeSign
              style={{
                position: "absolute",
                left: "15px",
                top: "16px",
                color: "#14B8A6",
              }}
            />

            <input
              type="number"
              placeholder="0"
              style={{
                width: "100%",
                height: "48px",
                paddingLeft: "45px",
                borderRadius: "12px",
                border: "1px solid #CBD5E1",
                boxSizing: "border-box",
              }}
            />
          </div>
        </div>
      </div>

      <button
        style={{
          width: "100%",
          height: "52px",
          border: "none",
          borderRadius: "14px",
          background: "#14B8A6",
          color: "#fff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Continue →
      </button>
    </div>
  );
}