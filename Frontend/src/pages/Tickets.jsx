import React from "react";
import CreateTicketForm from "../components/CreateTicketForm";

function Tickets() {
  return (
    <div className="container mx-auto p-4">
      {/* You can place this form wherever you like */}
      <div className="max-w-xl mx-auto">
        <CreateTicketForm />
      </div>

      {/* Later, you will add the list of existing tickets here */}
      <div className="mt-8">
        <h3 className="text-xl font-bold">Your Tickets</h3>
        {/* Ticket list will go here */}
      </div>
    </div>
  );
}

export default Tickets;
