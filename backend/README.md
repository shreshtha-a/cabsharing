# 🚗 Hopin – Cab Sharing Backend

Full Node.js + Express + MongoDB backend for the Hopin Cab Sharing Platform.

---

## 📁 Folder Structure

```
backend/
├── server.js              # Entry point + Socket.IO
├── .env.example           # Environment variable template
├── config/
│   ├── db.js              # MongoDB connection
│   └── passport.js        # Google OAuth strategy
├── models/
│   ├── User.model.js
│   ├── Driver.model.js
│   ├── Vehicle.model.js
│   ├── Ride.model.js
│   ├── Booking.model.js
│   └── index.js           # Payment, Wallet, Review, Notification, Emergency, SupportTicket, Promo
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── driver.controller.js
│   ├── ride.controller.js
│   ├── booking.controller.js
│   ├── payment.controller.js
│   └── combined.controller.js  # wallet, review, notification, emergency, search, analytics, tracking, upload, admin
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── driver.routes.js
│   ├── ride.routes.js
│   ├── booking.routes.js
│   ├── payment.routes.js
│   ├── wallet.routes.js
│   ├── review.routes.js
│   ├── notification.routes.js
│   ├── emergency.routes.js
│   ├── search.routes.js
│   ├── analytics.routes.js
│   ├── tracking.routes.js
│   ├── upload.routes.js
│   └── admin.routes.js
├── middleware/
│   ├── auth.middleware.js   # JWT protect + role authorize
│   └── upload.middleware.js # Multer + Cloudinary
└── utils/
    ├── email.js             # Nodemailer
    ├── sms.js               # Twilio
    └── jwt.js               # JWT helpers
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
cd backend
npm install
```

### 2. Create your `.env` file
```bash
cp .env.example .env
```
Fill in all values in `.env`:
- `MONGO_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — from Google Cloud Console
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — from Razorpay Dashboard
- `TWILIO_*` — from Twilio Console
- `CLOUDINARY_*` — from Cloudinary Dashboard
- `EMAIL_USER` / `EMAIL_PASS` — Gmail + App Password

### 3. Run the server
```bash
# Development
npm run dev

# Production
npm start
```

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/verify-otp | Verify email OTP |
| POST | /api/auth/login | Login |
| GET  | /api/auth/google | Google OAuth |
| POST | /api/auth/forgot-password | Send reset OTP |
| POST | /api/auth/reset-password | Reset password |
| GET  | /api/auth/me | Get current user |

### Rides
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET  | /api/rides | List all rides (with filters) |
| POST | /api/rides | Create a ride (driver) |
| GET  | /api/rides/:id | Get single ride |
| PUT  | /api/rides/:id | Update ride |
| PUT  | /api/rides/:id/cancel | Cancel ride |
| PUT  | /api/rides/:id/start | Start ride |
| PUT  | /api/rides/:id/complete | Complete ride |
| GET  | /api/rides/my-rides | Driver's own rides |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/bookings | Book a seat |
| GET  | /api/bookings/my | My bookings |
| GET  | /api/bookings/:id | Single booking |
| PUT  | /api/bookings/:id/cancel | Cancel booking |

### Payments
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/payments/create-order | Create Razorpay order |
| POST | /api/payments/verify | Verify payment |
| POST | /api/payments/wallet-pay | Pay via wallet |
| POST | /api/payments/apply-promo | Apply promo code |
| GET  | /api/payments/history | Payment history |

### Search
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/search?source=&destination=&date=&seats= | Search rides |
| GET | /api/search/suggestions?source= | Autocomplete |

### Admin (role: admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/admin/users | All users |
| PUT | /api/admin/drivers/:id/verify | Verify driver |
| PUT | /api/admin/vehicles/:id/verify | Verify vehicle |
| GET | /api/admin/rides | All rides |
| GET | /api/admin/tickets | Support tickets |
| GET | /api/admin/analytics | Platform analytics |

---

## 🔐 Authentication

All protected routes require:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔴 Real-Time (Socket.IO)

Connect to `http://localhost:5000`

| Event | Direction | Payload |
|-------|-----------|---------|
| `join_ride` | client → server | `rideId` |
| `driver_location` | client → server | `{ rideId, lat, lng }` |
| `location_update` | server → client | `{ lat, lng }` |
| `new_booking` | server → client | `{ booking }` |
| `ride_started` | server → client | `{ rideId }` |
| `ride_completed` | server → client | `{ rideId, bookingId }` |
| `ride_cancelled` | server → client | `{ rideId }` |
| `sos_alert` | server → all | `{ emergency, user }` |

---

## 🌐 Connect Frontend

In your React app, set the base URL:
```js
// src/utils/api.js
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});
```

For Google OAuth, redirect users to:
```
http://localhost:5000/api/auth/google
```
After login they'll be redirected to:
```
http://localhost:3000/auth/success?token=<jwt>
```
Save the token and use it in all API calls.
