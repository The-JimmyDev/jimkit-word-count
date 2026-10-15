import { defineClient } from "@jimkit/sdk";

export default defineClient({
  // one lazy loader per tool: its code is only fetched when the tool is opened
  tools: { "word-count-tool": () => import("./Tool") },
});
