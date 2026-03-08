import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";

interface ActionOpts {
  json?: boolean;
  format?: string;
  fields?: string;
  limit?: string;
  page?: string;
  order?: string;
  attachImage?: boolean;
}

export const breedsResource = new Command("breeds")
  .description("Browse and search cat breeds");

// ── LIST ───────────────────────────────────────────
breedsResource
  .command("list")
  .description("List all cat breeds")
  .option("--limit <n>", "Results per page")
  .option("--page <n>", "Page number")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thecatapi-cli breeds list\n  thecatapi-cli breeds list --limit 5 --json")
  .action(async (opts: ActionOpts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.page) params.page = opts.page;
      const data = await client.get("/breeds", params);
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── GET ────────────────────────────────────────────
breedsResource
  .command("get")
  .description("Get a specific breed by ID")
  .argument("<id>", "Breed ID (e.g. abys, beng)")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExample:\n  thecatapi-cli breeds get abys")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      const data = await client.get(`/breeds/${id}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── SEARCH ─────────────────────────────────────────
breedsResource
  .command("search")
  .description("Search breeds by name")
  .argument("<query>", "Search term")
  .option("--attach-image", "Include reference image in results")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExample:\n  thecatapi-cli breeds search bengal")
  .action(async (query: string, opts: ActionOpts) => {
    try {
      const params: Record<string, string> = { q: query };
      if (opts.attachImage) params.attach_image = "1";
      const data = await client.get("/breeds/search", params);
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── FACTS ──────────────────────────────────────────
breedsResource
  .command("facts")
  .description("Get facts about a specific breed")
  .argument("<id>", "Breed ID")
  .option("--limit <n>", "Number of facts")
  .option("--page <n>", "Page number")
  .option("--order <order>", "Order: ASC, DESC, RAND")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExample:\n  thecatapi-cli breeds facts abys")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      const params: Record<string, string> = {};
      if (opts.limit) params.limit = opts.limit;
      if (opts.page) params.page = opts.page;
      if (opts.order) params.order = opts.order;
      const data = await client.get(`/breeds/${id}/facts`, params);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
