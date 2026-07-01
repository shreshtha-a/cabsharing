import LandingNav from "../components/landing/LandingNav";
import HeroSection from "../components/landing/HeroSection";
import HowItWorks from "../components/landing/HowItWorks";
import Footer from "../components/landing/Footer";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <>
      <LandingNav />
      <HeroSection />
      <HowItWorks />
      <Footer />
    </>
  );
}