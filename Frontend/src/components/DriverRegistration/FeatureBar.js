import {
  FaShieldAlt,
  FaRoute,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";
// in addition>>>

export default function FeatureBar() {
  return (
    <div
      style={{
        marginTop: "35px",
        // background: "#FFFFFF",
        borderRadius: "22px",
        paddingBottom: "50px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.08)",

        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "25px",
      }}
    >
      <Feature
        icon={<FaShieldAlt />}
        title="Verified Rides"
        subtitle="Genuine users only"
      />

      <Feature
        icon={<FaRoute />}
        title="Live Tracking"
        subtitle="Track your trips in real-time"
      />

      <Feature
        icon={<FaWallet />}
        title="Instant Payouts"
        subtitle="Smooth & on-time payments"
      />

      <Feature
        icon={<FaHeadset />}
        title="24/7 Support"
        subtitle="We're here whenever you need us"
      />
    </div>
  );
}

function Feature({ icon, title, subtitle }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        flex: 1,
        minWidth: "220px",
      }}
    >
      <div
        style={{
          width: "55px",
          height: "55px",
          borderRadius: "50%",
          background: "#ECFDF5",
          color: "#14B8A6",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontSize: "24px",
        }}
      >
        {icon}
      </div>

      <div>
        <h4
          style={{
            margin: 0,
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "400",
          }}
        >
          {title}
        </h4>

        <p
          style={{
            margin: "4px 0 0",
            color: "#FFFFFF",
            fontSize: "13px",
            lineHeight: "18px",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}