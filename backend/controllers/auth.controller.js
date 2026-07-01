const jwt      = require("jsonwebtoken");
const passport = require("passport");
const User     = require("../models/User.model");
const { Wallet } = require("../models/index");
const { sendEmail } = require("../utils/email");
const { sendSMS }   = require("../utils/sms");

// ─── Helper: generate JWT ─────────────────────────────────
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

// ─── Helper: generate OTP ────────────────────────────────
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// ─── Register ─────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, gender, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

    const otp      = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    const user = await User.create({
      name, email, phone, password, gender,
      role: role || "passenger",
      otp, otpExpiry,
      authProvider: "local",
    });

    // Create wallet for new user
    await Wallet.create({ user: user._id });

    // Send OTP via email
    await sendEmail({
      to: email,
      subject: "Hopin - Verify your email",
      html: `<h2>Your OTP is <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`,
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. Please verify your email with the OTP sent.",
      userId: user._id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify OTP ───────────────────────────────────────────
exports.verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    if (user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });
    if (user.otpExpiry < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    const token = generateToken(user._id);
    res.json({ success: true, message: "Email verified", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Login ────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ success: false, message: "Invalid credentials" });
    if (!user.password) return res.status(401).json({ success: false, message: "Please login with Google" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid credentials" });

    if (!user.isVerified) return res.status(403).json({ success: false, message: "Please verify your email first" });

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, photo: user.photo },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Google OAuth ─────────────────────────────────────────
exports.googleAuth = passport.authenticate("google", { scope: ["profile", "email"] });

exports.googleCallback = (req, res, next) => {
  passport.authenticate("google", { session: false }, async (err, user) => {
    if (err || !user) return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth_failed`);

    // Ensure wallet exists
    const wallet = await Wallet.findOne({ user: user._id });
    if (!wallet) await Wallet.create({ user: user._id });

    const token = generateToken(user._id);
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  })(req, res, next);
};

// ─── Forgot Password ──────────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "No user with that email" });

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendEmail({
      to: email,
      subject: "Hopin - Password Reset OTP",
      html: `<h2>Your password reset OTP is <b>${otp}</b></h2><p>Valid for 10 minutes.</p>`,
    });

    res.json({ success: true, message: "OTP sent to email", userId: user._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Reset Password ───────────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { userId, otp, newPassword } = req.body;
    const user = await User.findById(userId);

    if (!user || user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    user.password  = newPassword;
    user.otp       = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Get Me ───────────────────────────────────────────────
exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user });
};