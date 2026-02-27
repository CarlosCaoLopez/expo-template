// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerDebugPrompt } from './debug.prompt.js';
import { registerCodeReviewPrompt } from './code-review.prompt.js';

export function registerPrompts(server: McpServer): void {
  registerDebugPrompt(server);
  registerCodeReviewPrompt(server);
}
