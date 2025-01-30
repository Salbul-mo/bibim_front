import { CartItem } from '../store/cart.store';
import apiClient from '@/lib/api-client';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const cartClient = {
  // 장바구니 조회
  getCart: async (tokens: { accessToken: string }) => {
    const response = await apiClient.get(`${API_BASE_URL}/cart/list`, {
      headers: { Authorization: `${tokens?.accessToken}`,
      },
    });
    return response.data;
  },

  // 장바구니에 상품 추가
  addToCart: async (token: string, item: Omit<CartItem, 'cartId'>) => {
    const response = await apiClient.delete(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`,
      },
      data: item,
    });
    return response.data;
  },

  // 장바구니에서 상품 제거
  removeFromCart: async (tokens: { accessToken: string, refreshToken: string }, cartId: string) => {
    const response = await apiClient.delete(`${API_BASE_URL}/cart/${cartId}`, {
      headers: {
        Authorization: `${tokens.accessToken}`,
      },
    });
    return response.data;
  },

  // 장바구니 비우기
  clearCart: async (token: string) => {
    const response = await apiClient.delete(`${API_BASE_URL}/cart`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response.data;
  },
}; 