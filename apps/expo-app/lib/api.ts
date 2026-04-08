// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Platform } from 'react-native';

const DEFAULT_API_URL = 'http://localhost:3001';

type JsonValue = Record<string, unknown> | Array<unknown> | string | number | boolean | null;

type ApiEnvelope<T> = {
  data: T;
};

export class ApiError extends Error {
  readonly status: number;

  readonly details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

function getBaseUrl(): string {
  const baseUrl = (process.env.EXPO_PUBLIC_API_URL ?? DEFAULT_API_URL).replace(/\/$/, '');

  if (Platform.OS === 'android') {
    return baseUrl.replace(/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, 'http://10.0.2.2$2');
  }

  return baseUrl;
}

function buildUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  let payload: unknown = text;

  try {
    payload = JSON.parse(text) as JsonValue;
  } catch {
    payload = text;
  }

  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  accessToken?: string,
): Promise<T> {
  const headers = new Headers(init.headers);
  headers.set('Accept', 'application/json');

  if (init.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const url = buildUrl(path);

  let response: Response;

  try {
    response = await fetch(url, {
      ...init,
      headers,
    });
  } catch (error) {
    const reason = error instanceof Error ? error.message : 'Unknown network error';
    throw new ApiError(`Unable to reach ${url}. ${reason}`, 0, error);
  }

  if (!response.ok) {
    const errorPayload = await parseResponse<{ message?: string }>(response).catch(() => null);
    const message =
      typeof errorPayload?.message === 'string'
        ? errorPayload.message
        : Array.isArray(errorPayload?.message)
          ? errorPayload.message.join(', ')
          : response.statusText ?? 'Request failed';
    throw new ApiError(message, response.status, errorPayload);
  }

  return parseResponse<T>(response);
}

export const apiClient = {
  get<T>(path: string, accessToken?: string): Promise<T> {
    return apiFetch<T>(path, { method: 'GET' }, accessToken);
  },
  post<T>(path: string, body?: JsonValue, accessToken?: string): Promise<T> {
    return apiFetch<T>(
      path,
      {
        method: 'POST',
        body: body === undefined ? undefined : JSON.stringify(body),
      },
      accessToken,
    );
  },
  patch<T>(path: string, body?: JsonValue, accessToken?: string): Promise<T> {
    return apiFetch<T>(
      path,
      {
        method: 'PATCH',
        body: body === undefined ? undefined : JSON.stringify(body),
      },
      accessToken,
    );
  },
  delete<T>(path: string, accessToken?: string): Promise<T> {
    return apiFetch<T>(path, { method: 'DELETE' }, accessToken);
  },
};