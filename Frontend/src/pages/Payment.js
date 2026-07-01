import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { bookingService, paymentService, openRazorpay } from "../services/bookingService";

// ── Design tokens ──────────────────────────────────────────────────────────
const teal = "#0B9E8E";
const tealLight = "#E6F7F6";
const tealDark = "#097A6D";
const textPrimary = "#1A1A2E";
const textSecondary = "#6B7280";
const borderColor = "#E5E7EB";
const bgPage = "#F8FAFA";
const white = "#FFFFFF";
const red = "#EF4444";
const green = "#10B981";
const amber = "#F59E0B";

// ── Icons (unchanged from your original) ──────────────────────────────────
const IconBell = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);
const IconChevronDown = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
);
const IconChevronUp = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
);
const IconArrowLeft = () => (
  <svg width="18" height="18" fill="none" stroke={textPrimary} strokeWidth="2" viewBox="0 0 24 24">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);
const IconArrowRight = () => (
  <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconHeadphones = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M3 18v-6a9 9 0 0118 0v6" /><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" />
  </svg>
);
const IconShield = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11C5.5 20.74 2 16 2 11V5l10-3z" />
  </svg>
);
const IconRefund = () => (
  <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
  </svg>
);
const IconTag = () => (
  <svg width="16" height="16" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" /><line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);
const IconLock = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);
const IconCheckCircle = () => (
  <svg width="16" height="16" fill="none" stroke={green} strokeWidth="2" viewBox="0 0 24 24">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const IconAlertCircle = () => (
  <svg width="15" height="15" fill="none" stroke="#F59E0B" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconDistance = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <line x1="3" y1="12" x2="21" y2="12" /><polyline points="8 7 3 12 8 17" /><polyline points="16 7 21 12 16 17" />
  </svg>
);
const IconClock = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);
const IconSeat = () => (
  <svg width="16" height="16" fill="none" stroke={textSecondary} strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 11V6a2 2 0 012-2h12a2 2 0 012 2v5" /><path d="M4 11h16v6H4z" /><path d="M8 17v3M16 17v3" />
  </svg>
);

// ── Payment method icons ───────────────────────────────────────────────────
function GPay() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="white" />
      <text x="6" y="24" fontSize="14" fontWeight="800" fill="#4285F4">G</text>
      <text x="16" y="24" fontSize="12" fontWeight="700" fill="#34A853">P</text>
      <text x="24" y="24" fontSize="12" fontWeight="700" fill="#EA4335">a</text>
      <text x="30" y="24" fontSize="10" fontWeight="700" fill="#FBBC05">y</text>
    </svg>
  );
}
function PhonePe() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#5F259F" />
      <text x="9" y="24" fontSize="13" fontWeight="800" fill="white">Pe</text>
    </svg>
  );
}
function Paytm() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="white" />
      <text x="4" y="24" fontSize="11" fontWeight="800" fill="#00BAF2">Pay</text>
      <text x="4" y="32" fontSize="9" fontWeight="700" fill="#00BAF2">tm</text>
    </svg>
  );
}
function BHIM() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      <circle cx="18" cy="18" r="18" fill="#00558B" />
      <text x="5" y="24" fontSize="11" fontWeight="800" fill="white">BHIM</text>
    </svg>
  );
}
function Visa() {
  return (
    <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
      <rect width="44" height="28" rx="4" fill="#1A1F71" />
      <text x="6" y="20" fontSize="14" fontWeight="800" fill="white" fontStyle="italic">VISA</text>
    </svg>
  );
}

function Radio({ checked }) {
  return (
    <div style={{ width: 20, height: 20, borderRadius: "50%", flexShrink: 0, border: `2px solid ${checked ? teal : borderColor}`, background: checked ? tealLight : white, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {checked && <div style={{ width: 10, height: 10, borderRadius: "50%", background: teal }} />}
    </div>
  );
}

const iconBtnStyle = {
  width: 36, height: 36, borderRadius: "50%", border: `1px solid ${borderColor}`,
  background: white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
};
const topBadgeStyle = {
  position: "absolute", top: -2, right: -2, background: red, color: white,
  borderRadius: 99, fontSize: 9, fontWeight: 700, minWidth: 16, height: 16,
  display: "flex", alignItems: "center", justifyContent: "center",
  padding: "0 4px", border: `1.5px solid ${white}`,
};

// ── Top Bar ────────────────────────────────────────────────────────────────
function TopBar({ user, onBack }) {
  const navigate = useNavigate();
  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase() : "U";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 28px", borderBottom: `1px solid ${borderColor}`, background: white, position: "sticky", top: 0, zIndex: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={onBack} style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${borderColor}`, background: white, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <IconArrowLeft />
        </button>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: textPrimary }}>Payment</div>
          <div style={{ fontSize: 12, color: textSecondary }}>Choose a payment method and confirm your ride</div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button style={{ display: "flex", alignItems: "center", gap: 7, border: `1px solid ${borderColor}`, borderRadius: 30, padding: "7px 14px", background: white, cursor: "pointer", fontSize: 13, fontWeight: 500, color: textPrimary }}>
          <IconHeadphones /> Need help?
        </button>
        <div style={{ position: "relative" }}>
          <button style={iconBtnStyle} onClick={() => navigate("/notifications")}><IconBell /></button>
          <span style={topBadgeStyle}>3</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }} onClick={() => navigate("/profile")}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #a8edea, #fed6e3)", border: `2px solid ${borderColor}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: tealDark }}>{initials}</div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary, lineHeight: 1 }}>{user?.name || "User"}</div>
          </div>
          <IconChevronDown />
        </div>
      </div>
    </div>
  );
}

// ── Main Payment Component ─────────────────────────────────────────────────
export default function Payment() {
  const navigate  = useNavigate();
  const location  = useLocation();

  // State passed from BookingConfirmation
  const { ride, selectedSeat, seatDetails, totalFare: passedFare, bookingDbId: passedBookingId } = location.state || {};

  const [user, setUser]                   = useState(null);
  const [wallet, setWallet]               = useState({ balance: 240, cashback: 50, transactions: [] });
  const [payMethod, setPayMethod]         = useState("upi");
  const [selectedUPI, setSelectedUPI]     = useState("gpay");
  const [upiId, setUpiId]                 = useState("");
  const [upiVerified, setUpiVerified]     = useState(false);
  const [upiVerifying, setUpiVerifying]   = useState(false);
  const [promoCode, setPromoCode]         = useState("HOPIN10");
  const [promoApplied, setPromoApplied]   = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLoading, setPromoLoading]   = useState(false);
  const [promoError, setPromoError]       = useState("");
  const [walletDeduction, setWalletDeduction] = useState(0);
  const [useWallet, setUseWallet]         = useState(false);
  const [bookingId, setBookingId]         = useState(passedBookingId || null);
  const [paying, setPaying]               = useState(false);
  const [payError, setPayError]           = useState("");

  // Fare calculations
  const baseFare     = ride?.baseFare || ride?.farePerSeat || passedFare || 150;
  const seatFare     = seatDetails?.price || 0;
  const platformFee  = ride?.platformFee || 20;
  const total        = Math.max(0, baseFare + seatFare + platformFee - promoDiscount - walletDeduction);

  // Load user + wallet from localStorage / API
  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch (_) {}

    paymentService.getWallet()
      .then(data => setWallet(data))
      .catch(() => {}); // silently ignore – wallet shows default
  }, []);

  // Auto-apply wallet if it covers part of the fare
  useEffect(() => {
    if (useWallet) {
      const available = Math.min(wallet.balance, total + promoDiscount); // before wallet
      setWalletDeduction(Math.min(available, total + promoDiscount - promoDiscount));
    } else {
      setWalletDeduction(0);
    }
  }, [useWallet, wallet.balance, promoDiscount, total]);

  // Create pending booking on mount (if not already created by BookingConfirmation)
  useEffect(() => {
    if (passedBookingId || !ride) return; // already created upstream, or no ride data
    bookingService.create({
      rideId:      ride._id,
      seatId:      selectedSeat || "default",
      seatLabel:   seatDetails?.label || "Seat",
      seatPrice:   seatDetails?.price || 0,
      baseFare,
      platformFee,
      discount:    0,
      totalFare:   baseFare + (seatDetails?.price || 0) + platformFee,
    })
    .then(data => setBookingId(data.booking._id))
    .catch(err => console.warn("Booking pre-create:", err.message));
  }, []);

  // ── Apply promo ────────────────────────────────────────────────────────
  const handleApplyPromo = useCallback(async () => {
    if (promoApplied) {
      setPromoApplied(false);
      setPromoDiscount(0);
      setPromoError("");
      return;
    }
    if (!promoCode.trim()) return;
    setPromoLoading(true);
    setPromoError("");
    try {
      const data = await paymentService.applyPromo(promoCode, baseFare + seatFare + platformFee);
      setPromoDiscount(data.discount);
      setPromoApplied(true);
    } catch (err) {
      setPromoError(err.message || "Invalid promo code");
    } finally {
      setPromoLoading(false);
    }
  }, [promoCode, promoApplied, baseFare, seatFare, platformFee]);

  // ── Verify UPI ID ──────────────────────────────────────────────────────
  const handleVerifyUPI = async () => {
    if (!upiId.includes("@")) {
      setPayError("Enter a valid UPI ID (e.g. name@okaxis)");
      return;
    }
    setUpiVerifying(true);
    await new Promise(r => setTimeout(r, 1000)); // simulate network
    setUpiVerified(true);
    setUpiVerifying(false);
  };

  // ── Main pay handler ───────────────────────────────────────────────────
  const handlePay = async () => {
    setPayError("");
    setPaying(true);

    try {
      // 1. Ensure we have a booking ID
      let currentBookingId = bookingId;
      if (!currentBookingId && ride?._id) {
        const created = await bookingService.create({
          rideId:    ride._id,
          seatId:    selectedSeat || "default",
          seatLabel: seatDetails?.label || "Seat",
          seatPrice: seatDetails?.price || 0,
          baseFare,
          platformFee,
          discount:  promoDiscount,
          promoCode: promoApplied ? promoCode : undefined,
          totalFare: total,
        });
        currentBookingId = created.booking._id;
        setBookingId(currentBookingId);
      }

      // 2. Try Razorpay if payment method is UPI or card
      if (payMethod !== "cash" && payMethod !== "wallet") {
        const orderData = await paymentService.createOrder(total, currentBookingId);

        if (!orderData.simulated && orderData.keyId) {
          // Real Razorpay flow
          const payResult = await openRazorpay({
            order:       orderData.order,
            keyId:       orderData.keyId,
            amount:      total,
            name:        user?.name,
            email:       user?.email,
            contact:     user?.phone,
            description: `Ride booking ${currentBookingId}`,
          });
          // Verify on backend
          await bookingService.verifyPayment({
            bookingId:            currentBookingId,
            razorpay_order_id:    payResult.razorpay_order_id,
            razorpay_payment_id:  payResult.razorpay_payment_id,
            razorpay_signature:   payResult.razorpay_signature,
            paymentMethod:        payMethod,
          });
        } else {
          // Dev simulation mode
          await bookingService.paySimulation(currentBookingId, payMethod);
        }
      } else if (payMethod === "wallet") {
        // Full wallet payment
        await bookingService.paySimulation(currentBookingId, "wallet");
      } else {
        // Cash — confirm booking without payment
        await bookingService.paySimulation(currentBookingId, "cash");
      }

      // 3. Navigate to success page with all needed state
      navigate("/payment-success", {
        state: {
          ride,
          selectedSeat,
          seatDetails,
          totalPaid:     total,
          paymentMethod: payMethod,
          selectedUPI:   payMethod === "upi" ? selectedUPI : null,
          promoCode:     promoApplied ? promoCode : null,
          promoDiscount,
          bookingId:     currentBookingId,
          transactionId: `pay_${Math.random().toString(36).substr(2, 10).toUpperCase()}`,
          paidAt:        new Date().toISOString(),
        },
        replace: true,
      });
    } catch (err) {
      if (err.message !== "Payment cancelled") {
        setPayError(err.message || "Payment failed. Please try again.");
      }
    } finally {
      setPaying(false);
    }
  };

  const upiApps = [
    { id: "gpay",    label: "GPay",    icon: <GPay /> },
    { id: "phonepe", label: "PhonePe", icon: <PhonePe /> },
    { id: "paytm",   label: "Paytm",   icon: <Paytm /> },
    { id: "bhim",    label: "BHIM",    icon: <BHIM /> },
  ];

  const from  = ride?.source?.address  || ride?.from  || "Pickup";
  const to    = ride?.destination?.address || ride?.to || "Drop";
  const dist  = ride?.distance   || "22 km";
  const dur   = ride?.duration   || "~45 min";
  const rDate = ride?.date       || "";
  const rTime = ride?.time       || "";

  const payLabel = payMethod === "upi"    ? `Pay ₹${total} via UPI`
                 : payMethod === "card"   ? `Pay ₹${total} via Card`
                 : payMethod === "wallet" ? `Pay ₹${total} via Wallet`
                 : `Confirm ₹${total} Cash Payment`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }
        @media (max-width: 768px) {
          .pay-grid { flex-direction: column !important; }
          .pay-content { padding: 16px !important; }
        }
        .pay-method-row:hover { background: #f9fafb; }
        .upi-app-btn:hover { border-color: ${teal} !important; }
      `}</style>

      <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: bgPage, overflow: "hidden" }}>
        <TopBar user={user} onBack={() => navigate(-1)} />

        <div className="pay-content" style={{ flex: 1, overflowY: "auto", padding: "24px 28px 40px" }}>
          <div className="pay-grid" style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

            {/* ── LEFT COLUMN ───────────────────────────────────────── */}
            <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Select Payment Method */}
              <div style={{ background: white, borderRadius: 18, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
                <div style={{ padding: "18px 22px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: teal, color: white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>1</div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Select Payment Method</div>
                    <div style={{ fontSize: 12, color: textSecondary, marginTop: 1 }}>Choose how you want to pay</div>
                  </div>
                </div>

                {/* UPI */}
                <div style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <div className="pay-method-row" onClick={() => setPayMethod("upi")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", cursor: "pointer" }}>
                    <Radio checked={payMethod === "upi"} />
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" fill="none" stroke="#8B5CF6" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>UPI</div>
                      <div style={{ fontSize: 12, color: textSecondary }}>Pay using any UPI app</div>
                    </div>
                    <span style={{ fontSize: 11.5, fontWeight: 600, color: teal, background: tealLight, border: `1px solid ${teal}33`, borderRadius: 20, padding: "3px 10px" }}>Recommended</span>
                    {payMethod === "upi" ? <IconChevronUp /> : <IconChevronDown />}
                  </div>

                  {payMethod === "upi" && (
                    <div style={{ padding: "0 22px 18px", background: "#FAFBFC" }}>
                      <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                        {upiApps.map(app => (
                          <button key={app.id} className="upi-app-btn" onClick={() => setSelectedUPI(app.id)}
                            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "12px 16px", borderRadius: 12, cursor: "pointer", border: `2px solid ${selectedUPI === app.id ? teal : borderColor}`, background: selectedUPI === app.id ? tealLight : white, transition: "all 0.15s", minWidth: 72 }}>
                            {app.icon}
                            <span style={{ fontSize: 12, fontWeight: 500, color: textPrimary }}>{app.label}</span>
                          </button>
                        ))}
                      </div>
                      <div style={{ display: "flex", gap: 10 }}>
                        <input value={upiId} onChange={e => { setUpiId(e.target.value); setUpiVerified(false); }} placeholder="Enter UPI ID (like name@okaxis)"
                          style={{ flex: 1, padding: "11px 16px", borderRadius: 10, border: `1.5px solid ${upiVerified ? teal : borderColor}`, fontSize: 13.5, color: textPrimary, outline: "none", fontFamily: "inherit", background: white }} />
                        <button onClick={handleVerifyUPI} disabled={upiVerifying}
                          style={{ background: teal, color: white, border: "none", borderRadius: 10, padding: "11px 22px", fontSize: 13.5, fontWeight: 700, cursor: "pointer", opacity: upiVerifying ? 0.7 : 1 }}>
                          {upiVerifying ? "..." : upiVerified ? "✓ Verified" : "Verify"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Saved Cards */}
                <div style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <div className="pay-method-row" onClick={() => setPayMethod("card")} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", cursor: "pointer" }}>
                    <Radio checked={payMethod === "card"} />
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" fill="none" stroke="#3B82F6" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>Saved Cards</div>
                      <div style={{ fontSize: 12, color: textSecondary }}>Pay using your saved cards</div>
                    </div>
                    <button style={{ fontSize: 12.5, fontWeight: 600, color: teal, background: "none", border: "none", cursor: "pointer", padding: 0 }}>+ Add New Card</button>
                  </div>
                  <div style={{ padding: "0 22px 16px 68px", background: "#FAFBFC" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, border: `1.5px solid ${borderColor}`, borderRadius: 12, padding: "12px 16px", background: white }}>
                      <Visa />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>Visa •••• 4521</div>
                        <div style={{ fontSize: 12, color: textSecondary }}>Expires 08/29</div>
                      </div>
                      <Radio checked={payMethod === "card"} />
                    </div>
                  </div>
                </div>

                {/* Wallet */}
                <div style={{ borderBottom: `1px solid ${borderColor}` }}>
                  <div className="pay-method-row" onClick={() => { setPayMethod("wallet"); setUseWallet(true); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", cursor: "pointer" }}>
                    <Radio checked={payMethod === "wallet"} />
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" fill="none" stroke={teal} strokeWidth="1.8" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 14a1 1 0 110-2 1 1 0 010 2z" fill={teal}/><path d="M2 11h20"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>Hop In Wallet</div>
                      <div style={{ fontSize: 12, color: textSecondary }}>Use your wallet balance</div>
                    </div>
                    <span style={{ fontSize: 14.5, fontWeight: 700, color: teal }}>₹{wallet.balance}</span>
                    <IconChevronDown />
                  </div>
                  <div style={{ padding: "0 22px 16px 68px", background: "#FAFBFC" }}>
                    <div style={{ display: "flex", gap: 24, background: tealLight, borderRadius: 12, padding: "14px 18px", flexWrap: "wrap" }}>
                      {[["Wallet Balance", `₹${wallet.balance}`, teal], ["Cashback Earned", `₹${wallet.cashback}`, amber], ["Available for this ride", `₹${Math.min(wallet.balance, total)}`, teal]].map(([label, val, color]) => (
                        <div key={label}>
                          <div style={{ fontSize: 11.5, color: textSecondary }}>{label}</div>
                          <div style={{ fontSize: 16, fontWeight: 700, color, marginTop: 3 }}>{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Cash */}
                <div>
                  <div className="pay-method-row" onClick={() => { setPayMethod("cash"); setUseWallet(false); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 22px", cursor: "pointer" }}>
                    <Radio checked={payMethod === "cash"} />
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" fill="none" stroke={amber} strokeWidth="1.8" viewBox="0 0 24 24"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14.5, fontWeight: 600, color: textPrimary }}>Cash</div>
                      <div style={{ fontSize: 12, color: textSecondary }}>Pay driver directly after the ride</div>
                    </div>
                  </div>
                  <div style={{ padding: "0 22px 16px 68px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <IconAlertCircle />
                      <span style={{ fontSize: 12.5, color: amber, fontWeight: 500 }}>No refunds or rewards available for cash payments.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div style={{ background: white, borderRadius: 18, border: `1px solid ${borderColor}`, padding: "20px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Recent Transactions</div>
                  <button style={{ fontSize: 13, fontWeight: 600, color: teal, background: "none", border: "none", cursor: "pointer" }}>View All</button>
                </div>
                {wallet.transactions && wallet.transactions.length > 0
                  ? wallet.transactions.slice(0, 3).map((tx, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${borderColor}` : "none" }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#f3f4f6", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                        {tx.type === "credit" ? "↑" : "↓"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>{tx.reason}</div>
                        <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>{tx.method} • {new Date(tx.date).toLocaleDateString()}</div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: tx.type === "credit" ? green : red }}>{tx.type === "credit" ? "+" : "-"}₹{tx.amount}</span>
                    </div>
                  ))
                  : [
                    { icon: <GPay />, title: "Paid to Sharda to Pari Chowk", meta: "Today, 9:14 AM • UPI", amount: "+₹120", color: green },
                    { icon: <PhonePe />, title: "Ride to Noida Sec 62", meta: "Yesterday, 8:45 AM • PhonePe", amount: "-₹150", color: red },
                    { icon: <Paytm />, title: "Wallet top-up", meta: "17 Jun, 7:30 PM • UPI", amount: "+₹200", color: green },
                  ].map((tx, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < 2 ? `1px solid ${borderColor}` : "none" }}>
                      <div style={{ width: 38, height: 38, borderRadius: "50%", overflow: "hidden", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6" }}>{tx.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: textPrimary }}>{tx.title}</div>
                        <div style={{ fontSize: 12, color: textSecondary, marginTop: 2 }}>{tx.meta}</div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: tx.color }}>{tx.amount}</span>
                    </div>
                  ))
                }
              </div>

              {/* Trust badges */}
              <div style={{ background: white, borderRadius: 18, border: `1px solid ${borderColor}`, padding: "18px 22px", display: "flex", gap: 0, flexWrap: "wrap" }}>
                {[
                  { icon: <IconShield />, title: "Secure Payment", desc: "Your payment details are encrypted" },
                  { icon: <IconHeadphones />, title: "24/7 Support", desc: "We're here to help you anytime" },
                  { icon: <IconRefund />, title: "Refund Protected", desc: "Easy refunds if ride is cancelled" },
                ].map((item, i) => (
                  <div key={item.title} style={{ flex: 1, minWidth: 150, display: "flex", alignItems: "flex-start", gap: 10, padding: "0 16px", borderLeft: i > 0 ? `1px solid ${borderColor}` : "none" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: tealLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: textPrimary }}>{item.title}</div>
                      <div style={{ fontSize: 11.5, color: textSecondary, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT COLUMN ──────────────────────────────────────── */}
            <div style={{ width: 320, minWidth: 290, display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Ride Summary */}
              <div style={{ background: white, borderRadius: 18, border: `1px solid ${borderColor}`, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${borderColor}`, display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: teal, color: white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>2</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: textPrimary }}>Ride Summary</div>
                </div>

                {/* Scenic map */}
                <div style={{ height: 90, background: "linear-gradient(180deg, #B2DFDB 0%, #80CBC4 60%, #607D8B 100%)", position: "relative", overflow: "hidden" }}>
                  <svg viewBox="0 0 320 90" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
                    <defs><linearGradient id="sceneBg2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B2EBF2"/><stop offset="60%" stopColor="#A5D6A7"/><stop offset="100%" stopColor="#78909C"/></linearGradient></defs>
                    <rect width="320" height="90" fill="url(#sceneBg2)"/>
                    <polygon points="0,60 80,20 160,60" fill="#80CBC4" opacity="0.6"/>
                    <polygon points="100,60 200,15 300,60" fill="#4DB6AC" opacity="0.5"/>
                    <rect x="0" y="70" width="320" height="20" fill="#546E7A" opacity="0.8"/>
                  </svg>
                </div>

                {/* Route */}
                <div style={{ padding: "16px 20px" }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 4 }}>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: green }}/>
                      <div style={{ width: 1.5, height: 26, background: borderColor, margin: "3px 0" }}/>
                      <div style={{ width: 10, height: 10, borderRadius: "50%", background: red }}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 10 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{from}</div>
                        {rTime && <div style={{ fontSize: 12, color: textSecondary }}>Pickup • {rTime}</div>}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{to}</div>
                        {rTime && <div style={{ fontSize: 12, color: textSecondary }}>Drop</div>}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${borderColor}`, flexWrap: "wrap", gap: 8 }}>
                    {[{ icon: <IconDistance />, val: dist }, { icon: <IconClock />, val: dur }, { icon: <IconSeat />, val: "1 Seat" }].map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        {item.icon}<span style={{ fontSize: 12.5, color: textSecondary, fontWeight: 500 }}>{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fare Breakdown */}
                <div style={{ padding: "16px 20px", borderTop: `1px solid ${borderColor}` }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary, marginBottom: 12 }}>Fare Breakdown</div>
                  {[
                    ["Base Fare", `₹${baseFare}`, textPrimary],
                    ...(seatFare > 0 ? [["Seat Fare", `₹${seatFare}`, textPrimary]] : []),
                    ["Platform Fee", `₹${platformFee}`, textPrimary],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0" }}>
                      <span style={{ fontSize: 13, color: textSecondary }}>{label}</span>
                      <span style={{ fontSize: 13, color: textPrimary }}>{val}</span>
                    </div>
                  ))}

                  {/* Promo */}
                  <div style={{ margin: "10px 0", padding: "10px 0", borderTop: `1px dashed ${borderColor}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                      <IconTag /><span style={{ fontSize: 13, fontWeight: 600, color: teal }}>Apply Promo Code</span>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <input value={promoCode} onChange={e => { setPromoCode(e.target.value); setPromoError(""); }}
                        style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: `1.5px solid ${promoApplied ? teal : promoError ? red : borderColor}`, fontSize: 13, outline: "none", color: textPrimary, background: promoApplied ? tealLight : white }} />
                      <button onClick={handleApplyPromo} disabled={promoLoading}
                        style={{ background: teal, color: white, border: "none", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: promoLoading ? 0.7 : 1 }}>
                        {promoLoading ? "..." : promoApplied ? "Remove" : "Apply"}
                      </button>
                    </div>
                    {promoError && <div style={{ fontSize: 12, color: red, marginTop: 6 }}>{promoError}</div>}
                  </div>

                  {promoApplied && (
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                      <span style={{ fontSize: 13, color: teal, fontWeight: 500 }}>Promo Discount</span>
                      <span style={{ fontSize: 13, color: teal, fontWeight: 600 }}>-₹{promoDiscount}</span>
                    </div>
                  )}
                  {walletDeduction > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0" }}>
                      <span style={{ fontSize: 13, color: teal, fontWeight: 500 }}>Wallet Deduction</span>
                      <span style={{ fontSize: 13, color: teal, fontWeight: 600 }}>-₹{walletDeduction}</span>
                    </div>
                  )}

                  {/* Total */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, marginTop: 8, borderTop: `2px solid ${borderColor}` }}>
                    <div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: textPrimary }}>Total Payable</div>
                      <div style={{ fontSize: 11, color: textSecondary, marginTop: 2 }}>(Inclusive of all taxes)</div>
                    </div>
                    <div style={{ fontSize: 26, fontWeight: 800, color: textPrimary }}>₹{total}</div>
                  </div>
                </div>

                {/* Pay Button */}
                <div style={{ padding: "0 20px 16px" }}>
                  {payError && (
                    <div style={{ background: "#FEF2F2", border: `1px solid ${red}33`, borderRadius: 8, padding: "10px 14px", marginBottom: 12, fontSize: 13, color: red, display: "flex", alignItems: "center", gap: 8 }}>
                      <IconAlertCircle /> {payError}
                    </div>
                  )}
                  <button onClick={handlePay} disabled={paying}
                    style={{ width: "100%", padding: "15px 0", background: paying ? "#64748B" : `linear-gradient(90deg, ${teal}, ${tealDark})`, color: white, border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: paying ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, letterSpacing: 0.2, transition: "background 0.2s" }}>
                    <IconLock />
                    {paying ? "Processing..." : payLabel}
                    {!paying && (
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconArrowRight />
                      </div>
                    )}
                  </button>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 10 }}>
                    <IconCheckCircle />
                    <span style={{ fontSize: 12, color: textSecondary }}>Secured by Razorpay • 256-bit SSL</span>
                  </div>
                </div>
              </div>

              {/* Wallet & Rewards */}
              <div style={{ background: white, borderRadius: 18, border: `1px solid ${borderColor}`, padding: "18px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>Wallet &amp; Rewards</div>
                  <button style={{ fontSize: 12.5, fontWeight: 600, color: teal, background: "none", border: "none", cursor: "pointer" }}>View All</button>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  {[
                    { icon: "💳", val: `₹${wallet.balance}`, label: "Wallet Balance", badge: "Add Money", color: teal },
                    { icon: "🎁", val: `₹${wallet.cashback}`, label: "Cashback Pending", badge: "Pending", color: amber },
                    { icon: "🏷️", val: "HOPIN10", label: "20% off up to ₹20", badge: "Active", color: teal },
                  ].map((item, i) => (
                    <div key={i} style={{ flex: 1, background: bgPage, borderRadius: 12, padding: "12px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center", border: `1px solid ${borderColor}` }}>
                      <span style={{ fontSize: 22 }}>{item.icon}</span>
                      <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{item.val}</div>
                      <div style={{ fontSize: 11, color: textSecondary, lineHeight: 1.3 }}>{item.label}</div>
                      <span style={{ fontSize: 11, fontWeight: 600, color: item.color, border: `1px solid ${item.color}33`, borderRadius: 20, padding: "3px 8px", background: item.color + "15" }}>{item.badge}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}