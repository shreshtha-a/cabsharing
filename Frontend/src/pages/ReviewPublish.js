import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, HelpCircle, MapPin, Calendar, Clock, Users,
  Shield, CheckCircle, MessageSquare, Car, Wind, Zap, Music,
  Info, Send, Lock, ArrowRight, RefreshCw, Settings
} from 'lucide-react';

// ─── Color Scheme ─────────────────────────────────────────────
const colors = {
  teal:        '#13C9B8',
  navy:        '#1A2332',
  gray:        '#6B7280',
  lightGray:   '#F5F7FA',
  white:       '#FFFFFF',
  border:      '#E5E7EB',
  bgLight:     '#F3F4F6',
  bgTeal:      '#E8FAF9',
  borderTeal:  '#B2EDEA',
  green:       '#10B981',
};

// ─── Mock summary data (would come from context/store in real app) ─
const tripData = {
  pickup:    'Sharda University,\nGreater Noida',
  drop:      'Noida Sector 62,\nNoida',
  date:      '28 June 2026',
  day:       'Saturday',
  time:      '08:30 AM',
  seats:     3,
  tripType:  'One Way',
  pricePerSeat: 150,
  platformFee:  20,
};

const preferenceTags = [
  { icon: Shield,  label: 'Verified Users' },
  { icon: MessageSquare, label: 'Quiet Ride' },
  { icon: Wind,    label: 'AC On' },
  { icon: Shield,  label: 'No Smoking' },
];
const extraPrefs = 4;

const vehicleData = {
  name:  'Honda City',
  color: 'White',
  fuel:  'Petrol',
  plate: 'UP16 AB 1234',
  image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75',
  amenities: ['AC', 'USB Charger', 'Music System'],
  extraAmenities: 2,
};

const rideNote = "I'll leave exactly on time.\nPlease arrive 5 minutes early.";

const termsItems = [
  { id: 't1', label: 'I confirm that my vehicle is in good condition and roadworthy.' },
  { id: 't2', label: 'I confirm that all information provided is correct.' },
  { id: 't3', label: 'I confirm that my RC and Insurance are valid.' },
  { id: 't4', label: (<>I agree to HopIn's <span style={{ color: colors.teal, textDecoration: 'underline', cursor: 'pointer' }}>Terms &amp; Conditions</span> and <span style={{ color: colors.teal, textDecoration: 'underline', cursor: 'pointer' }}>Community Guidelines</span>.</>) },
];

// ─── Small icon wrapper ────────────────────────────────────────
function IconBadge({ icon: Icon }) {
  return (
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      backgroundColor: colors.bgTeal,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <Icon style={{ width: 20, height: 20, color: colors.teal }} />
    </div>
  );
}

// ─── Section card wrapper ──────────────────────────────────────
function SectionCard({ children, style }) {
  return (
    <div style={{
      backgroundColor: colors.white,
      border: `1px solid ${colors.border}`,
      borderRadius: 14,
      padding: '20px 24px',
      ...style,
    }}>
      {children}
    </div>
  );
}

export default function ReviewPublish() {
  const navigate = useNavigate();
  const [agreedAll, setAgreedAll] = useState(false);
  const [termChecks, setTermChecks] = useState({ t1: true, t2: true, t3: true, t4: true });

  const ifFullyBooked = tripData.pricePerSeat * tripData.seats;
  const youllReceive  = ifFullyBooked - tripData.platformFee;

  const toggleTerm = (id) => setTermChecks(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, fontFamily: "'Inter', sans-serif" }}>

      {/* ── Sticky Header ── */}
      <div style={{
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky', top: 0, zIndex: 10,
        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px' }}>

          {/* Top row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <button
              onClick={() => navigate('/vehicle-details')}
              style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ChevronLeft style={{ width: 24, height: 24, color: colors.navy }} />
            </button>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.navy, margin: 0 }}>Offer a Ride</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, border: `1px solid ${colors.border}`, borderRadius: 20, padding: '6px 14px', cursor: 'pointer' }}>
              <HelpCircle style={{ width: 18, height: 18, color: colors.teal }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: colors.navy }}>Need Help?</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {[
              { num: 1, label: 'Trip Details',     done: true },
              { num: 2, label: 'Ride Preferences', done: true },
              { num: 3, label: 'Vehicle Details',  done: true },
              { num: 4, label: 'Review & Publish', active: true },
            ].map((step, idx, arr) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    backgroundColor: step.active || step.done ? colors.teal : colors.border,
                    color: colors.white,
                    fontSize: 14, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {step.done ? <CheckCircle style={{ width: 18, height: 18 }} /> : step.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: step.active ? colors.teal : colors.gray, whiteSpace: 'nowrap' }}>
                      {step.label}
                    </div>
                    {step.active && <div style={{ height: 2, backgroundColor: colors.teal, borderRadius: 1, marginTop: 3 }} />}
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ flex: 1, height: 2, backgroundColor: step.done ? colors.teal : colors.border, margin: '0 10px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 24, alignItems: 'start' }}>

          {/* ── Left Column ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Page Title */}
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.navy, margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                Review &amp; Publish <span style={{ fontSize: 22 }}>✨</span>
              </h2>
              <p style={{ fontSize: 15, color: colors.gray, margin: '6px 0 0' }}>
                Please review the key details of your ride and publish it for passengers to book.
              </p>
            </div>

            {/* Trip Summary */}
            <SectionCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <IconBadge icon={MapPin} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Trip Summary</span>
              </div>

              {/* 5-col trip info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0, borderRadius: 10, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
                {[
                  { icon: MapPin,    label: 'Pickup', value: tripData.pickup },
                  { icon: MapPin,    label: 'Drop',   value: tripData.drop },
                  { icon: Calendar,  label: 'Date',   value: tripData.date,  sub: tripData.day },
                  { icon: Clock,     label: 'Time',   value: tripData.time },
                  { icon: Users,     label: 'Seats',  value: `${tripData.seats} Seats`, sub: 'Available' },
                ].map((col, i) => (
                  <div key={col.label} style={{
                    padding: '16px',
                    borderRight: i < 4 ? `1px solid ${colors.border}` : 'none',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                      <col.icon style={{ width: 15, height: 15, color: colors.teal }} />
                      <span style={{ fontSize: 12, color: colors.gray, fontWeight: 500 }}>{col.label}</span>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy, whiteSpace: 'pre-line' }}>{col.value}</div>
                    {col.sub && <div style={{ fontSize: 12, color: colors.gray, marginTop: 2 }}>{col.sub}</div>}
                  </div>
                ))}
              </div>

              {/* One Way badge */}
              <div style={{ marginTop: 16 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '5px 12px',
                  backgroundColor: colors.bgTeal,
                  border: `1px solid ${colors.borderTeal}`,
                  borderRadius: 20,
                  fontSize: 13, fontWeight: 600, color: colors.teal,
                }}>
                  <ArrowRight style={{ width: 13, height: 13 }} />
                  {tripData.tripType}
                </span>
              </div>
            </SectionCard>

            {/* Ride Preferences + Vehicle (side by side) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

              {/* Ride Preferences */}
              <SectionCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <IconBadge icon={Shield} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Ride Preferences</span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {preferenceTags.map(({ icon: Icon, label }) => (
                    <div key={label} style={{
                      display: 'flex', alignItems: 'center', gap: 6,
                      padding: '6px 12px',
                      backgroundColor: colors.bgTeal,
                      border: `1px solid ${colors.borderTeal}`,
                      borderRadius: 20,
                      fontSize: 13, fontWeight: 500, color: colors.navy,
                    }}>
                      <Icon style={{ width: 13, height: 13, color: colors.teal }} />
                      {label}
                    </div>
                  ))}
                  <div style={{
                    padding: '6px 12px',
                    backgroundColor: colors.bgLight,
                    border: `1px solid ${colors.border}`,
                    borderRadius: 20,
                    fontSize: 13, fontWeight: 600, color: colors.teal,
                    cursor: 'pointer',
                  }}>
                    +{extraPrefs} more
                  </div>
                </div>
              </SectionCard>

              {/* Vehicle */}
              <SectionCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <IconBadge icon={Car} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Vehicle</span>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <img
                    src={vehicleData.image}
                    alt={vehicleData.name}
                    style={{ width: 110, height: 68, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                    onError={e => { e.target.style.background = '#eee'; e.target.src = ''; }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>{vehicleData.name}</div>
                    <div style={{ fontSize: 13, color: colors.gray, marginBottom: 8 }}>{vehicleData.color} · {vehicleData.fuel}</div>
                    <div style={{
                      display: 'inline-block',
                      padding: '4px 10px',
                      backgroundColor: colors.bgLight,
                      border: `1px solid ${colors.border}`,
                      borderRadius: 6,
                      fontSize: 13, fontWeight: 600, color: colors.navy,
                    }}>
                      {vehicleData.plate}
                    </div>
                  </div>
                  {/* Amenities */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, justifyContent: 'center' }}>
                    {vehicleData.amenities.map(a => (
                      <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {a === 'AC'           && <Wind  style={{ width: 14, height: 14, color: colors.teal }} />}
                        {a === 'USB Charger'  && <Zap   style={{ width: 14, height: 14, color: colors.teal }} />}
                        {a === 'Music System' && <Music style={{ width: 14, height: 14, color: colors.teal }} />}
                        <span style={{ fontSize: 13, color: colors.navy, fontWeight: 500 }}>{a}</span>
                      </div>
                    ))}
                    {vehicleData.extraAmenities > 0 && (
                      <div style={{ fontSize: 13, color: colors.teal, fontWeight: 600, cursor: 'pointer' }}>
                        + {vehicleData.extraAmenities} more
                      </div>
                    )}
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Ride Note */}
            <SectionCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <IconBadge icon={MessageSquare} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Ride Note</span>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <span style={{ fontSize: 32, color: colors.teal, lineHeight: 1, marginTop: -4, fontFamily: 'Georgia, serif' }}>"</span>
                <p style={{ fontSize: 14, color: colors.navy, lineHeight: 1.7, margin: 0, whiteSpace: 'pre-line' }}>
                  {rideNote}
                </p>
              </div>
            </SectionCard>

            {/* Terms & Declaration */}
            <SectionCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <IconBadge icon={Shield} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Terms &amp; Declaration</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                {termsItems.map(({ id, label }) => (
                  <label key={id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: 5, flexShrink: 0, marginTop: 1,
                      backgroundColor: termChecks[id] ? colors.teal : colors.white,
                      border: `2px solid ${termChecks[id] ? colors.teal : colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.15s',
                    }}
                      onClick={() => toggleTerm(id)}
                    >
                      {termChecks[id] && <CheckCircle style={{ width: 13, height: 13, color: colors.white }} />}
                    </div>
                    <span style={{ fontSize: 13, color: colors.navy, lineHeight: 1.5 }}>{label}</span>
                  </label>
                ))}
              </div>

              {/* Final agree checkbox */}
              <div style={{
                borderTop: `1px solid ${colors.border}`,
                paddingTop: 16,
              }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                    backgroundColor: agreedAll ? colors.teal : colors.white,
                    border: `2px solid ${agreedAll ? colors.teal : colors.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s',
                  }}
                    onClick={() => setAgreedAll(a => !a)}
                  >
                    {agreedAll && <CheckCircle style={{ width: 13, height: 13, color: colors.white }} />}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: colors.navy }}>
                    I have read and agree to the above.
                  </span>
                </label>
              </div>
            </SectionCard>

            {/* Back button */}
            <div>
              <button
                onClick={() => navigate('/vehicle-details')}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '12px 24px',
                  border: `1.5px solid ${colors.border}`,
                  borderRadius: 10,
                  fontSize: 15, fontWeight: 600,
                  color: colors.navy, backgroundColor: colors.white,
                  cursor: 'pointer',
                }}
              >
                <ChevronLeft style={{ width: 18, height: 18 }} />
                Back
              </button>
            </div>
          </div>

          {/* ── Right Sidebar ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'sticky', top: 120 }}>

            {/* Estimated Earnings */}
            <SectionCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <IconBadge icon={RefreshCw} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Estimated Earnings</span>
              </div>

              {[
                { label: 'Price per seat',  value: `₹${tripData.pricePerSeat}` },
                { label: 'Seats offered',   value: String(tripData.seats) },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${colors.border}` }}>
                  <span style={{ fontSize: 14, color: colors.gray }}>{row.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>{row.value}</span>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
                <span style={{ fontSize: 14, color: colors.gray }}>If fully booked</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>₹{ifFullyBooked}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${colors.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, color: colors.gray }}>Platform fee</span>
                  <Info style={{ width: 14, height: 14, color: colors.gray }} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>- ₹{tripData.platformFee}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: colors.teal }}>You'll receive</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: colors.teal }}>₹{youllReceive}</span>
              </div>
            </SectionCard>

            {/* Booking Settings */}
            <SectionCard>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <IconBadge icon={Settings} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Booking Settings</span>
              </div>

              <div style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: colors.gray, marginBottom: 4 }}>Booking type</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>Driver Approval Required</div>
              </div>

              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 16, marginBottom: 18 }}>
                <div style={{ fontSize: 13, color: colors.gray, marginBottom: 4 }}>Cancellation policy</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>Free cancellation</div>
                <div style={{ fontSize: 13, color: colors.navy }}>until 30 mins before departure</div>
              </div>

              <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 13, color: colors.gray, marginBottom: 4 }}>Passenger can book until</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.navy }}>30 mins before departure</div>
              </div>
            </SectionCard>

            {/* Publish Button */}
            <button
              onClick={() => alert('🎉 Ride published successfully!')}
              style={{
                width: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                padding: '16px',
                border: 'none', borderRadius: 12,
                fontSize: 16, fontWeight: 700,
                color: colors.white, backgroundColor: colors.teal,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(19,201,184,0.35)',
              }}
            >
              Publish Ride
              <Send style={{ width: 18, height: 18 }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <Lock style={{ width: 13, height: 13, color: colors.gray }} />
              <span style={{ fontSize: 12, color: colors.gray }}>Your ride will go live immediately</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}