const Booking = require("../models/Booking.model");
const Ride    = require("../models/Ride.model");
const { Notification, Wallet } = require("../models/index");

// ─── Create Booking ───────────────────────────────────────
exports.createBooking = async (req, res) => {
  try {
    const { rideId, seatsBooked, pickupPoint, dropPoint } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });
    if (ride.status !== "scheduled") return res.status(400).json({ success: false, message: "Ride is not available" });
    if (ride.availableSeats < seatsBooked) return res.status(400).json({ success: false, message: "Not enough seats available" });

    const totalAmount = ride.farePerSeat * seatsBooked;

    const booking = await Booking.create({
      ride:        rideId,
      passenger:   req.user._id,
      seatsBooked,
      farePerSeat: ride.farePerSeat,
      totalAmount,
      pickupPoint: pickupPoint || ride.source.address,
      dropPoint:   dropPoint   || ride.destination.address,
      status:      "confirmed",
      paymentStatus: "pending",
    });

    // Reduce available seats
    ride.availableSeats -= seatsBooked;
    ride.bookings.push(booking._id);
    await ride.save();

    // Notify driver
    const populatedRide = await Ride.findById(rideId).populate({ path: "driver", populate: { path: "user" } });
    await Notification.create({
      user:    populatedRide.driver.user._id,
      title:   "New Booking!",
      message: `${req.user.name} booked ${seatsBooked} seat(s) on your ride.`,
      type:    "booking",
      data:    { bookingId: booking._id, rideId },
    });

    const io = req.app.get("io");
    io.to(`user_${populatedRide.driver.user._id}`).emit("new_booking", { booking });

    res.status(201).json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get My Bookings (passenger) ─────────────────────────
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ passenger: req.user._id })
      .populate({ path: "ride", populate: [{ path: "driver", populate: { path: "user", select: "name photo" } }, { path: "vehicle" }] })
      .populate("payment")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: bookings.length, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Single Booking ───────────────────────────────────
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({ path: "ride", populate: [{ path: "driver", populate: { path: "user", select: "name photo phone" } }, { path: "vehicle" }] })
      .populate("passenger", "name photo phone")
      .populate("payment");

    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    // Only passenger or driver can view
    const ride = await Ride.findById(booking.ride._id).populate({ path: "driver", populate: { path: "user" } });
    const isPassenger = booking.passenger._id.toString() === req.user._id.toString();
    const isDriver    = ride.driver.user._id.toString() === req.user._id.toString();
    if (!isPassenger && !isDriver && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Cancel Booking ───────────────────────────────────────
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.passenger.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    if (booking.status === "cancelled") return res.status(400).json({ success: false, message: "Already cancelled" });

    booking.status      = "cancelled";
    booking.cancelledBy = "passenger";
    booking.cancelReason = req.body.reason || "";
    booking.cancelledAt  = new Date();
    await booking.save();

    // Restore seats
    await Ride.findByIdAndUpdate(booking.ride, { $inc: { availableSeats: booking.seatsBooked } });

    // Refund to wallet if paid
    if (booking.paymentStatus === "paid") {
      const wallet = await Wallet.findOne({ user: req.user._id });
      wallet.balance += booking.totalAmount;
      wallet.transactions.push({ type: "credit", amount: booking.totalAmount, description: "Booking cancellation refund", reference: booking._id.toString() });
      await wallet.save();
      booking.paymentStatus = "refunded";
      await booking.save();
    }

    res.json({ success: true, message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
