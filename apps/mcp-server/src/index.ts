// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createServer } from './server.js';

const transport = process.env['MCP_TRANSPORT'] ?? 'stdio';

async function main() {
  const server = createServer();

  if (transport === 'stdio') {
    const stdioTransport = new StdioServerTransport();
    await server.connect(stdioTransport);
    process.stderr.write('MCP server running on stdio\n');
  } else {
    // HTTP/SSE transport — install @modelcontextprotocol/sdk and add SSEServerTransport
    throw new Error(`Unsupported transport: ${transport}. Use MCP_TRANSPORT=stdio`);
  }
}

main().catch((err) => {
  process.stderr.write(`Fatal: ${String(err)}\n`);
  process.exit(1);
});
