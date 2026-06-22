import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import LoginModal from "./LoginModal";

export default function LandingNav() {
  const [mobile, setMobile] = useState(window.innerWidth <= 900);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 900);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    nav: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      width: "100%",
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
    },

    logo: {
      fontSize: "3rem",
      fontWeight: "800",
      color: "#061B4D",
      textDecoration: "none",
      lineHeight: 1,
      letterSpacing: "-2px",
      cursor: "pointer",
    },

    logoAccent: {
      color: "#14B8A6",
    },

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
    },

    link: {
      textDecoration: "none",
      color: "#061B4D",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "0.3s ease",
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
      background: "rgba(255,255,255,0.95)",
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
          <div style={styles.logoWrapper}>
            <div style={styles.logo}>
              Hop<span style={styles.logoAccent}>in</span>
            </div>

            <div style={styles.tagline}>
              Going your way anyway.
            </div>
          </div>

          {/* Desktop Links */}
          <div style={styles.navLinks}>
            <span style={styles.link}>Offer a Ride</span>
            <span style={styles.link}>Find a Ride</span>
            <span style={styles.link}>Safety</span>
            <span style={styles.link}>How It Works</span>
            <span style={styles.link}>About Us</span>
            <span style={styles.link}>Blog</span>
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
            <button
              style={styles.login}
              onClick={() => setShowLogin(true)}
            >
              Log In
            </button>
          )}
        </div>

        {/* Mobile Menu */}
        {mobile && menuOpen && (
          <div style={styles.mobileMenu}>
            <span style={styles.link}>Offer a Ride</span>
            <span style={styles.link}>Find a Ride</span>
            <span style={styles.link}>Safety</span>
            <span style={styles.link}>How It Works</span>
            <span style={styles.link}>About Us</span>
            <span style={styles.link}>Blog</span>

            <span
              style={styles.link}
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

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
      />
    </>
  );
}