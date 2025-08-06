import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Signup() {
  // 1. Using a single state object for the form is cleaner
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form), // Send the form state object
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen text-white relative overflow-hidden bg-gradient-to-b from-[#110E28] to-[#0D1117]">
      {/* Background Grid Effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="hero-content text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          // Glassmorphism Card styling
          className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-black/30"
        >
          <h1 className="text-3xl font-bold">Create Your Account</h1>
          <p className="text-[#A8B2C2]">Join the future of support.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name" // Make sure name attribute is set
              placeholder="Full Name"
              className="input input-bordered w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
              value={form.password}
              onChange={handleChange}
              required
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 0px 20px rgba(0, 245, 255, 0.5)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              type="submit"
              className="btn bg-[#00F5FF] text-black hover:bg-white w-full border-0"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </form>

          <p className="text-sm text-[#A8B2C2]">
            Already have an account?{" "}
            <Link to="/login" className="link hover:text-[#00F5FF]">
              Log In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup;
