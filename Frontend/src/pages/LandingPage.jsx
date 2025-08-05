import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HomeNav from "../LandingPage/HomeNav.jsx";
import Hero from "../LandingPage/Hero.jsx";
import {
  FaBolt,
  FaUserCheck,
  FaCogs,
  FaTwitter,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import Features from "../LandingPage/Features.jsx";
import Testimonials from "../LandingPage/Testimonials.jsx";
import Pricing from "../LandingPage/Pricing.jsx";
import FAQs from "../LandingPage/FAQs.jsx";
import Footer from "../LandingPage/Footer.jsx";
import CTA from "../LandingPage/CTA.jsx";

// Animation variants for staggering children

function LandingPage() {
  return (
    <div className="bg-[#0D1117] text-white font-sans">
      <HomeNav />

      <Hero />

      <Features />

      <Testimonials />

      <Pricing />

      <FAQs />

      <CTA />

      {/* Footer Section */}
      <Footer />
    </div>
  );
}

export default LandingPage;
