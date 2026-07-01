import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCar,
  FaUsers,
  FaShieldAlt,
  FaWallet,
  FaMapMarkerAlt,
  FaCommentDots,
  FaLeaf,
  FaHandshake,
  FaLightbulb,
  FaBullseye,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import LandingNav from "../components/landing/LandingNav";
import Footer from "../components/landing/Footer";

export default function AboutUs() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(window.innerWidth <= 900);
  const [tablet, setTablet] = useState(window.innerWidth <= 1180);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 900);
      setTablet(window.innerWidth <= 1180);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const styles = {
    page: {
      background: "#FFFFFF",
      width: "100%",
    },

    hero: {
      padding: `${mobile ? "140px" : "170px"} ${mobile ? "24px" : "48px"} ${
        mobile ? "40px" : "70px"
      }`,
      maxWidth: "1500px",
      margin: "0 auto",
      display: "flex",
      flexDirection: tablet ? "column" : "row",
      alignItems: "center",
      gap: tablet ? "40px" : "60px",
    },

    heroLeft: {
      flex: tablet ? "none" : "0 0 46%",
      textAlign: tablet ? "center" : "left",
    },

    heroTitle: {
      fontSize: mobile ? "2.2rem" : "3rem",
      fontWeight: 800,
      color: "#061B4D",
      letterSpacing: "-1.5px",
      margin: 0,
    },

    heroAccent: {
      color: "#14B8A6",
    },

    heroSubtitle: {
      marginTop: "18px",
      fontSize: mobile ? "1rem" : "1.15rem",
      color: "#42526E",
      fontWeight: 600,
      lineHeight: 1.5,
    },

    heroDivider: {
      width: "60px",
      height: "4px",
      background: "#14B8A6",
      borderRadius: "2px",
      margin: tablet ? "22px auto" : "22px 0",
    },

    heroBody: {
      fontSize: "1rem",
      color: "#5B6B8C",
      lineHeight: 1.7,
      maxWidth: "440px",
      marginLeft: tablet ? "auto" : 0,
      marginRight: tablet ? "auto" : 0,
    },

    heroArt: {
      flex: tablet ? "none" : "0 0 48%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    heroArtCircle: {
      width: mobile ? "240px" : "340px",
      height: mobile ? "240px" : "340px",
      borderRadius: "50%",
      background:
        "radial-gradient(circle at 35% 30%, #E3F7F1 0%, #CDEFE6 60%, #BDEAE0 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#14B8A6",
      fontSize: mobile ? "90px" : "130px",
      boxShadow: "0 30px 60px rgba(20,184,166,0.18)",
    },

    section: {
      maxWidth: "1500px",
      margin: "0 auto",
      padding: mobile ? "0 24px 56px" : "0 48px 80px",
    },

    missionBox: {
      background: "#F6FBFA",
      border: "1px solid #E3F0EC",
      borderRadius: "20px",
      padding: mobile ? "32px 24px" : "44px 56px",
      display: "flex",
      flexDirection: tablet ? "column" : "row",
      gap: tablet ? "36px" : "0",
    },

    missionCol: {
      flex: 1,
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      paddingRight: tablet ? 0 : "40px",
    },

    missionColDivider: {
      width: tablet ? "100%" : "1px",
      height: tablet ? "1px" : "auto",
      background: "#D9E6E1",
      alignSelf: "stretch",
    },

    missionColRight: {
      flex: 1,
      display: "flex",
      gap: "20px",
      alignItems: "flex-start",
      paddingLeft: tablet ? 0 : "40px",
    },

    missionIcon: {
      width: "52px",
      height: "52px",
      minWidth: "52px",
      borderRadius: "50%",
      background: "#E3F7F1",
      color: "#14B8A6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "22px",
    },

    missionTitle: {
      fontSize: "1.25rem",
      fontWeight: 800,
      color: "#061B4D",
      margin: "0 0 8px",
    },

    missionText: {
      fontSize: "0.95rem",
      color: "#5B6B8C",
      lineHeight: 1.6,
      margin: 0,
    },

    sectionHeading: {
      fontSize: mobile ? "1.6rem" : "2rem",
      fontWeight: 800,
      color: "#061B4D",
      textAlign: "center",
      margin: "0 0 40px",
    },

    featureGrid: {
      display: "grid",
      gridTemplateColumns: mobile
        ? "repeat(2, 1fr)"
        : tablet
        ? "repeat(3, 1fr)"
        : "repeat(7, 1fr)",
      gap: "28px",
    },

    featureItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      gap: "14px",
    },

    featureIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#E3F7F1",
      color: "#14B8A6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
    },

    featureTitle: {
      fontSize: "0.95rem",
      fontWeight: 700,
      color: "#061B4D",
      margin: 0,
    },

    featureDesc: {
      fontSize: "0.85rem",
      color: "#5B6B8C",
      lineHeight: 1.5,
      margin: 0,
    },

    lowerGrid: {
      display: "grid",
      gridTemplateColumns: tablet ? "1fr" : "1fr 1fr 1.1fr",
      gap: "24px",
      alignItems: "stretch",
    },

    lowerCard: {
      background: "#F8FAFC",
      border: "1px solid #ECEEF2",
      borderRadius: "18px",
      padding: mobile ? "28px 24px" : "32px 30px",
    },

    lowerCardTitle: {
      fontSize: "1.2rem",
      fontWeight: 800,
      color: "#061B4D",
      margin: "0 0 22px",
    },

    miniGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "22px",
    },

    miniItem: {
      display: "flex",
      gap: "12px",
      alignItems: "flex-start",
    },

    miniIcon: {
      width: "38px",
      height: "38px",
      minWidth: "38px",
      borderRadius: "50%",
      background: "#E3F7F1",
      color: "#14B8A6",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
    },

    miniLabel: {
      fontSize: "0.9rem",
      fontWeight: 700,
      color: "#14B8A6",
      margin: "0 0 4px",
    },

    miniText: {
      fontSize: "0.82rem",
      color: "#5B6B8C",
      lineHeight: 1.5,
      margin: 0,
    },

    ctaCard: {
      background: "linear-gradient(135deg, #E3F7F1 0%, #D7F0E8 100%)",
      borderRadius: "18px",
      padding: mobile ? "28px 24px" : "32px 30px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    ctaTitle: {
      fontSize: "1.3rem",
      fontWeight: 800,
      color: "#061B4D",
      margin: "0 0 12px",
    },

    ctaText: {
      fontSize: "0.92rem",
      color: "#42526E",
      lineHeight: 1.6,
      margin: "0 0 22px",
    },

    ctaButtons: {
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      gap: "14px",
    },

    primaryBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      background: "#0E9488",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "10px",
      padding: "13px 18px",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
    },

    secondaryBtn: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      background: "transparent",
      color: "#0E9488",
      border: "2px solid #0E9488",
      borderRadius: "10px",
      padding: "11px 18px",
      fontSize: "0.95rem",
      fontWeight: 700,
      cursor: "pointer",
    },
  };

  const differentiators = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Users",
      desc: "Every user is verified to ensure a safe and trusted community.",
    },
    {
      icon: <FaCar />,
      title: "Verified Vehicles",
      desc: "All vehicles are verified for RC, Insurance, PUC and roadworthiness.",
    },
    {
      icon: <FaUsers />,
      title: "Passenger Ride Sharing",
      desc: "Even passengers can offer their rides if they have a verified vehicle.",
    },
    {
      icon: <FaWallet />,
      title: "Secure Payments",
      desc: "Fast, reliable and secure payments through trusted gateways.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Live Ride Tracking",
      desc: "Share your live location with family and friends during your ride.",
    },
    {
      icon: <FaCommentDots />,
      title: "In-App Chat",
      desc: "Communicate easily and securely with riders before and during the ride.",
    },
    {
      icon: <FaLeaf />,
      title: "Eco-Friendly Travel",
      desc: "Reduce fuel costs, traffic congestion and carbon emissions.",
    },
  ];

  const values = [
    {
      icon: <FaHandshake />,
      label: "Trust",
      text: "Safety, transparency and honesty come first.",
    },
    {
      icon: <FaUsers />,
      label: "Community",
      text: "We believe in the power of sharing and supporting each other.",
    },
    {
      icon: <FaLeaf />,
      label: "Sustainability",
      text: "We care for the planet by encouraging shared rides.",
    },
    {
      icon: <FaLightbulb />,
      label: "Innovation",
      text: "We use technology to make commuting smarter every day.",
    },
  ];

  const impact = [
    {
      icon: <FaUsers />,
      label: "Affordable Travel",
      text: "Making travel accessible for everyone.",
    },
    {
      icon: <FaShieldAlt />,
      label: "Safer Commutes",
      text: "Ensuring every journey is safe and reliable.",
    },
    {
      icon: <FaLeaf />,
      label: "Greener Environment",
      text: "Reducing emissions through shared rides.",
    },
    {
      icon: <FaUsers />,
      label: "Connected Communities",
      text: "Bringing people together one ride at a time.",
    },
  ];

  return (
    <div style={styles.page}>
      <LandingNav />

      {/* Hero */}
      <section style={styles.hero}>
        <div style={styles.heroLeft}>
          <h1 style={styles.heroTitle}>
            About <span style={styles.heroAccent}>Hopin</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Connecting people through smarter, safer and more affordable
            ride-sharing.
          </p>
          <div style={styles.heroDivider} />
          <p style={styles.heroBody}>
            Hopin is a ride-sharing platform that brings passengers, ride
            sharers and verified drivers together to make every journey
            affordable, safe and sustainable.
          </p>
        </div>

        <div style={styles.heroArt}>
          <div style={styles.heroArtCircle}>
            <FaCar />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={styles.section}>
        <div style={styles.missionBox}>
          <div style={styles.missionCol}>
            <div style={styles.missionIcon}>
              <FaBullseye />
            </div>
            <div>
              <h3 style={styles.missionTitle}>Our Mission</h3>
              <p style={styles.missionText}>
                Make daily travel affordable, safe and accessible through
                trusted ride sharing.
              </p>
            </div>
          </div>

          <div style={styles.missionColDivider} />

          <div style={styles.missionColRight}>
            <div style={styles.missionIcon}>
              <FaEye />
            </div>
            <div>
              <h3 style={styles.missionTitle}>Our Vision</h3>
              <p style={styles.missionText}>
                Build India's most trusted ride-sharing community where every
                empty seat becomes an opportunity to save money, reduce
                pollution and connect people.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Hopin Different */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeading}>
          What Makes <span style={styles.heroAccent}>Hopin</span> Different?
        </h2>
        <div style={styles.featureGrid}>
          {differentiators.map((item) => (
            <div key={item.title} style={styles.featureItem}>
              <div style={styles.featureIcon}>{item.icon}</div>
              <p style={styles.featureTitle}>{item.title}</p>
              <p style={styles.featureDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values / Impact / CTA */}
      <section style={styles.section}>
        <div style={styles.lowerGrid}>
          <div style={styles.lowerCard}>
            <h3 style={styles.lowerCardTitle}>Our Values</h3>
            <div style={styles.miniGrid}>
              {values.map((item) => (
                <div key={item.label} style={styles.miniItem}>
                  <div style={styles.miniIcon}>{item.icon}</div>
                  <div>
                    <p style={styles.miniLabel}>{item.label}</p>
                    <p style={styles.miniText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.lowerCard}>
            <h3 style={styles.lowerCardTitle}>Our Impact</h3>
            <div style={styles.miniGrid}>
              {impact.map((item) => (
                <div key={item.label} style={styles.miniItem}>
                  <div style={styles.miniIcon}>{item.icon}</div>
                  <div>
                    <p style={styles.miniLabel}>{item.label}</p>
                    <p style={styles.miniText}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.ctaCard}>
            <h3 style={styles.ctaTitle}>Ready to Ride Smarter?</h3>
            <p style={styles.ctaText}>
              Join Hopin today and experience safe, affordable and
              community-driven travel.
            </p>
            <div style={styles.ctaButtons}>
              <button
                style={styles.primaryBtn}
                onClick={() => navigate("/find-ride")}
              >
                <FaSearch size={14} /> Find a Ride
              </button>
              <button
                style={styles.secondaryBtn}
                onClick={() => navigate("/offer-ride")}
              >
                <FaCar size={14} /> Offer a Ride
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}