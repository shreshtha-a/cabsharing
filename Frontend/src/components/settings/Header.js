import { FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "35px",
      }}
    >
      {/* Left Side */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "18px",
            background: "#E6FFFB",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaCog
            size={32}
            color="#14B8A6"
          />
        </div>

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "700",
              color: "#111827",
            }}
          >
            Settings
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#6B7280",
              fontSize: "16px",
              lineHeight: "24px",
            }}
          >
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

    </div>
  );
}