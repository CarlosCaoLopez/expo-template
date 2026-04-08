// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ApiError, apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';

export function LoginForm() {
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await apiClient.post<{ accessToken: string }>('/api/v1/auth/login', {
        email,
        password,
      });

      setAccessToken(response.accessToken);
      router.replace('/(app)/dashboard');
    } catch (error) {
      console.error('Login request failed', error);

      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Unable to sign in right now. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputRow}>
          <TextInput
            autoCapitalize="none"
            autoComplete="password"
            placeholder="Your password"
            placeholderTextColor="#94a3b8"
            secureTextEntry={!showPassword}
            style={[styles.input, styles.inputFlex]}
            value={password}
            onChangeText={setPassword}
          />
          <Pressable style={styles.eyeButton} onPress={() => setShowPassword((v) => !v)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#64748b" />
          </Pressable>
        </View>
      </View>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      <Pressable
        accessibilityRole="button"
        disabled={isSubmitting}
        style={({ pressed }) => [
          styles.submitButton,
          pressed && !isSubmitting && styles.pressed,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        onPress={() => void handleSubmit()}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text style={styles.submitButtonText}>Sign in</Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 16,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    color: '#0f172a',
    fontSize: 14,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
  },
  inputFlex: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 16,
  },
  eyeButton: {
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  submitButton: {
    marginTop: 4,
    borderRadius: 16,
    backgroundColor: '#0f172a',
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.85,
  },
});