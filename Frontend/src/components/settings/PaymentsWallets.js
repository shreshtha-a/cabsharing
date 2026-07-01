import { useState } from "react";
import {
  FaWallet,
  FaCreditCard,
  FaPlusCircle,
  FaHistory,
  FaToggleOn,
  FaToggleOff,
  FaChevronRight,
} from "react-icons/fa";

export default function PaymentsWallet() {
  const [autoPay, setAutoPay] = useState(true);

  const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
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
            background: "#EEF6FF",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#2563EB",
            fontSize: "20px",
          }}
        >
          <FaWallet />
        </div>

        <div>
          <h3 style={{ margin: 0 }}>Payments & Wallet</h3>

          <p
            style={{
              margin: "4px 0 0",
              color: "#6B7280",
              fontSize: "14px",
            }}
          >
            Manage your payment methods and wallet.
          </p>
        </div>
      </div>

      {/* Wallet Balance */}

      <div
        style={{
          background: "#F8FAFC",
          borderRadius: "14px",
          padding: "18px",
          marginBottom: "24px",
          border: "1px solid #E5E7EB",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#6B7280",
            fontSize: "14px",
          }}
        >
          Wallet Balance
        </p>

        <h2
          style={{
            margin: "8px 0",
            color: "#2563EB",
          }}
        >
          ₹1,240
        </h2>

        <button
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Add Money
        </button>
      </div>

      {/* Default Card */}

      <div style={rowStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaCreditCard color="#2563EB" />

          <div>
            <strong>Visa •••• 4589</strong>
            <p
              style={{
                margin: 0,
                color: "#6B7280",
                fontSize: "13px",
              }}
            >
              Default Payment Method
            </p>
          </div>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Add Payment */}

      <div style={rowStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaPlusCircle color="#2563EB" />
          <span>Add Payment Method</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Transaction History */}

      <div style={rowStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaHistory color="#2563EB" />
          <span>Transaction History</span>
        </div>

        <FaChevronRight color="#9CA3AF" />
      </div>

      <hr style={{ border: "0.5px solid #E5E7EB" }} />

      {/* Auto Pay */}

      <div style={rowStyle}>
        <div>
          <strong>Auto Pay</strong>

          <p
            style={{
              margin: "4px 0",
              color: "#6B7280",
              fontSize: "13px",
            }}
          >
            Automatically pay for completed rides.
          </p>
        </div>

        <div
          style={{ cursor: "pointer" }}
          onClick={() => setAutoPay(!autoPay)}
        >
          {autoPay ? (
            <FaToggleOn size={30} color="#2563EB" />
          ) : (
            <FaToggleOff size={30} color="#BDBDBD" />
          )}
        </div>
      </div>
    </div>
  );
}