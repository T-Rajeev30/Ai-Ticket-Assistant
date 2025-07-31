import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";

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
    return <p className="text-center mt-10">Loading ticket details...</p>;
  if (!ticket) return <p className="text-center mt-10">Ticket not found</p>;

  return (
    <div className=" container mx-auto p-4">
      <div className="card bg-base-800 shadow-xl p-4">
        <div className="card-body">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="card-title text-3xl font-semibold mb-1 ">
                {ticket.title}
              </h2>
              <p className="text-sm text-gray-500">
                Created on: {new Date(ticket.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="text-right">
              <div className="badge badge-lg badge-accent mb-1">
                {ticket.status}
              </div>

              {ticket.priority && (
                <div className="text-sm">
                  Priority:{" "}
                  <span className="font-bold">
                    {ticket.priority.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </div>
          <p className="mt-2">{ticket.description}</p>

          <div className="divider"></div>

          {/* --- NEW: AI Analysis Section --- */}
          <div>
            <h3 className="text-xl font-bold mb-2">AI Analysis & Notes</h3>
            <p className="text-base-content bg-base-200 p-4 rounded-lg whitespace-pre-wrap">
              {ticket.helpfulNotes || "No analysis available."}
            </p>
          </div>

          {/* --- NEW: Skills and Assignment Section --- */}

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-xl font-bold mb-2 ">Related Skills</h3>
              <div className="flex flex-wrap gap-2">
                {ticket.relatedSkills && ticket.relatedSkills.length > 0 ? (
                  ticket.relatedSkills.map((skill) => (
                    <div key={skill} className="badge badge-secondary">
                      {skill}
                    </div>
                  ))
                ) : (
                  <p className="text-sm"> None Specified. </p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2"> Assigned To </h3>
              <p className="text-base-content">
                {ticket.assignedTo ? ticket.assignedTo.email : "Unassigned"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
