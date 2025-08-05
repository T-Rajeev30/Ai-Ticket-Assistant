import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  return (
    <section className="hero min-h-screen text-center relative overflow-hidden bg-gradient-to-b from-[#110E28] to-[#0D1117]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      <div className="hero-content z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-extrabold leading-tight"
          >
            The Future of Support is Automated
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="py-6 text-lg text-[#A8B2C2]"
          >
            Your AI-powered assistant for intelligent ticket triage and
            assignment. Eliminate manual work and resolve issues faster than
            ever before.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link
              to="/signup"
              className="btn bg-[#00F5FF] text-black hover:bg-white hover:shadow-lg hover:shadow-[#00F5FF]/50 transition-all btn-lg"
            >
              Get Started Free
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
