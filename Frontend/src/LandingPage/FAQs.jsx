import React from "react";
import { motion } from "framer-motion";
const FAQs = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="faq" className="container mx-auto py-24 px-6">
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-center mb-16">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="collapse collapse-plus bg-[#161B22] border border-white/10">
            <input type="radio" name="my-accordion" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              Is this service free?
            </div>
            <div className="collapse-content">
              <p className="text-[#A8B2C2]">
                Yes, the application is currently in a free public beta. You can
                sign up and use all the core features for free with up to 3
                agents.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-[#161B22] border border-white/10">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
              What AI model do you use?
            </div>
            <div className="collapse-content">
              <p className="text-[#A8B2C2]">
                We leverage Google's powerful Gemini model for state-of-the-art
                ticket analysis, ensuring high accuracy and helpful insights.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-[#161B22] border border-white/10">
            <input type="radio" name="my-accordion" />
            <div className="collapse-title text-xl font-medium">
              How reliable is the background processing?
            </div>
            <div className="collapse-content">
              <p className="text-[#A8B2C2]">
                Our entire automation workflow is built on Inngest, a durable
                and reliable system that guarantees every ticket is processed,
                even in the case of server failures or API outages.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FAQs;
