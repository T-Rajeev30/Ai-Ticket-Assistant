import { createAgent, gemini } from "@inngest/agent-kit";
import { model } from "mongoose";

// const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const analyzeTicket = async (ticket) => {
  const supportAgent = createAgent({
    model: gemini({
      model: "gemini-1.5-flash-8b",
      apiKey: process.env.GEMINI_API_KEY,
    }),
    name: "AI Ticket Triage Assistance",
    system: ` You are an expert AI assistant for a technical support ticketing system.
    Your job is to analyze a ticket and respond with *only* a raw JSON object.
    The JSON object must contain these exact keys: "summary", "priority", "helpfulNotes", "relatedSkills".
    If you cannot determine a value for a key, you MUST return an empty string "" for strings or an empty array [] for arrays.
    Do NOT include markdown, code fences, or any other text outside of the JSON object.`,
  });

  const response =
    await supportAgent.run(`Analyze the following support ticket and provide a JSON object with:
- summary: A short 1-2 sentence summary of the issue.
- priority: One of "low", "medium", or "high".
- helpfulNotes: A detailed technical explanation for a moderator.
- relatedSkills: An array of relevant skills required.

Respond ONLY in this JSON format:
{
  "summary": "Short summary of the ticket",
  "priority": "high",
  "helpfulNotes": "Here are useful tips...",
  "relatedSkills": ["React", "Node.js"]
}

---
Ticket information:
- Title: ${ticket.title}
- Description: ${ticket.description}
    `);

  // console.log("Full AI Response:", JSON.stringify(response, null, 2));

  const raw = response.output[0]?.content;

  if (typeof raw !== "string" || raw.trim() === "") {
    console.error("AI response context is missing or not a string.");
    return null;
  }

  try {
    // This logic finds the JSON even if it's wrapped in markdown
    const match = raw.match(/{[\s\S]*}/);
    if (!match) {
      throw new Error("No JSON object found in the AI response.");
    }
    const jsonString = match[0];
    return JSON.parse(jsonString);
  } catch (e) {
    console.error("Failed to parse JSON from AI response:", e.message);
    console.error("--- Raw AI Response that failed parsing ---");
    console.error(raw);
    console.error("--- End of Raw AI Response ---");
    return null;
  }
};

export default analyzeTicket;
