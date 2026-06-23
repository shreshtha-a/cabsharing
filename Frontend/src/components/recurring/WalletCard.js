export default function WalletCard() {
  return (
    <div style={{ background: "#fff", borderRadius: "24px", padding: "24px", border: "1px solid #E5E7EB" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "#F0FDFA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>👛</div>
          <span style={{ fontSize: "15px", fontWeight: "700", color: "#0F2D52" }}>Wallet & Rewards</span>
        </div>
        <button style={{ background: "none", border: "none", color: "#14B8A6", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>View All</button>
      </div>

      {/* Wallet balance + cashback + promo */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "14px" }}>
        <div style={{ background: "#F8FAFC", borderRadius: "14px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "#0F2D52" }}>₹240</div>
          <div style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>Wallet Balance</div>
          <button style={{ marginTop: "8px", background: "#0F2D52", color: "#fff", border: "none", borderRadius: "8px", padding: "4px 10px", fontSize: "10px", fontWeight: "600", cursor: "pointer", width: "100%" }}>Add Money</button>
        </div>
        <div style={{ background: "#F8FAFC", borderRadius: "14px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "18px", fontWeight: "800", color: "#F59E0B" }}>₹50</div>
          <div style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>Cashback Pending</div>
          <div style={{ marginTop: "8px", background: "#FEF3C7", color: "#B45309", border: "none", borderRadius: "8px", padding: "4px 10px", fontSize: "10px", fontWeight: "600", textAlign: "center" }}>Pending</div>
        </div>
        <div style={{ background: "#F8FAFC", borderRadius: "14px", padding: "12px", textAlign: "center" }}>
          <div style={{ fontSize: "13px", fontWeight: "800", color: "#0F2D52" }}>HOPIN10</div>
          <div style={{ fontSize: "10px", color: "#64748B", marginTop: "2px" }}>20% off up to ₹30</div>
          <div style={{ marginTop: "8px", background: "#F0FDFA", color: "#0F6E56", border: "none", borderRadius: "8px", padding: "4px 10px", fontSize: "10px", fontWeight: "600", textAlign: "center" }}>Active</div>
        </div>
      </div>

      {/* Refund protected */}
      <div style={{ background: "#F0FDFA", borderRadius: "12px", padding: "12px 14px", display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "20px" }}>💚</span>
        <div>
          <div style={{ fontSize: "12px", fontWeight: "700", color: "#0F6E56" }}>Refund Protected</div>
          <div style={{ fontSize: "11px", color: "#64748B" }}>Easy refunds if ride is cancelled</div>
        </div>
      </div>
    </div>
  );
}