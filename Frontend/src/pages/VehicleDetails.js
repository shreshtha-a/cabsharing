import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, HelpCircle, Shield, CheckCircle, Wind, Zap, Usb, Music, Droplets, Baby, Briefcase, PawPrint, Car } from 'lucide-react';

const colors = { teal:'#13C9B8', navy:'#1A2332', gray:'#6B7280', lightGray:'#F5F7FA', white:'#FFFFFF', border:'#E5E7EB', bgLight:'#F3F4F6', bgTeal:'#E8FAF9', borderTeal:'#B2EDEA' };

const amenitiesList = [
  { id:'ac',      label:'AC Available',       icon: Wind      },
  { id:'charger', label:'Phone Charger',       icon: Zap       },
  { id:'usb',     label:'USB Charging',        icon: Usb       },
  { id:'music',   label:'Music System',        icon: Music     },
  { id:'water',   label:'Water Bottle',        icon: Droplets  },
  { id:'child',   label:'Child Seat',          icon: Baby      },
  { id:'luggage', label:'Extra Luggage Space', icon: Briefcase },
  { id:'pet',     label:'Pet Friendly',        icon: PawPrint  },
];

function StepBar({ current }) {
  const steps = ["Trip Details","Ride Preferences","Vehicle Details","Review & Publish"];
  return (
    <div style={{ display:"flex", alignItems:"center" }}>
      {steps.map((label,i) => (
        <div key={label} style={{ display:"flex", alignItems:"center", flex: i < steps.length-1 ? 1 : 0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", background: i<=current?colors.teal:colors.border, color: i<=current?colors.white:colors.gray }}>
              {i<current?"✓":i+1}
            </div>
            <span style={{ fontSize:12, fontWeight: i===current?700:500, color: i===current?colors.teal:colors.gray, whiteSpace:"nowrap" }}>{label}</span>
          </div>
          {i<steps.length-1 && <div style={{ flex:1, height:2, background: i<current?colors.teal:colors.border, margin:"0 8px", minWidth:16 }}/>}
        </div>
      ))}
    </div>
  );
}

export default function VehicleDetails() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("hopin_vehicle") || "{}");

  const [vehicleInfo, setVehicleInfo] = useState({
    name:         saved.name         || '',
    color:        saved.color        || '',
    plate:        saved.plate        || '',
    seats:        saved.seats        || '',
    fuel:         saved.fuel         || 'Petrol',
    transmission: saved.transmission || 'Manual',
    year:         saved.year         || new Date().getFullYear(),
  });
  const [amenities, setAmenities] = useState(saved.amenities || { ac:true, charger:true, usb:true, music:true, water:true, child:false, luggage:false, pet:false });
  const [rideNote, setRideNote]   = useState(saved.rideNote || '');
  const [error, setError]         = useState('');

  const toggleAmenity = id => setAmenities(p => ({ ...p, [id]: !p[id] }));
  const canProceed = vehicleInfo.name.trim() && vehicleInfo.plate.trim() && vehicleInfo.color.trim() && vehicleInfo.seats;

  const handleContinue = () => {
    if (!canProceed) { setError('Please fill in vehicle name, plate number, color, and seats.'); return; }
    localStorage.setItem("hopin_vehicle", JSON.stringify({ ...vehicleInfo, amenities, rideNote }));
    navigate('/review-publish');
  };

  const rowStyle = { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:`1px solid ${colors.border}`, gap:12 };
  const inputStyle = { fontSize:14, fontWeight:600, color:colors.navy, border:`1.5px solid ${colors.borderTeal}`, borderRadius:6, padding:'4px 8px', backgroundColor:colors.bgTeal, outline:'none', textAlign:'right' };

  return (
    <div style={{ minHeight:'100vh', backgroundColor:colors.lightGray, fontFamily:"'Inter', sans-serif" }}>
      <div style={{ backgroundColor:colors.white, borderBottom:`1px solid ${colors.border}`, position:'sticky', top:0, zIndex:10, boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'16px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <button onClick={() => navigate('/ride-preferences')} style={{ background:'none', border:'none', padding:8, cursor:'pointer', display:'flex', alignItems:'center' }}><ChevronLeft style={{ width:24, height:24, color:colors.navy }}/></button>
            <h1 style={{ fontSize:24, fontWeight:700, color:colors.navy, margin:0 }}>Offer a Ride</h1>
            <div style={{ display:'flex', alignItems:'center', gap:8 }}><HelpCircle style={{ width:20, height:20, color:colors.teal }}/><span style={{ fontSize:14, fontWeight:500, color:colors.navy }}>Need Help?</span></div>
          </div>
          <StepBar current={2} />
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 24px' }}>
        <h2 style={{ fontSize:28, fontWeight:800, color:colors.navy, marginBottom:4 }}>Vehicle Details</h2>
        <p style={{ fontSize:15, color:colors.gray, marginBottom:32 }}>Enter your vehicle information and choose features to share with passengers.</p>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:32 }}>
          <div style={{ backgroundColor:colors.white, border:`1px solid ${colors.border}`, borderRadius:12, padding:'20px 24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <Car style={{ width:22, height:22, color:colors.teal }}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Vehicle Information</span>
            </div>
            {[
              { label:'Brand & Model',      field:'name',         type:'text',   placeholder:'e.g. Honda City' },
              { label:'Color',              field:'color',        type:'text',   placeholder:'e.g. White' },
              { label:'Vehicle Number',     field:'plate',        type:'text',   placeholder:'e.g. UP16 AB 1234' },
              { label:'Seating Capacity',   field:'seats',        type:'number', placeholder:'4' },
              { label:'Fuel Type',          field:'fuel',         type:'select', options:['Petrol','Diesel','CNG','Electric','Hybrid'] },
              { label:'Transmission',       field:'transmission', type:'select', options:['Manual','Automatic'] },
              { label:'Manufacturing Year', field:'year',         type:'number', placeholder:'2022' },
            ].map(row => (
              <div key={row.field} style={rowStyle}>
                <span style={{ fontSize:14, color:colors.gray, flexShrink:0 }}>{row.label}</span>
                {row.type === 'select' ? (
                  <select value={vehicleInfo[row.field]} onChange={e => setVehicleInfo(p => ({ ...p, [row.field]: e.target.value }))} style={{ ...inputStyle, cursor:'pointer', textAlign:'left' }}>
                    {row.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={row.type} placeholder={row.placeholder} value={vehicleInfo[row.field]} onChange={e => setVehicleInfo(p => ({ ...p, [row.field]: e.target.value }))}
                    style={{ ...inputStyle, width: row.type==='number' ? 80 : 180 }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor:colors.white, border:`1px solid ${colors.border}`, borderRadius:12, padding:'20px 24px' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
              <Shield style={{ width:22, height:22, color:colors.teal }}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Safety & Verification</span>
            </div>
            {['RC Verified','Insurance Valid','PUC Valid','Vehicle Verified by HopIn'].map(item => (
              <div key={item} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'12px 0', borderBottom:`1px solid ${colors.border}` }}>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <CheckCircle style={{ width:18, height:18, color:colors.teal }}/><span style={{ fontSize:14, color:colors.navy, fontWeight:500 }}>{item}</span>
                </div>
                <span style={{ fontSize:12, fontWeight:600, color:colors.teal, backgroundColor:colors.bgTeal, border:`1px solid ${colors.borderTeal}`, padding:'3px 10px', borderRadius:20 }}>Verified</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom:32 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:colors.navy, marginBottom:4 }}>Passenger Amenities</h3>
          <p style={{ fontSize:14, color:colors.gray, marginBottom:16 }}>Choose the amenities available in this ride.</p>
          <div style={{ backgroundColor:colors.white, border:`1px solid ${colors.border}`, borderRadius:12, padding:'16px 20px' }}>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
              {amenitiesList.map(({ id, label, icon: Icon }) => (
                <label key={id} onClick={() => toggleAmenity(id)} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 14px', border:`1px solid ${amenities[id]?colors.borderTeal:colors.border}`, borderRadius:10, cursor:'pointer', backgroundColor:amenities[id]?colors.bgTeal:colors.white, transition:'all 0.2s', userSelect:'none' }}>
                  <Icon style={{ width:20, height:20, color:colors.teal, flexShrink:0 }}/>
                  <span style={{ fontSize:14, color:colors.navy, fontWeight:500, flex:1 }}>{label}</span>
                  <input type="checkbox" checked={amenities[id]} onChange={() => toggleAmenity(id)} style={{ width:18, height:18, accentColor:colors.teal, cursor:'pointer', flexShrink:0 }} onClick={e => e.stopPropagation()} />
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginBottom:40 }}>
          <h3 style={{ fontSize:16, fontWeight:700, color:colors.navy, marginBottom:4 }}>Ride Note <span style={{ fontWeight:400, color:colors.gray }}>(Optional)</span></h3>
          <div style={{ backgroundColor:colors.white, border:`1px solid ${colors.border}`, borderRadius:12, padding:'16px 20px' }}>
            <textarea value={rideNote} onChange={e => setRideNote(e.target.value.slice(0,200))} placeholder="E.g. I'll keep the AC on. Large luggage may not fit." style={{ width:'100%', minHeight:90, border:'none', outline:'none', resize:'vertical', fontSize:14, fontFamily:"'Inter', sans-serif", color:colors.navy, backgroundColor:'transparent', boxSizing:'border-box' }} />
            <div style={{ textAlign:'right', fontSize:12, color:colors.gray, marginTop:8 }}>{rideNote.length}/200</div>
          </div>
        </div>

        {error && <div style={{ background:"#FEF2F2", border:"1px solid #FECACA", borderRadius:10, padding:"10px 16px", fontSize:13, color:"#DC2626", marginBottom:16 }}>⚠️ {error}</div>}

        <div style={{ display:'flex', gap:12 }}>
          <button onClick={() => navigate('/ride-preferences')} style={{ display:'flex', alignItems:'center', gap:8, padding:'13px 24px', border:`1.5px solid ${colors.border}`, borderRadius:10, fontSize:15, fontWeight:600, color:colors.navy, backgroundColor:colors.white, cursor:'pointer' }}>
            <ChevronLeft style={{ width:20, height:20 }}/>Back
          </button>
          <button onClick={handleContinue} style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:8, padding:'13px 24px', border:'none', borderRadius:10, fontSize:15, fontWeight:700, color:colors.white, backgroundColor:colors.teal, cursor:'pointer' }}>
            Continue to Review & Publish<ChevronRight style={{ width:20, height:20 }}/>
          </button>
        </div>
      </div>
    </div>
  );
}