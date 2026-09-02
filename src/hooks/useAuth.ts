'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types';
import { getAuthCookie, removeAuthCookie } from '@/utils/cookie';

interface UseAuthOptions {
  redirectTo?: string;
  redirectIfFound?: boolean;
}

/**
 * useAuth Hook
 * Used exclusively on protected/admin views.
 * Reads authentication status from cookies.
 * Public routes do not call this hook and remain completely unauthenticated.
 */
export function useAuth(options?: UseAuthOptions) {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = getAuthCookie();
      if (stored) {
        const parsed: IUser = JSON.parse(stored);
        setUser(parsed);

        if (options?.redirectIfFound && options?.redirectTo) {
          router.replace(options.redirectTo);
        }
      } else {
        setUser(null);
        if (!options?.redirectIfFound && options?.redirectTo) {
          router.replace(options.redirectTo);
        }
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [options?.redirectTo, options?.redirectIfFound, router]);

  const logout = () => {
    try {
      removeAuthCookie();
      setUser(null);
    } catch {}
  };

  return {
    user,
    loading,
    isLoggedIn: !!user,
    logout,
  };
}
