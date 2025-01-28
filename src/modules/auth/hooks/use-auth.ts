"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../api/client";
import { useAuthStore } from "../store/auth.store";
import type { Credential } from "@/core/types/auth";

export const useAuth = () => {
  const router = useRouter();
  const { user, isAuthenticated, tokens } = useAuthStore();
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const handleLogin = useCallback(async (credentials: Credential) => {
    try {
      const response = await authClient.login(credentials);
      login(response);
      router.push('/dashboard');
    } catch (error) {
      throw new Error('로그인 실패');
    }
  }, [login, router]);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/login');
  }, [logout, router]);

  return {
    user,
    isAuthenticated,
    tokens,
    login: handleLogin,
    logout: handleLogout
  };
}; 