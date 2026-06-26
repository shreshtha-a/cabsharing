const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    ride:      { type: mongoose.Schema.Types.ObjectId, ref: "Ride", required: true },
    passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    seatsBooked:  { type: Number, required: true, min: 1 },
    totalAmount:  { type: Number, required: true },
    farePerSeat:  { type: Number, required: true },

    pickupPoint:  { type: String },
    dropPoint:    { type: String },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed", "no_show"],
      default: "pending",
    },

    payment:      { type: mongoose.Schema.Types.ObjectId, ref: "Payment" },
    paymentStatus: { type: String, enum: ["pending", "paid", "refunded"], default: "pending" },

    cancelledBy:  { type: String, enum: ["passenger", "driver", "admin"] },
    cancelReason: { type: String },
    cancelledAt:  { type: Date },

    review:       { type: mongoose.Schema.Types.ObjectId, ref: "Review" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
