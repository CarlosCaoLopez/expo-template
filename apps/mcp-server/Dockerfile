# SPDX-License-Identifier: AGPL-3.0-or-later
FROM node:20-alpine AS deps
RUN corepack enable && corepack prepare pnpm@9 --activate
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./
COPY packages/types/package.json ./packages/types/
COPY apps/mcp-server/package.json ./apps/mcp-server/

RUN pnpm install --frozen-lockfile --filter @expo-app/mcp-server...

FROM deps AS build
COPY tsconfig.base.json ./
COPY packages/ ./packages/
COPY apps/mcp-server/ ./apps/mcp-server/

RUN pnpm --filter @expo-app/mcp-server build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/apps/mcp-server/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/apps/mcp-server/package.json ./

EXPOSE 3002
CMD ["node", "dist/index.js"]
