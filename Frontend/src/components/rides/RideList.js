import React from "react";
import RideCard from "./RideCard";
import rides from "../../data/rides";

export default function RideList() {
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

      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <button
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
          View All Rides →
        </button>
      </div>
    </div>
  );
}