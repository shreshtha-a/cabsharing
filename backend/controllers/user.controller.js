const User = require("../models/User.model");
const { Wallet } = require("../models/index");

// ─── Get Profile ──────────────────────────────────────────
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("wallet");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Update Profile ───────────────────────────────────────
exports.updateProfile = async (req, res) => {
  try {
    const allowed = ["name", "phone", "gender", "college", "company"];
    const updates = {};
    allowed.forEach(f => { if (req.body[f] !== undefined) updates[f] = req.body[f]; });

    if (req.file) updates.photo = req.file.path;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Change Password ──────────────────────────────────────
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select("+password");

    if (!user.password) return res.status(400).json({ success: false, message: "Cannot change password for Google accounts" });

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) return res.status(400).json({ success: false, message: "Current password is incorrect" });

    user.password = newPassword;
    await user.save();
    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Add Emergency Contact ────────────────────────────────
exports.addEmergencyContact = async (req, res) => {
  try {
    const { name, phone, relation } = req.body;
    const user = await User.findById(req.user._id);

    if (user.emergencyContacts.length >= 3) {
      return res.status(400).json({ success: false, message: "Maximum 3 emergency contacts allowed" });
    }

    user.emergencyContacts.push({ name, phone, relation });
    await user.save();
    res.json({ success: true, emergencyContacts: user.emergencyContacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Remove Emergency Contact ─────────────────────────────
exports.removeEmergencyContact = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.emergencyContacts = user.emergencyContacts.filter(
      c => c._id.toString() !== req.params.contactId
    );
    await user.save();
    res.json({ success: true, emergencyContacts: user.emergencyContacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get User Stats ───────────────────────────────────────
exports.getStats = async (req, res) => {
  try {
    const Booking = require("../models/Booking.model");
    const bookings = await Booking.find({ passenger: req.user._id, status: "completed" });

    const totalTrips   = bookings.length;
    const totalSpent   = bookings.reduce((s, b) => s + b.totalAmount, 0);
    const wallet       = await Wallet.findOne({ user: req.user._id });

    res.json({ success: true, totalTrips, totalSpent, walletBalance: wallet?.balance || 0 });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Deactivate Account ───────────────────────────────────
exports.deactivateAccount = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { isActive: false });
    res.json({ success: true, message: "Account deactivated" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
