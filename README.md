# thecatapi-cli

Unofficial CLI for [The Cat API](https://thecatapi.com). Made with [api2cli.dev](https://api2cli.dev).

> **Note:** This is a community-maintained project and is not officially affiliated with or endorsed by The Cat API.

## Install

```bash
npx api2cli install thecatapi
```

This clones the repo, builds the CLI, links it to your PATH, and installs the AgentSkill to your coding agents.

## Usage

```bash
thecatapi-cli auth set "your-api-key"
thecatapi-cli auth test
thecatapi-cli --help
```

Get a free API key at https://thecatapi.com/signup

## Resources

### images

| Command | Description |
|---------|-------------|
| `thecatapi-cli images search` | Search random cat images |
| `thecatapi-cli images search --limit 5 --has-breeds` | Search with filters |
| `thecatapi-cli images list` | List your uploaded images |
| `thecatapi-cli images get <id>` | Get a specific image |
| `thecatapi-cli images upload <file>` | Upload a cat image |
| `thecatapi-cli images delete <id>` | Delete an uploaded image |

### breeds

| Command | Description |
|---------|-------------|
| `thecatapi-cli breeds list` | List all cat breeds |
| `thecatapi-cli breeds get <id>` | Get breed details (e.g. abys, beng) |
| `thecatapi-cli breeds search <query>` | Search breeds by name |
| `thecatapi-cli breeds facts <id>` | Get facts about a breed |

### favourites

| Command | Description |
|---------|-------------|
| `thecatapi-cli favourites list` | List favourited images |
| `thecatapi-cli favourites create --image-id <id>` | Add to favourites |
| `thecatapi-cli favourites delete <id>` | Remove from favourites |

### votes

| Command | Description |
|---------|-------------|
| `thecatapi-cli votes list` | List your votes |
| `thecatapi-cli votes create --image-id <id> --value 1` | Upvote an image |
| `thecatapi-cli votes delete <id>` | Delete a vote |

### facts

| Command | Description |
|---------|-------------|
| `thecatapi-cli facts list` | Get random cat facts |
| `thecatapi-cli facts list --limit 10` | Get multiple facts |

## Global Flags

All commands support: `--json`, `--format <text|json|csv|yaml>`, `--verbose`, `--no-color`, `--no-header`
