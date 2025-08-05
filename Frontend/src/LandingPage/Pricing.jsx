import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Pricing = () => {
  return (
    <section id="pricing" className="bg-[#110E28] py-24">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-4">Start for Free</h2>
          <p className="text-lg text-[#A8B2C2] max-w-xl mx-auto mb-12">
            Get started with our generous free plan during our public beta. No
            credit card required.
          </p>
          <div className="card w-full max-w-sm mx-auto bg-base-100 text-base-content shadow-xl border border-primary/20">
            <div className="card-body">
              <h3 className="card-title text-2xl font-bold">Free Beta</h3>
              <p className="text-5xl font-extrabold my-4">
                $0{" "}
                <span className="text-lg font-normal text-base-content/60">
                  / month
                </span>
              </p>
              <ul className="space-y-3 text-left my-6">
                <li className="flex items-center gap-2">
                  ✅ Unlimited Tickets
                </li>
                <li className="flex items-center gap-2">✅ Up to 3 Agents</li>
                <li className="flex items-center gap-2">
                  ✅ AI Triage & Assignment
                </li>
                <li className="flex items-center gap-2">
                  ✅ Email Notifications
                </li>
              </ul>
              <div className="card-actions justify-center">
                <Link to="/signup" className="btn btn-primary btn-lg w-full">
                  Sign Up for the Beta
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
