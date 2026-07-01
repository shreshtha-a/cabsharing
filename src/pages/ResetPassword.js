import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/rideServices";
import Modal from "../components/Modal";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    setToken(t);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!token) {
      setError("Missing reset token.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    authService.resetPassword({ token, password })
      .then(() => {
        setMessage("Password reset successful.");
        setShowModal(true);
        setTimeout(() => navigate("/"), 1800);
      })
      .catch((err) => setError(err?.response?.data?.message || "Something went wrong."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="w-[920px] flex gap-6 px-4">
        <div className="flex-1 bg-gradient-to-b from-[#F0FAF9] to-[#F8FAFC] rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-slate-900">Reset Your Password</h1>
          <p className="text-slate-500 mt-2">Create a new strong password to secure your account.</p>
        </div>

        <div className="w-[420px] bg-white rounded-2xl p-7 shadow-md">
          <h2 className="text-xl font-semibold text-slate-900">Create New Password</h2>
          <p className="text-slate-500 mt-2">Please enter your new password below.</p>

          <form onSubmit={handleSubmit} className="mt-4">
            <label className="block text-sm text-slate-500 mb-2">New Password</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-100 text-sm" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Enter your new password" />

            <label className="block text-sm text-slate-500 mt-3 mb-2">Confirm New Password</label>
            <input className="w-full px-3 py-2 rounded-lg border border-slate-100 text-sm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required placeholder="Confirm your new password" />

            <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-teal-700 text-white font-semibold" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {message && <div className="mt-4 p-3 rounded-md bg-emerald-50 text-emerald-700">{message}</div>}
          {error && <div className="mt-4 p-3 rounded-md bg-rose-50 text-rose-700">{error}</div>}
        </div>
      </div>

      {showModal && (
        <Modal title="Password reset" onClose={() => setShowModal(false)}>
          <p>Your password has been updated. You will be redirected to the login page shortly.</p>
        </Modal>
      )}
    </div>
  );
}
