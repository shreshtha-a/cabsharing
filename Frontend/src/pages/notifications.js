import { useState } from "react";

const teal = "#0B9E8E";
const tealLight = "#E6F7F6";
const textPrimary = "#1A1A2E";
const textSecondary = "#6B7280";
const bgMain = "#F8FAFA";
const white = "#FFFFFF";
const unread = "#10B981";
const borderColor = "#E5E7EB";

// ── Notification Icons ─────────────────────────────────────────────────────

const NotiIconCar = () => (
  <svg width="22" height="22" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M5 11l1.5-4.5h11L19 11" />
    <rect x="3" y="11" width="18" height="6" rx="2" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
  </svg>
);

const NotiIconPin = () => (
  <svg width="22" height="22" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2C8.686 2 6 4.686 6 8c0 5.25 6 13 6 13s6-7.75 6-13c0-3.314-2.686-6-6-6z" />
    <circle cx="12" cy="8" r="2.25" />
  </svg>
);

const NotiIconStar = () => (
  <svg width="22" height="22" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.4" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const NotiIconGift = () => (
  <svg width="22" height="22" fill="none" stroke="#8B5CF6" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="8" width="18" height="4" rx="1" />
    <rect x="5" y="12" width="14" height="9" rx="1" />
    <path d="M12 8v13M8 8c0-2 1.5-4 4-4s4 2 4 4" />
  </svg>
);

const NotiIconMegaphone = () => (
  <svg width="22" height="22" fill="none" stroke="#8B5CF6" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 11v2a1 1 0 001 1h1l2 4h1v-4h8l2 2V7l-2 2H8V9H7L5 13H4a1 1 0 01-1-1v-1" />
    <path d="M19 7l2-2M19 12l2 2M19 9.5h2" />
  </svg>
);

const NotiIconShield = () => (
  <svg width="22" height="22" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11C5.5 20.74 2 16 2 11V5l10-3z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const NotiIconWallet = () => (
  <svg width="22" height="22" fill="none" stroke="#3B82F6" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 14a1 1 0 110-2 1 1 0 010 2z" fill="#3B82F6" />
    <path d="M2 11h20M6 7V5a2 2 0 012-2h8a2 2 0 012 2v2" />
  </svg>
);

const NotiIconBell = () => (
  <svg width="22" height="22" fill="none" stroke="#F59E0B" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────

const tabs = ["All", "Rides", "Offers", "Updates", "System"];

const notificationsData = [
  {
    id: 1,
    icon: <NotiIconCar />,
    iconBg: tealLight,
    title: "Rohit Kumar has accepted your ride request.",
    subtitle: "Your ride to Sharda University is confirmed.",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    icon: <NotiIconPin />,
    iconBg: tealLight,
    title: "Your driver is arriving soon.",
    subtitle: "Rohit Kumar is 3 mins away from your location.",
    time: "5 mins ago",
    unread: true,
  },
  {
    id: 3,
    icon: <NotiIconStar />,
    iconBg: "#FEF3C7",
    title: "Don't forget to rate your last ride with Rohit.",
    subtitle: "Your feedback helps us improve.",
    time: "Yesterday, 8:30 PM",
    unread: false,
  },
  {
    id: 4,
    icon: <NotiIconGift />,
    iconBg: "#EDE9FE",
    title: "You earned ₹50 cashback on your last ride!",
    subtitle: "The amount has been added to your wallet.",
    time: "Yesterday, 6:15 PM",
    unread: true,
  },
  {
    id: 5,
    icon: <NotiIconMegaphone />,
    iconBg: "#EDE9FE",
    title: "New referral reward is available!",
    subtitle: "Invite friends & earn exciting rewards.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    icon: <NotiIconShield />,
    iconBg: tealLight,
    title: "Your account is now more secure.",
    subtitle: "Two-Factor Authentication has been enabled successfully.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 7,
    icon: <NotiIconWallet />,
    iconBg: "#EFF6FF",
    title: "Payment of ₹210 is successful.",
    subtitle: "Paid to Rohit Kumar for your ride.",
    time: "3 days ago",
    unread: false,
  },
  {
    id: 8,
    icon: <NotiIconBell />,
    iconBg: "#FEF3C7",
    title: "Special offer for you!",
    subtitle: (
      <>
        Get 20% off on your next 3 rides. Use code:{" "}
        <span style={{ color: teal, fontWeight: 600 }}>HOPIN20</span>
      </>
    ),
    time: "5 days ago",
    unread: false,
  },
];

// ── NotificationItem ───────────────────────────────────────────────────────

function NotificationItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
        padding: "16px 0",
        borderBottom: `1px solid ${borderColor}`,
        cursor: "pointer",
        transition: "background 0.12s",
        borderRadius: 8,
        paddingLeft: 8,
        paddingRight: 8,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = bgMain)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {/* Icon */}
      <div
        style={{
          width: 46,
          height: 46,
          minWidth: 46,
          borderRadius: "50%",
          background: item.iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.icon}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14.5,
            fontWeight: item.unread ? 600 : 500,
            color: textPrimary,
            lineHeight: 1.45,
          }}
        >
          {item.title}
        </div>
        <div style={{ fontSize: 13, color: textSecondary, marginTop: 2, lineHeight: 1.4 }}>
          {item.subtitle}
        </div>
      </div>

      {/* Time + unread dot */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 12.5, color: textSecondary }}>{item.time}</span>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: item.unread ? unread : borderColor,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
      </div>
    </div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

export default function Notifications() {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        padding: "32px 32px 24px",
        background: bgMain,
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: textPrimary,
            letterSpacing: -0.3,
            margin: 0,
          }}
        >
          Notifications
        </h1>
        <p style={{ fontSize: 13.5, color: textSecondary, marginTop: 6 }}>
          Stay updated with all your activities and alerts.
        </p>
      </div>

      {/* Tabs + Mark all as read */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 4,
        }}
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "7px 18px",
                borderRadius: 9999,
                border:
                  activeTab === tab
                    ? `1.5px solid ${teal}`
                    : `1.5px solid ${borderColor}`,
                background: activeTab === tab ? tealLight : white,
                color: activeTab === tab ? teal : textSecondary,
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: 13.5,
                cursor: "pointer",
                transition: "all 0.15s",
                fontFamily: "inherit",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            background: "none",
            border: "none",
            color: teal,
            fontWeight: 500,
            fontSize: 13.5,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <svg width="16" height="16" fill="none" stroke={teal} strokeWidth="2.2" viewBox="0 0 24 24">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Mark all as read
        </button>
      </div>

      {/* Notifications List */}
      <div
        style={{
          background: white,
          borderRadius: 16,
          padding: "0 12px",
          border: `1px solid ${borderColor}`,
          marginTop: 16,
        }}
      >
        {notificationsData.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </div>

      {/* Load More */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "11px 28px",
            borderRadius: 9999,
            border: `1.5px solid ${borderColor}`,
            background: white,
            color: textPrimary,
            fontWeight: 500,
            fontSize: 14,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Load more notifications
          <svg width="18" height="18" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}