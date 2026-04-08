// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { Link } from 'expo-router';
import { KeyboardAvoidingView, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LoginForm } from '@/components/auth/login-form';

export default function LoginScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.headerRow}>
          <Link href="/" asChild>
            <Pressable style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}>
              <Text style={styles.backButtonText}>← Back</Text>
            </Pressable>
          </Link>
        </View>

        <View style={styles.hero}>
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>Enter your credentials to continue.</Text>
        </View>

        <LoginForm />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Need an account?</Text>
          <Link href="/(auth)/register" style={styles.footerLink}>
            Create one
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 18,
    justifyContent: 'center',
  },
  headerRow: {
    alignItems: 'flex-start',
  },
  backButton: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#e2e8f0',
  },
  backButtonText: {
    color: '#0f172a',
    fontWeight: '700',
  },
  hero: {
    gap: 8,
  },
  title: {
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    justifyContent: 'center',
  },
  footerText: {
    color: '#475569',
  },
  footerLink: {
    color: '#1d4ed8',
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.85,
  },
});