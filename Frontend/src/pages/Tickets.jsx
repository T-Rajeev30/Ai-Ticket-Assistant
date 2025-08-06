import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CreateTicketForm from "../components/CreateTicketForm";

function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    // We don't need to set loading to true here on subsequent fetches
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
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const showModal = () => {
    document.getElementById("create_ticket_modal").showModal();
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-[#110E28] to-[#0D1117] p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* 1. New Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-4xl font-bold">My Dashboard</h1>
          <button className="btn btn-primary" onClick={showModal}>
            Create New Ticket
          </button>
        </motion.div>

        {/* 2. Modal for the Create Ticket Form */}
        <dialog id="create_ticket_modal" className="modal">
          <div className="modal-box bg-[#161B22] border border-white/10 p-0">
            <CreateTicketForm
              onTicketCreated={() => {
                document.getElementById("create_ticket_modal").close();
                fetchTickets();
              }}
            />
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        {/* 3. Full-Width Ticket List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-semibold mb-4">Your Tickets</h3>
          {loading ? (
            <p>Loading tickets...</p>
          ) : tickets.length > 0 ? (
            <div className="overflow-x-auto bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
              <table className="table">
                <thead className="text-white/80">
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Created On</th>
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
                      <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <p>You haven't created any tickets yet.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Tickets;
