// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Providers } from '@/components/providers';

export default function RootLayout() {
  return (
    <Providers>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      />
    </Providers>
  );
}
