import React, { useState } from "react";
import RideDetailsModal from "./RideDetailsModal";
import RideCard from "./RideCard";
import rides from "../../data/rides";

export default function RideList({ activeTab }) {
    const [selectedRide, setSelectedRide] = useState(null);
const [showAll, setShowAll] = useState(false);
  return (
    <div>
      <h3
        style={{
          color: "#122B58",
          marginBottom: "20px",
          fontSize: "22px",
          fontWeight: "700",
        }}
      >
        Upcoming Rides
      </h3>

      {rides
  .filter((ride) => {
    if (activeTab === "upcoming") return ride.status === "upcoming";
    if (activeTab === "completed") return ride.status === "completed";
    if (activeTab === "cancelled") return ride.status === "cancelled";
    return true;
  })
  .slice(0, showAll ? rides.length : 5)
  .map((ride) => (
        <RideCard
  key={ride.id}
  ride={ride}
  onViewDetails={() => setSelectedRide(ride)}
/>
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <button
  onClick={() => setShowAll(!showAll)}
  style={{
    padding: "14px 30px",
    borderRadius: "999px",
    border: "1px solid #14B8A6",
    background: "#fff",
    color: "#14B8A6",
    fontWeight: "700",
    cursor: "pointer",
  }}
>
  {showAll ? "Show Less ↑" : "View All Rides →"}
</button>
      </div>
      <RideDetailsModal
  ride={selectedRide}
  onClose={() => setSelectedRide(null)}
/>
    </div>
  );
}