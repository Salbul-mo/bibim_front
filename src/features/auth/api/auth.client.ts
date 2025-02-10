"use server";
import { Credential } from "@/core/types/auth";
import { cookies } from "next/headers";
const handleApiError = (error: unknown) => {
  if (error instanceof Error) throw error;
  throw new Error('Unknown API error occurred');
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'API 요청 실패');
  }
  return response.json();
};

export const authClient = {
  login: async (credentials: Credential) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });


    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '로그인 실패');
    }

    return response.json();
    },

  logout: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
        'Authorization': `${token}`
       },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || '로그아웃 실패');
    }

    cookies().delete("refreshToken");



    return response.json();
  }
};