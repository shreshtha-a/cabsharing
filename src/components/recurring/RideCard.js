export default function RideCard({
  rides,
  selectedRide,
  setSelectedRide,
  toggleRide,
  addRide,
}) {
  return (
    <>
      {rides.map((ride) => (
        <div
          key={ride.id}
          onClick={() => setSelectedRide(ride.id)}
          style={{
            background: "#fff",
            borderRadius: "18px",
            padding: "16px",
            cursor: "pointer",
            border:
              selectedRide === ride.id
                ? "2px solid #14B8A6"
                : "1px solid #E5E7EB",
            boxShadow:
              selectedRide === ride.id
                ? "0 4px 20px rgba(20,184,166,0.12)"
                : "0 2px 8px rgba(0,0,0,0.03)",
            transition: "0.2s ease",
          }}
        >
          {/* Top Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#0F172A",
              }}
            >
              {ride.title}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: ride.active
                    ? "#DCFCE7"
                    : "#FEF3C7",
                  color: ride.active
                    ? "#15803D"
                    : "#B45309",
                }}
              >
                {ride.active ? "Active" : "Paused"}
              </span>

              {/* Toggle */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  toggleRide(ride.id);
                }}
                style={{
                  width: "42px",
                  height: "24px",
                  borderRadius: "999px",
                  background: ride.active
                    ? "#14B8A6"
                    : "#CBD5E1",
                  position: "relative",
                  cursor: "pointer",
                  transition: "0.2s",
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#fff",
                    position: "absolute",
                    top: "3px",
                    left: ride.active
                      ? "21px"
                      : "3px",
                    transition: "0.2s",
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Time */}
          <div
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#0F2D52",
              marginBottom: "14px",
            }}
          >
            {ride.time}
          </div>

          {/* Route */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
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
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#10B981",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                {ride.pickup}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#EF4444",
                }}
              />

              <span
                style={{
                  fontSize: "14px",
                  color: "#475569",
                }}
              >
                {ride.drop}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Create Ride Button */}
      <button
        onClick={addRide}
        style={{
          width: "100%",
          height: "52px",
          borderRadius: "16px",
          border: "1px dashed #14B8A6",
          background: "#fff",
          color: "#14B8A6",
          fontWeight: "600",
          fontSize: "15px",
          cursor: "pointer",
          marginTop: "8px",
        }}
      >
        + Create Recurring Ride
      </button>
    </>
  );
}