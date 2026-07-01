import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, MapPin, Clock, Shield, User, Music, Wind, Cigarette, Wine, Users, UtensilsCrossed, FileText, CheckCircle, HelpCircle } from 'lucide-react';

const colors = { teal:'#13C9B8', navy:'#1A2332', gray:'#6B7280', lightGray:'#F5F7FA', white:'#FFFFFF', border:'#E5E7EB', bgLight:'#F3F4F6', bgTeal:'#E8FAF9', borderTeal:'#B2EDEA' };

// Responsive rules live here since the rest of the component uses inline styles
// (which win specificity over external classes for any property they set directly).
// Anything that needs to change per-breakpoint has been moved OUT of inline style
// objects and into these classes instead.
const ResponsiveStyles = () => (
  <style>{`
    .rp-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .rp-title {
      font-size: 24px;
      font-weight: 700;
      color: ${colors.navy};
      margin: 0;
    }
    .rp-help-label {
      display: inline;
    }
    .rp-step-scroll {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
      padding-bottom: 2px;
    }
    .rp-step-scroll::-webkit-scrollbar {
      height: 4px;
    }
    .rp-page-wrap {
      max-width: 1280px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .rp-heading {
      font-size: 32px;
      font-weight: 800;
      color: ${colors.navy};
      margin-bottom: 8px;
    }
    .rp-grid-1 {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 20px;
      margin-bottom: 32px;
    }
    .rp-grid-2 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 32px;
    }
    .rp-actions {
      display: flex;
      gap: 12px;
    }
    .rp-back-btn span.rp-back-label {
      display: inline;
    }

    @media (max-width: 1100px) {
      .rp-grid-1 { grid-template-columns: repeat(3, 1fr); }
      .rp-grid-2 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 860px) {
      .rp-page-wrap { padding: 24px 16px; }
      .rp-heading { font-size: 26px; }
      .rp-grid-1 { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 640px) {
      .rp-title { font-size: 19px; }
      .rp-help-label { display: none; }
      .rp-heading { font-size: 22px; }
      .rp-grid-1 { grid-template-columns: 1fr; }
      .rp-grid-2 { grid-template-columns: 1fr; }
      .rp-actions { flex-direction: column-reverse; }
      .rp-actions button { width: 100%; }
    }

    @media (max-width: 480px) {
      .rp-page-wrap { padding: 20px 12px; }
      .rp-back-btn span.rp-back-label { display: none; }
    }
  `}</style>
);

const LuggageIcon = ({ style }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={style}>
    <rect x="6" y="7" width="12" height="14" rx="2"/><path d="M9 7V5a3 3 0 016 0v2"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/>
  </svg>
);

function StepBar({ current }) {
  const steps = ["Trip Details", "Ride Preferences", "Vehicle Details", "Review & Publish"];
  return (
    <div className="rp-step-scroll">
      <div style={{ display: "flex", alignItems: "center", marginBottom: 0, minWidth: 560 }}>
        {steps.map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", background: i <= current ? colors.teal : colors.border, color: i <= current ? colors.white : colors.gray, flexShrink: 0 }}>
                {i < current ? "✓" : i + 1}
              </div>
              <span style={{ fontSize: 12, fontWeight: i === current ? 700 : 500, color: i === current ? colors.teal : colors.gray, whiteSpace: "nowrap" }}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: i < current ? colors.teal : colors.border, margin: "0 8px", minWidth: 16 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

const PreferenceCard = ({ icon: Icon, title, description, children, twoColumn }) => (
  <div style={{ backgroundColor: colors.white, borderRadius: 12, padding: '20px 24px', border: `1px solid ${colors.border}`, boxShadow: '0 2px 8px rgba(0,0,0,0.05)', gridColumn: twoColumn ? 'span 2' : 'span 1', minWidth: 0 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <Icon style={{ color: colors.teal, width: 24, height: 24, flexShrink: 0 }} />
      <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0 }}>{title}</h3>
    </div>
    {description && <p style={{ fontSize: 13, color: colors.gray, margin: '0 0 14px 0' }}>{description}</p>}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
  </div>
);

const RadioOption = ({ id, label, value, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '8px 12px', borderRadius: 8, userSelect: 'none', margin: 0 }}
    onMouseEnter={e => e.currentTarget.style.background = colors.bgLight}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <input type="radio" id={id} value={value} checked={checked} onChange={onChange} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: colors.teal, margin: 0, flexShrink: 0 }} />
    <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500, margin: 0 }}>{label}</span>
  </label>
);

const CheckboxOption = ({ id, label, checked, onChange }) => (
  <label style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '8px 12px', borderRadius: 8, userSelect: 'none', margin: 0 }}
    onMouseEnter={e => e.currentTarget.style.background = colors.bgLight}
    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
  >
    <input type="checkbox" id={id} checked={checked} onChange={onChange} style={{ width: 18, height: 18, cursor: 'pointer', accentColor: colors.teal, margin: 0, flexShrink: 0 }} />
    <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500, margin: 0 }}>{label}</span>
  </label>
);

export default function RidePreferences() {
  const navigate = useNavigate();
  const saved = JSON.parse(localStorage.getItem("hopin_prefs") || "{}");

  const [formData, setFormData] = useState({
    passengerPreference: saved.passengerPreference || 'anyone',
    luggagePreference:   saved.luggagePreference   || 'smallBag',
    musicDuringRide:     saved.musicDuringRide     || 'softMusic',
    acPreference:        saved.acPreference        || 'alwaysOn',
    conversationPreference: saved.conversationPreference || 'chatFriendly',
    smokingPolicy:       saved.smokingPolicy       || 'notAllowed',
    alcoholPolicy:       saved.alcoholPolicy       || 'notAllowed',
    petPolicy:           saved.petPolicy           || 'notAllowed',
    foodDrinks:          saved.foodDrinks          || 'noFood',
    pickupFlexibility:   saved.pickupFlexibility   || { waitUpTo5: true, flexiblePickupNearby: false },
    bookingMethod:       saved.bookingMethod       || 'autoAccept',
    safetyPreferences:   saved.safetyPreferences   || { verifiedPassengersOnly: true, governmentIdRequired: true, shareTripWithFamily: false },
    additionalNotes:     saved.additionalNotes     || '',
  });

  const handle   = (field, value) => setFormData(p => ({ ...p, [field]: value }));
  const handleCb = (parent, field) => setFormData(p => ({ ...p, [parent]: { ...p[parent], [field]: !p[parent][field] } }));

  const handleContinue = () => {
    localStorage.setItem("hopin_prefs", JSON.stringify(formData));
    navigate('/vehicle-details');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, fontFamily: "'Inter', sans-serif" }}>
      <ResponsiveStyles />
      <div style={{ backgroundColor: colors.white, borderBottom: `1px solid ${colors.border}`, position: 'sticky', top: 0, zIndex: 10, boxShadow: '0 1px 8px rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px' }}>
          <div className="rp-header-row">
            <button onClick={() => navigate('/offer-ride')} style={{ background: 'none', border: 'none', padding: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}><ChevronLeft style={{ width: 24, height: 24 }} /></button>
            <h1 className="rp-title">Offer a Ride</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}><HelpCircle style={{ width: 20, height: 20, color: colors.teal }} /><span className="rp-help-label" style={{ fontSize: 14, fontWeight: 500, color: colors.navy }}>Need Help</span></div>
          </div>
          <StepBar current={1} />
        </div>
      </div>

      <div className="rp-page-wrap">
        <div style={{ marginBottom: 32 }}>
          <h2 className="rp-heading">Ride <span style={{ color: colors.teal }}>Preferences</span></h2>
          <p style={{ fontSize: 15, color: colors.gray, margin: 0 }}>Set your preferences to let passengers know what to expect.</p>
        </div>

        <div className="rp-grid-1">
          <PreferenceCard icon={User} title="Passenger Preference">
            {[['anyone','Anyone'],['femaleOnly','Female Only'],['maleOnly','Male Only'],['studentsOnly','Students Only'],['verifiedUsersOnly','Verified Users Only']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.passengerPreference===v} onChange={e => handle('passengerPreference', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={LuggageIcon} title="Luggage Preference">
            {[['noLuggage','No Luggage'],['smallBag','Small Bag Only'],['mediumLuggage','Medium Luggage'],['largeLuggageAllowed','Large Luggage Allowed']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.luggagePreference===v} onChange={e => handle('luggagePreference', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Music} title="Music During Ride">
            {[['noMusic','No Music'],['softMusic','Soft Music'],['driverPlaylist',"Driver's Playlist"],['passengersCanControl','Passengers Can Control']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.musicDuringRide===v} onChange={e => handle('musicDuringRide', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Wind} title="AC Preference">
            {[['alwaysOn','Always ON'],['optional','Optional'],['off','OFF']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.acPreference===v} onChange={e => handle('acPreference', e.target.value)} />
            ))}
          </PreferenceCard>
          <div style={{ backgroundColor: colors.bgTeal, borderRadius: 12, padding: '20px 24px', border: `1px solid ${colors.borderTeal}` }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.teal, marginBottom: 14 }}>Why set preferences?</h3>
            {['Attract the right passengers','Ensure a comfortable journey','Build trust and safety','Reduce cancellations'].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                <CheckCircle style={{ width: 18, height: 18, color: colors.teal, flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 14, color: colors.navy }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rp-grid-2">
          <PreferenceCard icon={MessageCircle} title="Conversation Preference">
            {[['chatFriendly','Chat Friendly'],['quietRide','Quiet Ride'],['musicOnly','Music Only'],['workFriendly','Work Friendly']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.conversationPreference===v} onChange={e => handle('conversationPreference', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Cigarette} title="Smoking Policy">
            {[['notAllowed','Not Allowed'],['allowed','Allowed']].map(([v,l]) => (
              <RadioOption key={v} id={`smoke_${v}`} label={l} value={v} checked={formData.smokingPolicy===v} onChange={e => handle('smokingPolicy', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Wine} title="Alcohol Policy">
            {[['notAllowed','Not Allowed'],['allowed','Allowed']].map(([v,l]) => (
              <RadioOption key={v} id={`alc_${v}`} label={l} value={v} checked={formData.alcoholPolicy===v} onChange={e => handle('alcoholPolicy', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Users} title="Pets">
            {[['notAllowed','Not Allowed'],['allowed','Allowed']].map(([v,l]) => (
              <RadioOption key={v} id={`pet_${v}`} label={l} value={v} checked={formData.petPolicy===v} onChange={e => handle('petPolicy', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={UtensilsCrossed} title="Food & Drinks">
            {[['noFood','No Food'],['waterOnly','Water Only'],['foodAllowed','Food Allowed']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.foodDrinks===v} onChange={e => handle('foodDrinks', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Clock} title="Pickup Flexibility">
            <CheckboxOption id="waitUpTo5" label="Wait up to 5 minutes" checked={formData.pickupFlexibility.waitUpTo5} onChange={() => handleCb('pickupFlexibility','waitUpTo5')} />
            <CheckboxOption id="flexPickup" label="Flexible Pickup Nearby" checked={formData.pickupFlexibility.flexiblePickupNearby} onChange={() => handleCb('pickupFlexibility','flexiblePickupNearby')} />
          </PreferenceCard>
          <PreferenceCard icon={MapPin} title="Booking Method">
            {[['autoAccept','Auto Accept'],['approvalRequired','Approval Required']].map(([v,l]) => (
              <RadioOption key={v} id={v} label={l} value={v} checked={formData.bookingMethod===v} onChange={e => handle('bookingMethod', e.target.value)} />
            ))}
          </PreferenceCard>
          <PreferenceCard icon={Shield} title="Safety Preferences" twoColumn>
            <CheckboxOption id="verifiedOnly" label="Verified Passengers Only" checked={formData.safetyPreferences.verifiedPassengersOnly} onChange={() => handleCb('safetyPreferences','verifiedPassengersOnly')} />
            <CheckboxOption id="govId" label="Government ID Required" checked={formData.safetyPreferences.governmentIdRequired} onChange={() => handleCb('safetyPreferences','governmentIdRequired')} />
            <CheckboxOption id="shareTrip" label="Share Trip with Family" checked={formData.safetyPreferences.shareTripWithFamily} onChange={() => handleCb('safetyPreferences','shareTripWithFamily')} />
          </PreferenceCard>
        </div>

        <div style={{ backgroundColor: colors.white, borderRadius: 12, padding: '20px 24px', border: `1px solid ${colors.border}`, marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <FileText style={{ color: colors.teal, width: 24, height: 24 }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0 }}>Additional Notes (Optional)</h3>
          </div>
          <textarea value={formData.additionalNotes} onChange={e => handle('additionalNotes', e.target.value.slice(0,250))} placeholder="E.g. I will leave on time. Please reach a few minutes early." style={{ width: '100%', padding: 12, border: `1.5px solid ${colors.border}`, borderRadius: 8, fontSize: 14, fontFamily: "'Inter', sans-serif", color: colors.navy, resize: 'vertical', minHeight: 100, boxSizing: 'border-box', outline: 'none' }} />
          <div style={{ fontSize: 12, color: colors.gray, marginTop: 8, textAlign: 'right' }}>{formData.additionalNotes.length}/250</div>
        </div>

        <div className="rp-actions">
          <button className="rp-back-btn" onClick={() => navigate('/offer-ride')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', border: `1.5px solid ${colors.border}`, borderRadius: 10, fontSize: 15, fontWeight: 600, color: colors.navy, backgroundColor: colors.white, cursor: 'pointer' }}>
            <ChevronLeft style={{ width: 20, height: 20 }} /><span className="rp-back-label">Back</span>
          </button>
          <button onClick={handleContinue} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 24px', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 700, color: colors.white, backgroundColor: colors.teal, cursor: 'pointer' }}>
            Continue to Vehicle Details<ChevronRight style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>
    </div>
  );
}