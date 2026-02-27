<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Guía de desarrollo

## Stack de versiones

| Tecnología | Versión |
| ---------- | ------- |
| Expo       | 54      |
| React      | 19      |
| NestJS     | 10      |
| Node.js    | 20      |
| pnpm       | 9       |

### Cambios relevantes de Expo 54 + React 19

- **Expo Router 6** — navegación file-based con soporte para layouts anidados
- **React Native 0.81.5** — mejoras de rendimiento y nuevas APIs
- **`forwardRef` deprecado** en React 19 — `ref` se pasa como prop directa en los componentes

---

## Requisitos previos

| Herramienta    | Versión mínima | Instalación                                    |
| -------------- | -------------- | ---------------------------------------------- |
| Node.js        | 20             | https://nodejs.org                             |
| pnpm           | 9              | `npm install -g pnpm`                          |
| npm            | 10             | incluido con Node.js                           |
| Docker Desktop | 24             | https://www.docker.com/products/docker-desktop |

---

## Primera vez (setup inicial)

```bash
# 1. Clonar el repositorio
git clone https://github.com/your-org/web-app.git
cd web-app

# 2. Instalar todas las dependencias y linkear paquetes compartidos
pnpm install

# 3. Copiar variables de entorno
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp apps/expo-app/.env.example apps/expo-app/.env
cp apps/mcp-server/.env.example apps/mcp-server/.env

# 4. Editar las variables sensibles (JWT_SECRET, NEXTAUTH_SECRET…)
#    Mínimo obligatorio en apps/backend/.env:
#      JWT_SECRET=una-clave-de-al-menos-32-caracteres

# 5. Levantar la base de datos y Redis
docker compose up -d db redis
```

---

## Levantar cada app

### Backend — NestJS (npm)

```bash
cd apps/backend
npm install
npm run dev
```

- URL: <http://localhost:3001>
- Swagger UI: <http://localhost:3001/api>
- Health check: <http://localhost:3001/health>

### Expo App — Expo (npm)

```bash
cd apps/expo-app
npm start
```

- Usa Expo Go en tu dispositivo móvil o un emulador
- Escanea el código QR con Expo Go (iOS/Android)

### MCP Server (pnpm)

```bash
cd apps/mcp-server
pnpm dev
```

- Transporte por defecto: `stdio` (para Claude Desktop / VS Code)
- Para HTTP: cambia `MCP_TRANSPORT=http` en `apps/mcp-server/.env`

---

## Levantar todo a la vez (Turborepo)

Desde la raíz del monorepo:

```bash
pnpm dev              # backend + expo-app + mcp en paralelo
pnpm dev:backend      # solo backend
pnpm dev:expo-app     # solo expo-app
pnpm dev:mcp          # solo MCP server
```

---

## Otras tareas de desarrollo

Ejecutar desde la **raíz** del monorepo:

```bash
pnpm build            # compilar todos los workspaces
pnpm lint             # ESLint en todos los workspaces
pnpm lint:fix         # ESLint con auto-fix
pnpm typecheck        # tsc --noEmit en todos los workspaces
pnpm test             # tests unitarios
pnpm test:e2e         # tests E2E (requiere DB y Redis levantados)
pnpm format           # Prettier sobre todos los archivos
pnpm format:check     # Prettier en modo check (sin modificar)
pnpm clean            # borrar dist/, .next/, node_modules/
```

O ejecutar en un workspace específico:

```bash
pnpm --filter @expo-app/backend test
pnpm --filter expo-app build
```

---

## Infraestructura Docker

### Solo servicios de apoyo (modo desarrollo habitual)

```bash
docker compose up -d db redis     # Postgres en :5432, Redis en :6379
docker compose down               # parar
docker compose down -v            # parar y borrar volúmenes
```

### Apps + servicios (modo producción local)

```bash
docker compose --profile prod up --build
```

| Servicio   | Puerto                 |
| ---------- | ---------------------- |
| Postgres   | 5432                   |
| Redis      | 6379                   |
| Backend    | 3001                   |
| MCP Server | 3002                   |
| Expo App   | Expo Go o emulador     |

---

## Variables de entorno

### `apps/backend/.env`

| Variable         | Descripción                             | Ejemplo                                          |
| ---------------- | --------------------------------------- | ------------------------------------------------ |
| `NODE_ENV`       | Entorno                                 | `development`                                    |
| `PORT`           | Puerto del servidor                     | `3001`                                           |
| `DATABASE_URL`   | Cadena de conexión PostgreSQL           | `postgresql://user:pass@localhost:5432/webappdb` |
| `REDIS_URL`      | Cadena de conexión Redis                | `redis://localhost:6379`                         |
| `JWT_SECRET`     | Secreto para firmar JWT (mín. 32 chars) | —                                                |
| `JWT_EXPIRES_IN` | Duración del token                      | `7d`                                             |

### `apps/expo-app/.env`

| Variable         | Descripción     | Ejemplo                                      |
| ---------------- | --------------- | -------------------------------------------- |
| `EXPO_PUBLIC_API_URL` | URL del backend | `http://localhost:3001` (o IP de tu máquina) |

### `apps/mcp-server/.env`

| Variable        | Descripción                                  | Ejemplo                 |
| --------------- | -------------------------------------------- | ----------------------- |
| `MCP_TRANSPORT` | `stdio` o `http`                             | `stdio`                 |
| `MCP_HTTP_PORT` | Puerto en modo HTTP                          | `3002`                  |
| `BACKEND_URL`   | URL del backend para el tool `fetch-backend` | `http://localhost:3001` |

---

## Registro del MCP Server en Claude Desktop

Edita `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) o
`%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "web-app": {
      "command": "node",
      "args": ["C:/ruta/absoluta/apps/mcp-server/dist/index.js"],
      "env": {
        "BACKEND_URL": "http://localhost:3001"
      }
    }
  }
}
```

Compilar antes: `cd apps/mcp-server && pnpm build`

---

## Flujo de trabajo con Git

```bash
# Crear rama
git checkout -b feat/mi-feature

# El pre-commit hook ejecuta lint-staged automáticamente
git add .
git commit -m "feat(auth): descripción del cambio"
#                ↑ commitlint valida el formato

git push origin feat/mi-feature
# Abrir Pull Request → CI ejecuta lint, test, build
```

### Formato de commits (Conventional Commits)

```
feat(scope):     nueva funcionalidad
fix(scope):      corrección de bug
docs:            documentación
refactor(scope): refactorización sin cambio de comportamiento
test(scope):     añadir o corregir tests
chore(deps):     actualización de dependencias
ci:              cambios en CI/CD
```
