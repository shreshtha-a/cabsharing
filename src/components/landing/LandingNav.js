import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import LoginModal from "./LoginModal";

const navItems = [
  { label: "Offer a Ride", to: "/offer-ride" },
  { label: "Find a Ride", to: "/search" },
  { label: "Safety", to: "/safety" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us", to: "/about" },
  { label: "Blog", to: "/blog" },
];

export default function LandingNav() {
  const [mobile, setMobile] = useState(window.innerWidth <= 900);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getLinkStyle = (to) => ({
    textDecoration: "none",
    color: location.pathname === to ? "#14B8A6" : "#061B4D",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    borderBottom: location.pathname === to ? "2px solid #14B8A6" : "none",
    paddingBottom: location.pathname === to ? "2px" : "0",
    background: "none",
    border: location.pathname === to ? "none" : "none",
    borderBottomColor: location.pathname === to ? "#14B8A6" : "transparent",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    padding: "0",
    paddingBottom: location.pathname === to ? "2px" : "0",
    transition: "color 0.2s",
  });

  const styles = {
    nav: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 999,
      width: "100%",
      pointerEvents: "auto",
    },
    container: {
      maxWidth: "1500px",
      margin: "0 auto",
      padding: "28px 48px",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    logoWrapper: {
      display: "flex",
      flexDirection: "column",
      cursor: "pointer",
    },
    logo: {
      fontSize: "3rem",
      fontWeight: "800",
      color: "#061B4D",
      lineHeight: 1,
      letterSpacing: "-2px",
    },
    logoAccent: { color: "#14B8A6" },
    tagline: {
      marginTop: "6px",
      fontSize: "14px",
      color: "#42526E",
      fontWeight: "500",
    },
    navLinks: {
      display: mobile ? "none" : "flex",
      gap: "50px",
      marginTop: "10px",
      alignItems: "center",
    },
    login: {
      display: mobile ? "none" : "block",
      background: "transparent",
      border: "none",
      color: "#061B4D",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    menuButton: {
      display: mobile ? "block" : "none",
      border: "none",
      background: "transparent",
      fontSize: "32px",
      cursor: "pointer",
      color: "#061B4D",
    },
    mobileMenu: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      padding: "25px 35px",
      background: "rgba(255,255,255,0.97)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      margin: "10px 20px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    },
  };

  return (
    <>
      <nav style={styles.nav}>
        <div style={styles.container}>
          {/* Logo */}
          <div style={styles.logoWrapper} onClick={() => navigate("/")}>
            <div style={styles.logo}>
              Hop<span style={styles.logoAccent}>in</span>
            </div>
            <div style={styles.tagline}>Going your way anyway.</div>
          </div>

          {/* Desktop Links */}
          <div style={styles.navLinks}>
            {navItems.map(({ label, to }) => (
              <span
                key={to}
                style={getLinkStyle(to)}
                onClick={() => navigate(to)}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Right Side */}
          {mobile ? (
            <button
              style={styles.menuButton}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          ) : (
            <button style={styles.login} onClick={() => setShowLogin(true)}>
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobile && menuOpen && (
          <div style={styles.mobileMenu}>
            {navItems.map(({ label, to }) => (
              <span
                key={to}
                style={getLinkStyle(to)}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(to);
                }}
              >
                {label}
              </span>
            ))}
            <span
              style={getLinkStyle("")}
              onClick={() => {
                setMenuOpen(false);
                setShowLogin(true);
              }}
            >
              Log In
            </span>
          </div>
        )}
      </nav>

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}