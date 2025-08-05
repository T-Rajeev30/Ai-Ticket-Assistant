import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTA = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden py-24" // Make section relative
    >
      {/* 1. Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="../assets/ezgif.com-video-to-gif-converter.gif" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay to darken the video */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-6 text-center relative z-20">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Ready to Supercharge Your Support?
          </h2>
          <p className="text-lg text-[#A8B2C2] max-w-xl mx-auto mb-12">
            Sign up for our free beta and experience the future of ticket
            management today.
          </p>

          {/* 2. Enhanced Button with Hover Animation */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 30px rgba(0, 245, 255, 0.7)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block" // Needed for motion.div to wrap the Link
          >
            <Link
              to="/signup"
              className="btn bg-[#00F5FF] text-black hover:bg-white transition-all btn-lg"
            >
              Create Your Free Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
