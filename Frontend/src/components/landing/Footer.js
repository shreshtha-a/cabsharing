import { NavLink } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  const linkStyle = {
    color: "#CBD5E1",
    textDecoration: "none",
    fontSize: "15px",
    transition: "0.3s",
  };

  const sectionTitle = {
    color: "#FFFFFF",
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: "600",
  };

  return (
    <footer
      style={{
        background: "#061B4D",
        color: "#FFFFFF",
        padding: "60px 40px 25px",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* TOP SECTION */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "40px",
          }}
        >
          {/* BRAND */}
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "38px",
                fontWeight: "800",
              }}
            >
              Hop
              <span
                style={{
                  color: "#14B8A6",
                }}
              >
                in
              </span>
            </h2>

            <p
              style={{
                marginTop: "12px",
                color: "#CBD5E1",
                lineHeight: "1.7",
                maxWidth: "280px",
              }}
            >
              Going your way anyway.
              <br />
              Share rides, save money,
              and travel together.
            </p>

            {/* SOCIALS */}
            <div
              style={{
                display: "flex",
                gap: "18px",
                marginTop: "20px",
                fontSize: "20px",
              }}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <FaXTwitter />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <FaLinkedin />
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                style={{ color: "white" }}
              >
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 style={sectionTitle}>Company</h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <NavLink to="/about" style={linkStyle}>
                About Us
              </NavLink>

              <NavLink to="/how-it-works" style={linkStyle}>
                How It Works
              </NavLink>

              <NavLink to="/blog" style={linkStyle}>
                Blog
              </NavLink>

              <NavLink to="/contact" style={linkStyle}>
                Contact
              </NavLink>
            </div>
          </div>

          {/* RIDERS */}
          <div>
            <h4 style={sectionTitle}>Riders</h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <NavLink to="/search" style={linkStyle}>
                Find a Ride
              </NavLink>

              <NavLink to="/safety" style={linkStyle}>
                Safety
              </NavLink>

              <NavLink to="/faq" style={linkStyle}>
                FAQs
              </NavLink>

              <NavLink to="/support" style={linkStyle}>
                Support
              </NavLink>
            </div>
          </div>

          {/* DRIVERS */}
          <div>
            <h4 style={sectionTitle}>Drivers</h4>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <NavLink to="/offer-ride" style={linkStyle}>
                Offer a Ride
              </NavLink>

              <NavLink to="/guidelines" style={linkStyle}>
                Guidelines
              </NavLink>

              <NavLink to="/earnings" style={linkStyle}>
                Earnings
              </NavLink>

              <NavLink to="/faq" style={linkStyle}>
                FAQs
              </NavLink>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div
          style={{
            marginTop: "45px",
            paddingTop: "20px",
            borderTop:
              "1px solid rgba(255,255,255,0.15)",

            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "15px",

            color: "#94A3B8",
            fontSize: "14px",
          }}
        >
          <span>
            © 2026 Hopin. All rights reserved.
          </span>

          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <NavLink
              to="/privacy"
              style={{
                color: "#94A3B8",
                textDecoration: "none",
              }}
            >
              Privacy Policy
            </NavLink>

            <NavLink
              to="/terms"
              style={{
                color: "#94A3B8",
                textDecoration: "none",
              }}
            >
              Terms & Conditions
            </NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
}