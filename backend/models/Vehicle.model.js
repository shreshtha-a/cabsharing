const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    driver:          { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    vehicleNumber:   { type: String, required: true, unique: true, uppercase: true },
    model:           { type: String, required: true },
    type:            { type: String, enum: ["sedan", "suv", "hatchback", "auto", "mini"], required: true },
    color:           { type: String, required: true },
    seatingCapacity: { type: Number, required: true, min: 2, max: 8 },
    photo:           { type: String },
    isVerified:      { type: Boolean, default: false },
    rcDocument:      { type: String }, // RC book photo
    insuranceDoc:    { type: String },
    insuranceExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);
