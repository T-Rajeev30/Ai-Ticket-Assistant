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
      const updateData = { status: "IN_PROGRESS" };

      if (aiResponse) {
        if (aiResponse.summary) updateData.summary = aiResponse.summary; // 2. Add summary to the update

        if (aiResponse.priority) updateData.priority = aiResponse.priority;
        if (aiResponse.helpfulNotes)
          updateData.helpfulNotes = aiResponse.helpfulNotes;
        if (aiResponse.relatedSkills)
          updateData.relatedSkills = aiResponse.relatedSkills;
      }
      await Ticket.findByIdAndUpdate(ticket._id, updateData);
    });

    const skillsToMatch = aiResponse?.relatedSkills || [];

    // Step 3: Find and assign a moderator/agent.
    const agent = await step.run("assign-agent", async () => {
      let user = null;
      if (skillsToMatch.length > 0) {
        user = await User.findOne({
          role: { $in: ["Agent", "Admin"] },
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
    // await step.run("send-email-notification", async () => {
    //   if (agent) {
    //     await sendMail(
    //       agent.email,
    //       "New Ticket Assigned",
    //       `A new ticket has been assigned to you: "${ticket.title}"`
    //     );
    //   }
    // });

    return { success: true };
  }
);
