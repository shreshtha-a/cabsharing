import {
  ShieldCheck,
  Phone,
  Mail,
  Building2,
  GraduationCap,
} from "lucide-react";

export default function VerificationCard() {
  const items = [
    {
      icon: Phone,
      label: "Phone Number",
      value: "+91 98765 43210",
      status: "Verified",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      icon: Mail,
      label: "Email",
      value: "aryan.r@sharda.ac.in",
      status: "Verified",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      icon: Building2,
      label: "Aadhaar (Government ID)",
      value: "Aadhaar ending •••• 3421",
      status: "Verified",
      color: "#16a34a",
      bg: "#dcfce7",
    },
    {
      icon: GraduationCap,
      label: "Institution ID",
      value: "Sharda University — Student",
      status: "Pending",
      color: "#f59e0b",
      bg: "#fef3c7",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "18px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "#e8faf0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ShieldCheck
            size={18}
            color="#16a34a"
          />
        </div>

        <h3
          style={{
            margin: 0,
            color: "#08244b",
            fontSize: "22px",
          }}
        >
          Verification & Trust
        </h3>
      </div>

      {items.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns:
                "30px 1fr 1.5fr auto",
              alignItems: "center",
              gap: "12px",
              padding: "10px 0",
              borderBottom:
                index !== items.length - 1
                  ? "1px solid #f1f5f9"
                  : "none",
            }}
          >
            <Icon
              size={18}
              color="#64748b"
            />

            <div
              style={{
                color: "#08244b",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {item.label}
            </div>

            <div
              style={{
                color: "#64748b",
                fontSize: "14px",
              }}
            >
              {item.value}
            </div>

            <div
              style={{
                padding: "6px 12px",
                borderRadius: "999px",
                background: item.bg,
                color: item.color,
                fontSize: "12px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              {item.status === "Verified"
                ? "✓ Verified"
                : "🕒 Pending"}
            </div>
          </div>
        );
      })}
    </div>
  );
}