// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Link, Redirect } from 'expo-router';
import { ActivityIndicator, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/hooks/use-auth';

export default function Index() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroCard}>
          <View style={styles.brandPill}>
            <Text style={styles.brandPillText}>expo-app</Text>
          </View>
          <Text style={styles.title}>expo-app</Text>
          <Text style={styles.subtitle}>NestJS · Expo · MCP — AGPL-3.0</Text>
          <Text style={styles.description}>
            A mobile starter with authentication, shared API helpers, and a clean Expo Router
            flow.
          </Text>

          <View style={styles.actions}>
            <Link href="/(auth)/login" asChild>
              <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressed]}>
                <Text style={styles.primaryButtonText}>Sign in</Text>
              </Pressable>
            </Link>

            <Link href="/(auth)/register" asChild>
              <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}>
                <Text style={styles.secondaryButtonText}>Register</Text>
              </Pressable>
            </Link>
          </View>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureLabel}>What is included</Text>
          <Text style={styles.featureText}>Auth screens, protected routes, React Query, Zustand.</Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 18,
    justifyContent: 'center',
  },
  heroCard: {
    borderRadius: 28,
    backgroundColor: '#ffffff',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
  },
  brandPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  brandPillText: {
    color: '#075985',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  title: {
    color: '#0f172a',
    fontSize: 38,
    lineHeight: 42,
    fontWeight: '800',
  },
  subtitle: {
    color: '#334155',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    marginTop: 6,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#e2e8f0',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
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
  featureCard: {
    borderRadius: 24,
    backgroundColor: '#dbeafe',
    padding: 20,
    gap: 8,
  },
  featureLabel: {
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  featureText: {
    color: '#1e293b',
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
  },
});
