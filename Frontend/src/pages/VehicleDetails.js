import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, HelpCircle, Shield, CheckCircle,
  Wind, Zap, Usb, Music, Droplets, Baby, Briefcase, PawPrint,
  Car, Users, Fuel
} from 'lucide-react';

// ─── Color Scheme (matches RidePreferences) ──────────────────
const colors = {
  teal: '#13C9B8',
  navy: '#1A2332',
  gray: '#6B7280',
  lightGray: '#F5F7FA',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F3F4F6',
  bgTeal: '#E8FAF9',
  borderTeal: '#B2EDEA',
  green: '#10B981',
};

// ─── Mock vehicle data ────────────────────────────────────────
const vehicles = [
  {
    id: 1,
    name: 'Honda City',
    color: 'White',
    fuel: 'Petrol',
    plate: 'UP16 AB 1234',
    seats: 4,
    transmission: 'Automatic',
    year: 2022,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/134287/city-exterior-right-front-three-quarter-2.jpeg?isig=0&q=75',
  },
  {
    id: 2,
    name: 'Hyundai i20',
    color: 'Grey',
    fuel: 'Petrol',
    plate: 'UP16 CD 4567',
    seats: 4,
    transmission: 'Manual',
    year: 2021,
    image: 'https://imgd.aeplcdn.com/664x374/n/cw/ec/41564/i20-exterior-right-front-three-quarter-3.jpeg?isig=0&q=75',
  },
];

const amenitiesList = [
  { id: 'ac',       label: 'AC Available',       icon: Wind },
  { id: 'charger',  label: 'Phone Charger',       icon: Zap },
  { id: 'usb',      label: 'USB Charging',        icon: Usb },
  { id: 'music',    label: 'Music System',        icon: Music },
  { id: 'water',    label: 'Water Bottle',        icon: Droplets },
  { id: 'child',    label: 'Child Seat',          icon: Baby },
  { id: 'luggage',  label: 'Extra Luggage Space', icon: Briefcase },
  { id: 'pet',      label: 'Pet Friendly',        icon: PawPrint },
];

const safetyFeatures = [
  { id: 'airbags', label: 'Airbags' },
  { id: 'abs',     label: 'ABS' },
  { id: 'belts',   label: 'Seat Belts' },
  { id: 'gps',     label: 'GPS Enabled' },
  { id: 'fire',    label: 'Fire Extinguisher' },
];

// ─── Safety feature icons (SVG inline since lucide lacks these) ──
function SafetyIcon({ id }) {
  const style = { width: 28, height: 28, color: colors.navy };
  switch (id) {
    case 'airbags':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} style={style}>
          <circle cx="12" cy="12" r="7" /><circle cx="12" cy="12" r="2" />
          <line x1="12" y1="3" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="21" />
          <line x1="3" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="21" y2="12" />
        </svg>
      );
    case 'abs':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} style={style}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12h8M12 8v8" />
        </svg>
      );
    case 'belts':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} style={style}>
          <path d="M12 3v10l4 4" /><path d="M8 17l4-4" />
          <circle cx="12" cy="20" r="1.5" />
        </svg>
      );
    case 'gps':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} style={style}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    case 'fire':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} style={style}>
          <path d="M12 2s-4 4-4 8a4 4 0 008 0c0-4-4-8-4-8z" />
          <path d="M12 22v-4" /><path d="M9 22h6" />
        </svg>
      );
    default: return null;
  }
}

export default function VehicleDetails() {
  const navigate = useNavigate();
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0].id);
  const [editingVehicleInfo, setEditingVehicleInfo] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState({
    name: vehicles[0].name,
    color: vehicles[0].color,
    plate: vehicles[0].plate,
    seats: vehicles[0].seats,
    fuel: vehicles[0].fuel,
    transmission: vehicles[0].transmission,
    year: vehicles[0].year,
  });
  const [amenities, setAmenities] = useState({
    ac: true, charger: true, usb: true, music: true,
    water: true, child: false, luggage: false, pet: false,
  });
  const [rideNote, setRideNote] = useState('');

  const vehicle = vehicles.find(v => v.id === selectedVehicle);

  const toggleAmenity = (id) => {
    setAmenities(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
              onClick={() => navigate('/ride-preferences')}
              style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <ChevronLeft style={{ width: 24, height: 24, color: colors.navy }} />
            </button>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.navy, margin: 0 }}>Offer a Ride</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle style={{ width: 20, height: 20, color: colors.teal }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: colors.navy }}>Need Help?</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {[
              { num: 1, label: 'Trip Details',     done: true  },
              { num: 2, label: 'Ride Preferences', done: true  },
              { num: 3, label: 'Vehicle Details',  active: true },
              { num: 4, label: 'Review & Publish', done: false },
            ].map((step, idx, arr) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    backgroundColor: step.active || step.done ? colors.teal : colors.border,
                    color: step.active || step.done ? colors.white : colors.gray,
                    fontSize: 14, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    {step.done ? '✓' : step.num}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: step.active ? colors.teal : colors.gray, whiteSpace: 'nowrap' }}>
                      {step.label}
                    </div>
                    {step.active && (
                      <div style={{ height: 2, backgroundColor: colors.teal, borderRadius: 1, marginTop: 4 }} />
                    )}
                  </div>
                </div>
                {idx < arr.length - 1 && (
                  <div style={{ flex: 1, height: 2, backgroundColor: colors.border, margin: '0 12px' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>

        <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.navy, marginBottom: 4 }}>Vehicle Details</h2>
        <p style={{ fontSize: 15, color: colors.gray, marginBottom: 32 }}>
          Select the vehicle you will use for this ride and choose the features to share with passengers.
        </p>

        {/* ── Section 1: Select Vehicle ── */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 16 }}>
            1. Select Registered Vehicle
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, alignItems: 'start' }}>

            {/* Vehicle Cards */}
            <div style={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {vehicles.map(v => (
                <div
                  key={v.id}
                  onClick={() => { setSelectedVehicle(v.id); setEditingVehicleInfo(false); setVehicleInfo({ name: v.name, color: v.color, plate: v.plate, seats: v.seats, fuel: v.fuel, transmission: v.transmission, year: v.year }); }}
                  style={{
                    backgroundColor: colors.white,
                    border: `2px solid ${selectedVehicle === v.id ? colors.teal : colors.border}`,
                    borderRadius: 12,
                    padding: 16,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    position: 'relative',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    style={{ width: 120, height: 72, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }}
                    onError={(e) => { e.target.style.background = '#eee'; e.target.src = ''; }}
                  />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>{v.name}</div>
                    <div style={{ fontSize: 13, color: colors.gray, marginBottom: 8 }}>{v.color} · {v.fuel}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Car style={{ width: 14, height: 14, color: colors.gray }} />
                      <span style={{ fontSize: 13, color: colors.gray }}>{v.plate}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Users style={{ width: 14, height: 14, color: colors.gray }} />
                      <span style={{ fontSize: 13, color: colors.gray }}>{v.seats} Seats</span>
                    </div>
                  </div>

                  {/* Checkmark */}
                  {selectedVehicle === v.id && (
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      width: 24, height: 24, borderRadius: '50%',
                      backgroundColor: colors.teal,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <CheckCircle style={{ width: 16, height: 16, color: colors.white }} />
                    </div>
                  )}
                </div>
              ))}

              {/* Verified notice */}
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.border}`,
                borderRadius: 10,
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                <Shield style={{ width: 18, height: 18, color: colors.teal }} />
                <span style={{ fontSize: 13, color: colors.gray }}>Only verified vehicles are shown.</span>
              </div>
            </div>

            {/* Vehicle Information - Editable */}
            <div style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Car style={{ width: 22, height: 22, color: colors.teal }} />
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Vehicle Information</span>
                </div>
                <button
                  onClick={() => setEditingVehicleInfo(e => !e)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px',
                    border: `1.5px solid ${editingVehicleInfo ? colors.teal : colors.border}`,
                    borderRadius: 8,
                    fontSize: 13, fontWeight: 600,
                    color: editingVehicleInfo ? colors.teal : colors.gray,
                    backgroundColor: editingVehicleInfo ? colors.bgTeal : colors.white,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {editingVehicleInfo ? (
                    <><CheckCircle style={{ width: 15, height: 15 }} /> Save</>
                  ) : (
                    <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> Edit</>
                  )}
                </button>
              </div>

              {[
                { label: 'Brand & Model',      field: 'name',         type: 'text' },
                { label: 'Color',              field: 'color',        type: 'text' },
                { label: 'Vehicle Number',     field: 'plate',        type: 'text' },
                { label: 'Seating Capacity',   field: 'seats',        type: 'number' },
                { label: 'Fuel Type',          field: 'fuel',         type: 'select', options: ['Petrol', 'Diesel', 'CNG', 'Electric', 'Hybrid'] },
                { label: 'Transmission',       field: 'transmission', type: 'select', options: ['Automatic', 'Manual'] },
                { label: 'Manufacturing Year', field: 'year',         type: 'number' },
              ].map(row => (
                <div key={row.field} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: `1px solid ${colors.border}`,
                  gap: 12,
                }}>
                  <span style={{ fontSize: 14, color: colors.gray, flexShrink: 0 }}>{row.label}</span>
                  {editingVehicleInfo ? (
                    row.type === 'select' ? (
                      <select
                        value={vehicleInfo[row.field]}
                        onChange={e => setVehicleInfo(prev => ({ ...prev, [row.field]: e.target.value }))}
                        style={{
                          fontSize: 14, fontWeight: 600, color: colors.navy,
                          border: `1.5px solid ${colors.borderTeal}`,
                          borderRadius: 6, padding: '4px 8px',
                          backgroundColor: colors.bgTeal,
                          cursor: 'pointer', outline: 'none',
                          accentColor: colors.teal,
                        }}
                      >
                        {row.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    ) : (
                      <input
                        type={row.type}
                        value={vehicleInfo[row.field]}
                        onChange={e => setVehicleInfo(prev => ({ ...prev, [row.field]: e.target.value }))}
                        style={{
                          fontSize: 14, fontWeight: 600, color: colors.navy,
                          border: `1.5px solid ${colors.borderTeal}`,
                          borderRadius: 6, padding: '4px 8px',
                          backgroundColor: colors.bgTeal,
                          outline: 'none', textAlign: 'right',
                          width: row.type === 'number' ? 80 : 160,
                        }}
                      />
                    )
                  ) : (
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.navy }}>
                      {row.field === 'seats' ? `${vehicleInfo[row.field]} Seats` : vehicleInfo[row.field]}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Safety & Verification */}
            <div style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: '20px 24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                <Shield style={{ width: 22, height: 22, color: colors.teal }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: colors.navy }}>Safety & Verification</span>
              </div>
              {[
                'RC Verified',
                'Insurance Valid',
                'PUC Valid',
                'Vehicle Verified by HopIn',
              ].map(item => (
                <div key={item} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: `1px solid ${colors.border}`,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle style={{ width: 18, height: 18, color: colors.teal }} />
                    <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500 }}>{item}</span>
                  </div>
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: colors.teal,
                    backgroundColor: colors.bgTeal,
                    border: `1px solid ${colors.borderTeal}`,
                    padding: '3px 10px', borderRadius: 20,
                  }}>
                    Verified
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 2: Passenger Amenities ── */}
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>
            2. Passenger Amenities
          </h3>
          <p style={{ fontSize: 14, color: colors.gray, marginBottom: 16 }}>
            Choose the amenities available in this ride. Passengers will see these while booking.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

            {/* Amenity checkboxes */}
            <div style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: '16px 20px',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 12,
              }}>
                {amenitiesList.map(({ id, label, icon: Icon }) => (
                  <label
                    key={id}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 14px',
                      border: `1px solid ${colors.border}`,
                      borderRadius: 10,
                      cursor: 'pointer',
                      backgroundColor: amenities[id] ? colors.bgTeal : colors.white,
                      borderColor: amenities[id] ? colors.borderTeal : colors.border,
                      transition: 'all 0.2s',
                      userSelect: 'none',
                    }}
                  >
                    <Icon style={{ width: 20, height: 20, color: colors.teal, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500, flex: 1 }}>{label}</span>
                    <input
                      type="checkbox"
                      checked={amenities[id]}
                      onChange={() => toggleAmenity(id)}
                      style={{ width: 18, height: 18, accentColor: colors.teal, cursor: 'pointer', flexShrink: 0 }}
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Additional Safety Features */}
            <div style={{
              backgroundColor: colors.white,
              border: `1px solid ${colors.border}`,
              borderRadius: 12,
              padding: '20px 24px',
            }}>
              <h4 style={{ fontSize: 15, fontWeight: 700, color: colors.navy, marginBottom: 20 }}>
                Additional Safety Features
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                {safetyFeatures.map(({ id, label }) => (
                  <div key={id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <SafetyIcon id={id} />
                    <span style={{ fontSize: 12, color: colors.gray, fontWeight: 500, textAlign: 'center' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Ride Note ── */}
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: colors.navy, marginBottom: 4 }}>
            3. Ride Note <span style={{ fontWeight: 400, color: colors.gray }}>(Optional)</span>
          </h3>
          <p style={{ fontSize: 14, color: colors.gray, marginBottom: 16 }}>
            Add a short note for passengers.
          </p>
          <div style={{
            backgroundColor: colors.white,
            border: `1px solid ${colors.border}`,
            borderRadius: 12,
            padding: '16px 20px',
          }}>
            <textarea
              value={rideNote}
              onChange={(e) => setRideNote(e.target.value.slice(0, 200))}
              placeholder="E.g. I'll keep the AC on during the ride. Large luggage may not fit."
              style={{
                width: '100%', minHeight: 90,
                border: 'none', outline: 'none', resize: 'vertical',
                fontSize: 14, fontFamily: "'Inter', sans-serif",
                color: colors.navy, backgroundColor: 'transparent',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ textAlign: 'right', fontSize: 12, color: colors.gray, marginTop: 8 }}>
              {rideNote.length}/200
            </div>
          </div>
        </div>

        {/* ── Action Buttons ── */}
        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={() => navigate('/ride-preferences')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '13px 24px',
              border: `1.5px solid ${colors.border}`,
              borderRadius: 10,
              fontSize: 15, fontWeight: 600,
              color: colors.navy, backgroundColor: colors.white,
              cursor: 'pointer',
            }}
          >
            <ChevronLeft style={{ width: 20, height: 20 }} />
            Back
          </button>
          <button
            onClick={() => navigate('/review-publish')}
            style={{
              flex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '13px 24px',
              border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 700,
              color: colors.white, backgroundColor: colors.teal,
              cursor: 'pointer',
            }}
          >
            Continue to Review & Publish
            <ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; }
        textarea:focus { outline: none; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}