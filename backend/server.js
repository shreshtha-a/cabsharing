require("dotenv").config();

const express  = require("express");
const http     = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors     = require("cors");
const morgan   = require("morgan");
const passport = require("passport");

const authRoutes         = require("./routes/auth.routes");
const userRoutes         = require("./routes/user.routes");
const driverRoutes       = require("./routes/driver.routes");
const rideRoutes         = require("./routes/ride.routes");
const bookingRoutes      = require("./routes/booking.routes");
const paymentRoutes      = require("./routes/payment.routes");
const walletRoutes       = require("./routes/wallet.routes");
const reviewRoutes       = require("./routes/review.routes");
const notificationRoutes = require("./routes/notification.routes");
const trackingRoutes     = require("./routes/tracking.routes");
const emergencyRoutes    = require("./routes/emergency.routes");
const adminRoutes        = require("./routes/admin.routes");
const searchRoutes       = require("./routes/search.routes");
const analyticsRoutes    = require("./routes/analytics.routes");
const uploadRoutes       = require("./routes/upload.routes");

require("./config/passport")();

const app    = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, methods: ["GET", "POST"] },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);
  socket.on("join_ride", (rideId) => socket.join(`ride_${rideId}`));
  socket.on("driver_location", ({ rideId, lat, lng }) => {
    io.to(`ride_${rideId}`).emit("location_update", { lat, lng });
  });
  socket.on("disconnect", () => console.log("Socket disconnected:", socket.id));
});

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());

app.use("/api/auth",          authRoutes);
app.use("/api/users",         userRoutes);
app.use("/api/drivers",       driverRoutes);
app.use("/api/rides",         rideRoutes);
app.use("/api/bookings",      bookingRoutes);
app.use("/api/payments",      paymentRoutes);
app.use("/api/wallet",        walletRoutes);
app.use("/api/reviews",       reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/tracking",      trackingRoutes);
app.use("/api/emergency",     emergencyRoutes);
app.use("/api/admin",         adminRoutes);
app.use("/api/search",        searchRoutes);
app.use("/api/analytics",     analyticsRoutes);
app.use("/api/upload",        uploadRoutes);

app.get("/api/health", (req, res) =>
  res.json({ status: "OK", message: "Hopin Backend Running" })
);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    server.listen(process.env.PORT || 5000, () =>
      console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });