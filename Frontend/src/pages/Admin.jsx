import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Admin() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch tickets");
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTickets();
  }, []);

  // Calculate stats from the ticket data
  const stats = useMemo(() => {
    return {
      total: tickets.length,
      open: tickets.filter((t) => t.status === "Open" || t.status === "TODO")
        .length,
      inProgress: tickets.filter((t) => t.status === "IN_PROGRESS").length,
      closed: tickets.filter((t) => t.status === "Closed").length,
    };
  }, [tickets]);

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#110E28] to-[#0D1117] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-8"
        >
          Admin Dashboard
        </motion.h1>

        {/* 1. New Stats Cards Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <StatCard title="Total Tickets" value={stats.total} />
          <StatCard title="Open Tickets" value={stats.open} />
          <StatCard title="In Progress" value={stats.inProgress} />
          <StatCard title="Closed Tickets" value={stats.closed} />
        </motion.div>

        {/* 2. New Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Ticket List */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">All Tickets</h3>
              {loading ? (
                <p>Loading tickets...</p>
              ) : (
                <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                  <table className="table">
                    <thead className="text-white/80">
                      <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Created At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket._id} className="hover:bg-white/5">
                          <td>
                            <Link
                              to={`/tickets/${ticket._id}`}
                              className="font-bold hover:text-[#00F5FF]"
                            >
                              {ticket.title}
                            </Link>
                          </td>
                          <td>
                            <span className="badge badge-primary">
                              {ticket.status}
                            </span>
                          </td>
                          <td className="font-semibold capitalize">
                            {ticket.priority || "N/A"}
                          </td>
                          <td>{ticket.assignedTo?.email || "Unassigned"}</td>
                          <td>{ticket.createdBy?.email || "N/A"}</td>{" "}
                          {/* 3. New Column Data */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for the stat cards
const StatCard = ({ title, value }) => (
  <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
    <div className="text-sm text-[#A8B2C2]">{title}</div>
    <div className="text-4xl font-bold mt-2">{value}</div>
  </div>
);

export default Admin;
