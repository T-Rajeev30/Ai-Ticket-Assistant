import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center   text-white relative  overflow-hidden  bg-gradient-to-b from-[#110E28] to-[#0D1117]">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="hero-content text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-black/30 "
        >
          <h1 className="text-3xl font-bold">Welcome Back </h1>
          <p className="text-[#A8B2C2]">Log in to access your dashboard.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* <h2 className="card-title justify-center">Login</h2> */}

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition "
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered  w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
              value={form.password}
              onChange={handleChange}
              required
            />

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: " 0px 0px 20px rgba(0 , 245 , 255 , 0.5)",
              }}
              transition={{ type: "spring ", stiffness: 300 }}
              type="submit"
              className="btn bg-[#00F5FF] text-black hover:bg-white w-full border-0"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </motion.div>
        {/* <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div> */}
      </div>
    </div>
  );
}
