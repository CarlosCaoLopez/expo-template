// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2024 Contributors to web-app

export const UserRole = {
  ADMIN: 'admin',
  USER: 'user',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
