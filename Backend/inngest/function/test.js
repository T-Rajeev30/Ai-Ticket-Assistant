import { inngest } from "../client.inngest.js";

export const testFunction = inngest.createFunction(
  { id: "test-hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    console.log("✅ TEST FUNCTION TRIGGERED!", event.data);
    await step.run("dummy-step", async () => {
      return { message: "Hello from the test function!" };
    });
  }
);
