import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import RecurringRide from "./pages/RecurringRide";

function Placeholder({ title }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>{title}</h1>
    </div>
  );
}

function AppLayout() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#F8FAFC",
        
      }}

    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          overflowX: "hidden",
        }}
      >
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route
            path="/search"
            element={<Placeholder title="Find a Ride" />}
          />

          <Route
            path="/rides"
            element={<Placeholder title="My Rides" />}
          />

          <Route
            path="/messages"
            element={<Placeholder title="Messages" />}
          />

          <Route
            path="/recurring-rides"
            element={<RecurringRide />}
          />

          <Route
            path="/notifications"
            element={<Placeholder title="Notifications" />}
          />

          <Route
            path="/settings"
            element={<Placeholder title="Settings" />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Main App */}
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}