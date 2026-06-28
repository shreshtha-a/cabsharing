import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MessageCircle, MapPin, Clock, Shield, User, Luggage, Music, Wind, Cigarette, Wine, Users, UtensilsCrossed, FileText, CheckCircle, HelpCircle } from 'lucide-react';

// ─── Color Scheme ────────────────────────────────────────────
const colors = {
  teal: '#13C9B8',
  navy: '#1A2332',
  gray: '#6B7280',
  lightGray: '#F5F7FA',
  white: '#FFFFFF',
  border: '#E5E7EB',
  bgLight: '#F3F4F6',
  bgLighter: '#FAFAFA',
  bgTeal: '#E8FAF9',
  borderTeal: '#B2EDEA',
};

const RidePreferences = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    passengerPreference: 'anyone',
    luggagePreference: 'smallBag',
    musicDuringRide: 'softMusic',
    acPreference: 'alwaysOn',
    conversationPreference: 'chatFriendly',
    smokingPolicy: 'notAllowed',
    alcoholPolicy: 'notAllowed',
    petPolicy: 'notAllowed',
    foodDrinks: 'noFood',
    pickupFlexibility: {
      waitUpTo5: true,
      flexiblePickupNearby: false,
    },
    bookingMethod: 'autoAccept',
    safetyPreferences: {
      verifiedPassengersOnly: true,
      governmentIdRequired: true,
      shareTripWithFamily: false,
    },
    additionalNotes: '',
  });

  const handleRadioChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (parent, field) => {
    setFormData({
      ...formData,
      [parent]: {
        ...formData[parent],
        [field]: !formData[parent][field],
      },
    });
  };

  const handleNotesChange = (e) => {
    const text = e.target.value.slice(0, 250);
    setFormData({ ...formData, additionalNotes: text });
  };

  const PreferenceCard = ({ icon: Icon, title, description, children, twoColumn, hideInGrid }) => (
    <div style={{
      backgroundColor: colors.white,
      borderRadius: 12,
      padding: '20px 24px',
      border: `1px solid ${colors.border}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      gridColumn: twoColumn ? 'span 2' : 'span 1',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Icon style={{ color: colors.teal, width: 24, height: 24 }} />
        <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0 }}>{title}</h3>
      </div>
      {description && (
        <p style={{ fontSize: 13, color: colors.gray, marginBottom: 14, margin: '0 0 14px 0' }}>
          {description}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </div>
  );

  const RadioOption = ({ id, label, value, checked, onChange }) => (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: 8,
      transition: 'background 0.2s',
      userSelect: 'none',
      margin: 0,
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = colors.bgLight}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{
          width: 18,
          height: 18,
          cursor: 'pointer',
          accentColor: colors.teal,
          margin: 0,
          padding: 0,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500, margin: 0 }}>{label}</span>
    </label>
  );

  const CheckboxOption = ({ id, label, checked, onChange }) => (
    <label style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      cursor: 'pointer',
      padding: '8px 12px',
      borderRadius: 8,
      transition: 'background 0.2s',
      userSelect: 'none',
      margin: 0,
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = colors.bgLight}
    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        style={{
          width: 18,
          height: 18,
          cursor: 'pointer',
          accentColor: colors.teal,
          borderRadius: 4,
          margin: 0,
          padding: 0,
          flexShrink: 0,
        }}
      />
      <span style={{ fontSize: 14, color: colors.navy, fontWeight: 500, margin: 0 }}>{label}</span>
    </label>
  );

  const InfoBox = ({ title, items }) => (
    <div style={{
      backgroundColor: colors.bgTeal,
      borderRadius: 12,
      padding: '20px 24px',
      border: `1px solid ${colors.borderTeal}`,
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.teal, marginBottom: 14 }}>{title}</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <CheckCircle style={{ width: 20, height: 20, color: colors.teal, flexShrink: 0, marginTop: 2 }} />
            <span style={{ fontSize: 14, color: colors.navy, fontWeight: 400 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.lightGray, fontFamily: "'Inter', sans-serif" }}>
      {/* ── Header ── */}
      <div style={{
        backgroundColor: colors.white,
        borderBottom: `1px solid ${colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 10,
        boxShadow: '0 1px 8px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <button style={{
              background: 'none',
              border: 'none',
              padding: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}>
              <ChevronLeft style={{ width: 24, height: 24 }} />
            </button>
            <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.navy, margin: 0 }}>Offer a Ride</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <HelpCircle style={{ width: 20, height: 20, color: colors.teal }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: colors.navy }}>Need Help</span>
            </div>
          </div>

          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            {[
              { num: 1, label: 'Trip Details', completed: true },
              { num: 2, label: 'Ride Preferences', active: true },
              { num: 3, label: 'Vehicle Details', completed: false },
              { num: 4, label: 'Review & Publish', completed: false },
            ].map((step, idx, arr) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 12 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: step.active || step.completed ? colors.teal : colors.border,
                  color: step.active || step.completed ? colors.white : colors.gray,
                  fontSize: 14,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {step.completed && step.num !== 2 ? '✓' : step.num}
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: step.active ? colors.teal : colors.gray,
                  whiteSpace: 'nowrap',
                }}>
                  {step.label}
                </span>
                {idx < arr.length - 1 && (
                  <div style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: colors.border,
                    margin: '0 8px',
                  }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: colors.navy, marginBottom: 8 }}>
            Ride <span style={{ color: colors.teal }}>Preferences</span>
          </h2>
          <p style={{ fontSize: 15, color: colors.gray, fontWeight: 400, margin: 0 }}>
            Set your preferences to let passengers know what to expect and enjoy a comfortable ride.
          </p>
        </div>

        {/* Grid of Cards - 5 Column First Row, then 3 Column */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 20,
          marginBottom: 32,
        }}>
          {/* Row 1: Passenger, Luggage, Music, AC, Why Set Preferences */}
          <PreferenceCard icon={User} title="Passenger Preference">
            <RadioOption
              id="anyone"
              label="Anyone"
              value="anyone"
              checked={formData.passengerPreference === 'anyone'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
            <RadioOption
              id="femaleOnly"
              label="Female Only"
              value="femaleOnly"
              checked={formData.passengerPreference === 'femaleOnly'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
            <RadioOption
              id="maleOnly"
              label="Male Only"
              value="maleOnly"
              checked={formData.passengerPreference === 'maleOnly'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
            <RadioOption
              id="studentsOnly"
              label="Students Only"
              value="studentsOnly"
              checked={formData.passengerPreference === 'studentsOnly'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
            <RadioOption
              id="officeProfessionals"
              label="Office Professionals"
              value="officeProfessionals"
              checked={formData.passengerPreference === 'officeProfessionals'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
            <RadioOption
              id="verifiedUsersOnly"
              label="Verified Users Only"
              value="verifiedUsersOnly"
              checked={formData.passengerPreference === 'verifiedUsersOnly'}
              onChange={(e) => handleRadioChange('passengerPreference', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Luggage} title="Luggage Preference">
            <RadioOption
              id="noLuggage"
              label="No luggage"
              value="noLuggage"
              checked={formData.luggagePreference === 'noLuggage'}
              onChange={(e) => handleRadioChange('luggagePreference', e.target.value)}
            />
            <RadioOption
              id="smallBag"
              label="Small Bag Only"
              value="smallBag"
              checked={formData.luggagePreference === 'smallBag'}
              onChange={(e) => handleRadioChange('luggagePreference', e.target.value)}
            />
            <RadioOption
              id="mediumLuggage"
              label="Medium Luggage"
              value="mediumLuggage"
              checked={formData.luggagePreference === 'mediumLuggage'}
              onChange={(e) => handleRadioChange('luggagePreference', e.target.value)}
            />
            <RadioOption
              id="largeLuggageAllowed"
              label="Large Luggage Allowed"
              value="largeLuggageAllowed"
              checked={formData.luggagePreference === 'largeLuggageAllowed'}
              onChange={(e) => handleRadioChange('luggagePreference', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Music} title="Music During Ride">
            <RadioOption
              id="noMusic"
              label="No Music"
              value="noMusic"
              checked={formData.musicDuringRide === 'noMusic'}
              onChange={(e) => handleRadioChange('musicDuringRide', e.target.value)}
            />
            <RadioOption
              id="softMusic"
              label="Soft Music"
              value="softMusic"
              checked={formData.musicDuringRide === 'softMusic'}
              onChange={(e) => handleRadioChange('musicDuringRide', e.target.value)}
            />
            <RadioOption
              id="driverPlaylist"
              label="Driver Playlist"
              value="driverPlaylist"
              checked={formData.musicDuringRide === 'driverPlaylist'}
              onChange={(e) => handleRadioChange('musicDuringRide', e.target.value)}
            />
            <RadioOption
              id="passengersCanControl"
              label="Passengers Can Control"
              value="passengersCanControl"
              checked={formData.musicDuringRide === 'passengersCanControl'}
              onChange={(e) => handleRadioChange('musicDuringRide', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Wind} title="AC Preference">
            <RadioOption
              id="alwaysOn"
              label="Always ON"
              value="alwaysOn"
              checked={formData.acPreference === 'alwaysOn'}
              onChange={(e) => handleRadioChange('acPreference', e.target.value)}
            />
            <RadioOption
              id="optional"
              label="Optional"
              value="optional"
              checked={formData.acPreference === 'optional'}
              onChange={(e) => handleRadioChange('acPreference', e.target.value)}
            />
            <RadioOption
              id="off"
              label="OFF"
              value="off"
              checked={formData.acPreference === 'off'}
              onChange={(e) => handleRadioChange('acPreference', e.target.value)}
            />
          </PreferenceCard>

          {/* Why Set Preferences - Highlighted Card */}
          <InfoBox
            title="Why set preferences?"
            items={[
              'Attract the right passengers',
              'Ensure a comfortable journey',
              'Build trust and safety',
              'Reduce cancellations',
            ]}
          />

          {/* Now switch to 3 column grid for remaining cards */}
          {/* This creates a new row - we need to adjust our grid */}
        </div>

        {/* Second Grid - 3 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 32,
        }}>
          {/* Row 2: Conversation, Smoking, Alcohol */}
          <PreferenceCard icon={MessageCircle} title="Conversation Preference">
            <RadioOption
              id="chatFriendly"
              label="Chat Friendly"
              value="chatFriendly"
              checked={formData.conversationPreference === 'chatFriendly'}
              onChange={(e) => handleRadioChange('conversationPreference', e.target.value)}
            />
            <RadioOption
              id="quietRide"
              label="Quiet Ride"
              value="quietRide"
              checked={formData.conversationPreference === 'quietRide'}
              onChange={(e) => handleRadioChange('conversationPreference', e.target.value)}
            />
            <RadioOption
              id="musicOnly"
              label="Music Only"
              value="musicOnly"
              checked={formData.conversationPreference === 'musicOnly'}
              onChange={(e) => handleRadioChange('conversationPreference', e.target.value)}
            />
            <RadioOption
              id="workFriendly"
              label="Work Friendly"
              value="workFriendly"
              checked={formData.conversationPreference === 'workFriendly'}
              onChange={(e) => handleRadioChange('conversationPreference', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Cigarette} title="Smoking Policy">
            <RadioOption
              id="smokingNotAllowed"
              label="Not Allowed"
              value="notAllowed"
              checked={formData.smokingPolicy === 'notAllowed'}
              onChange={(e) => handleRadioChange('smokingPolicy', e.target.value)}
            />
            <RadioOption
              id="smokingAllowed"
              label="Allowed"
              value="allowed"
              checked={formData.smokingPolicy === 'allowed'}
              onChange={(e) => handleRadioChange('smokingPolicy', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Wine} title="Alcohol Policy">
            <RadioOption
              id="alcoholNotAllowed"
              label="Not Allowed"
              value="notAllowed"
              checked={formData.alcoholPolicy === 'notAllowed'}
              onChange={(e) => handleRadioChange('alcoholPolicy', e.target.value)}
            />
            <RadioOption
              id="alcoholAllowed"
              label="Allowed"
              value="allowed"
              checked={formData.alcoholPolicy === 'allowed'}
              onChange={(e) => handleRadioChange('alcoholPolicy', e.target.value)}
            />
          </PreferenceCard>

          {/* Row 3: Pets, Food & Drinks, Pickup Flexibility */}
          <PreferenceCard icon={Users} title="Pets">
            <RadioOption
              id="petsNotAllowed"
              label="Not Allowed"
              value="notAllowed"
              checked={formData.petPolicy === 'notAllowed'}
              onChange={(e) => handleRadioChange('petPolicy', e.target.value)}
            />
            <RadioOption
              id="petsAllowed"
              label="Allowed"
              value="allowed"
              checked={formData.petPolicy === 'allowed'}
              onChange={(e) => handleRadioChange('petPolicy', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={UtensilsCrossed} title="Food & Drinks">
            <RadioOption
              id="noFood"
              label="No Food"
              value="noFood"
              checked={formData.foodDrinks === 'noFood'}
              onChange={(e) => handleRadioChange('foodDrinks', e.target.value)}
            />
            <RadioOption
              id="waterOnly"
              label="Water Only"
              value="waterOnly"
              checked={formData.foodDrinks === 'waterOnly'}
              onChange={(e) => handleRadioChange('foodDrinks', e.target.value)}
            />
            <RadioOption
              id="foodAllowed"
              label="Food Allowed"
              value="foodAllowed"
              checked={formData.foodDrinks === 'foodAllowed'}
              onChange={(e) => handleRadioChange('foodDrinks', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Clock} title="Pickup Flexibility">
            <CheckboxOption
              id="waitUpTo5"
              label="Wait up to 5 minutes"
              checked={formData.pickupFlexibility.waitUpTo5}
              onChange={() => handleCheckboxChange('pickupFlexibility', 'waitUpTo5')}
            />
            <CheckboxOption
              id="flexiblePickupNearby"
              label="Flexible Pickup Nearby"
              checked={formData.pickupFlexibility.flexiblePickupNearby}
              onChange={() => handleCheckboxChange('pickupFlexibility', 'flexiblePickupNearby')}
            />
          </PreferenceCard>

          {/* Row 4: Booking Method, Safety Preferences (spans 2) */}
          <PreferenceCard icon={MapPin} title="Booking Method">
            <RadioOption
              id="autoAccept"
              label="Auto Accept"
              value="autoAccept"
              checked={formData.bookingMethod === 'autoAccept'}
              onChange={(e) => handleRadioChange('bookingMethod', e.target.value)}
            />
            <RadioOption
              id="approvalRequired"
              label="Approval Required"
              value="approvalRequired"
              checked={formData.bookingMethod === 'approvalRequired'}
              onChange={(e) => handleRadioChange('bookingMethod', e.target.value)}
            />
          </PreferenceCard>

          <PreferenceCard icon={Shield} title="Safety Preferences" twoColumn>
            <CheckboxOption
              id="verifiedPassengersOnly"
              label="Verified Passengers Only"
              checked={formData.safetyPreferences.verifiedPassengersOnly}
              onChange={() => handleCheckboxChange('safetyPreferences', 'verifiedPassengersOnly')}
            />
            <CheckboxOption
              id="governmentIdRequired"
              label="Government ID Required"
              checked={formData.safetyPreferences.governmentIdRequired}
              onChange={() => handleCheckboxChange('safetyPreferences', 'governmentIdRequired')}
            />
            <CheckboxOption
              id="shareTripWithFamily"
              label="Share Trip with Family"
              checked={formData.safetyPreferences.shareTripWithFamily}
              onChange={() => handleCheckboxChange('safetyPreferences', 'shareTripWithFamily')}
            />
          </PreferenceCard>
        </div>

        {/* Additional Notes - Full Width */}
        <div style={{
          backgroundColor: colors.white,
          borderRadius: 12,
          padding: '20px 24px',
          border: `1px solid ${colors.border}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <FileText style={{ color: colors.teal, width: 24, height: 24 }} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: colors.navy, margin: 0 }}>
              Additional Notes (Optional)
            </h3>
          </div>
          <textarea
            value={formData.additionalNotes}
            onChange={handleNotesChange}
            placeholder="E.g. I will leave on time. Please reach a few minutes early. No stops in between."
            style={{
              width: '100%',
              padding: 12,
              border: `1.5px solid ${colors.border}`,
              borderRadius: 8,
              fontSize: 14,
              fontFamily: "'Inter', sans-serif",
              color: colors.navy,
              backgroundColor: colors.white,
              resize: 'vertical',
              minHeight: 100,
            }}
          />
          <div style={{ fontSize: 12, color: colors.gray, marginTop: 8, textAlign: 'right' }}>
            {formData.additionalNotes.length}/250
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          marginTop: 32,
        }} >
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 24px',
                border: `1.5px solid ${colors.border}`,
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 600,
                color: colors.navy,
                backgroundColor: colors.white,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.bgLight}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.white}
              onClick={() => navigate('/offer-ride')}
            >
              <ChevronLeft style={{ width: 20, height: 20 }} />
              Back
            </button>
            <button
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                padding: '12px 24px',
                border: 'none',
                borderRadius: 10,
                fontSize: 15,
                fontWeight: 700,
                color: colors.white,
                backgroundColor: colors.teal,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#0FA89F'}
              onMouseLeave={(e) => e.target.style.backgroundColor = colors.teal}
              onClick={() => navigate('/vehicle-details')}
            >
              Continue to Vehicle Details
              <ChevronRight style={{ width: 20, height: 20 }} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        * {
          box-sizing: border-box;
        }
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          padding: 0;
        }
        textarea:focus {
          outline: 2px solid ${colors.teal};
          outline-offset: 0;
        }
        input[type="radio"]:focus,
        input[type="checkbox"]:focus {
          outline: none;
        }
        @media (max-width: 1200px) {
          [data-grid-5col] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          [data-grid-5col],
          [data-grid-3col] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RidePreferences;