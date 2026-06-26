const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema(
  {
    user:            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    licenseNumber:   { type: String, required: true, unique: true },
    licensePhoto:    { type: String },
    experience:      { type: Number, default: 0 }, // years
    verificationStatus: { type: String, enum: ["pending", "verified", "rejected"], default: "pending" },
    vehicle:         { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    totalRides:      { type: Number, default: 0 },
    totalEarnings:   { type: Number, default: 0 },
    averageRating:   { type: Number, default: 0 },
    totalRatings:    { type: Number, default: 0 },
    isAvailable:     { type: Boolean, default: false },
    currentLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    bankDetails: {
      accountNumber: { type: String },
      ifscCode:      { type: String },
      accountHolder: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Driver", driverSchema);
