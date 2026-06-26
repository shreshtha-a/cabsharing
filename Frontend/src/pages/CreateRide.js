import CreateRideHeader from "../components/CreateRide/CreateRideHeader";
import TripDetailsCard from "../components/CreateRide/TripDetailsCard";
import TripPreviewCard from "../components/CreateRide/TripPreviewCard";
import BenefitsCard from "../components/CreateRide/BenefitsCard";
import Stepper from "../components/CreateRide/Stepper";

export default function CreateRide() {
  return (
    <>
      <CreateRideHeader />
      <Stepper/>

      <div
        style={{
          display: "flex",
          gap: "16px",
          padding: "20px",
        }}
      >
        <TripDetailsCard />
        <TripPreviewCard />
      </div>

      <BenefitsCard />
    </>
  );
}