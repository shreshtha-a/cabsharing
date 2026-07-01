import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, HelpCircle, MapPin, Calendar, Clock, Users, Shield, CheckCircle, MessageSquare, Car, Wind, Music, Send, Lock, ArrowRight, RefreshCw, Settings } from 'lucide-react';
import { saveLocalRide } from '../utils/localRides';
// adding on to it

const colors = { teal:'#13C9B8', navy:'#1A2332', gray:'#6B7280', lightGray:'#F5F7FA', white:'#FFFFFF', border:'#E5E7EB', bgLight:'#F3F4F6', bgTeal:'#E8FAF9', borderTeal:'#B2EDEA' };

function StepBar({ current }) {
  const steps = ["Trip Details","Ride Preferences","Vehicle Details","Review & Publish"];
  return (
    <div style={{ display:"flex", alignItems:"center" }}>
      {steps.map((label,i) => (
        <div key={label} style={{ display:"flex", alignItems:"center", flex: i < steps.length-1 ? 1 : 0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", fontSize:13, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", background: i<=current?colors.teal:colors.border, color: i<=current?colors.white:colors.gray }}>
              {i<current?<CheckCircle style={{ width:16, height:16 }}/>:i+1}
            </div>
            <span style={{ fontSize:12, fontWeight: i===current?700:500, color: i===current?colors.teal:colors.gray, whiteSpace:"nowrap" }}>{label}</span>
          </div>
          {i<steps.length-1 && <div style={{ flex:1, height:2, background: i<current?colors.teal:colors.border, margin:"0 8px", minWidth:16 }}/>}
        </div>
      ))}
    </div>
  );
}

function IconBadge({ icon: Icon }) {
  return <div style={{ width:40, height:40, borderRadius:10, backgroundColor:colors.bgTeal, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}><Icon style={{ width:20, height:20, color:colors.teal }}/></div>;
}

function SectionCard({ children, style }) {
  return <div style={{ backgroundColor:colors.white, border:`1px solid ${colors.border}`, borderRadius:14, padding:'20px 24px', ...style }}>{children}</div>;
}

const termsItems = [
  { id:'t1', label:'I confirm my vehicle is in good condition and roadworthy.' },
  { id:'t2', label:'I confirm all information provided is correct.' },
  { id:'t3', label:'I confirm my RC and Insurance are valid.' },
  { id:'t4', label:"I agree to HopIn's Terms & Conditions and Community Guidelines." },
];

export default function ReviewPublish() {
  const navigate = useNavigate();

  const trip    = JSON.parse(localStorage.getItem("hopin_trip")    || "{}");
  const prefs   = JSON.parse(localStorage.getItem("hopin_prefs")   || "{}");
  const vehicle = JSON.parse(localStorage.getItem("hopin_vehicle") || "{}");

  const [termChecks, setTermChecks] = useState({ t1:true, t2:true, t3:true, t4:true });
  const [agreedAll,  setAgreedAll]  = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [error,      setError]      = useState('');

  const allTermsChecked = Object.values(termChecks).every(Boolean);
  const canPublish = agreedAll && allTermsChecked;

  const pricePerSeat  = Number(trip.price) || 0;
  const seatCount     = Number(trip.seats) || 0;
  const platformFee   = 20;
  const ifFullyBooked = pricePerSeat * seatCount;
  const youllReceive  = ifFullyBooked - platformFee;

  const buildPrefs = () => ({
    genderPreference: prefs.passengerPreference === 'femaleOnly' ? 'female' : prefs.passengerPreference === 'maleOnly' ? 'male' : 'any',
    luggageAllowed:   prefs.luggagePreference !== 'noLuggage',
    petsAllowed:      prefs.petPolicy === 'allowed',
    smokingAllowed:   prefs.smokingPolicy === 'allowed',
    musicAllowed:     prefs.musicDuringRide !== 'noMusic',
  });

  const handlePublish = async () => {
    if (!canPublish) { setError('Please agree to all terms before publishing.'); return; }
    if (!trip.from || !trip.to || !trip.date || !trip.time) { setError('Trip data missing. Please go back to Step 1.'); return; }

    setPublishing(true);
    setError('');

    try {
      // Build the ride object from form state
      const ride = {
        id:          Date.now().toString(),
        from:        trip.from,
        to:          trip.to,
        date:        trip.date,
        time:        trip.time,
        seats:       seatCount,
        seatsLeft:   seatCount,
        price:       pricePerSeat,
        rideType:    trip.rideType || 'oneWay',
        preferences: buildPrefs(),
        vehicle: vehicle.name ? {
          name:     vehicle.name,
          plate:    vehicle.plate,
          color:    vehicle.color,
          fuel:     vehicle.fuel,
          amenities: vehicle.amenities || {},
        } : null,
        rideNote:    vehicle.rideNote || '',
        createdAt:   new Date().toISOString(),
        // Driver info pulled from localStorage auth if you store it
        driverName:  JSON.parse(localStorage.getItem('hopin_user') || '{}').name || 'Driver',
        driverAvatar: JSON.parse(localStorage.getItem('hopin_user') || '{}').avatar || null,
      };

      // Save locally (bypasses backend driver verification for now)
      saveLocalRide(ride);

      // Clean up wizard state
      localStorage.removeItem("hopin_trip");
      localStorage.removeItem("hopin_prefs");
      localStorage.removeItem("hopin_vehicle");

      navigate('/home');
    } catch (err) {
      setError('Failed to publish ride. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  const prefTags = [
    prefs.passengerPreference === 'femaleOnly'      && { icon: Shield,       label: 'Female Only'  },
    prefs.passengerPreference === 'maleOnly'        && { icon: Shield,       label: 'Male Only'    },
    prefs.smokingPolicy === 'notAllowed'            && { icon: Shield,       label: 'No Smoking'   },
    prefs.petPolicy === 'allowed'                   && { icon: Shield,       label: 'Pets OK'      },
    prefs.acPreference === 'alwaysOn'               && { icon: Wind,         label: 'AC On'        },
    prefs.musicDuringRide === 'noMusic'             && { icon: Music,        label: 'No Music'     },
    prefs.conversationPreference === 'quietRide'    && { icon: MessageSquare,label: 'Quiet Ride'   },
  ].filter(Boolean);

  const amenityLabels = { ac:'AC', charger:'Charger', usb:'USB', music:'Music', water:'Water', child:'Child Seat', luggage:'Luggage', pet:'Pet Friendly' };
  const activeAmenities = vehicle.amenities
    ? Object.entries(vehicle.amenities).filter(([,v]) => v).map(([k]) => amenityLabels[k]).filter(Boolean)
    : [];

  return (
    <div style={{ minHeight:'100vh', backgroundColor:colors.lightGray, fontFamily:"'Inter', sans-serif" }}>
      <div style={{ backgroundColor:colors.white, borderBottom:`1px solid ${colors.border}`, position:'sticky', top:0, zIndex:10, boxShadow:'0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth:1280, margin:'0 auto', padding:'16px 24px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <button onClick={() => navigate('/vehicle-details')} style={{ background:'none', border:'none', padding:8, cursor:'pointer', display:'flex', alignItems:'center' }}><ChevronLeft style={{ width:24, height:24, color:colors.navy }}/></button>
            <h1 style={{ fontSize:24, fontWeight:700, color:colors.navy, margin:0 }}>Offer a Ride</h1>
            <div style={{ display:'flex', alignItems:'center', gap:8, border:`1px solid ${colors.border}`, borderRadius:20, padding:'6px 14px', cursor:'pointer' }}><HelpCircle style={{ width:18, height:18, color:colors.teal }}/><span style={{ fontSize:14, fontWeight:500, color:colors.navy }}>Need Help?</span></div>
          </div>
          <StepBar current={3} />
        </div>
      </div>

      <div style={{ maxWidth:1280, margin:'0 auto', padding:'32px 24px' }}>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 300px', gap:24, alignItems:'start' }}>

          <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
            <div>
              <h2 style={{ fontSize:28, fontWeight:800, color:colors.navy, margin:0 }}>Review & Publish ✨</h2>
              <p style={{ fontSize:15, color:colors.gray, margin:'6px 0 0' }}>Review your ride details before going live.</p>
            </div>

            <SectionCard>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}>
                <IconBadge icon={MapPin}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Trip Summary</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:0, borderRadius:10, overflow:'hidden', border:`1px solid ${colors.border}` }}>
                {[
                  { icon:MapPin,   label:'From',  value: trip.from || '–' },
                  { icon:MapPin,   label:'To',    value: trip.to   || '–' },
                  { icon:Calendar, label:'Date',  value: trip.date || '–' },
                  { icon:Clock,    label:'Time',  value: trip.time || '–' },
                  { icon:Users,    label:'Seats', value: `${trip.seats || '–'} Seats` },
                ].map((col, i) => (
                  <div key={col.label} style={{ padding:'16px', borderRight: i<4?`1px solid ${colors.border}`:'none' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                      <col.icon style={{ width:15, height:15, color:colors.teal }}/><span style={{ fontSize:12, color:colors.gray, fontWeight:500 }}>{col.label}</span>
                    </div>
                    <div style={{ fontSize:14, fontWeight:700, color:colors.navy }}>{col.value}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:14 }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'5px 12px', backgroundColor:colors.bgTeal, border:`1px solid ${colors.borderTeal}`, borderRadius:20, fontSize:13, fontWeight:600, color:colors.teal }}>
                  <ArrowRight style={{ width:13, height:13 }}/>{trip.rideType === 'roundTrip' ? 'Round Trip' : 'One Way'}
                </span>
              </div>
            </SectionCard>

            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              <SectionCard>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}><IconBadge icon={Shield}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Ride Preferences</span></div>
                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {prefTags.length > 0 ? prefTags.map(({ icon: Icon, label }) => (
                    <div key={label} style={{ display:'flex', alignItems:'center', gap:6, padding:'6px 12px', backgroundColor:colors.bgTeal, border:`1px solid ${colors.borderTeal}`, borderRadius:20, fontSize:13, fontWeight:500, color:colors.navy }}>
                      <Icon style={{ width:13, height:13, color:colors.teal }}/>{label}
                    </div>
                  )) : <span style={{ fontSize:13, color:colors.gray }}>Default preferences</span>}
                </div>
              </SectionCard>

              <SectionCard>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}><IconBadge icon={Car}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Vehicle</span></div>
                {vehicle.name ? (
                  <div>
                    <div style={{ fontSize:16, fontWeight:700, color:colors.navy, marginBottom:4 }}>{vehicle.name}</div>
                    <div style={{ fontSize:13, color:colors.gray, marginBottom:8 }}>{vehicle.color} · {vehicle.fuel}</div>
                    <div style={{ display:'inline-block', padding:'4px 10px', backgroundColor:colors.bgLight, border:`1px solid ${colors.border}`, borderRadius:6, fontSize:13, fontWeight:600, color:colors.navy, marginBottom:10 }}>{vehicle.plate}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
                      {activeAmenities.slice(0,3).map(a => <span key={a} style={{ fontSize:12, color:colors.teal, fontWeight:500 }}>✓ {a}</span>)}
                      {activeAmenities.length > 3 && <span style={{ fontSize:12, color:colors.teal, fontWeight:600 }}>+{activeAmenities.length-3} more</span>}
                    </div>
                  </div>
                ) : <span style={{ fontSize:13, color:colors.gray }}>No vehicle details entered</span>}
              </SectionCard>
            </div>

            {vehicle.rideNote && (
              <SectionCard>
                <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}><IconBadge icon={MessageSquare}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Ride Note</span></div>
                <div style={{ display:'flex', gap:12 }}>
                  <span style={{ fontSize:32, color:colors.teal, lineHeight:1, marginTop:-4, fontFamily:'Georgia,serif' }}>"</span>
                  <p style={{ fontSize:14, color:colors.navy, lineHeight:1.7, margin:0, whiteSpace:'pre-line' }}>{vehicle.rideNote}</p>
                </div>
              </SectionCard>
            )}

            <SectionCard>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}><IconBadge icon={Shield}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Terms & Declaration</span></div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginBottom:16 }}>
                {termsItems.map(({ id, label }) => (
                  <label key={id} style={{ display:'flex', alignItems:'flex-start', gap:10, cursor:'pointer' }}>
                    <div onClick={() => setTermChecks(p => ({ ...p, [id]: !p[id] }))} style={{ width:20, height:20, borderRadius:5, flexShrink:0, marginTop:1, backgroundColor:termChecks[id]?colors.teal:colors.white, border:`2px solid ${termChecks[id]?colors.teal:colors.border}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', cursor:'pointer' }}>
                      {termChecks[id] && <CheckCircle style={{ width:13, height:13, color:colors.white }}/>}
                    </div>
                    <span style={{ fontSize:13, color:colors.navy, lineHeight:1.5 }}>{label}</span>
                  </label>
                ))}
              </div>
              <div style={{ borderTop:`1px solid ${colors.border}`, paddingTop:16 }}>
                <label style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer' }}>
                  <div onClick={() => setAgreedAll(a => !a)} style={{ width:20, height:20, borderRadius:5, flexShrink:0, backgroundColor:agreedAll?colors.teal:colors.white, border:`2px solid ${agreedAll?colors.teal:colors.border}`, display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.15s', cursor:'pointer' }}>
                    {agreedAll && <CheckCircle style={{ width:13, height:13, color:colors.white }}/>}
                  </div>
                  <span style={{ fontSize:14, fontWeight:500, color:colors.navy }}>I have read and agree to the above.</span>
                </label>
              </div>
            </SectionCard>

            {error && <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'12px 16px', fontSize:13, color:'#DC2626' }}>⚠️ {error}</div>}

            <div>
              <button onClick={() => navigate('/vehicle-details')} style={{ display:'flex', alignItems:'center', gap:8, padding:'12px 24px', border:`1.5px solid ${colors.border}`, borderRadius:10, fontSize:15, fontWeight:600, color:colors.navy, backgroundColor:colors.white, cursor:'pointer' }}>
                <ChevronLeft style={{ width:18, height:18 }}/>Back
              </button>
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:16, position:'sticky', top:120 }}>
            <SectionCard>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}><IconBadge icon={RefreshCw}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Estimated Earnings</span></div>
              {[['Price per seat',`₹${pricePerSeat}`],['Seats offered',String(seatCount)],['If fully booked',`₹${ifFullyBooked}`],['Platform fee',`– ₹${platformFee}`]].map(([k,v]) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:`1px solid ${colors.border}` }}>
                  <span style={{ fontSize:14, color:colors.gray }}>{k}</span>
                  <span style={{ fontSize:14, fontWeight:600, color:colors.navy }}>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:14 }}>
                <span style={{ fontSize:15, fontWeight:600, color:colors.teal }}>You'll receive</span>
                <span style={{ fontSize:22, fontWeight:800, color:colors.teal }}>₹{youllReceive}</span>
              </div>
            </SectionCard>

            <SectionCard>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:20 }}><IconBadge icon={Settings}/><span style={{ fontSize:16, fontWeight:700, color:colors.navy }}>Booking Settings</span></div>
              {[
                ['Booking type','Driver Approval Required'],
                ['Cancellation policy','Free cancellation until 30 mins before departure'],
                ['Passenger can book until','30 mins before departure'],
              ].map(([k,v]) => (
                <div key={k} style={{ borderTop:`1px solid ${colors.border}`, paddingTop:14, marginTop:14 }}>
                  <div style={{ fontSize:13, color:colors.gray, marginBottom:4 }}>{k}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:colors.navy }}>{v}</div>
                </div>
              ))}
            </SectionCard>

            <button
              onClick={handlePublish}
              disabled={publishing || !canPublish}
              style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:10, padding:'16px', border:'none', borderRadius:12, fontSize:16, fontWeight:700, color:colors.white, backgroundColor: canPublish && !publishing ? colors.teal : '#94A3B8', cursor: canPublish && !publishing ? 'pointer' : 'not-allowed', boxShadow: canPublish ? '0 4px 16px rgba(19,201,184,0.35)' : 'none', transition:'all 0.2s' }}
            >
              {publishing ? 'Publishing…' : 'Publish Ride'}
              <Send style={{ width:18, height:18 }}/>
            </button>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}>
              <Lock style={{ width:13, height:13, color:colors.gray }}/><span style={{ fontSize:12, color:colors.gray }}>Your ride will go live immediately</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}