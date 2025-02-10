import { Credential } from "@/core/types/auth";
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
    // 클라이언트 사이드에서는 쿠키를 직접 설정할 수 없으므로 서버 응답에 의존
    const cookies = response.headers.get('set-cookie');
    if (cookies) {
      document.cookie = `refreshToken=; path=/; domain=.bibimfront.vercel.app; expires=Thu,`;
    }



    return response.json();
  }
};