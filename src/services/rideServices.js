import api from "../utils/api";

// ─── Auth ─────────────────────────────────────────────────
export const authService = {
  register:      (data)           => api.post("/auth/register", data),
  verifyOTP:     (data)           => api.post("/auth/verify-otp", data),
  login:         (data)           => api.post("/auth/login", data),
  forgotPassword:(data)           => api.post("/auth/forgot-password", data),
  resetPassword: (data)           => api.post("/auth/reset-password", data),
  getMe:         ()               => api.get("/auth/me"),
};

// ─── Rides ────────────────────────────────────────────────
// GET /api/rides?source=&destination=&date=&seats=&minPrice=&maxPrice=
// Response: { success, count, rides: [ { _id, driver: { user: { name, photo } }, vehicle, source, destination, date, time, totalSeats, availableSeats, farePerSeat, status, preferences, ... } ] }
export const rideService = {
  getRides:    (params = {}) => api.get("/rides", { params }),
  getRide:     (id)          => api.get(`/rides/${id}`),
  createRide:  (data)        => api.post("/rides", data),
  updateRide:  (id, data)    => api.put(`/rides/${id}`, data),
  cancelRide:  (id)          => api.patch(`/rides/${id}/cancel`),
  startRide:   (id)          => api.patch(`/rides/${id}/start`),
  completeRide:(id)          => api.patch(`/rides/${id}/complete`),
  getMyRides:  ()            => api.get("/rides/my-rides"),
};

// ─── Drivers ──────────────────────────────────────────────
// GET /api/drivers/profile → { success, driver: { user: { name, photo, email, phone }, vehicle, averageRating, totalRides, ... } }
export const driverService = {
  register:          (data)           => api.post("/drivers/register", data),
  getProfile:        (userId)         => api.get(userId ? `/drivers/profile/${userId}` : "/drivers/profile"),
  updateProfile:     (data)           => api.put("/drivers/profile", data),
  addVehicle:        (data)           => api.post("/drivers/vehicle", data),
  updateVehicle:     (id, data)       => api.put(`/drivers/vehicle/${id}`, data),
  getEarnings:       ()               => api.get("/drivers/earnings"),
  toggleAvailability:()               => api.patch("/drivers/availability"),
  updateLocation:    (data)           => api.patch("/drivers/location", data),
};

// ─── Bookings ─────────────────────────────────────────────
export const bookingService = {
  create:   (data) => api.post("/bookings", data),
  getMyBookings: () => api.get("/bookings/my-bookings"),
  cancel:   (id, data) => api.patch(`/bookings/${id}/cancel`, data),
};

// ─── Users ────────────────────────────────────────────────
export const userService = {
  getProfile:  ()     => api.get("/users/profile"),
  updateProfile:(data)=> api.put("/users/profile", data),
  uploadPhoto: (form) => api.post("/upload/profile", form, { headers: { "Content-Type": "multipart/form-data" } }),
};

// ─── Notifications ────────────────────────────────────────
export const notificationService = {
  getAll:   ()   => api.get("/notifications"),
  markRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllRead: () => api.patch("/notifications/read-all"),
};

// ─── Reviews ──────────────────────────────────────────────
export const reviewService = {
  create: (data) => api.post("/reviews", data),
  getForDriver: (driverId) => api.get(`/reviews/driver/${driverId}`),
};

// ─── Wallet ───────────────────────────────────────────────
export const walletService = {
  get:    ()     => api.get("/wallet"),
  topUp:  (data) => api.post("/wallet/topup", data),
};