import { useEffect } from 'react';
import { useAuthStore } from '@/modules/auth/store/auth.store';
import { useCartStore } from '../store/cart.store';
import { cartClient } from '../api/cart.client';

export const useCartSync = () => {
  const user = useAuthStore(state => state.user);
  const tokens = useAuthStore(state => state.tokens); 
  const items = useCartStore(state => state.items);

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !tokens?.accessToken) return;

      try {
        const data = await cartClient.getCart({ accessToken: tokens.accessToken});
      } catch (error) {
        console.error('장바구니 조회 실패:', error);
      }
    };

    fetchCart();
  }, [tokens?.accessToken]);
}; 