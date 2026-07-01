import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teal = "#00897B";
const tealLight = "#e6f4f2";
const tealDark = "#00695C";

const styles = {
  main: {
    flex: 1,
    minWidth: 0,
    padding: "32px 36px 48px 36px",
    maxWidth: 900,
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    color: "#1a2332",
  },
  backRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 14.5,
    color: "#1a2332",
    marginBottom: 22,
    width: "fit-content",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
    flexWrap: "wrap",
    gap: 14,
  },
  pageTitle: { fontSize: 30, fontWeight: 800, color: "#1a2332" },
  pageSubtitle: { fontSize: 14, color: "#6b7280", marginTop: 4 },
  topIcons: { display: "flex", alignItems: "center", gap: 14 },
  iconBtn: {
    position: "relative",
    background: "#f3f4f6",
    border: "none",
    borderRadius: 50,
    width: 42,
    height: 42,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#374151",
    fontSize: 16,
  },
  notifDot: (color) => ({
    position: "absolute",
    top: 5,
    right: 5,
    background: color,
    color: "#fff",
    borderRadius: 99,
    fontSize: 10,
    fontWeight: 700,
    minWidth: 16,
    height: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 50,
    background: "linear-gradient(135deg,#80cbc4,#00897B)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 700,
    fontSize: 16,
    flexShrink: 0,
  },
  searchWrap: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#fff",
    border: "1.5px solid #e5e7eb",
    borderRadius: 14,
    padding: "14px 18px",
    marginBottom: 28,
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
  },
  searchInput: {
    border: "none",
    outline: "none",
    flex: 1,
    fontSize: 14.5,
    background: "transparent",
    color: "#1a2332",
  },
  faqHeading: { fontSize: 13, fontWeight: 700, color: "#1a2332", marginBottom: 14 },
  faqList: { display: "flex", flexDirection: "column", gap: 10 },
  faqItem: (open) => ({
    background: "#fff",
    borderRadius: 14,
    border: `1.5px solid ${open ? teal : "#eef0f2"}`,
    padding: "16px 20px",
    boxShadow: open ? "0 2px 10px rgba(0,137,123,0.08)" : "0 1px 6px rgba(0,0,0,0.03)",
    cursor: "pointer",
    transition: "all 0.15s",
  }),
  faqRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 14,
  },
  faqQuestion: (open) => ({
    fontSize: 15,
    fontWeight: 700,
    color: open ? teal : "#1a2332",
  }),
  faqChevron: (open) => ({
    color: open ? teal : "#9ca3af",
    fontSize: 16,
    flexShrink: 0,
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.15s",
  }),
  faqAnswer: {
    fontSize: 13.5,
    color: "#6b7280",
    lineHeight: 1.6,
    marginTop: 10,
  },
  helpBanner: {
    marginTop: 26,
    background: "linear-gradient(155deg, #e8f5f3 0%, #d6efeb 100%)",
    borderRadius: 16,
    padding: "22px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 18,
    flexWrap: "wrap",
  },
  helpLeft: { display: "flex", alignItems: "center", gap: 14 },
  helpIcon: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal,
    fontSize: 20,
    flexShrink: 0,
  },
  helpTitle: { fontSize: 15, fontWeight: 700, color: "#1a2332" },
  helpDesc: { fontSize: 12.5, color: "#4b5563", marginTop: 2 },
  helpBtns: { display: "flex", gap: 10, flexWrap: "wrap" },
  emailBtn: {
    border: `1.5px solid ${teal}`,
    background: "#fff",
    color: teal,
    borderRadius: 30,
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 13.5,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
  },
  chatBtn: {
    border: "none",
    background: teal,
    color: "#fff",
    borderRadius: 30,
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 13.5,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
  },
  reportBtn: {
    border: "1.5px solid #ef4444",
    background: "#fff",
    color: "#ef4444",
    borderRadius: 30,
    padding: "10px 18px",
    fontWeight: 700,
    fontSize: 13.5,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    whiteSpace: "nowrap",
  },
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(17, 24, 39, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    zIndex: 50,
  },
  modalCard: {
    background: "#fff",
    borderRadius: 18,
    padding: "26px 26px 22px 26px",
    width: "100%",
    maxWidth: 440,
    boxShadow: "0 12px 40px rgba(0,0,0,0.18)",
  },
  modalHeader: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 6,
  },
  modalTitle: { fontSize: 17, fontWeight: 800, color: "#1a2332" },
  modalDesc: { fontSize: 12.5, color: "#6b7280", marginBottom: 16, lineHeight: 1.5 },
  modalCloseBtn: {
    border: "none",
    background: "#f3f4f6",
    borderRadius: "50%",
    width: 28,
    height: 28,
    cursor: "pointer",
    color: "#374151",
    fontSize: 14,
    flexShrink: 0,
  },
  modalLabel: { fontSize: 12.5, fontWeight: 700, color: "#1a2332", marginBottom: 6, marginTop: 14 },
  modalSelect: {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13.5,
    color: "#1a2332",
    background: "#fff",
  },
  modalTextarea: {
    width: "100%",
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "10px 12px",
    fontSize: 13.5,
    color: "#1a2332",
    minHeight: 90,
    resize: "vertical",
    fontFamily: "inherit",
  },
  modalSubmitBtn: {
    border: "none",
    background: "#ef4444",
    color: "#fff",
    borderRadius: 30,
    padding: "11px 0",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    width: "100%",
    marginTop: 18,
  },
  modalSuccess: {
    fontSize: 13.5,
    color: teal,
    fontWeight: 600,
    textAlign: "center",
    padding: "10px 0",
  },
};

const faqs = [
  {
    q: "How do I book a ride?",
    a: "Open the Hopin app, enter your pickup and drop location, choose a ride option and confirm your booking. You'll receive driver details once a ride is assigned.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Hopin accepts credit/debit cards, UPI, net banking, and in-app wallet balance. You can manage and add payment methods from the Wallet section.",
  },
  {
    q: "How can I track my ride?",
    a: "Once your ride is confirmed, you can track your driver's live location in real time from the 'My Rides' screen. You'll also get notifications as your driver approaches.",
  },
  {
    q: "Can I cancel or modify my ride?",
    a: "Yes, you can cancel or modify your ride from the 'My Rides' page before the driver arrives. Note that cancellation fees may apply depending on timing.",
  },
  {
    q: "How do I get a refund?",
    a: "Refunds for eligible cancellations or payment issues are processed automatically to your original payment method within 5-7 business days. You can also raise a request via Contact Support.",
  },
  {
    q: "I forgot my password. What should I do?",
    a: "Click 'Forgot Password' on the login screen and follow the instructions sent to your registered email or phone number to reset your password.",
  },
  {
    q: "How do I contact my driver?",
    a: "Once a driver is assigned, you can call or message them directly from the ride tracking screen without sharing your personal phone number.",
  },
  {
    q: "How do I report an issue or give feedback?",
    a: "Go to Help Center > Report an Issue, or use the feedback option after completing a ride to let us know about any problems or suggestions.",
  },
];

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={styles.faqItem(open)} onClick={onToggle}>
      <div style={styles.faqRow}>
        <span style={styles.faqQuestion(open)}>{q}</span>
        <span style={styles.faqChevron(open)}>▾</span>
      </div>
      {open && <div style={styles.faqAnswer}>{a}</div>}
    </div>
  );
}

export default function HelpCenter() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [reportOpen, setReportOpen] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [reportReason, setReportReason] = useState("Inappropriate behavior");
  const [reportDetails, setReportDetails] = useState("");

  const closeReportModal = () => {
    setReportOpen(false);
    setReportSubmitted(false);
    setReportReason("Inappropriate behavior");
    setReportDetails("");
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your report-abuse API endpoint
    setReportSubmitted(true);
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.main}>
      <style>{`
        @media (max-width: 480px) {
          .help-main { padding: 16px 10px 32px 10px !important; }
        }
      `}</style>

      <div style={styles.backRow} onClick={() => navigate("/settings")}>
        <span style={{ fontSize: 18 }}>←</span>
        <span>Back to Settings</span>
      </div>

      <div style={styles.topbar}>
        <div>
          <div style={styles.pageTitle}>Help Center</div>
          <div style={styles.pageSubtitle}>Find answers to common questions and get the help you need.</div>
        </div>
        <div style={styles.topIcons}>
          <button style={styles.iconBtn}>☀️</button>
          <button style={{ ...styles.iconBtn, position: "relative" }}>
            💬
            <span style={styles.notifDot(teal)}>2</span>
          </button>
          <button style={{ ...styles.iconBtn, position: "relative" }}>
            🔔
            <span style={styles.notifDot("#ef4444")}>3</span>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={styles.avatar}>SA</div>
            <span style={{ fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>Sanchi Arora</span>
            <span style={{ color: "#9ca3af" }}>▾</span>
          </div>
        </div>
      </div>

      <div style={styles.searchWrap}>
        <span style={{ color: "#9ca3af", fontSize: 16 }}>🔍</span>
        <input
          style={styles.searchInput}
          placeholder="Search for help articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.faqHeading}>Frequently Asked Questions</div>

      <div style={styles.faqList}>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))
        ) : (
          <div style={{ fontSize: 13.5, color: "#6b7280", padding: "10px 4px" }}>
            No results found for "{search}".
          </div>
        )}
      </div>

      <div style={styles.helpBanner}>
        <div style={styles.helpLeft}>
          <div style={styles.helpIcon}>💬</div>
          <div>
            <div style={styles.helpTitle}>Still need help?</div>
            <div style={styles.helpDesc}>Contact our support team and we'll be happy to help.</div>
          </div>
        </div>
        <div style={styles.helpBtns}>
          <button style={styles.emailBtn}>✉️ Email Support</button>
          <button style={styles.chatBtn}>💬 Chat with us</button>
          <button style={styles.reportBtn} onClick={() => setReportOpen(true)}>🚩 Report Abuse</button>
        </div>
      </div>

      {reportOpen && (
        <div style={styles.modalOverlay} onClick={closeReportModal}>
          <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <div>
                <div style={styles.modalTitle}>Report Abuse</div>
              </div>
              <button style={styles.modalCloseBtn} onClick={closeReportModal}>✕</button>
            </div>
            <div style={styles.modalDesc}>
              Let us know about any abusive behavior, harassment, or safety concern. Our team reviews every report.
            </div>

            {reportSubmitted ? (
              <div style={styles.modalSuccess}>
                ✓ Thanks — your report has been submitted. Our team will look into it shortly.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit}>
                <div style={styles.modalLabel}>Reason</div>
                <select
                  style={styles.modalSelect}
                  value={reportReason}
                  onChange={(e) => setReportReason(e.target.value)}
                >
                  {[
                    "Inappropriate behavior",
                    "Harassment or threats",
                    "Unsafe driving",
                    "Discrimination",
                    "Fraud or scam",
                    "Other",
                  ].map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>

                <div style={styles.modalLabel}>Details</div>
                <textarea
                  style={styles.modalTextarea}
                  placeholder="Describe what happened, including ride ID or user name if known..."
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  required
                />

                <button type="submit" style={styles.modalSubmitBtn}>
                  Submit Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}