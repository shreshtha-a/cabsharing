const mongoose = require("mongoose");

// ─── Payment ─────────────────────────────────────────────
const paymentSchema = new mongoose.Schema(
  {
    booking:        { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    user:           { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount:         { type: Number, required: true },
    method:         { type: String, enum: ["upi", "card", "netbanking", "wallet", "cash"], required: true },
    status:         { type: String, enum: ["pending", "success", "failed", "refunded"], default: "pending" },
    razorpayOrderId:  { type: String },
    razorpayPaymentId:{ type: String },
    razorpaySignature:{ type: String },
    refundId:       { type: String },
    refundAmount:   { type: Number },
    refundedAt:     { type: Date },
    description:    { type: String },
  },
  { timestamps: true }
);

// ─── Wallet ──────────────────────────────────────────────
const walletSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, default: 0 },
    transactions: [
      {
        type:        { type: String, enum: ["credit", "debit"] },
        amount:      { type: Number },
        description: { type: String },
        reference:   { type: String },
        date:        { type: Date, default: Date.now },
      },
    ],
    promoCodesUsed: [{ type: String }],
    totalEarned:    { type: Number, default: 0 },
    totalSpent:     { type: Number, default: 0 },
  },
  { timestamps: true }
);

// ─── Review ──────────────────────────────────────────────
const reviewSchema = new mongoose.Schema(
  {
    booking:   { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    reviewer:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reviewee:  { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ride:      { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
    rating:    { type: Number, required: true, min: 1, max: 5 },
    reviewType:{ type: String, enum: ["passenger_to_driver", "driver_to_passenger"] },
    comment:   { type: String, maxlength: 500 },
    tags:      [{ type: String }], // e.g., "Safe Driving", "On Time"
  },
  { timestamps: true }
);

// ─── Notification ────────────────────────────────────────
const notificationSchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title:   { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["booking", "payment", "ride", "promo", "emergency", "system"],
      default: "system",
    },
    isRead:    { type: Boolean, default: false },
    data:      { type: mongoose.Schema.Types.Mixed }, // extra payload
  },
  { timestamps: true }
);

// ─── Emergency ───────────────────────────────────────────
const emergencySchema = new mongoose.Schema(
  {
    user:    { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ride:    { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
    type:    { type: String, enum: ["sos", "share_trip", "report"], required: true },
    location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String },
    },
    status:  { type: String, enum: ["active", "resolved"], default: "active" },
    message: { type: String },
    resolvedAt: { type: Date },
    resolvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// ─── Support Ticket ──────────────────────────────────────
const supportTicketSchema = new mongoose.Schema(
  {
    user:     { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subject:  { type: String, required: true },
    message:  { type: String, required: true },
    category: { type: String, enum: ["payment", "ride", "driver", "safety", "other"], default: "other" },
    status:   { type: String, enum: ["open", "in_progress", "resolved", "closed"], default: "open" },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    ride:     { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
    replies:  [
      {
        sender:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        date:    { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// ─── Promo Code ──────────────────────────────────────────
const promoSchema = new mongoose.Schema(
  {
    code:           { type: String, required: true, unique: true, uppercase: true },
    discountType:   { type: String, enum: ["flat", "percent"], required: true },
    discountValue:  { type: Number, required: true },
    maxDiscount:    { type: Number },
    minOrderAmount: { type: Number, default: 0 },
    usageLimit:     { type: Number, default: 100 },
    usedCount:      { type: Number, default: 0 },
    validFrom:      { type: Date, required: true },
    validUntil:     { type: Date, required: true },
    isActive:       { type: Boolean, default: true },
    usedBy:         [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = {
  Payment:       mongoose.model("Payment", paymentSchema),
  Wallet:        mongoose.model("Wallet", walletSchema),
  Review:        mongoose.model("Review", reviewSchema),
  Notification:  mongoose.model("Notification", notificationSchema),
  Emergency:     mongoose.model("Emergency", emergencySchema),
  SupportTicket: mongoose.model("SupportTicket", supportTicketSchema),
  Promo:         mongoose.model("Promo", promoSchema),
};