import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllTickets();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

      {loading ? (
        <p>Loading all tickets...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Assigned To</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id} className="hover">
                  <td>
                    <Link
                      to={`/tickets/${ticket._id}`}
                      className="font-bold hover:underline"
                    >
                      {ticket.title}
                    </Link>
                  </td>
                  <td>
                    <span className="badge badge-primary">{ticket.status}</span>
                  </td>
                  <td>
                    {/* Display the assigned agent's email if it exists */}
                    {ticket.assignedTo ? ticket.assignedTo.email : "Unassigned"}
                  </td>
                  <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
