"use client";

import { useCartStore } from "@/modules/cart/store/cart.store";



export default function CheckoutPage() {

  const { checkoutItems } = useCartStore();


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>주문결제</h1>
      <div>{checkoutItems.map((item) => item.courseName)}</div>
      <div>
        <button>결제하기</button>
      </div>
    </div>
  );
}
