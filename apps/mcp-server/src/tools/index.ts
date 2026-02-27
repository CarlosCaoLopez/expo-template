// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerEchoTool } from './echo.tool.js';
import { registerFetchTool } from './fetch.tool.js';

export function registerTools(server: McpServer): void {
  registerEchoTool(server);
  registerFetchTool(server);
}
