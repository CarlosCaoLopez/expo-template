<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Security Policy

## Supported versions

| Version | Supported |
| ------- | --------- |
| latest  | ✅        |

## Reporting a vulnerability

**Please do not open a public issue for security vulnerabilities.**

Report security vulnerabilities by emailing: **ignacio.garbayo@rai.usc.es**

Include in your report:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

You will receive a response within **72 hours**. Once confirmed, we will:

1. Work on a fix
2. Release a patch
3. Credit you in the `CHANGELOG.md` (unless you prefer to remain anonymous)

## Security best practices for contributors

- Never commit secrets, API keys or passwords — use `.env` files (excluded via `.gitignore`)
- All `.env.example` files must contain only placeholder values
- Dependencies are audited on every CI run via `pnpm audit`
