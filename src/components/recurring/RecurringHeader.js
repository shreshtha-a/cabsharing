export default function RecurringHeader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            color: "#0F2D52",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Recurring Rides
        </h1>

        <p
          style={{
            marginTop: "6px",
            color: "#64748B",
          }}
        >
          Set once. Ride every day. Hopin handles the rest.
        </p>
      </div>

      <button
        style={{
          background: "#FFFFFF",
          border: "1px solid #E2E8F0",
          borderRadius: "12px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        Need Help?
      </button>
    </div>
  );
}