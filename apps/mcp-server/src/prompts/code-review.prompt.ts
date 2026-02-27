// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

/**
 * code-review — generates a structured code review prompt.
 */
export function registerCodeReviewPrompt(server: McpServer): void {
  server.prompt(
    'code-review',
    'Generates a structured code review prompt for a given code snippet.',
    {
      code: z.string().describe('The code snippet to review'),
      language: z.string().optional().describe('Programming language (e.g. TypeScript)'),
      focus: z
        .enum(['security', 'performance', 'readability', 'all'])
        .default('all')
        .describe('Review focus area'),
    },
    ({ code, language, focus }) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: [
              `## Code review — focus: ${focus}`,
              '',
              `**Language:** ${language ?? 'unknown'}`,
              '',
              '```' + (language ?? ''),
              code,
              '```',
              '',
              focus === 'security'
                ? 'Review for security vulnerabilities (OWASP Top 10, injection, auth issues, etc.).'
                : focus === 'performance'
                  ? 'Review for performance issues (complexity, unnecessary re-renders, N+1 queries, etc.).'
                  : focus === 'readability'
                    ? 'Review for readability, naming, code structure and documentation.'
                    : 'Provide a comprehensive review covering correctness, security, performance and readability.',
            ].join('\n'),
          },
        },
      ],
    }),
  );
}
