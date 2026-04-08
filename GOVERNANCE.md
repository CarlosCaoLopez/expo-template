<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->

# Governance

This document describes how **web-app** is governed: who makes decisions, how conflicts are
resolved, and how new maintainers are added.

---

## Maintainers

| Name            | GitHub                                   | Email                              |
| --------------- | ---------------------------------------- | ---------------------------------- |
| Ignacio Garbayo | [@igarbayo](https://github.com/igarbayo) | ignacio.garbayo@rai.usc.es         |
| Carlos Cao      | @carlos-cao-placeholder                  | carlos.cao@placeholder.example     |
| Yago Falgueras  | @yago-falgueras-placeholder              | yago.falgueras@placeholder.example |
| Anton Gomez     | @anton-gomez-placeholder                 | anton.gomez@placeholder.example    |

All maintainers have equal voting rights.

---

## Decision making

### Day-to-day decisions

Any single maintainer may act alone on routine matters: merging a straightforward pull request,
closing a stale issue, cutting a patch release, or updating documentation.

### Significant decisions

Decisions that affect the project in a non-trivial way require the agreement of **at least 2
maintainers**. Examples:

- Adding or removing a dependency
- Changing the license or SPDX identifiers
- Introducing or removing a public API endpoint
- Releasing a new minor or major version
- Changing the CI/CD pipeline in a meaningful way
- Modifying this governance document

Significant decisions are discussed in a GitHub issue or pull request before being acted on. The
discussion must remain open for at least **48 hours** to give all maintainers time to respond.

### Conflict resolution

If two maintainers disagree and cannot reach consensus, the decision is put to a **simple majority
vote** of all maintainers. In the event of a tie, the decision is deferred for one week to allow
further discussion; if the tie persists, the status quo is maintained.

---

## Adding new maintainers

A new maintainer may be added by **unanimous agreement** of the current maintainers. The process is:

1. Any maintainer nominates a contributor via a private message to all current maintainers.
2. All maintainers respond within two weeks.
3. If all agree, the new maintainer is invited and this document is updated in a pull request.

There is no fixed threshold of contributions required — sustained, high-quality involvement and
alignment with the project's values are the deciding factors.

---

## Removing maintainers

A maintainer may step down at any time by notifying the others and opening a pull request to update
this document. A maintainer who has been inactive for more than **six months** without prior notice
may be removed by agreement of the remaining maintainers.

---

## Code of Conduct enforcement

Enforcement of the [Code of Conduct](CODE_OF_CONDUCT.md) follows the same simple-majority rule as
conflict resolution above. Reports are handled privately; see the Code of Conduct for details.
