<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# MCP Server

Model Context Protocol server exposing **tools**, **resources** and **prompts** for the expo-app
project.

## Tools

| Name            | Description                         |
| --------------- | ----------------------------------- |
| `echo`          | Returns the input message unchanged |
| `fetch-backend` | GET request to the backend API      |

## Resources

| URI               | Description                        |
| ----------------- | ---------------------------------- |
| `config://server` | Non-sensitive server configuration |

## Prompts

| Name          | Description                                       |
| ------------- | ------------------------------------------------- |
| `debug`       | Structured debugging prompt from an error message |
| `code-review` | Structured code review prompt                     |

## Usage with Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "expo-app": {
      "command": "node",
      "args": ["/absolute/path/to/apps/mcp-server/dist/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:3001"
      }
    }
  }
}
```

## Usage with VS Code (Claude extension)

Add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "expo-app": {
      "type": "stdio",
      "command": "pnpm",
      "args": ["--filter", "@expo-app/mcp-server", "dev"],
      "env": {
        "BACKEND_URL": "http://localhost:3001"
      }
    }
  }
}
```
