import { NonRetriableError } from "inngest";
import { inngest } from "../client.inngest.js";
import { sendMail } from "../../utils/mailer.utils.js";
import User from "../../models/user.model.js";

export const onUserSignup = inngest.createFunction(
  { id: "on-user-signup", retries: 2 },
  { event: "user/signup" },
  async ({ event, step }) => {
    // You can get both email and name from the event data
    const { email, name } = event.data;

    await step.run("send-welcome-email", async () => {
      const subject = `Welcome to the app, ${name}!`;
      const message = `Hi ${name},\n\nThanks for signing up. We're glad to have you onboard!`;
      await sendMail({ email, subject, message });
    });

    return { success: true };
  }
);
