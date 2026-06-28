import {
  FaSearch,
  FaPhoneAlt,
  FaComments,
  FaQuestionCircle,
  FaEnvelope,
} from "react-icons/fa";


export default function HelpCenter() {
  const cardStyle = {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    flex: 1,
    textAlign: "center",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      {/* Header */}

      <h1
        style={{
          margin: 0,
          color: "#111827",
        }}
      >
        Help Center
      </h1>

      <p
        style={{
          color: "#6B7280",
          marginTop: "8px",
          marginBottom: "30px",
        }}
      >
        Find answers to common questions and get support.
      </p>

      {/* Search */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          borderRadius: "14px",
          padding: "12px 18px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <FaSearch color="#14B8A6" />

        <input
          type="text"
          placeholder="Search help articles..."
          style={{
            border: "none",
            outline: "none",
            marginLeft: "12px",
            flex: 1,
            fontSize: "15px",
          }}
        />
      </div>

      {/* Quick Actions */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "35px",
        }}
      >

        <div style={cardStyle}>
          <FaComments size={30} color="#14B8A6" />
          <h3>Live Chat</h3>
          <p style={{ color: "#6B7280" }}>
            Chat with our support team.
          </p>
        </div>

        <div style={cardStyle}>
          <FaQuestionCircle size={30} color="#14B8A6" />
          <h3>FAQs</h3>
          <p style={{ color: "#6B7280" }}>
            Browse frequently asked questions.
          </p>
        </div>
      </div>

      {/* FAQs */}

      <div
        style={{
          background: "#fff",
          borderRadius: "18px",
          padding: "25px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <h2 style={{ marginTop: 0 }}>Frequently Asked Questions</h2>

        <details style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "600" }}>
            How do I book a ride?
          </summary>

          <p style={{ color: "#6B7280" }}>
            Go to Find Ride, select your destination, choose a ride,
            and confirm your booking.
          </p>
        </details>

        <details style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "600" }}>
            How do I cancel my booking?
          </summary>

          <p style={{ color: "#6B7280" }}>
            Open My Rides, select your booking, and click Cancel Ride.
          </p>
        </details>

        <details style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "600" }}>
            How do I reset my password?
          </summary>

          <p style={{ color: "#6B7280" }}>
            Go to Settings → Security → Change Password.
          </p>
        </details>

        <details style={{ marginBottom: "15px" }}>
          <summary style={{ cursor: "pointer", fontWeight: "600" }}>
            How can I become a driver?
          </summary>

          <p style={{ color: "#6B7280" }}>
            Complete Driver Registration and wait for verification.
          </p>
        </details>

        <details>
          <summary style={{ cursor: "pointer", fontWeight: "600" }}>
            Is my payment information secure?
          </summary>

          <p style={{ color: "#6B7280" }}>
            Yes. All transactions are encrypted and securely processed.
          </p>
        </details>
      </div>
    </div>
  );
}