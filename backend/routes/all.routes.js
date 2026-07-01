// ── booking.routes.js ────────────────────────────────────
const express  = require("express");
const { protect } = require("../middleware/auth.middleware");

const bookingRouter = express.Router();
const bookingCtrl   = require("../controllers/booking.controller");
bookingRouter.post("/",            protect, bookingCtrl.createBooking);
bookingRouter.get ("/my",          protect, bookingCtrl.getMyBookings);
bookingRouter.get ("/:id",         protect, bookingCtrl.getBooking);
bookingRouter.put ("/:id/cancel",  protect, bookingCtrl.cancelBooking);
module.exports.bookingRouter = bookingRouter;

// ── payment.routes.js ────────────────────────────────────
const paymentRouter = express.Router();
const paymentCtrl   = require("../controllers/payment.controller");
paymentRouter.post("/create-order",   protect, paymentCtrl.createOrder);
paymentRouter.post("/verify",         protect, paymentCtrl.verifyPayment);
paymentRouter.post("/wallet-pay",     protect, paymentCtrl.payViaWallet);
paymentRouter.post("/apply-promo",    protect, paymentCtrl.applyPromo);
paymentRouter.get ("/history",        protect, paymentCtrl.getPaymentHistory);
module.exports.paymentRouter = paymentRouter;

// ── wallet.routes.js ─────────────────────────────────────
const walletRouter = express.Router();
const combined     = require("../controllers/combined.controller");
walletRouter.get ("/",             protect, combined.getWallet);
walletRouter.post("/add-money",    protect, combined.addMoney);
walletRouter.get ("/transactions", protect, combined.getTransactions);
walletRouter.get ("/promos",       protect, combined.getPromos);
walletRouter.post("/promos",       protect, combined.createPromo); // admin
module.exports.walletRouter = walletRouter;

// ── review.routes.js ─────────────────────────────────────
const reviewRouter = express.Router();
reviewRouter.post("/",                  protect, combined.createReview);
reviewRouter.get ("/driver/:driverId",  combined.getDriverReviews);
module.exports.reviewRouter = reviewRouter;

// ── notification.routes.js ───────────────────────────────
const notifRouter = express.Router();
notifRouter.get  ("/",           protect, combined.getNotifications);
notifRouter.put  ("/read-all",   protect, combined.markAllAsRead);
notifRouter.put  ("/:id/read",   protect, combined.markAsRead);
notifRouter.delete("/:id",       protect, combined.deleteNotification);
module.exports.notifRouter = notifRouter;

// ── emergency.routes.js ──────────────────────────────────
const emergencyRouter = express.Router();
emergencyRouter.post("/sos",         protect, combined.triggerSOS);
emergencyRouter.post("/share-trip",  protect, combined.shareTrip);
emergencyRouter.get ("/",            protect, combined.getEmergencies);
module.exports.emergencyRouter = emergencyRouter;

// ── search.routes.js ─────────────────────────────────────
const searchRouter = express.Router();
searchRouter.get("/",            combined.searchRides);
searchRouter.get("/suggestions", combined.getRideSuggestions);
module.exports.searchRouter = searchRouter;

// ── analytics.routes.js ──────────────────────────────────
const analyticsRouter = express.Router();
const { authorize } = require("../middleware/auth.middleware");
analyticsRouter.get("/passenger",  protect, combined.getPassengerAnalytics);
analyticsRouter.get("/admin",      protect, authorize("admin"), combined.getAdminAnalytics);
module.exports.analyticsRouter = analyticsRouter;

// ── tracking.routes.js ───────────────────────────────────
const trackingRouter = express.Router();
trackingRouter.get("/:rideId", protect, combined.getRideStatus);
module.exports.trackingRouter = trackingRouter;

// ── upload.routes.js  & t─────────────────────────────────────
const uploadRouter = express.Router();
const { upload }   = require("../middleware/upload.middleware");
uploadRouter.post("/", protect, upload.single("file"), combined.uploadFile);
module.exports.uploadRouter = uploadRouter;

// ── admin.routes.js & the auth ──────────────────────────────────────
const adminRouter = express.Router();
adminRouter.use(protect, authorize("admin"));
adminRouter.get ("/users",                      combined.getAllUsers);
adminRouter.put ("/users/:userId/toggle",       combined.toggleUserStatus);
adminRouter.put ("/drivers/:driverId/verify",   combined.verifyDriver);
adminRouter.put ("/vehicles/:vehicleId/verify", combined.verifyVehicle);
adminRouter.get ("/rides",                      combined.getAllRides);
adminRouter.get ("/tickets",                    combined.getSupportTickets);
adminRouter.post("/tickets/:ticketId/reply",    combined.replyToTicket);
adminRouter.get ("/analytics",                  combined.getAdminAnalytics);
module.exports.adminRouter = adminRouter;

// ─────────────────────────────────────────────────────────
// ADD THIS BLOCK TO THE END OF YOUR EXISTING all.routes.js
// (right before or after the admin.routes block — order doesn't matter)
// ─────────────────────────────────────────────────────────

// ── message.routes.js ────────────────────────────────────
const messageRouter = express.Router();
const messageCtrl   = require("../controllers/message.controller");
messageRouter.get ("/conversations",         protect, messageCtrl.getConversations);
messageRouter.get ("/conversations/:userId", protect, messageCtrl.getOrCreateConversation);
messageRouter.get ("/:conversationId",       protect, messageCtrl.getMessages);
messageRouter.post("/:userId",               protect, messageCtrl.sendMessage);
module.exports.messageRouter = messageRouter;