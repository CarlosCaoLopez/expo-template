// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

const BACKEND_URL = process.env['BACKEND_URL'] ?? 'http://localhost:3001';

/**
 * fetch-backend — performs a GET request to the internal backend API.
 * Only allows requests to the configured BACKEND_URL to prevent SSRF.
 */
export function registerFetchTool(server: McpServer): void {
  server.tool(
    'fetch-backend',
    'Performs a GET request to the backend API and returns the JSON response.',
    {
      path: z.string().startsWith('/').describe('API path, e.g. /api/v1/health'),
      token: z.string().optional().describe('Bearer token for authenticated endpoints'),
    },
    async ({ path, token }) => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${BACKEND_URL}${path}`, { headers });
      const body: unknown = await res.json().catch(() => res.statusText);

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ status: res.status, body }, null, 2),
          },
        ],
        isError: !res.ok,
      };
    },
  );
}
