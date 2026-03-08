import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface ActionOpts {
  json?: boolean;
  format?: string;
  fields?: string;
  limit?: string;
}

export const factsResource = new Command("facts")
  .description("Get random cat facts");

// ── LIST ───────────────────────────────────────────
factsResource
  .command("list")
  .description("Get random cat facts")
  .option("--limit <n>", "Number of facts to return", "5")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thecatapi-cli facts list\n  thecatapi-cli facts list --limit 10 --json")
  .action(async (opts: ActionOpts) => {
    try {
      const data = await client.get("/facts", {
        limit: opts.limit ?? "5",
      });
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
