import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teal = "#00897B";
const tealLight = "#e6f4f2";

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
  card: {
    background: "#fff",
    borderRadius: 18,
    padding: "24px 28px 8px 28px",
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
  },
  intro: {
    fontSize: 14.5,
    color: "#374151",
    lineHeight: 1.6,
    paddingBottom: 20,
    borderBottom: "1px solid #f0f1f3",
    marginBottom: 4,
  },
  item: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "20px 0",
    borderBottom: "1px solid #f0f1f3",
    cursor: "pointer",
  },
  itemLast: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    padding: "20px 0",
    borderBottom: "none",
    cursor: "pointer",
  },
  numberBadge: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: teal,
    color: "#fff",
    fontWeight: 700,
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemBody: { flex: 1, minWidth: 0 },
  itemTitle: { fontSize: 16, fontWeight: 700, color: "#1a2332" },
  itemText: { fontSize: 13.5, color: "#6b7280", marginTop: 6, lineHeight: 1.65 },
  chevron: (open) => ({
    color: "#9ca3af",
    fontSize: 16,
    flexShrink: 0,
    marginTop: 6,
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.15s",
  }),
  footerNote: {
    marginTop: 22,
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: tealLight,
    borderRadius: 14,
    padding: "14px 18px",
  },
  footerIcon: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal,
    fontSize: 15,
    flexShrink: 0,
  },
  footerText: { fontSize: 13.5, color: "#374151", fontWeight: 500 },
};

const terms = [
  {
    title: "Use of Services",
    text: "Hoppin provides a platform that connects riders with drivers. By using our services, you agree to use the platform only for lawful purposes and in accordance with these terms.",
  },
  {
    title: "User Responsibilities",
    text: "You agree to provide accurate information, maintain the security of your account, and treat other users with respect. Any misuse or fraudulent activity may result in account suspension.",
  },
  {
    title: "Bookings and Payments",
    text: "All bookings are subject to availability. Fares are displayed before you confirm your ride. Payments must be made through the available payment methods on our platform.",
  },
  {
    title: "Cancellations and Refunds",
    text: "Cancellations may be subject to charges based on timing and circumstances. Refunds, if applicable, will be processed to the original payment method.",
  },
  {
    title: "Limitation of Liability",
    text: "Hoppin is not liable for any indirect, incidental, or consequential damages arising from the use of our services.",
  },
];

export default function TermsConditions() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div style={styles.main}>
      <style>{`
        @media (max-width: 480px) {
          .terms-main { padding: 16px 10px 32px 10px !important; }
        }
      `}</style>

      <div style={styles.backRow} onClick={() => navigate("/settings")}>
        <span style={{ fontSize: 18 }}>←</span>
        <span>Back to Settings</span>
      </div>

      <div style={styles.topbar}>
        <div>
          <div style={styles.pageTitle}>Terms &amp; Conditions</div>
          <div style={styles.pageSubtitle}>Please read these terms and conditions carefully before using Hoppin.</div>
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

      <div style={styles.card}>
        <div style={styles.intro}>
          Welcome to Hoppin! By accesssing or using our website and services, you agree to be bound by the
          following terms and conditions. Please read them carefully.
        </div>

        {terms.map((term, i) => {
          const open = openIndex === i;
          const isLast = i === terms.length - 1;
          return (
            <div
              key={term.title}
              style={isLast ? styles.itemLast : styles.item}
              onClick={() => setOpenIndex(open ? -1 : i)}
            >
              <div style={styles.numberBadge}>{i + 1}</div>
              <div style={styles.itemBody}>
                <div style={styles.itemTitle}>{term.title}</div>
                {open && <div style={styles.itemText}>{term.text}</div>}
              </div>
              <span style={styles.chevron(open)}>▾</span>
            </div>
          );
        })}
      </div>

      <div style={styles.footerNote}>
        <div style={styles.footerIcon}>🛡️</div>
        <div style={styles.footerText}>By continuing to use Hoppin, you agree to these terms and conditions.</div>
      </div>
    </div>
  );
}