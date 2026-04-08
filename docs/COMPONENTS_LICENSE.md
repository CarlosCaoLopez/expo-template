<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Components License

This document explains the licensing of **web-app** and its dependencies. It is intended for users,
contributors, and anyone evaluating whether they can use, modify, or redistribute this software.

---

## Project license

**web-app** is licensed under the
[GNU Affero General Public License v3.0 or later](../LICENSES/AGPL-3.0-or-later.txt)
(`AGPL-3.0-or-later`).

### Why AGPL-3.0?

We chose AGPL-3.0 because this project provides a web application accessed over a network. Standard
GPL v3 would allow a company to run a modified version of the software on a server without ever
publishing their changes — the so-called "SaaS loophole". AGPL closes that loophole: any user who
interacts with the software over a network is entitled to receive the corresponding source code.

This choice reflects our commitment to keeping the software free for everyone, not just those who
run it locally.

**Important:** AGPL-3.0 software carries **no warranty**. See section 15 of the license for the full
disclaimer.

---

## REUSE compliance

All source files carry SPDX license headers. Remaining files are covered by
[`REUSE.toml`](../REUSE.toml). The project targets **REUSE Specification v3.3**.

---

## Third-party dependencies

The tables below list the main runtime and build-time dependencies grouped by workspace. All
licenses listed are OSI-approved. The full dependency tree can be inspected with:

```bash
pnpm licenses list
```

### Backend (`apps/backend`)

| Package            | License    | Notes                |
| ------------------ | ---------- | -------------------- |
| `@nestjs/core`     | MIT        | NestJS framework     |
| `@nestjs/passport` | MIT        | Passport integration |
| `@prisma/client`   | Apache-2.0 | ORM runtime client   |
| `passport-jwt`     | MIT        | JWT strategy         |
| `bcrypt`           | MIT        | Password hashing     |
| `@nestjs/swagger`  | MIT        | OpenAPI / Swagger    |

### Expo App (`apps/expo-app`)

| Package                     | License | Notes                  |
| --------------------------- | ------- | ---------------------- |
| `expo`                      | MIT     | Expo framework         |
| `expo-router`               | MIT     | File-based routing     |
| `react-native`              | MIT     | Mobile UI framework    |
| `@tanstack/react-query`     | MIT     | Server state           |
| `zustand`                   | MIT     | Client state           |
| `@react-navigation/native`  | MIT     | Navigation             |
| `react-native-reanimated`   | MIT     | Animations             |

### MCP Server (`apps/mcp-server`)

| Package                     | License | Notes   |
| --------------------------- | ------- | ------- |
| `@modelcontextprotocol/sdk` | MIT     | MCP SDK |

### Shared packages

| Package      | License    | Notes               |
| ------------ | ---------- | ------------------- |
| `zod`        | MIT        | Schema validation   |
| `typescript` | Apache-2.0 | Build-time only     |
| `turbo`      | MIT        | Build orchestration |
| `eslint`     | MIT        | Build-time only     |
| `prettier`   | MIT        | Build-time only     |

---

## License compatibility

All third-party dependencies use permissive licenses (MIT, ISC, Apache-2.0) that are compatible with
AGPL-3.0. Permissive-licensed code can be incorporated into AGPL-3.0 works without conflict.

If you add a new dependency, verify its license before merging. Licenses that are **not compatible**
with AGPL-3.0 include GPL-2.0-only (without the "or later" clause) and any proprietary license.

---

## Assets and documentation

All documentation (`.md` files) and configuration files are covered by AGPL-3.0 unless otherwise
noted in [`REUSE.toml`](../REUSE.toml).
