<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Contributing

Thank you for your interest in contributing! This project is free software licensed under the
[GNU Affero General Public License v3.0 or later](LICENSE).

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to contribute](#how-to-contribute)
- [Development setup](#development-setup)
- [Commit conventions](#commit-conventions)
- [Pull request process](#pull-request-process)
- [License headers](#license-headers)

## Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## How to contribute

1. **Report bugs** — open an issue using the
   [bug report template](.github/ISSUE_TEMPLATE/bug_report.md)
2. **Request features** — open an issue using the
   [feature request template](.github/ISSUE_TEMPLATE/feature_request.md)
3. **Submit code** — fork the repo, create a branch, make your changes and open a pull request

## Development setup

### Requirements

- Node.js >= 20
- pnpm >= 9
- Docker & Docker Compose (for local services)

### Steps

```bash
# Clone the repository
git clone https://github.com/your-org/web-app.git
cd web-app

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start local services (DB, Redis)
docker compose up -d db redis

# Start all apps in development mode
pnpm dev
```

## Commit conventions

This project follows [Conventional Commits](https://www.conventionalcommits.org/). Examples:

```
feat(auth): add refresh token rotation
fix(frontend): correct hydration mismatch on login page
docs: update contributing guide
chore(deps): upgrade turbo to v2
```

Allowed types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
`revert`

## Pull request process

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feat/my-feature
   ```
2. Add tests for any new functionality
3. Ensure all checks pass: `pnpm lint && pnpm typecheck && pnpm test`
4. Open a pull request against `main`
5. Fill in the pull request template completely
6. Wait for a review — we aim to respond within 48 hours

## License headers

Every source file **must** include an SPDX license header as the first comment:

```typescript
// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
```

For JSX/TSX files:

```tsx
{
  /* SPDX-License-Identifier: AGPL-3.0-or-later */
}
```

By contributing, you agree that your contributions will be licensed under the same AGPL-3.0-or-later
license that covers this project.
