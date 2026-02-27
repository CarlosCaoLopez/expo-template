// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

/**
 * echo — returns the input message unchanged.
 * Useful as a minimal tool example and for testing the MCP connection.
 */
export function registerEchoTool(server: McpServer): void {
  server.tool(
    'echo',
    'Returns the input message unchanged. Useful for testing.',
    { message: z.string().describe('The message to echo back') },
    ({ message }) => ({
      content: [{ type: 'text' as const, text: message }],
    }),
  );
}
