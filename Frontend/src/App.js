import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RecurringRide from "./pages/RecurringRide";
import FindRide from "./pages/FindRide";
import HopinOfferRide from "./components/HopinOfferRide";
import HopinSeatSelector from "./pages/HopinSeatSelector";
import RidePreferences from "./pages/RidePreferences";
import HopinSettings from "./pages/HopinSettings";
import Accessibility from "./pages/Accessibility";
import DriverRegistration from "./pages/DriverRegistration";
import Notifications from "./pages/Notifications";
import AuthSuccess from "./pages/AuthSuccess";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import VehicleDetails from "./pages/VehicleDetails";
import ReviewPublish from "./pages/ReviewPublish";
import ChangePassword from "./pages/ChangePassword";
import Messages from "./pages/Messages";
import MyRides from "./pages/MyRides";
import SignupDriver from "./components/landing/SignupDriver";
import HelpCenter from "./pages/HelpCenter";
import TermsConditions from "./pages/TermsConditions";

// ─── Auth guard ───────────────────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

// ─── Main layout (sidebar + page content) ─────────────────────────────────────
function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowX: "hidden", overflowY: "auto" }}>
        <Routes>
          <Route path="/settings/change-password" element={<ChangePassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/find-ride" element={<FindRide />} />
          <Route path="/search" element={<FindRide />} />
          <Route path="/offer-ride" element={<HopinOfferRide />} />
          <Route path="/select-seat" element={<HopinSeatSelector />} />
          <Route path="/ride-preferences" element={<RidePreferences />} />
          <Route path="/rides" element={<MyRides />} />

          <Route
            path="/rides/edit/:id"
            element={
              <div style={{ padding: "40px" }}>
                <h2>Edit Ride</h2>
                <p>Edit Ride page coming soon.</p>
              </div>
            }
          />

          <Route path="/messages" element={<Messages />} />
          <Route path="/recurring-rides" element={<RecurringRide />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<HopinSettings />} />
          <Route path="/settings/accessibility" element={<Accessibility />} />
          <Route path="/driver-registration" element={<DriverRegistration />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/vehicle-details" element={<VehicleDetails />} />
          <Route path="/review-publish" element={<ReviewPublish />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/settings/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signup-driver" element={<SignupDriver />} />
        <Route path="/auth/forgot" element={<ForgotPassword />} />
        <Route path="/auth/reset" element={<ResetPassword />} />
        <Route path="/auth/success" element={<AuthSuccess />} />

        {/* Protected app (all routes with sidebar) */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}