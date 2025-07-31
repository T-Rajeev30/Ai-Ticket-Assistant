import express from "express";
import { authentication } from "../middleware/auth.middleware.js";
import {
  createTicket,
  getTicket,
  getTickets,
  updateTicket,
} from "../controller/ticket.controller.js";

const router = express.Router();

router.get("/", authentication, getTickets);
router.get("/:id", authentication, getTicket);
router.post("/", authentication, createTicket);

router.patch("/:id", authentication, updateTicket);

export default router;
