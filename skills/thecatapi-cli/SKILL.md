---
name: thecatapi-cli
description: "Manage thecatapi via CLI - images, breeds, favourites, votes, facts. Use when user mentions 'thecatapi' or wants to interact with the thecatapi API."
category: apis
---

# thecatapi-cli

## Setup

If `thecatapi-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle thecatapi
npx api2cli link thecatapi
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
thecatapi-cli auth set "your-api-key"
thecatapi-cli auth test
```

Get a free API key at https://thecatapi.com/signup

## Resources

### images

| Command | Description |
|---------|-------------|
| `thecatapi-cli images search --json` | Search random cat images |
| `thecatapi-cli images search --limit 5 --has-breeds --size small --json` | Search with filters |
| `thecatapi-cli images list --json` | List your uploaded images |
| `thecatapi-cli images get <id> --json` | Get a specific image |
| `thecatapi-cli images upload <file> --json` | Upload a cat image |
| `thecatapi-cli images delete <id> --json` | Delete an uploaded image |

### breeds

| Command | Description |
|---------|-------------|
| `thecatapi-cli breeds list --json` | List all cat breeds |
| `thecatapi-cli breeds get <id> --json` | Get breed details (e.g. abys, beng) |
| `thecatapi-cli breeds search <query> --json` | Search breeds by name |
| `thecatapi-cli breeds facts <id> --json` | Get facts about a breed |

### favourites

| Command | Description |
|---------|-------------|
| `thecatapi-cli favourites list --json` | List your favourited images |
| `thecatapi-cli favourites get <id> --json` | Get a specific favourite |
| `thecatapi-cli favourites create --image-id <id> --json` | Add image to favourites |
| `thecatapi-cli favourites delete <id> --json` | Remove from favourites |

### votes

| Command | Description |
|---------|-------------|
| `thecatapi-cli votes list --json` | List your votes |
| `thecatapi-cli votes get <id> --json` | Get a specific vote |
| `thecatapi-cli votes create --image-id <id> --value 1 --json` | Vote on an image (1=up, 0=down) |
| `thecatapi-cli votes delete <id> --json` | Delete a vote |

### facts

| Command | Description |
|---------|-------------|
| `thecatapi-cli facts list --json` | Get random cat facts |
| `thecatapi-cli facts list --limit 10 --json` | Get multiple cat facts |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
