import { useState } from "react";
import { useNavigate } from "react-router-dom";

const teal = "#00897B";
const tealLight = "#e6f4f2";

const styles = {
  root: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafb",
    color: "#1a2332",
  },
  main: {
    flex: 1,
    minWidth: 0,
    padding: "32px 36px 48px 36px",
    maxWidth: 860,
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "#1a2332",
    fontSize: 24,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontWeight: 600,
    fontSize: 16,
    padding: "8px 0",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 800,
    color: "#1a2332",
    marginBottom: 8,
  },
  pageSubtitle: {
    fontSize: 13,
    color: "#6b7280",
  },
  topIcons: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
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
    fontSize: 18,
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
    cursor: "pointer",
  },
  section: {
    background: "#fff",
    borderRadius: 18,
    padding: "28px",
    marginBottom: 24,
    boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
  },
  settingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0",
    borderBottom: "1px solid #f3f4f6",
    gap: 16,
  },
  settingRowLast: {
    borderBottom: "none",
  },
  rowIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    background: tealLight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: teal,
    fontSize: 22,
    flexShrink: 0,
  },
  rowContent: {
    flex: 1,
    minWidth: 0,
  },
  rowTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: "#1a2332",
    marginBottom: 3,
  },
  rowDesc: {
    fontSize: 13,
    color: "#6b7280",
  },
  rowControl: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexShrink: 0,
  },
  selectControl: {
    border: "1.5px solid #e5e7eb",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13,
    color: "#1a2332",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 500,
    appearance: "none",
    paddingRight: 28,
    position: "relative",
  },
  toggleSwitch: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
  },
  toggleTrack: (active) => ({
    width: 48,
    height: 28,
    background: active ? teal : "#d1d5db",
    borderRadius: 14,
    transition: "background 0.3s ease",
    position: "relative",
    padding: "2px",
  }),
  toggleThumb: (active) => ({
    width: 24,
    height: 24,
    background: "#fff",
    borderRadius: "50%",
    transition: "transform 0.3s ease",
    transform: active ? "translateX(20px)" : "translateX(0)",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  }),
  footer: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    color: "#9ca3af",
    fontSize: 13,
    marginTop: 20,
    padding: "0 4px",
  },
  footerIcon: {
    fontSize: 14,
  },
  selectWrapper: {
    position: "relative",
  },
};

export default function Accessibility() {
  const navigate = useNavigate();
  const [textSize, setTextSize] = useState("Medium");
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [largerTouchTargets, setLargerTouchTargets] = useState(false);

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        
        .accessibility-main {
          flex: 1;
          min-width: 0;
          padding: 32px 36px 48px 36px;
          max-width: 860px;
        }

        .accessibility-header {
          margin-bottom: 24px;
        }

        .setting-row:hover {
          background-color: #fafbfc;
          border-radius: 12px;
          padding: 20px 16px;
          margin: 0 -16px;
        }

        select::-webkit-outer-scroll-button,
        select::-webkit-inner-scroll-button {
          display: none;
        }

        select {
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 16px;
          padding-right: 32px;
        }

        @media (max-width: 768px) {
          .accessibility-main {
            padding: 24px 16px 40px 16px;
          }

          .page-title {
            font-size: 24px !important;
          }

          .topbar {
            flex-wrap: wrap;
            gap: 12px;
          }

          .setting-row {
            flex-direction: column;
            align-items: flex-start !important;
          }

          .row-control {
            width: 100% !important;
            justify-content: flex-end;
            margin-top: 8px;
          }
        }

        @media (max-width: 480px) {
          .accessibility-main {
            padding: 20px 12px 32px 12px;
          }

          .section {
            padding: 20px 16px !important;
            border-radius: 14px;
          }

          .page-title {
            font-size: 22px !important;
          }

          .page-subtitle {
            font-size: 12px !important;
          }

          .row-icon {
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
          }

          .row-title {
            font-size: 14px !important;
          }

          .row-desc {
            font-size: 12px !important;
          }

          select {
            font-size: 12px;
            padding: 6px 10px !important;
          }
        }
      `}</style>

      <div className="accessibility-main" style={styles.main}>
        {/* Header with Back Button */}
        <div style={styles.topbar} className="topbar">
          <button style={styles.backBtn} onClick={() => navigate("/settings")}>
            ← Back to Settings
          </button>
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
              <span style={{ fontSize: 13.5, fontWeight: 600, color: "#1a2332", whiteSpace: "nowrap" }}>Sanchi Arora</span>
              <span style={{ color: "#9ca3af" }}>▾</span>
            </div>
          </div>
        </div>

        {/* Page Title & Subtitle */}
        <div className="accessibility-header">
          <h1 className="page-title" style={styles.pageTitle}>Accessibility</h1>
          <p className="page-subtitle" style={styles.pageSubtitle}>
            Adjust app accessibility settings for a more comfortable experience.
          </p>
        </div>

        {/* Settings Section */}
        <div style={styles.section}>
          {/* Text Size */}
          <div className="setting-row" style={styles.settingRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <div className="row-icon" style={styles.rowIcon}>Aa</div>
              <div style={styles.rowContent}>
                <div className="row-title" style={styles.rowTitle}>Text Size</div>
                <div className="row-desc" style={styles.rowDesc}>Choose your preferred text size.</div>
              </div>
            </div>
            <div className="row-control" style={styles.rowControl}>
              <div style={styles.selectWrapper}>
                <select
                  style={styles.selectControl}
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                >
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                </select>
              </div>
            </div>
          </div>

          {/* High Contrast Mode */}
          <div className="setting-row" style={styles.settingRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <div className="row-icon" style={styles.rowIcon}>◐</div>
              <div style={styles.rowContent}>
                <div className="row-title" style={styles.rowTitle}>High Contrast Mode</div>
                <div className="row-desc" style={styles.rowDesc}>Improve readability with stronger color contrast.</div>
              </div>
            </div>
            <div className="row-control" style={styles.rowControl}>
              <div style={styles.toggleSwitch} onClick={() => setHighContrast(!highContrast)}>
                <div style={styles.toggleTrack(highContrast)}>
                  <div style={styles.toggleThumb(highContrast)} />
                </div>
              </div>
            </div>
          </div>

          {/* Reduce Motion */}
          <div className="setting-row" style={styles.settingRow}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <div className="row-icon" style={styles.rowIcon}>⸱⸱⸱</div>
              <div style={styles.rowContent}>
                <div className="row-title" style={styles.rowTitle}>Reduce Motion</div>
                <div className="row-desc" style={styles.rowDesc}>Minimize animations and transitions.</div>
              </div>
            </div>
            <div className="row-control" style={styles.rowControl}>
              <div style={styles.toggleSwitch} onClick={() => setReduceMotion(!reduceMotion)}>
                <div style={styles.toggleTrack(reduceMotion)}>
                  <div style={styles.toggleThumb(reduceMotion)} />
                </div>
              </div>
            </div>
          </div>

          {/* Larger Touch Targets */}
          <div className="setting-row" style={{ ...styles.settingRow, ...styles.settingRowLast }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
              <div className="row-icon" style={styles.rowIcon}>👆</div>
              <div style={styles.rowContent}>
                <div className="row-title" style={styles.rowTitle}>Larger Touch Targets</div>
                <div className="row-desc" style={styles.rowDesc}>Increase the size of buttons and interactive elements.</div>
              </div>
            </div>
            <div className="row-control" style={styles.rowControl}>
              <div style={styles.toggleSwitch} onClick={() => setLargerTouchTargets(!largerTouchTargets)}>
                <div style={styles.toggleTrack(largerTouchTargets)}>
                  <div style={styles.toggleThumb(largerTouchTargets)} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <div style={styles.footer}>
          <span style={styles.footerIcon}>ℹ</span>
          <span>Changes are saved automatically.</span>
        </div>
      </div>
    </div>
  );
}