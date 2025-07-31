import { NonRetriableError } from "inngest";
import { inngest } from "../client.inngest.js";
import { sendMail } from "../../utils/mailer.utils.js";
import Ticket from "../../models/ticket.model.js";
import analyzeTicket from "../../utils/agent.utils.js";
import User from "../../models/user.model.js";

export const onTicketCreated = inngest.createFunction(
  { id: "on-ticket-created", retries: 2 },
  { event: "ticket/created" },
  async ({ event, step }) => {
    // Step 1: Fetch the ticket from the database.
    const ticket = await step.run("fetch-ticket", async () => {
      const ticketObject = await Ticket.findById(event.data.ticketId);
      if (!ticketObject) {
        throw new NonRetriableError("Ticket not Found");
      }
      return ticketObject;
    });

    // --- THE FIX ---
    // Call your AI function directly without a step.run() wrapper.
    const aiResponse = await analyzeTicket(ticket);

    // Step 2: Update the ticket with AI results.
    await step.run("update-ticket-with-ai-data", async () => {
      if (!aiResponse) return;
      await Ticket.findByIdAndUpdate(ticket._id, {
        priority: !["low", "medium", "high"].includes(aiResponse.priority)
          ? "medium"
          : aiResponse.priority,
        helpfulNotes: aiResponse.helpfulNotes,
        status: "IN_PROGRESS",
        relatedSkills: aiResponse.relatedSkills,
      });
    });

    const skillsToMatch = aiResponse?.relatedSkills || [];

    // Step 3: Find and assign a moderator/agent.
    const agent = await step.run("assign-agent", async () => {
      let user = null;
      if (skillsToMatch.length > 0) {
        user = await User.findOne({
          role: { $in: ["Agent", "Moderator", "Admin"] },
          skills: { $in: skillsToMatch },
        });
      }
      if (!user) {
        user = await User.findOne({ role: "Admin" });
      }
      if (user) {
        await Ticket.findByIdAndUpdate(ticket._id, { assignedTo: user._id });
      }
      return user;
    });

    // Step 4: Send a notification email.
    await step.run("send-email-notification", async () => {
      if (agent) {
        await sendMail(
          agent.email,
          "New Ticket Assigned",
          `A new ticket has been assigned to you: "${ticket.title}"`
        );
      }
    });

    return { success: true };
  }
);
