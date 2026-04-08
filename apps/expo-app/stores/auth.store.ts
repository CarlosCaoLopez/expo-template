// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
      clear: () => set({ accessToken: null }),
    }),
    {
      name: 'expo-app-auth',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);