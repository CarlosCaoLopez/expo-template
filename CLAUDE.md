# CLAUDE.md

## Proyecto

Monorepo template: NestJS REST API + Expo (React Native) mobile app + MCP server, gestionado con pnpm workspaces y Turborepo. Node >=20, pnpm >=9, Docker >=24.

## Setup

```bash
docker compose up -d          # PostgreSQL 16 + Redis 7
pnpm install
pnpm --filter=@expo-app/backend run prisma:generate
pnpm --filter=@expo-app/backend run prisma:migrate:dev --name init
pnpm dev                      # arranca todos los servicios
```

Copia `.env.example` → `.env` antes de arrancar.

## Instrucciones para el agente

- No vuelvas a leer archivos ya leídos en esta sesión a menos que te lo pida. Minimiza las llamadas a herramientas y trabaja con lo que ya tienes en contexto.
- No ejecutes el `build` en cada modificación de código, ya ejecuto yo en formato dev o manualmente.
- No hagas ningún commit ni PR ni nada en Github. Cuando te pida algo de Github, dame los comandos exactos para hacerlo.
- Ante una tarea ambigua, pregunta antes de implementar.
- Si necesitas contexto de un archivo que no has leído, pídelo antes de asumir su contenido.

## Comandos importantes para probar los tests

```bash
pnpm test                     # Jest unit tests (todos los workspaces)
pnpm test:e2e                 # E2E con supertest (requiere Postgres + Redis)
pnpm lint && pnpm typecheck   # checks previos al push
```

Desde `apps/backend/`:
```bash
pnpm test:watch   # Jest en watch mode
pnpm test:cov     # Jest con cobertura
```

## Estructura relevante

```
apps/
  backend/      → NestJS API (módulos: auth, users, health)
  expo-app/     → Expo mobile app (Expo Router, SDK 54)
  mcp-server/   → MCP server (stdio, tools: echo, fetch-backend)
packages/
  types/        → interfaces TypeScript compartidas
  utils/        → helpers (capitalize, slugify, paginate…)
  config/       → schemas Zod, constantes, validación de env
```

Backend escucha en `:3001`, Swagger en `http://localhost:3001/api`. Todas las respuestas tienen forma `{ data, statusCode, timestamp }`.

## Convenciones

- Conventional Commits: `feat(scope): Subject` — header máx 100 chars, tipos: `feat fix docs style refactor perf test build ci chore revert`
- Todos los archivos fuente requieren cabecera SPDX `AGPL-3.0-or-later`
- Pre-commit: lint-staged ejecuta ESLint + Prettier sobre archivos staged
- TypeScript strict: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`

## Lo que no debes tocar

- `pnpm-lock.yaml` — no editar manualmente
- `turbo.json` — pipeline de Turborepo, cambiar solo si se añade/elimina una tarea
- `commitlint.config.*` — configuración de conventional commits
- `.reuse/` y cabeceras SPDX — compliance de licencia
