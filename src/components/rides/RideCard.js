import Toast from "./Toast";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiDotsVertical,
  HiEye,
  HiPencil,
  HiShare,
  HiXCircle,
} from "react-icons/hi";
export default function RideCard({ ride, onViewDetails }) {
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();
const [toast, setToast] = useState("");

const handleEditRide = () => {
  navigate(`/rides/edit/${ride.id}`);
  setShowMenu(false);
};

const handleShare = async () => {
  const rideLink = `${window.location.origin}/rides/${ride.id}`;

  try {
    await navigator.clipboard.writeText(rideLink);

    setToast("Ride link copied!");

    setTimeout(() => {
      setToast("");
    }, 2000);
  } catch (err) {
    setToast("Unable to copy link");
  }

  setShowMenu(false);
};
  return (
    <div style={styles.card}>
      {/* Left */}
      <div style={styles.left}>
        <div style={styles.date}>{ride.date}</div>
        <div style={styles.time}>{ride.time}</div>
      </div>

      {/* Middle */}
      <div style={styles.middle}>
        <div>
          <div style={styles.city}>{ride.from}</div>
          <div style={styles.location}>{ride.fromAddress}</div>
        </div>

        <div style={styles.line}></div>

        <div>
          <div style={styles.city}>{ride.to}</div>
          <div style={styles.location}>{ride.toAddress}</div>
        </div>
      </div>

      {/* Right */}
      <div style={styles.right}>

  <button
    style={styles.menuButton}
    onClick={() => setShowMenu(!showMenu)}
  >
    <HiDotsVertical />
  </button>

  {showMenu && (
    <div style={styles.menu}>

      <div
        style={styles.menuItem}
        onClick={onViewDetails}
      >
        <HiEye />
        View Details
      </div>

      <div
  style={styles.menuItem}



  onClick={handleEditRide}
>
  <HiPencil />
  Edit Ride
</div>

      <div
  style={styles.menuItem}
  onClick={handleShare}
>
  <HiShare />
  Share Ride
</div>

      <div
        style={{
          ...styles.menuItem,
          color: "#DC2626",
        }}
      >
        <HiXCircle />
        Cancel Ride
      </div>

    </div>
  )}

  <div style={styles.price}>
    ₹{ride.price}
  </div>

  <button
    style={styles.button}
    onClick={onViewDetails}
  >
    View Details
  </button>

</div>

<Toast message={toast} />
    </div>
  );
}

const styles = {

card:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"24px",
background:"#fff",
borderRadius:"22px",
border:"1px solid #E8EEF5",
marginBottom:"18px",
boxShadow:"0 8px 24px rgba(15,36,84,.05)"
},

left:{
width:"150px"
},

date:{
fontWeight:"700",
color:"#122B58",
marginBottom:"10px"
},

time:{
color:"#64748B"
},

middle:{
flex:1,
display:"flex",
flexDirection:"column",
gap:"18px",
padding:"0 30px"
},

line:{
width:"2px",
height:"34px",
background:"#99F6E4",
marginLeft:"8px"
},

city:{
fontWeight:"700",
fontSize:"18px",
color:"#122B58"
},

location:{
fontSize:"14px",
color:"#64748B",
marginTop:"4px"
},

right: {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: "14px",
},

price:{
fontSize:"28px",
fontWeight:"800",
color:"#122B58"
},

button:{
padding:"12px 22px",
borderRadius:"999px",
border:"1px solid #14B8A6",
background:"#fff",
color:"#14B8A6",
fontWeight:"700",
cursor:"pointer"
},

  menuButton: {
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "22px",
    alignSelf: "flex-end",
  },

  menu: {
    position: "absolute",
    background: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "14px",
    boxShadow: "0 12px 30px rgba(0,0,0,.12)",
    marginTop: "34px",
    width: "180px",
    right: 0,
    zIndex: 20,
  },

  menuItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "12px 16px",
    cursor: "pointer",
    fontSize: "14px",
  },
};