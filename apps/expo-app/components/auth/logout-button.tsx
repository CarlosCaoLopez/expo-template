// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { useState } from 'react';
import { Alert, ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';

export function LogoutButton() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clear = useAuthStore((state) => state.clear);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleLogout = async () => {
    if (isSigningOut) {
      return;
    }

    setIsSigningOut(true);

    try {
      await apiClient.post('/api/v1/auth/logout', undefined, accessToken ?? undefined);
    } catch {
      // Logout is client driven. If the request fails, we still clear local state.
    } finally {
      clear();
      router.replace('/(auth)/login');
      setIsSigningOut(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => void handleLogout() },
    ]);
  };

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isSigningOut}
      style={({ pressed }) => [
        styles.button,
        pressed && !isSigningOut && styles.pressed,
        isSigningOut && styles.buttonDisabled,
      ]}
      onPress={confirmLogout}
    >
      {isSigningOut ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>Sign out</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    backgroundColor: '#dc2626',
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.85,
  },
});