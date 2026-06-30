import React from "react";
import { HiTrendingUp, HiCurrencyRupee } from "react-icons/hi";

export default function EarningsCard() {
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>Earnings Overview</h3>

        <div style={styles.icon}>
          <HiCurrencyRupee size={22} />
        </div>
      </div>

      <h1 style={styles.amount}>₹2,430</h1>

      <p style={styles.subtitle}>
        Earned from your offered rides
      </p>

      <div style={styles.stats}>
        <div>
          <div style={styles.label}>This Month</div>
          <div style={styles.value}>₹980</div>
        </div>

        <div>
          <div style={styles.label}>Growth</div>

          <div style={styles.growth}>
            <HiTrendingUp />
            18%
          </div>
        </div>
      </div>

      <button style={styles.button}>
        View Analytics
      </button>
    </div>
  );
}

const styles = {

card:{
background:"#fff",
borderRadius:"24px",
padding:"24px",
border:"1px solid #E8EEF5",
boxShadow:"0 10px 30px rgba(15,36,84,.05)"
},

header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center"
},

title:{
margin:0,
fontSize:"18px",
fontWeight:"700",
color:"#122B58"
},

icon:{
width:"46px",
height:"46px",
borderRadius:"50%",
background:"#EDFDFB",
display:"flex",
justifyContent:"center",
alignItems:"center",
color:"#14B8A6"
},

amount:{
margin:"22px 0 8px",
fontSize:"38px",
color:"#122B58"
},

subtitle:{
margin:0,
fontSize:"14px",
color:"#64748B"
},

stats:{
display:"flex",
justifyContent:"space-between",
marginTop:"24px",
padding:"18px 0",
borderTop:"1px solid #F1F5F9",
borderBottom:"1px solid #F1F5F9"
},

label:{
fontSize:"13px",
color:"#94A3B8"
},

value:{
marginTop:"4px",
fontWeight:"700",
color:"#122B58"
},

growth:{
marginTop:"4px",
display:"flex",
alignItems:"center",
gap:"4px",
fontWeight:"700",
color:"#10B981"
},

button:{
marginTop:"20px",
width:"100%",
padding:"14px",
border:"none",
borderRadius:"999px",
background:"#14B8A6",
color:"#fff",
fontWeight:"700",
cursor:"pointer"
}

};