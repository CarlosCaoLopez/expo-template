// SPDX-License-Identifier: AGPL-3.0-or-later
// Copyright (C) 2026 Contributors to expo-template

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApiError, apiClient } from '@/lib/api';
import { useAuthStore } from '@/stores/auth.store';

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export function useAuth(): {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
} {
  const accessToken = useAuthStore((state) => state.accessToken);
  const clear = useAuthStore((state) => state.clear);
  const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    if (isHydrated) {
      return undefined;
    }

    setIsHydrated(useAuthStore.persist.hasHydrated());

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    return unsubscribe;
  }, [isHydrated]);

  const meQuery = useQuery({
    queryKey: ['auth', 'me', accessToken],
    queryFn: () => apiClient.post<User>('/api/v1/auth/me', undefined, accessToken ?? undefined),
    enabled: isHydrated && Boolean(accessToken),
    retry: false,
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (meQuery.error instanceof ApiError && meQuery.error.status === 401) {
      clear();
    }
  }, [clear, meQuery.error]);

  return {
    user: meQuery.data ?? null,
    isAuthenticated: isHydrated && Boolean(accessToken),
    isLoading: !isHydrated || (Boolean(accessToken) && meQuery.isLoading),
  };
}