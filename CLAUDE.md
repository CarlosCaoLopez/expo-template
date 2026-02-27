# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this
repository.

## Repository Overview

Full-stack monorepo template: NestJS backend + Expo mobile app + MCP server. Uses pnpm
workspaces with Turborepo for build orchestration.

**Service URLs (dev):**

- Expo app: Use Expo Go or emulator
- Backend: http://localhost:3001
- Swagger API docs: http://localhost:3001/api
- MCP Server: port 3002

**Requirements:** Node >= 20, pnpm >= 9, Docker >= 24

## Commands

### Root (all workspaces via Turbo)

```bash
pnpm dev                # Start all apps concurrently
pnpm dev:backend        # Backend only
pnpm dev:expo-app       # Expo app only
pnpm dev:mcp            # MCP server only
pnpm build              # Build all (respects dependency order)
pnpm lint               # ESLint all workspaces
pnpm lint:fix           # Auto-fix lint issues
pnpm typecheck          # tsc --noEmit all workspaces
pnpm test               # Run unit tests (Jest)
pnpm test:e2e           # Run E2E tests
pnpm format             # Prettier format all files
pnpm format:check       # Check format without writing
pnpm clean              # Remove dist, .next, node_modules
```

### Backend (`apps/backend/`)

```bash
pnpm test               # Jest unit tests
pnpm test:watch         # Jest in watch mode
pnpm test:cov           # Jest with coverage
pnpm test:e2e           # E2E with supertest (requires Postgres + Redis)
```

### Expo App (`apps/expo-app/`)

```bash
npm start               # expo start
npm run android         # expo start --android
npm run ios             # expo start --ios
npm run web             # expo start --web
```

### Infrastructure

```bash
docker compose up -d    # Start PostgreSQL 16 + Redis 7
```

## Architecture

### Monorepo Layout

```
apps/
  backend/      # NestJS REST API (@expo-app/backend)
  expo-app/     # Expo mobile app (React Native)
  mcp-server/   # Model Context Protocol server (@expo-app/mcp-server)
packages/
  types/        # Shared TypeScript types (@expo-app/types)
  utils/        # Shared utility functions (@expo-app/utils)
  config/       # Shared Zod schemas & constants (@expo-app/config)
```

### Backend (`apps/backend/`)

NestJS module-based architecture:

- **`src/modules/auth/`** — JWT + Passport (local + JWT strategies), login/register endpoints
- **`src/modules/users/`** — In-memory user store (TODO: replace with Prisma)
- **`src/modules/health/`** — Health check endpoint
- **`src/common/`** — Global guards (`JwtAuthGuard`), decorators (`@Public()`, `@CurrentUser()`),
  filters (`HttpExceptionFilter`), interceptors (logging, response transform)
- **`src/config/`** — Joi environment validation

Global NestJS interceptors wrap all responses as `{data, statusCode, timestamp}`. Rate limiting: 100
req/60s. Swagger available at `/api`.

JWT payload shape: `{ sub, email, role }`.

### Expo App (`apps/expo-app/`)

Expo mobile application with React Native:

- **Expo Router** — file-based routing system for navigation
- **React Native 0.81.5** — latest stable version
- **Expo SDK 54** — comprehensive set of APIs and components

Key patterns:

- Navigation: Expo Router with file-based routing in `app/` directory
- Components: React Native core components + Expo components
- Development: Use Expo Go app or native emulators for testing

### MCP Server (`apps/mcp-server/`)

Model Context Protocol server for AI tool integration:

- **Tools:** `echo` (test), `fetch-backend` (GET to backend API)
- **Resources:** `config://server` (non-sensitive config)
- **Prompts:** `debug`, `code-review`
- Transport: stdio by default; uses `BACKEND_URL` env var for API access

### Shared Packages

- `@expo-app/types` — Pure TypeScript interfaces/types, no runtime deps
- `@expo-app/utils` — `capitalize`, `slugify`, `truncate`, `paginate`, validation helpers
- `@expo-app/config` — Zod schemas, env validation, pagination defaults, HTTP status constants

## TypeScript Configuration

Base config (`tsconfig.base.json`) uses strict settings including `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`. Backend uses CommonJS modules; expo-app uses
React Native preset; packages use NodeNext.

## Environment Variables

Copy `.env.example` to `.env`. Key variables:

- `DATABASE_URL`, `POSTGRES_*` — PostgreSQL connection
- `REDIS_URL` — Redis connection
- `JWT_SECRET`, `JWT_EXPIRES_IN` — Backend JWT
- `EXPO_PUBLIC_API_URL` — Expo app → backend URL
- `MCP_TRANSPORT` — MCP transport mode (default: stdio)

## Backend endpoints (summary)

- `GET /health` — Health check (public). Returns Terminus health check JSON.
- `POST /api/v1/users/register` — Register a new user. Body: `{ email, password, name }`. Returns
  created user (without password) wrapped in `{data, statusCode, timestamp}`.
- `GET /api/v1/users` — List users (protected; admin expected). Returns array of users without
  passwords.
- `GET /api/v1/users/:id` — Get user by id (protected). Returns single user without password.
- `POST /api/v1/auth/login` — Local login (Credentials). Body: `{ email, password }`. Returns
  `{ data: { accessToken } }` where `accessToken` is JWT with payload `{ sub, email, role }`.

Notes:

- Routes are versioned under `/api/v1/` (check controllers in `apps/backend/src/modules`).
- Global response shape is `{ data, statusCode, timestamp }` due to transform interceptor.
- Authentication uses JWT; protected routes require `Authorization: Bearer <token>`.

## Expo App screens summary

- `app/index.tsx` — Main/home screen of the mobile app
- Expo Router handles navigation with file-based routing
- Screens are located in the `app/` directory

Other notes:

- API calls should use `EXPO_PUBLIC_API_URL` environment variable
- For local development on device, use your machine's IP address instead of localhost

## Prisma: setup & common commands (backend)

This project includes a Prisma schema at `apps/backend/prisma/schema.prisma` and uses
`@prisma/client`.

1. Ensure infrastructure is up (Postgres + Redis):

```bash
docker compose up -d db redis
```

2. From the backend workspace install dependencies and generate the Prisma client:

```bash
cd apps/backend
pnpm install
pnpm run prisma:generate
```

3. Create and apply the initial migration (this will create the `prisma/migrations/<timestamp>_init`
   folder and apply SQL to the DB):

```bash
pnpm run prisma:migrate:dev --name init
```

Notes on `DATABASE_URL` and environment:

- The Prisma CLI loads environment variables from the current working directory `.env` by default.
  For local development the repo provides a root `.env` and copies are available at
  `apps/backend/.env` (ignored by git).
- If Postgres is run via Docker Compose from the repo, the compose file maps host port `5433` →
  container `5432`. Use `postgresql://user:password@localhost:5433/webappdb` when running Prisma
  from the host. When running the backend inside Docker Compose, the container should use `db:5432`
  as host — the compose service already sets `DATABASE_URL` for the container accordingly.

Common Prisma scripts (in `apps/backend/package.json`):

```bash
pnpm run prisma:generate       # generate (or regenerate) Prisma Client
pnpm run prisma:migrate:dev    # create/apply dev migration and regenerate client
pnpm run prisma:migrate:deploy # apply migrations in CI/production
pnpm run prisma:studio         # open Prisma Studio (GUI)
```

Practical tips:

- Run `pnpm run prisma:generate` after changing `schema.prisma`.
- If you see `Environment variable not found: DATABASE_URL` run Prisma from `apps/backend` or
  provide `DATABASE_URL` in the shell, e.g. `export DATABASE_URL=...` (or PowerShell:
  `$env:DATABASE_URL='...'`).
- For CI, ensure a Postgres service is available and `DATABASE_URL` points to it; use
  `prisma migrate deploy`.

## Pruebas obligatorias antes de un push

Antes de hacer `git push` a la rama `main`/`develop` (o abrir un PR), asegúrate de que los
siguientes checks locales pasen para evitar fallos en CI:

- `pnpm lint` — ESLint sin errores.
- `pnpm format:check` — Formateo (Prettier) sin cambios pendientes.
- `pnpm typecheck` — `tsc --noEmit` (sin errores de tipos).
- `pnpm test` — Tests unitarios (Jest) pasan.
- `pnpm --filter=@expo-app/backend prisma:generate` — Generar Prisma Client si cambias
  `schema.prisma`.
- `pnpm --filter=@expo-app/backend prisma:migrate:dev` — Aplicar migraciones locales (requiere
  Postgres + Redis).
- `pnpm test:e2e` — Tests E2E completos (usa `docker compose up -d db redis` antes si corres
  localmente).
- `pnpm build` — Build de producción para asegurar que la compilación no falle.

Comandos rápidos (local):

```bash
# levantar infra local para e2e
docker compose up -d db redis

# instalar deps y preparar Prisma
pnpm install
pnpm --filter=@expo-app/backend prisma:generate
pnpm --filter=@expo-app/backend prisma:migrate:dev --name init

# ejecutar checks
pnpm lint && pnpm format:check && pnpm typecheck && pnpm test && pnpm test:e2e
```

## Conventions

- **Commits:** Conventional commits enforced via commitlint (`feat:`, `fix:`, `chore:`, etc.)
- **All source files** require SPDX license headers (AGPL-3.0-or-later, REUSE compliance)
- **Pre-commit hooks:** lint-staged runs ESLint + Prettier on staged files
- **Turbo caching:** `build`, `lint`, `typecheck`, `test` tasks are cached; `dev` and `test:e2e` are
  not

### Formato de commits

Usamos Conventional Commits para mantener historial claro y facilitar release notes.

- **Estructura:** `<type>(scope?): <subject>`
- **Tipos admitidos:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`,
  `chore`, `revert`.
- **Subject:** ahora se permite _mixed case_ (ya no se fuerza `lower-case`).
- **Longitud:** el header máximo es de 100 caracteres (enforceado por commitlint).

Ejemplos válidos:

- `feat(auth): Add refresh token support`
- `fix: handle nullable user profile in frontend`
- `docs(readme): Update getting-started section`

Nota: los hooks de commit y la configuración de `commitlint` siguen validando el tipo, la longitud
del header y el formato general, pero aceptan mayúsculas en el `subject`.
