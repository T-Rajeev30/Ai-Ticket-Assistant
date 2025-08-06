import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function TicketDetailsPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedTicketData = await response.json();

      setTicket(updatedTicketData);
      toast.success("Ticket Status updated ");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch ticket deatails");
        }
        const data = await response.json();
        setTicket(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen text-white bg-gradient-to-b from-[#110E28] to-[#0D1117] flex justify-center items-center">
        <p>Loading ticket details...</p>
      </div>
    );
  if (!ticket)
    return (
      <div className="min-h-screen text-white bg-gradient-to-b from-[#110E28] to-[#0D1117] flex justify-center items-center">
        <p>Ticket not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen text-white relative overflow-hidden bg-gradient-to-b from-[#110E28] to-[#0D1117] p-4 sm:p-6 lg:p-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/dashboard" className="btn btn-ghost mb-4">
            {" "}
            ← Back to Dashboard{" "}
          </Link>

          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-lg shadow-black/30">
            <div className="card-body">
              <div className="flex flex-col sm:flex-row justify-between items-start pb-4 border-b border-white/10">
                <div>
                  <h2 className="card-title text-3xl mb-1 ">{ticket.ticket}</h2>
                  <p className="text-sm text-[#A8B2C2]">
                    Created on: {new Date(ticket.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right mt-4 sm:mt-0">
                  <div className="badge badge-accent badge-lg mb-1 ">
                    {ticket.status}
                  </div>
                  {ticket.priority && (
                    <div className="text-sm">
                      {" "}
                      Priority:{" "}
                      <span className="font-bold capitalize">
                        {ticket.priority}{" "}
                      </span>{" "}
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="py-4">
                <p> {ticket.description} </p>
              </div>

              {/* AI Analysis Section */}
              <div className="bg-black/20 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-[#00F5FF]">
                  AI Analysis & Notes
                </h3>
                <p className="whitespace-pre-wrap text-[#A8B2C2]">
                  {ticket.helpfulNotes || "No analysis available."}
                </p>
              </div>

              {/* Skills and Assignment Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 mt-4 border-t border-white/10">
                <div>
                  <h3 className="text-xl font-bold mb-2">Related Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {ticket.relatedSkills && ticket.relatedSkills.length > 0 ? (
                      ticket.relatedSkills.map((skill) => (
                        <div key={skill} className="badge badge-secondary">
                          {skill}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#A8B2C2]">None specified.</p>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Assigned To</h3>
                  <div className="flex items-center gap-3">
                    {ticket.assignedTo ? (
                      <>
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">
                              {ticket.assignedTo.email
                                .substring(0, 2)
                                .toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span className="text-base-content text-white">
                          {ticket.assignedTo.email}
                        </span>
                      </>
                    ) : (
                      <p className="text-[#A8B2C2]">Unassigned</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
