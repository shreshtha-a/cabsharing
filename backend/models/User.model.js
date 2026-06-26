const mongoose = require("mongoose");
const bcrypt   = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, unique: true, lowercase: true },
    phone:        { type: String, unique: true, sparse: true },
    password:     { type: String, select: false },
    photo:        { type: String, default: "" },
    gender:       { type: String, enum: ["male", "female", "other"] },
    college:      { type: String },
    company:      { type: String },
    role:         { type: String, enum: ["passenger", "driver", "admin"], default: "passenger" },
    googleId:     { type: String },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    isVerified:   { type: Boolean, default: false },
    isActive:     { type: Boolean, default: true },
    otp:          { type: String },
    otpExpiry:    { type: Date },
    emergencyContacts: [
      {
        name:  { type: String },
        phone: { type: String },
        relation: { type: String },
      },
    ],
    wallet:       { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
    totalTrips:   { type: Number, default: 0 },
    totalSaved:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model("User", userSchema);
