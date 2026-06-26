const Driver  = require("../models/Driver.model");
const Vehicle = require("../models/Vehicle.model");
const User    = require("../models/User.model");
const { Notification } = require("../models/index");

// ─── Register as Driver ───────────────────────────────────
exports.registerDriver = async (req, res) => {
  try {
    const existing = await Driver.findOne({ user: req.user._id });
    if (existing) return res.status(400).json({ success: false, message: "Driver profile already exists" });

    const { licenseNumber, experience, bankDetails } = req.body;

    const driver = await Driver.create({
      user:          req.user._id,
      licenseNumber,
      experience,
      bankDetails,
      licensePhoto:  req.file?.path || "",
    });

    // Update user role
    await User.findByIdAndUpdate(req.user._id, { role: "driver" });

    res.status(201).json({ success: true, message: "Driver registered, pending verification", driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Driver Profile ───────────────────────────────────
exports.getDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.params.userId || req.user._id })
      .populate("user", "name photo email phone")
      .populate("vehicle");

    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Driver Profile ────────────────────────────────
exports.updateDriverProfile = async (req, res) => {
  try {
    const driver = await Driver.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });
    res.json({ success: true, driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Add Vehicle ──────────────────────────────────────────
exports.addVehicle = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    if (!driver) return res.status(404).json({ success: false, message: "Driver profile not found" });

    const vehicle = await Vehicle.create({
      ...req.body,
      driver: driver._id,
      photo:  req.file?.path || "",
    });

    driver.vehicle = vehicle._id;
    await driver.save();

    res.status(201).json({ success: true, vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Vehicle ───────────────────────────────────────
exports.updateVehicle = async (req, res) => {
  try {
    const driver  = await Driver.findOne({ user: req.user._id });
    const vehicle = await Vehicle.findOneAndUpdate(
      { _id: req.params.vehicleId, driver: driver._id },
      req.body,
      { new: true }
    );
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Driver Earnings ──────────────────────────────────
exports.getEarnings = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });

    const Ride    = require("../models/Ride.model");
    const Booking = require("../models/Booking.model");

    const rides = await Ride.find({ driver: driver._id, status: "completed" });
    const rideIds = rides.map(r => r._id);
    const bookings = await Booking.find({ ride: { $in: rideIds }, paymentStatus: "paid" });

    const totalEarnings = bookings.reduce((sum, b) => sum + b.totalAmount, 0);

    // Monthly breakdown
    const monthly = {};
    bookings.forEach(b => {
      const month = new Date(b.createdAt).toLocaleString("default", { month: "short", year: "numeric" });
      monthly[month] = (monthly[month] || 0) + b.totalAmount;
    });

    res.json({
      success: true,
      totalEarnings,
      totalRides: driver.totalRides,
      averageRating: driver.averageRating,
      monthly,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Toggle Availability ──────────────────────────────────
exports.toggleAvailability = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.user._id });
    driver.isAvailable = !driver.isAvailable;
    await driver.save();
    res.json({ success: true, isAvailable: driver.isAvailable });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Driver Location ───────────────────────────────
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng, rideId } = req.body;
    const driver = await Driver.findOneAndUpdate(
      { user: req.user._id },
      { currentLocation: { lat, lng } },
      { new: true }
    );

    // Emit via socket to passengers in that ride
    if (rideId) {
      req.app.get("io").to(`ride_${rideId}`).emit("location_update", { lat, lng });
    }

    res.json({ success: true, message: "Location updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
