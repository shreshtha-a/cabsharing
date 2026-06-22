import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Calendar,
  Building2,
  MapPin,
  Pencil,
  Info,
} from "lucide-react";

export default function PersonalInfoCard() {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    phone: "+91 98765 43210",
    email: "aryan.r@sharda.ac.in",
    gender: "Male",
    dob: "12 Mar 2002",
    institution: "Sharda University",
    address: "B-12, Sector 45, Noida, UP - 201303",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const rows = [
    {
      icon: Phone,
      label: "Phone",
      key: "phone",
    },
    {
      icon: Mail,
      label: "Email",
      key: "email",
    },
    {
      icon: User,
      label: "Gender",
      key: "gender",
    },
    {
      icon: Calendar,
      label: "Date of Birth",
      key: "dob",
    },
    {
      icon: Building2,
      label: "Institution / Company",
      key: "institution",
    },
    {
      icon: MapPin,
      label: "Home Address",
      key: "address",
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "12px 16px",
        boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#e8faf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User
              size={14}
              color="#14b8c4"
            />
          </div>

          <h3
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: "700",
              color: "#08244b",
            }}
          >
            Personal Information
          </h3>
        </div>

        <button
          onClick={() =>
            setEditing(!editing)
          }
          style={{
            border: "1px solid #e5e7eb",
            background: "#fff",
            padding: "5px 10px",
            borderRadius: "10px",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          <Pencil size={12} />
          {editing ? "Save" : "Edit"}
        </button>
      </div>

      {/* Rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
        }}
      >
        {rows.map((row, index) => {
          const Icon = row.icon;

          return (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns:
                  "30px 150px 1fr auto",
                alignItems: "center",
                gap: "10px",
                padding: "8px 0",
                borderTop:
                  index !== 0
                    ? "1px solid #f1f5f9"
                    : "none",
              }}
            >
              {/* Icon */}
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  background: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon
                  size={13}
                  color="#1e3a8a"
                />
              </div>

              {/* Label */}
              <div
                style={{
                  fontSize: "13px",
                  color: "#1e3a8a",
                  fontWeight: "500",
                }}
              >
                {row.label}
              </div>

              {/* Value */}
              {editing ? (
                <input
                  value={form[row.key]}
                  onChange={(e) =>
                    handleChange(
                      row.key,
                      e.target.value
                    )
                  }
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    background:
                      "transparent",
                    fontSize: "13px",
                    color: "#08244b",
                  }}
                />
              ) : (
                <div
                  style={{
                    fontSize: "13px",
                    color: "#08244b",
                  }}
                >
                  {form[row.key]}
                </div>
              )}

              {row.key ===
                "institution" && (
                <Info
                  size={14}
                  color="#14b8c4"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}