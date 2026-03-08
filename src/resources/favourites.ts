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
}

export const favouritesResource = new Command("favourites")
  .description("Manage your favourite cat images");

// ── LIST ───────────────────────────────────────────
favouritesResource
  .command("list")
  .description("List your favourited images")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExample:\n  thecatapi-cli favourites list")
  .action(async (opts: ActionOpts) => {
    try {
      const data = await client.get("/favourites");
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── GET ────────────────────────────────────────────
favouritesResource
  .command("get")
  .description("Get a specific favourite")
  .argument("<id>", "Favourite ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      const data = await client.get(`/favourites/${id}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── CREATE ─────────────────────────────────────────
favouritesResource
  .command("create")
  .description("Add an image to your favourites")
  .requiredOption("--image-id <id>", "Image ID to favourite")
  .option("--sub-id <id>", "User segment identifier")
  .option("--json", "Output as JSON")
  .addHelpText("after", "\nExample:\n  thecatapi-cli favourites create --image-id abc123")
  .action(async (opts: ActionOpts) => {
    try {
      const body: Record<string, unknown> = { image_id: opts.imageId };
      if (opts.subId) body.sub_id = opts.subId;
      const data = await client.post("/favourites", body);
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── DELETE ─────────────────────────────────────────
favouritesResource
  .command("delete")
  .description("Remove an image from your favourites")
  .argument("<id>", "Favourite ID")
  .option("--json", "Output as JSON")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      await client.delete(`/favourites/${id}`);
      output({ deleted: true, id }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
