#!/usr/bin/env bun
import { Command } from "commander";
import { globalFlags } from "./lib/config.js";
import { authCommand } from "./commands/auth.js";
import { imagesResource } from "./resources/images.js";
import { breedsResource } from "./resources/breeds.js";
import { favouritesResource } from "./resources/favourites.js";
import { votesResource } from "./resources/votes.js";
import { factsResource } from "./resources/facts.js";

const program = new Command();

program
  .name("unofficial-catapi-cli")
  .description("Unofficial CLI for The Cat API — search cat images, browse breeds, vote, and more")
  .version("0.1.0")
  .option("--json", "Output as JSON", false)
  .option("--format <fmt>", "Output format: text, json, csv, yaml", "text")
  .option("--verbose", "Enable debug logging", false)
  .option("--no-color", "Disable colored output")
  .option("--no-header", "Omit table/csv headers (for piping)")
  .hook("preAction", (_thisCmd, actionCmd) => {
    const root = actionCmd.optsWithGlobals();
    globalFlags.json = root.json ?? false;
    globalFlags.format = root.format ?? "text";
    globalFlags.verbose = root.verbose ?? false;
    globalFlags.noColor = root.color === false;
    globalFlags.noHeader = root.header === false;
  });

// Built-in commands
program.addCommand(authCommand);

// Resources
program.addCommand(imagesResource);
program.addCommand(breedsResource);
program.addCommand(favouritesResource);
program.addCommand(votesResource);
program.addCommand(factsResource);

program.parse();
