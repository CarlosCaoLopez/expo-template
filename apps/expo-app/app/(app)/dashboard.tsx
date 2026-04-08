// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { router } from 'expo-router';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/hooks/use-auth';
import { LogoutButton } from '@/components/auth/logout-button';

export default function DashboardScreen() {
  const { user } = useAuth();
  const displayName = user?.name ?? 'user';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.kicker}>Dashboard</Text>
          <Text style={styles.title}>Welcome back, {displayName}</Text>
          <Text style={styles.subtitle}>This is your protected mobile workspace.</Text>

          <View style={styles.userCard}>
            <Text style={styles.userLabel}>Signed in as</Text>
            <Text style={styles.userValue}>{user?.email ?? 'unknown user'}</Text>
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
              onPress={() => router.push('/(app)/settings')}
            >
              <Text style={styles.secondaryButtonText}>Settings</Text>
            </Pressable>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  heroCard: {
    borderRadius: 28,
    backgroundColor: '#0f172a',
    padding: 24,
    gap: 14,
  },
  kicker: {
    color: '#93c5fd',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#f8fafc',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 15,
    lineHeight: 22,
  },
  userCard: {
    borderRadius: 20,
    backgroundColor: '#1e293b',
    padding: 16,
    gap: 6,
  },
  userLabel: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  userValue: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  actionRow: {
    marginTop: 4,
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.85,
  },
});