import React from "react";

export default function RideCard({ ride }) {
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
        <div style={styles.price}>₹{ride.price}</div>

        <button style={styles.button}>
          View Details
        </button>
      </div>
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

right:{
display:"flex",
flexDirection:"column",
alignItems:"flex-end",
gap:"16px"
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
}

};