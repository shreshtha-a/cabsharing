const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema(
  {
    driver:   { type: mongoose.Schema.Types.ObjectId, ref: "Driver", required: true },
    vehicle:  { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle", required: true },

    source: {
      address: { type: String, required: true },
      lat:     { type: Number },
      lng:     { type: Number },
    },
    destination: {
      address: { type: String, required: true },
      lat:     { type: Number },
      lng:     { type: Number },
    },
    intermediateStops: [
      {
        address: { type: String },
        lat:     { type: Number },
        lng:     { type: Number },
      },
    ],

    date:            { type: Date, required: true },
    time:            { type: String, required: true },
    totalSeats:      { type: Number, required: true },
    availableSeats:  { type: Number, required: true },
    farePerSeat:     { type: Number, required: true },
    rideType:        { type: String, enum: ["oneWay", "roundTrip"], default: "oneWay" },
    estimatedDistance: { type: Number }, // km
    estimatedDuration: { type: Number }, // minutes

    status: {
      type: String,
      enum: ["scheduled", "started", "completed", "cancelled"],
      default: "scheduled",
    },

    bookings:        [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
    preferences: {
      genderPreference: { type: String, enum: ["any", "male", "female"], default: "any" },
      luggageAllowed:   { type: Boolean, default: true },
      petsAllowed:      { type: Boolean, default: false },
      smokingAllowed:   { type: Boolean, default: false },
      musicAllowed:     { type: Boolean, default: true },
    },

    isRecurring: { type: Boolean, default: false },
    recurringDays: [{ type: String, enum: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"] }],
  },
  { timestamps: true }
);

// Index for fast search
rideSchema.index({ "source.address": "text", "destination.address": "text" });
rideSchema.index({ date: 1, status: 1 });

module.exports = mongoose.model("Ride", rideSchema);
