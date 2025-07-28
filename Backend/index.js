import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
//console.log(PORT);
const app = express();
const mongouri = process.env.MONGO_URI;
//console.log(mongouri);

app.use(cors());
app.use(express.json());

mongoose
  .connect(mongouri)
  .then(() => {
    console.log("MongoDb Connected Successfully "),
      app.listen(PORT, () => {
        console.log(`Server is connected at http://localhost:${PORT}`);
      });
  })
  .catch((err) => console.error("I got these error", err));
