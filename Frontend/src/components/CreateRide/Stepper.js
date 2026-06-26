import { FaMapMarkedAlt, FaCarSide, FaCar, FaCheck } from "react-icons/fa";

export default function Stepper() {
  const steps = [
    {
      title: "Trip Details",
      icon: <FaMapMarkedAlt />,
      active: true,
    },
    {
      title: "Ride Preferences",
      icon: <FaCarSide />,
    },
    {
      title: "Vehicle Details",
      icon: <FaCar />,
    },
    {
      title: "Review & Publish",
      icon: <FaCheck />,
    },
  ];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "18px",
        padding: "25px",
        marginBottom: "25px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              flex: 1,
            }}
          >
            {/* Step */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "80px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: step.active ? "#14B8A6" : "#E2E8F0",
                  color: step.active ? "#fff" : "#64748B",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "20px",
                }}
              >
                {step.icon}
              </div>

              <span
                style={{
                  marginTop: "10px",
                  fontSize: "13px",
                  textAlign: "center",
                  color: step.active ? "#14B8A6" : "#64748B",
                  fontWeight: step.active ? "600" : "500",
                }}
              >
                {step.title}
              </span>
            </div>

            {/* Connecting Line */}
            {index !== steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "3px",
                  background: "#E2E8F0",
                  margin: "0 10px",
                  borderRadius: "5px",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}