import React, { useEffect, useState } from "react";
import CreateTicketForm from "../components/CreateTicketForm";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch tickets");
        }
        const data = await response.json();
        setTickets(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {/* You can place this form wherever you like */}
      <div className="max-w-xl mx-auto">
        <CreateTicketForm />
      </div>

      <div className="divider"></div>

      {/* Later, you will add the list of existing tickets here */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Your Tickets</h3>
        {loading ? (
          <p>Loading tickets...</p>
        ) : tickets.length > 0 ? (
          <div className="space-y-4">
            {" "}
            {tickets.map((ticket) => (
              <Link to={`/tickets/${ticket._id}`} key={tickets._id}>
                <div className="card bg-base-100 shadow-md p-4 hover:bg-base-200 transition-colors">
                  <div className="flex justify-between items-center">
                    <h4 className="card-title text-lg"> {ticket.title} </h4>
                    <span className="badge badge-primary">
                      {" "}
                      {ticket.status}{" "}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Created on :{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p> You haven't created any tickets yet</p>
        )}
      </div>
    </div>
  );
}

export default Tickets;
