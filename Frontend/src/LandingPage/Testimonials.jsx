import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
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
    <section id="testimonials" className="bg-[#110E28] py-24 px-6">
      <div className="container mx-auto">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Loved by Modern Support Teams
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            className="p-8 bg-[#161B22] rounded-lg border border-white/10"
          >
            <p className="text-[#A8B2C2] italic">
              "AITicket has transformed our workflow. The automatic assignment
              is a game-changer and has cut our response times in half."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-white">Sarah L.</p>
                <p className="text-sm text-[#A8B2C2]">Support Lead, TechCorp</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="p-8 bg-[#161B22] rounded-lg border border-white/10"
          >
            <p className="text-[#A8B2C2] italic">
              "The AI analysis is incredibly accurate. It provides our agents
              with the context they need to solve problems instantly."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026705d" />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-white">Mike R.</p>
                <p className="text-sm text-[#A8B2C2]">
                  Head of Operations, Innovate LLC
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="p-8 bg-[#161B22] rounded-lg border border-white/10"
          >
            <p className="text-[#A8B2C2] italic">
              "Knowing every ticket is processed by an Inngest workflow gives us
              peace of mind. It's incredibly reliable."
            </p>
            <div className="flex items-center mt-4">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026706d" />
                </div>
              </div>
              <div className="ml-4">
                <p className="font-semibold text-white">David C.</p>
                <p className="text-sm text-[#A8B2C2]">CTO, Startup Inc.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
