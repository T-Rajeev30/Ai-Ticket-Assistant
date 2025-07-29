import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.inngest.js";
import { onUserSignup } from "./inngest/function/on-signup.function.js";
import { onTicketCreated } from "./inngest/function/on-ticket-create.js";

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
    functions: [onUserSignup, onTicketCreated],
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
