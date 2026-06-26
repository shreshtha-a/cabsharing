import {
  FaCoins,
  FaLeaf,
  FaUsers,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

export default function BenefitsCard() {
  const benefits = [
    {
      icon: <FaCoins />,
      title: "Earn Money",
      description: "Recover fuel costs by sharing empty seats with passengers.",
      color: "#F59E0B",
    },
    {
      icon: <FaLeaf />,
      title: "Eco Friendly",
      description: "Reduce traffic congestion and lower carbon emissions.",
      color: "#22C55E",
    },
    {
      icon: <FaUsers />,
      title: "Build Community",
      description: "Meet fellow travellers and create trusted connections.",
      color: "#2563EB",
    },
    {
        icon: <FaShieldAlt />,
        title: "Safe & Secure",
        description: "Verified drivers and secure ride matching for every journey.",
        color: "#14B8A6",
    },
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "20px",
        padding: "30px",
        marginTop: "30px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              color: "#0F172A",
              fontWeight: "700",
            }}
          >
            Why Offer a Ride?
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#64748B",
            }}
          >
            Share your journey and enjoy these amazing benefits.
          </p>
        </div>

        <button
          style={{
            background: "#14B8A6",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            padding: "12px 18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontWeight: "600",
          }}
        >
          Learn More
          <FaArrowRight />
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            style={{
              border: "1px solid #E2E8F0",
              borderRadius: "18px",
              padding: "22px",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "55px",
                borderRadius: "50%",
                background: `${benefit.color}20`,
                color: benefit.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "24px",
                marginBottom: "18px",
              }}
            >
              {benefit.icon}
            </div>

            <h3
              style={{
                margin: 0,
                marginBottom: "10px",
                color: "#0F172A",
              }}
            >
              {benefit.title}
            </h3>

            <p
              style={{
                margin: 0,
                color: "#64748B",
                lineHeight: "1.6",
                fontSize: "14px",
              }}
            >
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}