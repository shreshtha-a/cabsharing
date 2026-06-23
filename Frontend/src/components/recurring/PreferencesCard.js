import { useState } from "react";

export default function PreferencesCard() {
  const [editing, setEditing] = useState(false);
  const [rideVibe, setRideVibe] = useState("Quiet");
  const [gender, setGender] = useState("No Preference");
  const [vehicleType, setVehicleType] = useState("Any");
  const [maxFare, setMaxFare] = useState("Any");
  const [seats, setSeats] = useState("1 Seat");
  const [matching, setMatching] = useState("Verified riders only");

  return (
    <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #E5E7EB" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>⚙️</div>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Preferences: The Usual</span>
        </div>
        <button
          onClick={() => setEditing(e => !e)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#14B8A6", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}
        >
          ✏️ {editing ? "Save" : "Edit"}
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
        {[
          { label: "Ride vibe", value: rideVibe, setter: setRideVibe, options: ["Quiet", "Chatty", "Music OK"] },
          { label: "Gender Preference", value: gender, setter: setGender, options: ["No Preference", "Female Only", "Male Only"] },
          { label: "Vehicle type", value: vehicleType, setter: setVehicleType, options: ["Any", "Sedan", "SUV", "Hatchback"] },
          { label: "Max fare per seat", value: maxFare, setter: setMaxFare, options: ["Any", "₹100", "₹150", "₹200", "₹300"] },
          { label: "Seats to book", value: seats, setter: setSeats, options: ["1 Seat", "2 Seats", "3 Seats"] },
          { label: "Matching", value: matching, setter: setMatching, options: ["Verified riders only", "All riders"] },
        ].map(({ label, value, setter, options }) => (
          <div key={label}>
            <div style={{ fontSize: "10px", color: "#94A3B8", fontWeight: "600", marginBottom: "4px" }}>{label}</div>
            {editing ? (
              <select
                value={value}
                onChange={e => setter(e.target.value)}
                style={{ border: "1px solid #E5E7EB", borderRadius: "8px", padding: "5px 8px", fontSize: "13px", fontWeight: "600", color: "#0F2D52", background: "#fff", outline: "none", width: "100%", cursor: "pointer" }}
              >
                {options.map(o => <option key={o}>{o}</option>)}
              </select>
            ) : (
              <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F2D52" }}>{value}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}