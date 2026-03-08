import { Command } from "commander";
import { client } from "../lib/client.js";
import { output } from "../lib/output.js";
import { handleError } from "../lib/errors.js";
import { buildAuthHeaders } from "../lib/auth.js";
import { BASE_URL } from "../lib/config.js";
import { CliError } from "../lib/errors.js";

interface ActionOpts {
  json?: boolean;
  format?: string;
  fields?: string;
  limit?: string;
  page?: string;
  size?: string;
  mimeTypes?: string;
  hasBreeds?: boolean;
  order?: string;
  subId?: string;
  breedIds?: string;
}

export const imagesResource = new Command("images")
  .description("Search, list, upload, and manage cat images");

// ── SEARCH ─────────────────────────────────────────
imagesResource
  .command("search")
  .description("Search for random or filtered cat images")
  .option("--limit <n>", "Results per page (max 25)", "10")
  .option("--page <n>", "Page number", "0")
  .option("--size <size>", "Image size: thumb, small, med, full")
  .option("--mime-types <types>", "Filter by mime type: jpg, png, gif")
  .option("--has-breeds", "Only images with breed data")
  .option("--order <order>", "Order: RANDOM, ASC, DESC", "RANDOM")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .addHelpText("after", "\nExamples:\n  thecatapi-cli images search\n  thecatapi-cli images search --limit 5 --has-breeds --json")
  .action(async (opts: ActionOpts) => {
    try {
      const params: Record<string, string> = {
        limit: opts.limit ?? "10",
        page: opts.page ?? "0",
        order: opts.order ?? "RANDOM",
      };
      if (opts.size) params.size = opts.size;
      if (opts.mimeTypes) params.mime_types = opts.mimeTypes;
      if (opts.hasBreeds) params.has_breeds = "1";
      const data = await client.get("/images/search", params);
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── LIST (user's uploaded images) ──────────────────
imagesResource
  .command("list")
  .description("List your uploaded images")
  .option("--limit <n>", "Results per page (1-10)", "10")
  .option("--page <n>", "Page number", "0")
  .option("--order <order>", "Order: ASC, DESC", "DESC")
  .option("--fields <cols>", "Comma-separated columns to display")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (opts: ActionOpts) => {
    try {
      const data = await client.get("/images", {
        limit: opts.limit ?? "10",
        page: opts.page ?? "0",
        order: opts.order ?? "DESC",
      });
      const fields = opts.fields?.split(",");
      output(data, { json: opts.json, format: opts.format, fields });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── GET ────────────────────────────────────────────
imagesResource
  .command("get")
  .description("Get a specific image by ID")
  .argument("<id>", "Image ID")
  .option("--json", "Output as JSON")
  .option("--format <fmt>", "Output format: text, json, csv, yaml")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      const data = await client.get(`/images/${id}`);
      output(data, { json: opts.json, format: opts.format });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── UPLOAD ─────────────────────────────────────────
imagesResource
  .command("upload")
  .description("Upload a cat image")
  .argument("<file>", "Path to image file")
  .option("--sub-id <id>", "User segment identifier")
  .option("--breed-ids <ids>", "Comma-separated breed IDs")
  .option("--json", "Output as JSON")
  .action(async (file: string, opts: ActionOpts) => {
    try {
      const fs = await import("fs");
      const path = await import("path");
      const resolved = path.resolve(file);
      if (!fs.existsSync(resolved)) {
        throw new CliError(2, `File not found: ${resolved}`);
      }
      const fileData = fs.readFileSync(resolved);
      const fileName = path.basename(resolved);

      const formData = new FormData();
      formData.append("file", new Blob([fileData]), fileName);
      if (opts.subId) formData.append("sub_id", opts.subId);
      if (opts.breedIds) formData.append("breed_ids", opts.breedIds);

      const headers = buildAuthHeaders();
      const res = await fetch(`${BASE_URL}/images/upload`, {
        method: "POST",
        headers: { ...headers, Accept: "application/json" },
        body: formData,
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) {
        const msg = (data as Record<string, unknown>)?.message ?? res.statusText;
        throw new CliError(res.status, `${res.status}: ${String(msg)}`);
      }
      output(data, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });

// ── DELETE ─────────────────────────────────────────
imagesResource
  .command("delete")
  .description("Delete an uploaded image")
  .argument("<id>", "Image ID")
  .option("--json", "Output as JSON")
  .action(async (id: string, opts: ActionOpts) => {
    try {
      await client.delete(`/images/${id}`);
      output({ deleted: true, id }, { json: opts.json });
    } catch (err) {
      handleError(err, opts.json);
    }
  });
