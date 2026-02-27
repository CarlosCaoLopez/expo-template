// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

/**
 * config://server — exposes non-sensitive server configuration as a resource.
 * The LLM can read this to understand the current environment.
 */
export function registerConfigResource(server: McpServer): void {
  server.resource(
    'server-config',
    'config://server',
    { description: 'Non-sensitive server configuration and environment info' },
    (_uri) => ({
      contents: [
        {
          uri: 'config://server',
          mimeType: 'application/json',
          text: JSON.stringify(
            {
              name: 'web-app-mcp',
              version: '0.1.0',
              transport: process.env['MCP_TRANSPORT'] ?? 'stdio',
              backendUrl: process.env['BACKEND_URL'] ?? 'http://localhost:3001',
              nodeVersion: process.version,
            },
            null,
            2,
          ),
        },
      ],
    }),
  );
}
