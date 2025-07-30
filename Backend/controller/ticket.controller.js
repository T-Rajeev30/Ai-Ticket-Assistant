import { inngest } from "../inngest/client.inngest.js";
import Ticket from "../models/ticket.model.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required " });
    }

    const newTicket = await Ticket.create({
      title,
      description,
      created: req.user._id.toString(),
    });

    await inngest.send({
      name: "ticket/created",
      data: {
        ticketId: newTicket._id.toString(),
        title: newTicket.title,
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
      tickets = Ticket.find({})
        .polygon("assignedTo", "email")
        .sort({ createdAt: -1 });
    } else {
      tickets = await Ticket.find({ createdBy: user._id })
        .select("title description status createdAt")
        .sort({ createdAt: -1 });
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
      ticket = Ticket.findById(req.params.id).populate("assignedTo", "email");
    } else {
      ticket = Ticket.findOne({
        createdBy: user._id,
        _id: req.params.id,
      }).select("Title description status createdAt ");
    }

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    return res.status(404).json({ ticket });
  } catch (error) {
    console.error("Error fetching ticket ", error.message);
    return res.status(500).json({ message: "Internal Server  Error" });
  }
};
