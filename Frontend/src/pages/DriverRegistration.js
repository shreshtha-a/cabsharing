import DriverHero from "../components/DriverRegistration/DriverHero";


export default function DriverRegistration() {
  return (
    <div
      style={{
        height: "100vh",
        width: "100dvw",
        background: "#F8FAFC",
        padding: "0px",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "100dvw",
          height: "100dvh",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <DriverHero /> 
      </div>

      
    </div>
  );
}