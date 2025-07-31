import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.inngest.js";
import { onUserSignup } from "./inngest/function/on-signup.function.js";
import { onTicketCreated } from "./inngest/function/on-ticket-create.js";
import { testFunction } from "./inngest/function/test.js";

console.log("--- Checking Environment Variables ---");
console.log("MAIL_HOST:", process.env.MAIL_USERNAME);
console.log("MAIL_PORT:", process.env.MAIL_PASSWORD);
console.log("MAIL_HOST:", process.env.MAIL_HOST);
console.log("MAIL_PORT:", process.env.MAIL_PORT);
console.log("------------------------------------");

const PORT = process.env.PORT || 3000;
//console.log(PORT);
const app = express();
const mongouri = process.env.MONGO_URI;
//console.log(mongouri);

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onUserSignup, onTicketCreated, testFunction],
  })
);

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("MongoDb Connected Successfully "),
      app.listen(PORT, () => {
        console.log(`Server is connected at http://localhost:${PORT}`);
      });
  })
  .catch((err) => console.error("I got these error", err));
