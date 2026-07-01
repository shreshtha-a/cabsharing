// frontend/src/services/bookingService.js
// Central service for all booking & payment API calls.
// Reads the base URL from your .env: REACT_APP_API_URL=http://localhost:5000

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// ── Helper: get stored JWT ─────────────────────────────────────────────────────
function getToken() {
  return localStorage.getItem("token") || "";
}

// ── Helper: fetch with auth header ────────────────────────────────────────────
async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await res.json();
  if (!res.ok || data.success === false) {
    throw new Error(data.message || `Request failed (${res.status})`);
  }
  return data;
}

// ── Booking service ────────────────────────────────────────────────────────────
export const bookingService = {
  /** Create a pending booking. Returns { booking: { _id, bookingId, totalFare, status } } */
  create: (payload) =>
    apiFetch("/api/bookings/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** Verify a real Razorpay payment and confirm the booking. */
  verifyPayment: (payload) =>
    apiFetch("/api/bookings/verify-payment", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** Dev/simulation mode: instantly confirms the booking without Razorpay. */
  paySimulation: (bookingId, paymentMethod = "upi") =>
    apiFetch("/api/bookings/pay-simulation", {
      method: "POST",
      body: JSON.stringify({ bookingId, paymentMethod }),
    }),

  /** Get all bookings for the logged-in user. */
  getMyBookings: () => apiFetch("/api/bookings/my"),

  /** Get a single booking by its DB _id. */
  getById: (id) => apiFetch(`/api/bookings/${id}`),

  /** Cancel a booking. */
  cancel: (id) =>
    apiFetch(`/api/bookings/${id}/cancel`, { method: "POST" }),
};

// ── Payment service ────────────────────────────────────────────────────────────
export const paymentService = {
  /** Create a Razorpay order (or simulated order in dev). */
  createOrder: async (amount, bookingId) => {
    const data = await apiFetch("/api/payments/create-order", {
      method: "POST",
      body: JSON.stringify({ amount, bookingId }),
    });
    return data; // { order, keyId, simulated? }
  },

  /** Verify a Razorpay signature on the backend. */
  verify: (payload) =>
    apiFetch("/api/payments/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  /** Apply a promo code. Returns { discount, code }. */
  applyPromo: async (code, amount) => {
    const data = await apiFetch("/api/payments/apply-promo", {
      method: "POST",
      body: JSON.stringify({ code, amount }),
    });
    return data; // { discount, code }
  },

  /** Fetch wallet balance & recent transactions. */
  getWallet: async () => {
    const data = await apiFetch("/api/payments/wallet");
    return {
      balance: data.balance || 0,
      cashback: data.cashback || 0,
      transactions: data.transactions || [],
    };
  },

  /** Deduct from wallet for a payment. */
  deductWallet: (amount, bookingId) =>
    apiFetch("/api/payments/wallet/deduct", {
      method: "POST",
      body: JSON.stringify({ amount, bookingId }),
    }),
};

// ── Razorpay helper ────────────────────────────────────────────────────────────
/**
 * Opens the Razorpay checkout modal.
 * Resolves with { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * Rejects with Error("Payment cancelled") if the user closes the modal.
 *
 * Usage:
 *   const result = await openRazorpay({ order, keyId, amount, name, email, contact, description });
 */
export function openRazorpay({ order, keyId, amount, name, email, contact, description }) {
  return new Promise((resolve, reject) => {
    if (!window.Razorpay) {
      // Dynamically load the Razorpay script if not already present
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => open();
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    } else {
      open();
    }

    function open() {
      const rzp = new window.Razorpay({
        key:          keyId,
        amount:       Math.round(amount * 100), // paise
        currency:     "INR",
        name:         "Hopin",
        description:  description || "Ride Booking",
        order_id:     order.id,
        prefill: { name: name || "", email: email || "", contact: contact || "" },
        theme: { color: "#0B9E8E" },
        handler: (response) => resolve(response),
        modal: {
          ondismiss: () => reject(new Error("Payment cancelled")),
        },
      });
      rzp.open();
    }
  });
}