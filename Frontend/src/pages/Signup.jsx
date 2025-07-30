import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // 1. Import toast

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // 4. Set loading to true when the request starts
    console.log("🚀 Signup form submitted");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      setMessage("Signup successful ! please login .");
    } catch (error) {
      setMessage(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const [form, setForm] = useState({ email: "", password: "" });

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   // try {
  //   //   const res = await fetch(
  //   //     `${import.meta.env.VITE_SERVER_URL}/auth/signup`,
  //   //     {
  //   //       method: "POST",
  //   //       headers: {
  //   //         "Content-Type ": "application/json",
  //   //       },
  //   //       body: JSON.stringify(form),
  //   //     }
  //   //   );

  //   //   const data = await res.json();

  //   //   if (res.ok) {
  //   //     localStorage.setItem("token", data.token);
  //   //     localStorage.setItem("user", JSON.stringify(data.user));
  //   //     navigate("/");
  //   //   } else {
  //   //     alert(data.message || "signup failed");
  //   //   }
  //   // } catch (error) {
  //   //   alert("Signup - something went wrong");
  //   // } finally {
  //   //   setLoading(false);
  //   // }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={handleSubmit} className="card-body">
          <h2 className="card-title justify-center">Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            className="input input-bordered"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="input input-bordered"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <div className="form-control mt-4">
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
