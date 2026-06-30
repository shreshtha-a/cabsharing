// ════════════════════════════════════════════════════════════
// wallet.controller.js
// ════════════════════════════════════════════════════════════
const { Wallet, Promo } = require("../models/index");

exports.getWallet = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet) return res.status(404).json({ success: false, message: "Wallet not found" });
    res.json({ success: true, wallet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addMoney = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: "Invalid amount" });

    const wallet = await Wallet.findOne({ user: req.user._id });
    wallet.balance    += amount;
    wallet.totalEarned += amount;
    wallet.transactions.push({ type: "credit", amount, description: "Added money to wallet" });
    await wallet.save();

    res.json({ success: true, balance: wallet.balance, message: `₹${amount} added to wallet` });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ user: req.user._id });
    const transactions = wallet.transactions.sort((a, b) => b.date - a.date);
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createPromo = async (req, res) => {
  try {
    const promo = await Promo.create(req.body);
    res.status(201).json({ success: true, promo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getPromos = async (req, res) => {
  try {
    const promos = await Promo.find({ isActive: true, validUntil: { $gte: new Date() } });
    res.json({ success: true, promos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// review.controller.js
// ════════════════════════════════════════════════════════════
const { Review } = require("../models/index");
const Driver     = require("../models/Driver.model");
const Booking    = require("../models/Booking.model");

exports.createReview = async (req, res) => {
  try {
    const { bookingId, rating, comment, tags, reviewType } = req.body;

    const booking = await Booking.findById(bookingId).populate("ride");
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });
    if (booking.status !== "completed") return res.status(400).json({ success: false, message: "Can only review completed rides" });
    if (booking.review) return res.status(400).json({ success: false, message: "Already reviewed" });

    const Ride = require("../models/Ride.model");
    const ride = await Ride.findById(booking.ride).populate({ path: "driver", populate: { path: "user" } });

    const revieweeId = reviewType === "passenger_to_driver"
      ? ride.driver.user._id
      : booking.passenger;

    const review = await Review.create({
      booking: bookingId,
      reviewer: req.user._id,
      reviewee: revieweeId,
      ride:     booking.ride,
      rating, comment, tags, reviewType,
    });

    booking.review = review._id;
    await booking.save();

    // Update driver average rating
    if (reviewType === "passenger_to_driver") {
      const driver = await Driver.findById(ride.driver._id);
      driver.totalRatings += 1;
      driver.averageRating = ((driver.averageRating * (driver.totalRatings - 1)) + rating) / driver.totalRatings;
      await driver.save();
    }

    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getDriverReviews = async (req, res) => {
  try {
    const driver = await Driver.findOne({ user: req.params.driverId });
    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });

    const reviews = await Review.find({ reviewee: req.params.driverId, reviewType: "passenger_to_driver" })
      .populate("reviewer", "name photo")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// notification.controller.js
// ════════════════════════════════════════════════════════════
const { Notification } = require("../models/index");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    const unreadCount = await Notification.countDocuments({ user: req.user._id, isRead: false });
    res.json({ success: true, notifications, unreadCount });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.json({ success: true, message: "Marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
    res.json({ success: true, message: "All marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// emergency.controller.js
// ════════════════════════════════════════════════════════════
const { Emergency, Notification: Notif } = require("../models/index");
const User = require("../models/User.model");
const { sendSMS } = require("../utils/sms");

exports.triggerSOS = async (req, res) => {
  try {
    const { rideId, bookingId, lat, lng, address } = req.body;

    const emergency = await Emergency.create({
      user:     req.user._id,
      ride:     rideId,
      booking:  bookingId,
      type:     "sos",
      location: { lat, lng, address },
    });

    // Notify emergency contacts via SMS
    const user = await User.findById(req.user._id);
    const mapLink = `https://maps.google.com/?q=${lat},${lng}`;
    for (const contact of user.emergencyContacts) {
      await sendSMS(
        contact.phone,
        `🚨 SOS from ${user.name}! They need help at: ${address || mapLink}. Please call them immediately.`
      );
    }

    // Notify admins via socket
    req.app.get("io").emit("sos_alert", { emergency, user: { name: user.name, phone: user.phone } });

    res.status(201).json({ success: true, message: "SOS triggered, contacts notified", emergency });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.shareTrip = async (req, res) => {
  try {
    const { rideId, contactPhone } = req.body;
    const Ride = require("../models/Ride.model");
    const ride = await Ride.findById(rideId).populate({ path: "driver", populate: { path: "user", select: "name" } });
    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    const message = `${req.user.name} is on a ride with ${ride.driver.user.name} from ${ride.source.address} to ${ride.destination.address}. Track: ${process.env.CLIENT_URL}/track/${rideId}`;
    await sendSMS(contactPhone, message);

    await Emergency.create({
      user:    req.user._id,
      ride:    rideId,
      type:    "share_trip",
      message: `Trip shared with ${contactPhone}`,
    });

    res.json({ success: true, message: "Trip shared successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getEmergencies = async (req, res) => {
  try {
    const filter = req.user.role === "admin" ? {} : { user: req.user._id };
    const emergencies = await Emergency.find(filter)
      .populate("user", "name phone")
      .populate("ride")
      .sort({ createdAt: -1 });
    res.json({ success: true, emergencies });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// search.controller.js
// ════════════════════════════════════════════════════════════
const Ride = require("../models/Ride.model");

exports.searchRides = async (req, res) => {
  try {
    const { source, destination, date, seats = 1, minPrice, maxPrice, vehicleType, genderPref, sort = "date" } = req.query;

    const query = {
      status:         "scheduled",
      availableSeats: { $gte: Number(seats) },
      date:           { $gte: new Date() },
    };

    if (source)      query["source.address"]      = { $regex: source, $options: "i" };
    if (destination) query["destination.address"] = { $regex: destination, $options: "i" };
    if (date) {
      const d = new Date(date);
      query.date = { $gte: d, $lt: new Date(d.getTime() + 86400000) };
    }
    if (minPrice || maxPrice) {
      query.farePerSeat = {};
      if (minPrice) query.farePerSeat.$gte = Number(minPrice);
      if (maxPrice) query.farePerSeat.$lte = Number(maxPrice);
    }
    if (vehicleType) query["vehicle.type"] = vehicleType;
    if (genderPref)  query["preferences.genderPreference"] = { $in: ["any", genderPref] };

    const sortMap = { date: { date: 1 }, price: { farePerSeat: 1 }, rating: { "driver.averageRating": -1 } };

    const rides = await Ride.find(query)
      .populate({ path: "driver", populate: { path: "user", select: "name photo" } })
      .populate("vehicle")
      .sort(sortMap[sort] || { date: 1 })
      .limit(50);

    res.json({ success: true, count: rides.length, rides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getRideSuggestions = async (req, res) => {
  try {
    const { source } = req.query;
    const rides = await Ride.find({
      "source.address": { $regex: source, $options: "i" },
      status: "scheduled",
    }).distinct("destination.address");
    res.json({ success: true, suggestions: rides.slice(0, 10) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// analytics.controller.js
// ════════════════════════════════════════════════════════════
exports.getPassengerAnalytics = async (req, res) => {
  try {
    const Booking = require("../models/Booking.model");
    const WalletM = require("../models/index").Wallet;

    const bookings = await Booking.find({ passenger: req.user._id }).populate("ride");
    const completed = bookings.filter(b => b.status === "completed");

    const totalTrips    = completed.length;
    const totalSpent    = completed.reduce((s, b) => s + b.totalAmount, 0);
    const totalDistance = completed.reduce((s, b) => s + (b.ride?.estimatedDistance || 0), 0);
    const co2Saved      = (totalDistance * 0.12).toFixed(2); // kg CO2 per km
    const wallet        = await WalletM.findOne({ user: req.user._id });

    // Monthly spend
    const monthly = {};
    completed.forEach(b => {
      const m = new Date(b.createdAt).toLocaleString("default", { month: "short" });
      monthly[m] = (monthly[m] || 0) + b.totalAmount;
    });

    res.json({ success: true, totalTrips, totalSpent, totalDistance, co2Saved, walletBalance: wallet?.balance || 0, monthly });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAdminAnalytics = async (req, res) => {
  try {
    const User    = require("../models/User.model");
    const Ride    = require("../models/Ride.model");
    const Booking = require("../models/Booking.model");
    const Driver  = require("../models/Driver.model");
    const { Payment } = require("../models/index");

    const [totalUsers, totalDrivers, totalRides, activeRides, totalBookings, payments] = await Promise.all([
      User.countDocuments(),
      Driver.countDocuments(),
      Ride.countDocuments(),
      Ride.countDocuments({ status: "started" }),
      Booking.countDocuments(),
      Payment.find({ status: "success" }),
    ]);

    const totalRevenue = payments.reduce((s, p) => s + p.amount, 0);

    res.json({ success: true, totalUsers, totalDrivers, totalRides, activeRides, totalBookings, totalRevenue });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// tracking.controller.js
// ════════════════════════════════════════════════════════════
exports.getRideStatus = async (req, res) => {
  try {
    const Ride   = require("../models/Ride.model");
    const Driver = require("../models/Driver.model");

    const ride = await Ride.findById(req.params.rideId)
      .populate({ path: "driver", populate: { path: "user", select: "name photo phone" } })
      .populate("vehicle");

    if (!ride) return res.status(404).json({ success: false, message: "Ride not found" });

    const driver = await Driver.findById(ride.driver._id);

    res.json({
      success: true,
      rideStatus: ride.status,
      driverLocation: driver.currentLocation,
      source:         ride.source,
      destination:    ride.destination,
      driver: {
        name:   ride.driver.user.name,
        photo:  ride.driver.user.photo,
        phone:  ride.driver.user.phone,
        rating: driver.averageRating,
      },
      vehicle: ride.vehicle,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// upload.controller.js
// ════════════════════════════════════════════════════════════
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
    res.json({ success: true, url: req.file.path, publicId: req.file.filename });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ════════════════════════════════════════════════════════════
// admin.controller.js
// ════════════════════════════════════════════════════════════
exports.getAllUsers = async (req, res) => {
  try {
    const User = require("../models/User.model");
    const { role, isVerified, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (role)       filter.role       = role;
    if (isVerified) filter.isVerified = isVerified === "true";

    const users = await User.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });
    const total = await User.countDocuments(filter);

    res.json({ success: true, total, page: Number(page), users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyDriver = async (req, res) => {
  try {
    const Driver = require("../models/Driver.model");
    const { status } = req.body; // "verified" or "rejected"

    const driver = await Driver.findByIdAndUpdate(req.params.driverId, { verificationStatus: status }, { new: true })
      .populate({ path: "user", select: "name email" });

    if (!driver) return res.status(404).json({ success: false, message: "Driver not found" });

    const { Notification: N } = require("../models/index");
    await N.create({
      user:    driver.user._id,
      title:   status === "verified" ? "Driver Verified ✅" : "Verification Rejected ❌",
      message: status === "verified"
        ? "Congratulations! Your driver account has been verified. You can now offer rides."
        : "Your driver verification was rejected. Please resubmit your documents.",
      type: "system",
    });

    res.json({ success: true, message: `Driver ${status}`, driver });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyVehicle = async (req, res) => {
  try {
    const Vehicle = require("../models/Vehicle.model");
    const vehicle = await Vehicle.findByIdAndUpdate(req.params.vehicleId, { isVerified: true }, { new: true });
    if (!vehicle) return res.status(404).json({ success: false, message: "Vehicle not found" });
    res.json({ success: true, message: "Vehicle verified", vehicle });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.toggleUserStatus = async (req, res) => {
  try {
    const User = require("../models/User.model");
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    user.isActive = !user.isActive;
    await user.save();
    res.json({ success: true, message: `User ${user.isActive ? "activated" : "deactivated"}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllRides = async (req, res) => {
  try {
    const Ride = require("../models/Ride.model");
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const rides = await Ride.find(filter)
      .populate({ path: "driver", populate: { path: "user", select: "name" } })
      .populate("vehicle")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Ride.countDocuments(filter);
    res.json({ success: true, total, rides });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getSupportTickets = async (req, res) => {
  try {
    const { SupportTicket } = require("../models/index");
    const tickets = await SupportTicket.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json({ success: true, tickets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.replyToTicket = async (req, res) => {
  try {
    const { SupportTicket } = require("../models/index");
    const ticket = await SupportTicket.findById(req.params.ticketId);
    if (!ticket) return res.status(404).json({ success: false, message: "Ticket not found" });

    ticket.replies.push({ sender: req.user._id, message: req.body.message });
    if (req.body.status) ticket.status = req.body.status;
    await ticket.save();

    res.json({ success: true, ticket });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};