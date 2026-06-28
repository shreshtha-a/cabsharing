import { useState } from "react";
import { authService } from "../services/rideService";
import Modal from "../components/Modal";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    authService.forgotPassword({ email })
      .then(() => {
        setMessage("If this email exists, a reset link has been sent.");
        setShowModal(true);
      })
      .catch((err) => setError(err?.response?.data?.message || "Something went wrong."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F0FDFA]">
      <div className="w-[920px] flex gap-6 px-4">
        <div className="flex-1 bg-gradient-to-b from-[#ECFDF7] to-[#F8FAFC] rounded-2xl p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Forgot Password?</h1>
          <p className="text-slate-500 mt-2">No worries. Reset your password in just a few simple steps.</p>
          <ul className="mt-6 text-slate-900 list-disc list-inside">
            <li>Enter your registered email</li>
            <li>Check your inbox for the reset link</li>
            <li>Create a new password</li>
          </ul>
        </div>

        <div className="w-[420px] bg-white rounded-2xl p-7 shadow-md">
          <h2 className="text-xl font-semibold text-slate-900">Reset Your Password</h2>
          <p className="text-slate-500 mt-2">Enter your registered email address and we'll send you a link to reset your password.</p>

          <form onSubmit={handleSubmit} className="mt-4">
            <label className="block text-sm text-slate-500 mb-2">Email Address</label>
            <input
              className="w-full px-3 py-2 rounded-lg border border-slate-100 text-sm"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your registered email"
            />

            <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && <div className="mt-4 p-3 rounded-md bg-emerald-50 text-emerald-700">{message}</div>}
          {error && <div className="mt-4 p-3 rounded-md bg-rose-50 text-rose-700">{error}</div>}
        </div>
      </div>

      {showModal && (
        <Modal title="Reset link sent" onClose={() => setShowModal(false)}>
          <p>We've sent a password reset link to your email. Check your inbox and follow the instructions to reset your password.</p>
        </Modal>
      )}
    </div>
  );
}
