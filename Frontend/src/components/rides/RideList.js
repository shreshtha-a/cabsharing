import React from "react";
import RideCard from "./RideCard";

const ride = {
  date: "28 Jun, 2025",
  time: "06:00 PM",
  from: "Noida Sector 62",
  fromAddress: "Sector 62, Noida",
  to: "Connaught Place",
  toAddress: "New Delhi",
  price: 250
};

export default function RideList() {
  return (
    <div>
      <h3 style={{
        color:"#122B58",
        marginBottom:"18px"
      }}>
        Upcoming Rides
      </h3>

      <RideCard ride={ride}/>
    </div>
  );
}