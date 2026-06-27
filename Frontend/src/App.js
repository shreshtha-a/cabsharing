import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Sidebar from "./components/Sidebar";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RecurringRide from "./pages/RecurringRide";
import HopinOfferRide from "./components/HopinOfferRide";
import HopinSeatSelector from "./components/HopinSeatSelector";
import FindRide from "./pages/FindRide";
import Settings from "./pages/HopinSettings";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import DriverRegistration from "./pages/DriverRegistration";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/" replace />;
  return children;
}

function Placeholder({ title }) {
  return <div style={{ padding: "40px" }}><h1>{title}</h1></div>;
}

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
          <Route path="/settings"             element={<Settings />} />
          <Route path="/profile"              element={<Profile />} />
          <Route path="/booking-confirmation" element={<BookingConfirmation />} />
          <Route path="/payment"              element={<Payment />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth/success" element={<OAuthSuccess />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          } />
          <Route
            path="/driver-registration"
            element={<DriverRegistration />}
          />  
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