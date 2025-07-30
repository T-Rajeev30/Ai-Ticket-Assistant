import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
  {
    // Changed `type` to `title` to match controller
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "TODO" },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    // ... other fields
  },
  {
    // This automatically adds `createdAt` and `updatedAt` fields
    timestamps: true,
  }
);

export default mongoose.model("Ticket", ticketSchema);
