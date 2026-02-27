// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app
import { z } from 'zod';

// ── Shared environment schema (subset common to all apps) ─────────────────────

export const sharedEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// ── Constants ─────────────────────────────────────────────────────────────────

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 20,
  MAX_LIMIT: 100,
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// ── Zod helpers ───────────────────────────────────────────────────────────────

export const zodId = () => z.string().uuid();
export const zodEmail = () => z.string().email().toLowerCase();
export const zodPassword = () => z.string().min(8).max(128);
export const zodPagination = () =>
  z.object({
    page: z.coerce.number().int().positive().default(PAGINATION_DEFAULTS.PAGE),
    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(PAGINATION_DEFAULTS.MAX_LIMIT)
      .default(PAGINATION_DEFAULTS.LIMIT),
  });
