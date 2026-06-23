import { useState } from "react";

export default function RideSummaryCard() {
  const [promoCode, setPromoCode] = useState("HOPIN10");
  const [promoApplied, setPromoApplied] = useState(true);

  const baseFare = 150;
  const platformFee = 10;
  const promoDiscount = promoApplied ? -20 : 0;
  const walletDeduction = -20;
  const total = baseFare + platformFee + promoDiscount + walletDeduction;

  return (
    <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #E5E7EB" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>🧾</div>
        <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Ride Summary</span>
      </div>

      {/* Map banner */}
      <div style={{ borderRadius: "14px", overflow: "hidden", height: "90px", marginBottom: "14px", position: "relative", background: "linear-gradient(135deg,#e8f5e9,#e3f2fd)" }}>
        <img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400" alt="map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#14B8A6" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0F2D52", background: "rgba(255,255,255,0.85)", padding: "2px 8px", borderRadius: "20px" }}>Sharda University</span>
            <span style={{ fontSize: "10px", color: "#64748B", background: "rgba(255,255,255,0.85)", padding: "2px 6px", borderRadius: "20px" }}>Pickup · 08:30 AM</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#F59E0B" }} />
            <span style={{ fontSize: "11px", fontWeight: "700", color: "#0F2D52", background: "rgba(255,255,255,0.85)", padding: "2px 8px", borderRadius: "20px" }}>Noida Sector 62</span>
            <span style={{ fontSize: "10px", color: "#64748B", background: "rgba(255,255,255,0.85)", padding: "2px 6px", borderRadius: "20px" }}>Drop · 09:15 AM</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px", padding: "10px 0", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9" }}>
        {[{ icon: "🛣️", val: "22 km" }, { icon: "⏱", val: "~45 min" }, { icon: "🧍", val: "1 Seat" }].map(s => (
          <div key={s.val} style={{ flex: 1, display: "flex", alignItems: "center", gap: "4px", justifyContent: "center" }}>
            <span style={{ fontSize: "14px" }}>{s.icon}</span>
            <span style={{ fontSize: "12px", fontWeight: "600", color: "#0F2D52" }}>{s.val}</span>
          </div>
        ))}
      </div>

      {/* Estimated Fare */}
      <div style={{ fontSize: "13px", fontWeight: "700", color: "#0F2D52", marginBottom: "10px" }}>Estimated Fare</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span style={{ color: "#64748B" }}>Base Fare</span>
          <span style={{ color: "#0F2D52", fontWeight: "600" }}>₹{baseFare}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
          <span style={{ color: "#64748B" }}>Platform Fee</span>
          <span style={{ color: "#0F2D52", fontWeight: "600" }}>₹{platformFee}</span>
        </div>
      </div>

      {/* Promo code */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
        <input
          value={promoCode}
          onChange={e => { setPromoCode(e.target.value); setPromoApplied(false); }}
          placeholder="Apply Promo Code"
          style={{ flex: 1, border: "1px dashed #CBD5E1", borderRadius: "10px", padding: "8px 12px", fontSize: "13px", color: "#0F2D52", outline: "none", background: "#F8FAFC" }}
        />
        <button
          onClick={() => setPromoApplied(true)}
          style={{ background: "#0F2D52", color: "#fff", border: "none", borderRadius: "10px", padding: "8px 14px", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}
        >
          Apply
        </button>
      </div>

      {promoApplied && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "6px" }}>
            <span style={{ color: "#64748B" }}>Promo Discount</span>
            <span style={{ color: "#16A34A", fontWeight: "600" }}>-₹{Math.abs(promoDiscount)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "12px" }}>
            <span style={{ color: "#64748B" }}>Wallet Deduction</span>
            <span style={{ color: "#16A34A", fontWeight: "600" }}>-₹{Math.abs(walletDeduction)}</span>
          </div>
        </>
      )}

      {/* Total */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", fontWeight: "700", color: "#0F2D52", borderTop: "1px solid #F1F5F9", paddingTop: "10px", marginBottom: "4px" }}>
        <span>Total Payable</span>
        <span style={{ fontSize: "20px", color: "#0F2D52" }}>₹{total}</span>
      </div>
      <div style={{ fontSize: "10px", color: "#94A3B8", marginBottom: "14px" }}>(inclusive of all taxes)</div>

      {/* Pay button */}
      <button style={{ width: "100%", background: "linear-gradient(135deg,#14B8A6,#0F2D52)", border: "none", borderRadius: "14px", padding: "14px", color: "#fff", fontSize: "15px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        💳 Pay ₹{total} via UPI
        <span style={{ marginLeft: "auto", background: "rgba(255,255,255,0.2)", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center" }}>→</span>
      </button>
      <div style={{ textAlign: "center", fontSize: "10px", color: "#94A3B8", marginTop: "8px" }}>🔒 Secured by Razorpay · 256-bit SSL</div>
    </div>
  );
}