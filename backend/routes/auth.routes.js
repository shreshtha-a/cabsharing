// ════════════════════════════════════════════════
// routes/auth.routes.js
// ════════════════════════════════════════════════
const express  = require("express");
const router   = express.Router();
const ctrl     = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register",         ctrl.register);
router.post("/verify-otp",       ctrl.verifyOTP);
router.post("/login",            ctrl.login);
router.get ("/google",           ctrl.googleAuth);
router.get ("/google/callback",  ctrl.googleCallback);
router.post("/forgot-password",  ctrl.forgotPassword);
router.post("/reset-password",   ctrl.resetPassword);
router.get ("/me",               protect, ctrl.getMe);

module.exports = router;
