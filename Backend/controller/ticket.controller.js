import { err } from "inngest/types";
import { inngest } from "../inngest/client.inngest.js";
import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description, relatedSkills = [] } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required " });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      relatedSkills,
      createdBy: req.user._id,
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title: newTicket.title,
        /////////////
        requiredSkills: newTicket.relatedSkills,
      },
    });

    return res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating ticket", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//////// to get mutiple ticket
export const getTickets = async (req, res) => {
  try {
    const user = req.user;
    let tickets;
    if (user.role !== "user") {
      tickets = await Ticket.find({})
        .populate("createdBy", "email")
        .populate("assignedTo", "email")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id }).sort({
        createdAt: -1,
      });
    }
    return res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets ", error.message);
    return res.status(500).json({ message: "Internal Server  Error" });
  }
};

// get single ticket

export const getTicket = async (req, res) => {
  try {
    const user = req.user;
    let ticket;

    if (user.role !== "user") {
      ticket = await Ticket.findById(req.params.id).populate(
        "assignedTo",
        "email"
      );
    } else {
      ticket = await Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).populate("assignedTo", "email");
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    console.error("Error fetching ticket ", error.message);
    return res.status(500).json({ message: "Internal Server  Error" });
  }
};

//// updating ticket

export const updateTicket = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    if (!status) {
      return res.status(400).json({ error: "Status is required. " });
    }

    // find the ticket ans update it
    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true }
    );

    if (!updateTicket) {
      return res.status(404).json({ error: "Ticket not found." });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
};
