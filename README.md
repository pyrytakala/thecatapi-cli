# unofficial-catapi-cli

Unofficial CLI for [The Cat API](https://thecatapi.com). Made with [api2cli.dev](https://api2cli.dev).

> **Note:** This is a community-maintained project and is not officially affiliated with or endorsed by The Cat API.

## Install

```bash
npx api2cli install thecatapi
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Usage

```bash
unofficial-catapi-cli auth set "your-api-key"
unofficial-catapi-cli auth test
unofficial-catapi-cli --help
```

Get a free API key at https://thecatapi.com/signup

## Resources

### images

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli images search` | Search random cat images |
| `unofficial-catapi-cli images search --limit 5 --has-breeds` | Search with filters |
| `unofficial-catapi-cli images list` | List your uploaded images |
| `unofficial-catapi-cli images get <id>` | Get a specific image |
| `unofficial-catapi-cli images upload <file>` | Upload a cat image |
| `unofficial-catapi-cli images delete <id>` | Delete an uploaded image |

### breeds

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli breeds list` | List all cat breeds |
| `unofficial-catapi-cli breeds get <id>` | Get breed details (e.g. abys, beng) |
| `unofficial-catapi-cli breeds search <query>` | Search breeds by name |
| `unofficial-catapi-cli breeds facts <id>` | Get facts about a breed |

### favourites

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli favourites list` | List favourited images |
| `unofficial-catapi-cli favourites create --image-id <id>` | Add to favourites |
| `unofficial-catapi-cli favourites delete <id>` | Remove from favourites |

### votes

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli votes list` | List your votes |
| `unofficial-catapi-cli votes create --image-id <id> --value 1` | Upvote an image |
| `unofficial-catapi-cli votes delete <id>` | Delete a vote |

### facts

| Command | Description |
|---------|-------------|
| `unofficial-catapi-cli facts list` | Get random cat facts |
| `unofficial-catapi-cli facts list --limit 10` | Get multiple facts |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
