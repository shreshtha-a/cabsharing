import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Landing            from "./pages/Landing";
import Home               from "./pages/Home";
import Profile            from "./pages/Profile";
import RecurringRide      from "./pages/RecurringRide";
import FindRide           from "./pages/FindRide";
import HopinOfferRide     from "./components/HopinOfferRide";
import HopinSeatSelector  from "./components/HopinSeatSelector";
import AuthSuccess        from "./pages/AuthSuccess";
import Settings           from "./pages/HopinSettings";
import FindRide from "./pages/FindRide";
// import Settings from "./pages/HopinSettings";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment            from "./pages/Payment";
import DriverRegistration from "./pages/DriverRegistration";
import Settings from "./pages/Settings/Settings";
import HelpCenter from "./pages/Settings/InnerPages/HelpCenter"

// ─── Auth guard ───────────────────────────────────────────
function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

// ─── Google OAuth callback ────────────────────────────────
function OAuthSuccess() {
  const params = new URLSearchParams(window.location.search);
  const token  = params.get("token");
  if (token) localStorage.setItem("token", token);
  return <Navigate to="/home" replace />;
}

// ─── Placeholder ──────────────────────────────────────────
function Placeholder({ title }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>{title}</h1>
    </div>
  );
}

// ─── Main layout (with sidebar) ───────────────────────────
function AppLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowX: "hidden" }}>
        <Routes>
          <Route path="/home"                 element={<Home />} />
          <Route path="/find-ride"            element={<FindRide />} />
          <Route path="/search"               element={<FindRide />} />
          <Route path="/offer-ride"           element={<HopinOfferRide />} />
          <Route path="/select-seat"          element={<HopinSeatSelector />} />
          <Route path="/rides"                element={<Placeholder title="My Rides" />} />
          <Route path="/messages"             element={<Placeholder title="Messages" />} />
          <Route path="/recurring-rides"      element={<RecurringRide />} />  
          <Route path="/notifications"    element={<Placeholder title="Notifications" />} />
          <Route path="/profile"              element={<Profile />} />
          <Route path="/settings"             element={<Settings />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment"              element={<Payment />} />
          <Route path="/driver-registration"  element={<DriverRegistration />} />
          <Route path="/help-center"
          element={<HelpCenter />}/>
        </Routes>
      </div>
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/"             element={<Landing />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />

        {/* Protected app */}
        <Route path="/*" element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}