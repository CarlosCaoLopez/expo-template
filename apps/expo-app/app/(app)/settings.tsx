// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { LogoutButton } from '@/components/auth/logout-button';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <Text style={styles.kicker}>Settings</Text>
          <Text style={styles.title}>Manage your account settings.</Text>
          <Text style={styles.subtitle}>Use the sign-out action below to clear the local session.</Text>

          <Pressable
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
            onPress={() => router.back()}
          >
            <Text style={styles.secondaryButtonText}>← Dashboard</Text>
          </Pressable>
          <LogoutButton />
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
  card: {
    borderRadius: 28,
    backgroundColor: '#ffffff',
    padding: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
  },
  kicker: {
    color: '#1d4ed8',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  title: {
    color: '#0f172a',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
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