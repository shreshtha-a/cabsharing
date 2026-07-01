import { useState } from "react";
import {
  Shield,
  Plus,
  Pencil,
  Trash2,
  Check,
} from "lucide-react";

export default function EmergencyContactsCard() {
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Mom — Anita Sharma",
      phone: "+91 9988776655",
    },
  ]);

  const addContact = () => {
    setContacts([
      ...contacts,
      {
        id: Date.now(),
        name: "",
        phone: "",
      },
    ]);
  };

  const updateContact = (
    id,
    field,
    value
  ) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? {
              ...contact,
              [field]: value,
            }
          : contact
      )
    );
  };

  const deleteContact = (id) => {
    setContacts(
      contacts.filter(
        (contact) => contact.id !== id
      )
    );
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "16px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.05)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "12px",
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
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#e8faf0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Shield
              size={16}
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
            Emergency Contacts
          </h3>
        </div>

        <button
          onClick={addContact}
          style={{
            border:
              "1px solid #e5e7eb",
            background: "#fff",
            borderRadius: "12px",
            padding:
              "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <Plus size={16} />
          Add Contact
        </button>
      </div>

      {/* Contacts */}
      {contacts.map((contact) => (
        <div
          key={contact.id}
          style={{
            border:
              "1px solid #eef2f7",
            borderRadius: "14px",
            padding: "12px",
            marginBottom: "10px",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#ffe4e6",
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700",
                fontSize: "18px",
              }}
            >
              {contact.name
                ? contact.name.charAt(0)
                : "N"}
            </div>

            <div>
              <input
                value={contact.name}
                placeholder="Contact Name"
                onChange={(e) =>
                  updateContact(
                    contact.id,
                    "name",
                    e.target.value
                  )
                }
                style={{
                  border: "none",
                  outline: "none",
                  fontWeight: "700",
                  fontSize: "16px",
                  color: "#08244b",
                  background:
                    "transparent",
                  width: "220px",
                }}
              />

              <br />

              <input
                value={contact.phone}
                placeholder="Phone Number"
                onChange={(e) =>
                  updateContact(
                    contact.id,
                    "phone",
                    e.target.value
                  )
                }
                style={{
                  border: "none",
                  outline: "none",
                  marginTop: "4px",
                  color: "#64748b",
                  fontSize: "14px",
                  background:
                    "transparent",
                  width: "220px",
                }}
              />
            </div>

            <div
              style={{
                background:
                  "#dcfce7",
                color: "#15803d",
                padding:
                  "5px 12px",
                borderRadius:
                  "999px",
                fontSize: "11px",
                fontWeight: "600",
              }}
            >
              LIVE UPDATES ON
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <button
              style={{
                width: "36px",
                height: "36px",
                border:
                  "1px solid #e5e7eb",
                background: "#fff",
                borderRadius:
                  "10px",
                cursor: "pointer",
              }}
            >
              <Pencil
                size={16}
              />
            </button>

            <button
              onClick={() =>
                deleteContact(
                  contact.id
                )
              }
              style={{
                width: "36px",
                height: "36px",
                border:
                  "1px solid #fecaca",
                background: "#fff",
                color: "#ef4444",
                borderRadius:
                  "10px",
                cursor: "pointer",
              }}
            >
              <Trash2
                size={16}
              />
            </button>
          </div>
        </div>
      ))}
      

      {/* Bottom Note  & emergency */}
      <div
        style={{
          marginTop: "10px",
          background: "#f8fafc",
          borderRadius: "12px",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Check
            size={14}
            color="#2563eb"
          />
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#475569",
          }}
        >
          You'll be notified every
          time during a ride.
          <br />
          You can add up to 3
          contacts.
        </div>
      </div>
    </div>
  );
}