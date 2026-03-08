---
name: unofficial-catapi-cli
description: "Manage thecatapi via CLI - images, breeds, favourites, votes, facts. Use when user mentions 'thecatapi' or wants to interact with the thecatapi API."
category: apis
---

# unofficial-catapi-cli

## Setup

If `unofficial-catapi-cli` is not found, install and build it:
```bash
bun --version || curl -fsSL https://bun.sh/install | bash
npx api2cli bundle thecatapi
npx api2cli link thecatapi
```

`api2cli link` adds `~/.local/bin` to PATH automatically. The CLI is available in the next command.

Always use `--json` flag when calling commands programmatically.

## Authentication

```bash
unofficial-catapi-cli auth set "your-api-key"
unofficial-catapi-cli auth test
```

Get a free API key at https://thecatapi.com/signup

## Resources

### images

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli images search --json` | Search random cat images |
| `unofficial-catapi-cli images search --limit 5 --has-breeds --size small --json` | Search with filters |
| `unofficial-catapi-cli images list --json` | List your uploaded images |
| `unofficial-catapi-cli images get <id> --json` | Get a specific image |
| `unofficial-catapi-cli images upload <file> --json` | Upload a cat image |
| `unofficial-catapi-cli images delete <id> --json` | Delete an uploaded image |

### breeds

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli breeds list --json` | List all cat breeds |
| `unofficial-catapi-cli breeds get <id> --json` | Get breed details (e.g. abys, beng) |
| `unofficial-catapi-cli breeds search <query> --json` | Search breeds by name |
| `unofficial-catapi-cli breeds facts <id> --json` | Get facts about a breed |

### favourites

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli favourites list --json` | List your favourited images |
| `unofficial-catapi-cli favourites get <id> --json` | Get a specific favourite |
| `unofficial-catapi-cli favourites create --image-id <id> --json` | Add image to favourites |
| `unofficial-catapi-cli favourites delete <id> --json` | Remove from favourites |

### votes

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli votes list --json` | List your votes |
| `unofficial-catapi-cli votes get <id> --json` | Get a specific vote |
| `unofficial-catapi-cli votes create --image-id <id> --value 1 --json` | Vote on an image (1=up, 0=down) |
| `unofficial-catapi-cli votes delete <id> --json` | Delete a vote |

### facts

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli facts list --json` | Get random cat facts |
| `unofficial-catapi-cli facts list --limit 10 --json` | Get multiple cat facts |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
