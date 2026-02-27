<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# web-app

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

> Full-stack monorepo template: NestJS backend · Expo mobile app · MCP server

This project is **free software**: you can use, study, share and improve it. It is distributed under
the terms of the [GNU Affero General Public License v3.0 or later](LICENSE).

## Project structure

```
.
├── apps/
│   ├── backend/        # NestJS REST API
│   ├── expo-app/       # Expo mobile app (React Native)
│   └── mcp-server/     # Model Context Protocol server
├── packages/
│   ├── types/          # Shared TypeScript types
│   ├── utils/          # Shared utility functions
│   └── config/         # Shared configuration schemas
├── .github/            # CI/CD workflows and issue templates
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE             # GNU AGPL-3.0
└── REUSE.toml          # REUSE compliance metadata
```

## Requirements

| Tool    | Version |
| ------- | ------- |
| Node.js | >= 20   |
| pnpm    | >= 9    |
| Docker  | >= 24   |

## Quick start

```bash
# 1. Clone
git clone https://github.com/your-org/web-app.git
cd web-app

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your values

# 4. Start local services
docker compose up -d db redis

# 5. Start all apps
pnpm dev
```

| App        | URL                       |
| ---------- | ------------------------- |
| Expo app   | Use Expo Go or emulator   |
| Backend    | http://localhost:3001     |
| API docs   | http://localhost:3001/api |
| MCP server | http://localhost:3002     |

## Development

```bash
pnpm build        # Build all packages and apps
pnpm lint         # Lint all workspaces
pnpm typecheck    # Type-check all workspaces
pnpm test         # Run unit tests
pnpm test:e2e     # Run end-to-end tests
pnpm format       # Format all files with Prettier
```

## Apps

### Backend (`apps/backend`)

NestJS REST API with JWT authentication, Prisma ORM, Swagger docs and health checks. See
[CLAUDE.md](CLAUDE.md).

### Expo App (`apps/expo-app`)

Expo mobile application with React Native, Expo Router for navigation. See
[CLAUDE.md](CLAUDE.md).

### MCP Server (`apps/mcp-server`)

Model Context Protocol server exposing tools, resources and prompts via the official MCP SDK. See
[CLAUDE.md](CLAUDE.md).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

Every source file must carry an SPDX header:

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to web-app
```

## License

Copyright (C) 2026 Contributors to web-app

This program is free software: you can redistribute it and/or modify it under the terms of the GNU
Affero General Public License as published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

See [LICENSE](LICENSE) for the full text.
