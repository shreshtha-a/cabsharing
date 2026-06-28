import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
<<<<<<< HEAD
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RecurringRide from "./pages/RecurringRide";
import HopinOfferRide from "./components/HopinOfferRide";
import HopinSeatSelector from "./pages/HopinSeatSelector";
import FindRide from "./pages/FindRide";
import Settings from "./pages/HopinSettings";
// import Notifications from "./pages/notifications";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
=======
>>>>>>> c41266c41eb5da6636802f40b96da00738de3740

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

<<<<<<< HEAD
// Pages that need the sidebar
function WithSidebar({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowX: "hidden" }}>{children}</div>
=======
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
>>>>>>> c41266c41eb5da6636802f40b96da00738de3740
    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────
export default function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth/success" element={<OAuthSuccess />} />

          {/* With sidebar */}
          <Route path="/home" element={<ProtectedRoute><WithSidebar><Home /></WithSidebar></ProtectedRoute>} />
          <Route path="/find-ride" element={<ProtectedRoute><WithSidebar><FindRide /></WithSidebar></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><WithSidebar><FindRide /></WithSidebar></ProtectedRoute>} />
          <Route path="/offer-ride" element={<ProtectedRoute><WithSidebar><HopinOfferRide /></WithSidebar></ProtectedRoute>} />
          <Route path="/select-seat" element={<ProtectedRoute><WithSidebar><HopinSeatSelector /></WithSidebar></ProtectedRoute>} />
          <Route path="/rides" element={<ProtectedRoute><WithSidebar><Placeholder title="My Rides" /></WithSidebar></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><WithSidebar><Placeholder title="Messages" /></WithSidebar></ProtectedRoute>} />
          <Route path="/recurring-rides" element={<ProtectedRoute><WithSidebar><RecurringRide /></WithSidebar></ProtectedRoute>} />
          {/* <Route path="/notifications" element={<ProtectedRoute><WithSidebar><Notifications /></WithSidebar></ProtectedRoute>} /> */}
          <Route path="/settings" element={<ProtectedRoute><WithSidebar><Settings /></WithSidebar></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><WithSidebar><Profile /></WithSidebar></ProtectedRoute>} />

          {/* Without sidebar (full page) */}
          <Route path="/booking-confirmation" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
          <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
=======
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/"             element={<Landing />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
>>>>>>> c41266c41eb5da6636802f40b96da00738de3740

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