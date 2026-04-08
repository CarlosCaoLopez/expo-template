// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Stack } from 'expo-router';

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#f8fafc' } }} />;
}