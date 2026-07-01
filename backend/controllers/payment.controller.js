const Razorpay = require("razorpay");
const crypto   = require("crypto");
const Booking  = require("../models/Booking.model");
const { Payment, Wallet, Notification } = require("../models/index");

const getRazorpay = () => new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// ─── Create Razorpay Order ────────────────────────────────
exports.createOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

   const order = await getRazorpay().orders.create({
      amount:   booking.totalAmount * 100, // paise
      currency: "INR",
      receipt:  `receipt_${bookingId}`,
    });

    const payment = await Payment.create({
      booking:         bookingId,
      user:            req.user._id,
      amount:          booking.totalAmount,
      method:          "upi",
      status:          "pending",
      razorpayOrderId: order.id,
    });

    res.json({ success: true, order, paymentId: payment._id });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Verify Payment ───────────────────────────────────────
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    // Verify signature
    const body      = razorpay_order_id + "|" + razorpay_payment_id;
    const expected  = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body).digest("hex");

    if (expected !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Update payment
    const payment = await Payment.findByIdAndUpdate(paymentId, {
      status:              "success",
      razorpayPaymentId:   razorpay_payment_id,
      razorpaySignature:   razorpay_signature,
    }, { new: true });

    // Update booking
    const booking = await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: "paid", payment: payment._id }, { new: true });

    await Notification.create({
      user:    req.user._id,
      title:   "Payment Successful",
      message: `₹${payment.amount} paid successfully for your booking.`,
      type:    "payment",
    });

    res.json({ success: true, message: "Payment verified", payment, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Pay via Wallet ───────────────────────────────────────
exports.payViaWallet = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    const wallet = await Wallet.findOne({ user: req.user._id });
    if (!wallet || wallet.balance < booking.totalAmount) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance" });
    }

    wallet.balance -= booking.totalAmount;
    wallet.totalSpent += booking.totalAmount;
    wallet.transactions.push({
      type:        "debit",
      amount:      booking.totalAmount,
      description: `Payment for booking ${bookingId}`,
      reference:   bookingId,
    });
    await wallet.save();

    const payment = await Payment.create({
      booking: bookingId,
      user:    req.user._id,
      amount:  booking.totalAmount,
      method:  "wallet",
      status:  "success",
    });

    booking.paymentStatus = "paid";
    booking.payment       = payment._id;
    await booking.save();

    res.json({ success: true, message: "Paid via wallet", payment });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Apply Promo Code ─────────────────────────────────────
exports.applyPromo = async (req, res) => {
  try {
    const { code, amount } = req.body;
    const { Promo } = require("../models/index");

    const promo = await Promo.findOne({ code: code.toUpperCase(), isActive: true });
    if (!promo) return res.status(404).json({ success: false, message: "Invalid promo code" });
    if (new Date() > promo.validUntil) return res.status(400).json({ success: false, message: "Promo code expired" });
    if (promo.usedBy.includes(req.user._id)) return res.status(400).json({ success: false, message: "Promo already used" });
    if (amount < promo.minOrderAmount) return res.status(400).json({ success: false, message: `Minimum order amount is ₹${promo.minOrderAmount}` });

    let discount = 0;
    if (promo.discountType === "flat") discount = promo.discountValue;
    else discount = Math.min((amount * promo.discountValue) / 100, promo.maxDiscount || Infinity);

    const finalAmount = Math.max(0, amount - discount);

    res.json({ success: true, discount, finalAmount, promoCode: code });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── Payment History ──────────────────────────────────────
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate("booking")
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};