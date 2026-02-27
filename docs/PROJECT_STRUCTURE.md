<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Project structure

Monorepo gestionado con **pnpm workspaces** y **Turborepo**. Licencia: **GNU Affero General Public
License v3.0 or later (AGPL-3.0-or-later)**. La aplicación móvil usa **Expo** con React Native.

---

## Árbol completo

```
web-app/
│
├── .github/                            # Configuración de GitHub
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md               # Plantilla de reporte de bugs
│   │   └── feature_request.md          # Plantilla de solicitud de features
│   ├── workflows/
│   │   ├── ci.yml                      # Pipeline CI: lint, typecheck, test, build, audit
│   │   └── release.yml                 # Publica GitHub Release al hacer push de tag v*.*.*
│   └── PULL_REQUEST_TEMPLATE.md        # Checklist para pull requests
│
├── .husky/                             # Git hooks
│   ├── commit-msg                      # Valida el mensaje con commitlint
│   └── pre-commit                      # Ejecuta lint-staged antes de cada commit
│
├── apps/
│   ├── backend/                        # API REST — NestJS
│   │   ├── src/
│   │   │   ├── main.ts                 # Bootstrap: Helmet, CORS, Swagger, pipes globales
│   │   │   ├── app.module.ts           # Módulo raíz: Config, Throttler, Auth, Users, Health
│   │   │   ├── config/
│   │   │   │   ├── configuration.ts    # Factory de configuración tipada
│   │   │   │   └── configuration.schema.ts  # Validación Joi de variables de entorno
│   │   │   ├── common/
│   │   │   │   ├── decorators/
│   │   │   │   │   ├── public.decorator.ts       # @Public() — omite JwtAuthGuard
│   │   │   │   │   └── current-user.decorator.ts # @CurrentUser() — extrae el JWT payload
│   │   │   │   ├── filters/
│   │   │   │   │   └── http-exception.filter.ts  # Formato estándar de errores HTTP
│   │   │   │   ├── guards/
│   │   │   │   │   └── jwt-auth.guard.ts          # Guard JWT global, respeta @Public()
│   │   │   │   └── interceptors/
│   │   │   │       ├── logging.interceptor.ts     # Loguea método, ruta y tiempo de respuesta
│   │   │   │       └── transform.interceptor.ts   # Envuelve respuestas en { data, statusCode, timestamp }
│   │   │   └── modules/
│   │   │       ├── auth/
│   │   │       │   ├── auth.module.ts             # JWT + Passport + LocalStrategy
│   │   │       │   ├── auth.service.ts            # validateUser(), login()
│   │   │       │   ├── auth.controller.ts         # POST /api/v1/auth/login, POST /api/v1/auth/me
│   │   │       │   ├── dto/
│   │   │       │   │   └── login.dto.ts           # { email, password }
│   │   │       │   └── strategies/
│   │   │       │       ├── jwt.strategy.ts        # Extrae payload del Bearer token
│   │   │       │       └── local.strategy.ts      # Valida email/password con AuthService
│   │   │       ├── users/
│   │   │       │   ├── users.module.ts
│   │   │       │   ├── users.service.ts           # create(), findByEmail(), findById(), findAll()
│   │   │       │   ├── users.controller.ts        # POST /register, GET /, GET /:id
│   │   │       │   ├── entities/
│   │   │       │   │   └── user.entity.ts         # Interface User + enum UserRole
│   │   │       │   └── dto/
│   │   │       │       └── create-user.dto.ts     # { email, name, password }
│   │   │       └── health/
│   │   │           ├── health.module.ts
│   │   │           └── health.controller.ts       # GET /health — memoria heap vía @nestjs/terminus
│   │   ├── test/
│   │   │   ├── app.e2e-spec.ts         # Tests E2E: /health, /register, /login
│   │   │   └── jest-e2e.json           # Configuración Jest para E2E
│   │   ├── .env.example                # Variables de entorno del backend
│   │   ├── Dockerfile                  # Build multistage: deps → build → runner
│   │   ├── nest-cli.json               # CLI NestJS + plugin Swagger
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── expo-app/                       # App móvil — Expo (React Native)
│   │   ├── app/                        # Expo Router — file-based routing
│   │   │   ├── index.tsx               # Pantalla principal
│   │   │   └── ...                     # Otras pantallas
│   │   ├── assets/                     # Imágenes, fuentes, iconos
│   │   ├── app.json                    # Configuración de la app Expo
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── mcp-server/                     # Servidor MCP — Model Context Protocol
│       ├── src/
│       │   ├── index.ts                # Entry point: selecciona transporte (stdio / http)
│       │   ├── server.ts               # Instancia McpServer y registra tools/resources/prompts
│       │   ├── tools/
│       │   │   ├── index.ts            # Registro de todas las tools
│       │   │   ├── echo.tool.ts        # Tool: echo — devuelve el mensaje de entrada
│       │   │   └── fetch.tool.ts       # Tool: fetch-backend — GET al backend interno
│       │   ├── resources/
│       │   │   ├── index.ts            # Registro de todos los resources
│       │   │   └── config.resource.ts  # Resource: config://server — info del servidor
│       │   └── prompts/
│       │       ├── index.ts            # Registro de todos los prompts
│       │       ├── debug.prompt.ts     # Prompt: debug — análisis de errores
│       │       └── code-review.prompt.ts # Prompt: code-review — revisión de código
│       ├── .env.example
│       ├── Dockerfile
│       ├── README.md                   # Instrucciones de registro en Claude Desktop y VS Code
│       ├── package.json
│       └── tsconfig.json
│
├── packages/                           # Código compartido entre apps
│   ├── types/                          # @expo-app/types
│   │   └── src/
│   │       └── index.ts                # User, ApiResponse, PaginatedResponse, JwtPayload, etc.
│   ├── utils/                          # @expo-app/utils
│   │   └── src/
│   │       └── index.ts                # capitalize, slugify, truncate, omit, pick, formatDate, paginate, isValidEmail…
│   └── config/                         # @expo-app/config
│       └── src/
│           └── index.ts                # sharedEnvSchema, HTTP_STATUS, PAGINATION_DEFAULTS, zodId, zodEmail…
│
├── docs/
│   └── PROJECT_STRUCTURE.md            # Este archivo
│
├── .editorconfig                        # Estilo de edición consistente entre editores
├── .env.example                         # Variables de entorno del monorepo completo
├── .gitignore
├── CHANGELOG.md                         # Historial de cambios (Keep a Changelog)
├── CODE_OF_CONDUCT.md                   # Contributor Covenant v2.1
├── CONTRIBUTING.md                      # Guía de contribución + cabeceras SPDX
├── COPYING                              # Aviso copyleft GNU (convención GPL/AGPL)
├── LICENSE                             # GNU AGPL-3.0-or-later (texto completo)
├── README.md                            # Documentación principal del proyecto
├── REUSE.toml                           # Metadatos de licencia REUSE-spec 3.3
├── SECURITY.md                          # Política de seguridad y reporte de vulnerabilidades
├── commitlint.config.js                 # Conventional Commits
├── docker-compose.yml                   # Infra local (Postgres, Redis) + apps en perfil prod
├── eslint.config.js                     # ESLint flat config con TypeScript
├── package.json                         # Scripts raíz + lint-staged
├── pnpm-workspace.yaml                  # Definición de workspaces pnpm
├── prettier.config.js                   # Formato de código + prettier-plugin-tailwindcss
├── tsconfig.base.json                   # tsconfig base compartido por todos los workspaces
└── turbo.json                           # Pipeline de tareas Turborepo (build, dev, lint, test…)
```

---

## Apps

### `apps/backend` — NestJS REST API

| Puerto | URL                                         |
| ------ | ------------------------------------------- |
| 3001   | http://localhost:3001                       |
| —      | http://localhost:3001/api → Swagger UI      |
| —      | http://localhost:3001/health → Health check |

**Dependencias clave:** `@nestjs/core`, `@nestjs/jwt`, `@nestjs/passport`, `@nestjs/swagger`,
`@nestjs/terminus`, `@nestjs/throttler`, `bcryptjs`, `class-validator`, `helmet`, `joi`

**Endpoints incluidos:**

| Método | Ruta                     | Descripción                |
| ------ | ------------------------ | -------------------------- |
| GET    | `/health`                | Estado del servicio        |
| POST   | `/api/v1/users/register` | Registro de usuario        |
| GET    | `/api/v1/users`          | Listar usuarios            |
| GET    | `/api/v1/users/:id`      | Obtener usuario            |
| POST   | `/api/v1/auth/login`     | Login → JWT                |
| POST   | `/api/v1/auth/me`        | Usuario autenticado actual |

---

### `apps/expo-app` — Expo (React Native)

**Dependencias clave:** `expo`, `expo-router`, `react-native`, `@react-navigation/native`

**Rutas incluidas:**

| Ruta    | Descripción      |
| ------- | ---------------- |
| `/`     | Pantalla inicial |
| `/tabs` | Navegación tabs  |

---

### `apps/mcp-server` — Model Context Protocol

**Dependencias clave:** `@modelcontextprotocol/sdk`, `zod`

| Tipo     | Nombre            | Descripción                               |
| -------- | ----------------- | ----------------------------------------- |
| Tool     | `echo`            | Devuelve el mensaje de entrada            |
| Tool     | `fetch-backend`   | GET al backend interno con token opcional |
| Resource | `config://server` | Configuración no sensible del servidor    |
| Prompt   | `debug`           | Análisis estructurado de errores          |
| Prompt   | `code-review`     | Revisión de código con foco configurable  |

---

## Paquetes compartidos

| Paquete             | Exporta                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `@expo-app/types`  | `User`, `ApiResponse<T>`, `PaginatedResponse<T>`, `JwtPayload`, `LoginRequest/Response`, `PaginationQuery`   |
| `@expo-app/utils`  | `capitalize`, `slugify`, `truncate`, `omit`, `pick`, `formatDate`, `paginate`, `isValidEmail`, `isValidUUID` |
| `@expo-app/config` | `sharedEnvSchema`, `HTTP_STATUS`, `PAGINATION_DEFAULTS`, `zodId`, `zodEmail`, `zodPassword`, `zodPagination` |

---

## Infraestructura local (Docker Compose)

```
docker compose up -d db redis         # Solo infraestructura (desarrollo)
docker compose --profile prod up -d   # Infraestructura + apps en producción
```

| Servicio     | Imagen                | Puerto |
| ------------ | --------------------- | ------ |
| `db`         | postgres:16-alpine    | 5432   |
| `redis`      | redis:7-alpine        | 6379   |
| `backend`    | Dockerfile multistage | 3001   |
| `mcp-server` | Dockerfile multistage | 3002   |

**Nota:** La app Expo se ejecuta en modo desarrollo con Expo Go o en un emulador.

---

## CI/CD (GitHub Actions)

| Job        | Trigger       | Descripción                          |
| ---------- | ------------- | ------------------------------------ |
| `lint`     | push / PR     | ESLint + Prettier check + tsc        |
| `test`     | push / PR     | Jest unit tests + Codecov            |
| `test-e2e` | push / PR     | Jest E2E con Postgres y Redis reales |
| `build`    | push / PR     | Turbo build completo                 |
| `audit`    | push / PR     | `pnpm audit --audit-level=high`      |
| `release`  | push `v*.*.*` | Crea GitHub Release automáticamente  |

---

## Convenciones

### Cabecera SPDX obligatoria en cada archivo fuente

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
```

```tsx
{
  /* SPDX-License-Identifier: AGPL-3.0-or-later */
}
```

```css
/* SPDX-License-Identifier: AGPL-3.0-or-later */
```

### Commits (Conventional Commits)

```
feat(auth): add refresh token rotation
fix(expo-app): correct navigation issue on main screen
docs: update project structure
chore(deps): upgrade turbo to v2
```

Tipos permitidos: `feat` `fix` `docs` `style` `refactor` `perf` `test` `build` `ci` `chore` `revert`

---

## Quick start

```bash
git clone https://github.com/your-org/web-app.git
cd web-app
pnpm install
cp .env.example .env
docker compose up -d db redis
pnpm dev
```

> Para añadir el texto completo de la licencia AGPL-3.0:
>
> ```bash
> curl https://www.gnu.org/licenses/agpl-3.0.txt -o LICENSE
> ```
