import { defineServer } from "@jimkit/sdk";
import { count } from "./count";

export default defineServer({
  routes: {
    // POST /api/a/word-count/count   { "text": "..." }  ->  { words, characters, lines, minutes }
    "POST count": async ({ req, client }, ctx) => {
      const body = (await req.json().catch(() => null)) as { text?: unknown } | null;
      if (typeof body?.text !== "string") return ctx.fail(client, 400, "Send { \"text\": \"...\" }.");
      return ctx.reply(client, count(body.text.slice(0, 1_000_000)));
    },
  },
});
