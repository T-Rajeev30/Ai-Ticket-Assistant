import React from "react";
import { motion } from "framer-motion";
import { FaBolt, FaCogs, FaUserCheck } from "react-icons/fa";
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

const features = [
  {
    icon: <FaBolt className="text-[#00F5FF] text-4xl mx-auto mb-5" />,
    title: "AI-Powered Triage",
    description:
      "Automatically analyzes and categorizes tickets, adding priority, skills, and helpful context in seconds.",
  },
  {
    icon: <FaUserCheck className="text-[#00F5FF] text-4xl mx-auto mb-5" />,
    title: "Intelligent Assignment",
    description:
      "Routes tickets to the best available agent based on their skills, ensuring faster, more accurate resolutions.",
  },
  {
    icon: <FaCogs className="text-[#00F5FF] text-4xl mx-auto mb-5" />,
    title: "Durable Workflows",
    description:
      "Built on Inngest to guarantee every ticket is processed reliably, even during server restarts or API failures.",
  },
];
const Features = () => {
  return (
    <section id="features" className="container mx-auto py-24 px-6">
      <motion.h2
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-4xl font-bold text-center mb-16"
      >
        A Smarter Way to Handle Support
      </motion.h2>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
      >
        {features.map((feature, i) => (
          <motion.div
            variants={itemVariants}
            key={i}
            className="p-8 bg-[#161B22] rounded-lg border border-white/10 hover:border-[#00F5FF] hover:shadow-xl hover:shadow-[#00F5FF]/20 transition-all h-full"
          >
            {feature.icon}
            <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-[#A8B2C2]">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Features;
