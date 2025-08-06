import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// 1. Accept a prop to notify the parent component when a ticket is created
function CreateTicketForm({ onTicketCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tickets`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, description }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to create ticket");

      toast.success("Ticket created successfully!");
      setTitle("");
      setDescription("");

      // 2. Call the function passed from the parent to trigger a refresh
      if (onTicketCreated) onTicketCreated();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }} // Added a slight delay
      className="p-8 space-y-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-black/30"
    >
      <h2 className="text-2xl font-bold text-white">Create New Ticket</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-white/70 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            // 3. Updated styling to match the futuristic theme
            className="input w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-white/70 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            // 3. Updated styling to match the futuristic theme
            className="textarea w-full bg-white/5 border-white/20 focus:border-[#00F5FF] transition"
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
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
          {loading ? "Submitting..." : "Submit Ticket"}
        </motion.button>
      </form>
    </motion.div>
  );
}

export default CreateTicketForm;
