// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerConfigResource } from './config.resource.js';

export function registerResources(server: McpServer): void {
  registerConfigResource(server);
}
