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
        <div className="flex justify-between items-start">
          <h2 className="card-title text-3xl font-semibold">{ticket.title}</h2>

          {/* Change in the status display to a dropdown*/}

          <select
            className="select select-bordered"
            value={ticket.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>
          </select>
        </div>
        <p className="mt-4 text-gray-700">{ticket.description}</p>

        <div className="divider"> </div>

        <p className="text-sm text-gray-500">
          Created on: {new Date(ticket.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default TicketDetailsPage;
