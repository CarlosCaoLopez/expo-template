// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

/**
 * debug — generates a structured debugging prompt given an error message and context.
 */
export function registerDebugPrompt(server: McpServer): void {
  server.prompt(
    'debug',
    'Generates a structured debugging prompt from an error message and optional context.',
    {
      error: z.string().describe('The error message or stack trace'),
      context: z.string().optional().describe('Surrounding code or additional context'),
    },
    ({ error, context }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              '## Debug request',
              '',
              '**Error:**',
              '```',
              error,
              '```',
              ...(context ? ['', '**Context:**', '```', context, '```'] : []),
              '',
              'Please identify the root cause and suggest a fix.',
            ].join('\n'),
          },
        },
      ],
    }),
  );
}
