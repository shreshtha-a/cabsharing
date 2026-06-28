import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
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

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

function Placeholder({ title }) {
  return <div style={{ padding: "40px" }}><h1>{title}</h1></div>;
}

// Pages that need the sidebar
function WithSidebar({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC" }}>
      <Sidebar />
      <div style={{ flex: 1, overflowX: "hidden" }}>{children}</div>
    </div>
  );
}

export default function App() {
  return (
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

function OAuthSuccess() {
  const params = new URLSearchParams(window.location.search);
  const token  = params.get("token");
  if (token) localStorage.setItem("token", token);
  return <Navigate to="/home" replace />;
}