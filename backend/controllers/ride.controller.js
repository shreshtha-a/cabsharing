const Ride    = require("../models/Ride.model");
const Driver  = require("../models/Driver.model");
const { Notification } = require("../models/index");

// ─── Create Ride ──────────────────────────────────────────
exports.createRide = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id, verificationStatus: "verified" });
    if (!driver) return res.status(403).json({ success: false, message: "Driver not verified" });

    const ride = await Ride.create({
      ...req.body,
      driver: driver._id,
      vehicle: driver.vehicle,
      availableSeats: req.body.totalSeats,
    });

    res.status(201).json({ success: true, ride });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get All Rides (with filters) ────────────────────────
exports.getRides = async (req, res) => {
  try {
    const { source, destination, date, seats, minPrice, maxPrice, vehicleType, driverRating } = req.query;

    const query = { status: "scheduled", availableSeats: { $gte: seats || 1 } };

    if (source)      query["source.address"]      = { $regex: source, $options: "i" };
    if (destination) query["destination.address"] = { $regex: destination, $options: "i" };
    if (date)        query.date = { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) };
    if (minPrice || maxPrice) {
      query.farePerSeat = {};
      if (minPrice) query.farePerSeat.$gte = Number(minPrice);
      if (maxPrice) query.farePerSeat.$lte = Number(maxPrice);
    }

    const rides = await Ride.find(query)
      .populate({ path: "driver", populate: { path: "user", select: "name photo" } })
      .populate("vehicle")
      .sort({ date: 1 });

    res.json({ success: true, count: rides.length, rides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Single Ride ──────────────────────────────────────
exports.getRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate({ path: "driver", populate: { path: "user", select: "name photo phone" } })
      .populate("vehicle")
      .populate({ path: "bookings", populate: { path: "passenger", select: "name photo" } });

    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });
    res.json({ success: true, ride });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Ride ──────────────────────────────────────────
exports.updateRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    const driver = await Driver.findOne({ user: req.user._id });
    if (ride.driver.toString() !== driver._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const updated = await Ride.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, ride: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Cancel Ride ──────────────────────────────────────────
exports.cancelRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate("bookings");
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    ride.status = "cancelled";
    await ride.save();

    // Notify all passengers
    const io = req.app.get("io");
    for (const booking of ride.bookings) {
      await Notification.create({
        user:    booking.passenger,
        title:   "Ride Cancelled",
        message: `Your ride from ${ride.source.address} to ${ride.destination.address} has been cancelled.`,
        type:    "ride",
      });
      io.to(`user_${booking.passenger}`).emit("ride_cancelled", { rideId: ride._id });
    }

    res.json({ success: true, message: "Ride cancelled" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Start Ride ───────────────────────────────────────────
exports.startRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    ride.status = "started";
    await ride.save();

    const io = req.app.get("io");
    io.to(`ride_${ride._id}`).emit("ride_started", { rideId: ride._id });

    res.json({ success: true, message: "Ride started" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Complete Ride ────────────────────────────────────────
exports.completeRide = async (req, res) => {
  try {
    const ride = await Ride.findById(req.params.id).populate("bookings");
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    ride.status = "completed";
    await ride.save();

    // Update driver stats
    const driver = await Driver.findById(ride.driver);
    driver.totalRides += 1;
    await driver.save();

    // Notify passengers to rate
    const io = req.app.get("io");
    for (const booking of ride.bookings) {
      if (booking.status === "confirmed") {
        booking.status = "completed";
        await booking.save();
        io.to(`user_${booking.passenger}`).emit("ride_completed", { rideId: ride._id, bookingId: booking._id });
      }
    }

    res.json({ success: true, message: "Ride completed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get My Rides (driver) ────────────────────────────────
exports.getMyRides = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    if (!driver) return res.status(404).json({ success: false, message: "Driver profile not found" });

    const rides = await Ride.find({ driver: driver._id })
      .populate("vehicle")
      .populate({ path: "bookings", populate: { path: "passenger", select: "name photo phone" } })
      .sort({ date: -1 });

    res.json({ success: true, count: rides.length, rides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
