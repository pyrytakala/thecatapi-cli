import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface ActionOpts {
  json?: boolean;
  format?: string;
  fields?: string;
  imageId?: string;
  subId?: string;
  value?: string;
}

export const votesResource = new Command("votes")
  .description("Vote on cat images");

// ── LIST ───────────────────────────────────────────
votesResource
  .command("list")
  .description("List your votes")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExample:\n  thecatapi-cli votes list")
  .action(async (opts: ActionOpts) => {
    try {
      const data = await client.get("/votes");
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── GET ────────────────────────────────────────────
votesResource
  .command("get")
  .description("Get a specific vote")
  .argument("<id>", "Vote ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      const data = await client.get(`/votes/${id}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── CREATE ─────────────────────────────────────────
votesResource
  .command("create")
  .description("Vote on an image (1 = upvote, 0 = downvote)")
  .requiredOption("--image-id <id>", "Image ID to vote on")
  .requiredOption("--value <n>", "Vote value: 1 (up) or 0 (down)")
  .option("--sub-id <id>", "User segment identifier")
  .option("--json", "Output as JSON")
  .addHelpText("after", "\nExample:\n  thecatapi-cli votes create --image-id abc123 --value 1")
  .action(async (opts: ActionOpts) => {
    try {
      const body: Record<string, unknown> = {
        image_id: opts.imageId,
        value: Number(opts.value),
      };
      if (opts.subId) body.sub_id = opts.subId;
      const data = await client.post("/votes", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── DELETE ─────────────────────────────────────────
votesResource
  .command("delete")
  .description("Delete a vote")
  .argument("<id>", "Vote ID")
  .option("--json", "Output as JSON")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      await client.delete(`/votes/${id}`);
      output({ deleted: true, id }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
