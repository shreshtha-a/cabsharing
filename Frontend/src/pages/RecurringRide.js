import { useState, useEffect } from "react";

import RecurringHeader from "../components/recurring/RecurringHeader";
import RideCard from "../components/recurring/RideCard";
import ScheduleCard from "../components/recurring/ScheduleCard";

export default function RecurringRide() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 1024
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  const [selectedRide, setSelectedRide] = useState(1);

  const [rides, setRides] = useState([
    {
      id: 1,
      title: "Morning Commute",
      time: "08:15 AM",
      pickup: "Sharda University",
      drop: "Noida Sector 62",
      active: true,
    },
    {
      id: 2,
      title: "Evening Return",
      time: "06:30 PM",
      pickup: "Noida Sector 62",
      drop: "Sharda University",
      active: false,
    },
  ]);

  const toggleRide = (id) => {
    setRides((prev) =>
      prev.map((ride) =>
        ride.id === id
          ? {
              ...ride,
              active: !ride.active,
            }
          : ride
      )
    );
  };

  const addRide = () => {
    const newRide = {
      id: Date.now(),
      title: "New Ride",
      time: "09:00 AM",
      pickup: "Pickup",
      drop: "Destination",
      active: true,
    };

    setRides((prev) => [...prev, newRide]);
    setSelectedRide(newRide.id);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8FBFC",
        padding: "20px",
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <RecurringHeader />

      <div
        style={{
          display: "grid",
        gridTemplateColumns: isMobile
  ? "1fr"
  : "260px 390px 370px",
          gap: "20px",
          marginTop: "24px",
          width: "100%",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "700",
              color: "#94A3B8",
              letterSpacing: "1px",
              marginBottom: "16px",
            }}
          >
            MY RECURRING RIDES
          </div>

          <RideCard
            rides={rides}
            selectedRide={selectedRide}
            setSelectedRide={setSelectedRide}
            toggleRide={toggleRide}
            addRide={addRide}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <ScheduleCard />

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #E5E7EB",
              minHeight: "220px",
            }}
          >
            <h3>Route</h3>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #E5E7EB",
              minHeight: "220px",
            }}
          >
            <h3>Preferences</h3>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #E5E7EB",
              minHeight: "250px",
            }}
          >
            <h3>Ride Summary</h3>
          </div>

          <div
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "24px",
              border: "1px solid #E5E7EB",
              minHeight: "250px",
            }}
          >
            <h3>Wallet & Rewards</h3>
          </div>
        </div>
      </div>
    </div>
  );
}