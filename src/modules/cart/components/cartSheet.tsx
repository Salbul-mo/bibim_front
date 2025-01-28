"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { useEffect } from "react";
import { CartItemList } from "../components/CartItemList";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cartClient } from "../api/cart.client";
import { useCartStore } from "../store/cart.store";
import { Skeleton } from "@/components/ui/skeleton";

export function CartSheet() {
	const { user, tokens, isAuthenticated } = useAuthStore();
	const { items, isLoading, totalCount, totalPrice, setCart } = useCartStore();

	useEffect(() => {
		if (!isAuthenticated || !tokens) return;

		const fetchCart = async () => {
			try {
				const data = await cartClient.getCart({
					accessToken: tokens?.accessToken || "",
				});
				setCart(data);
			} catch (error) {
				console.error("장바구니 조회 실패:", error);
			}
		};

		fetchCart();
	}, [isAuthenticated, tokens]);

	if (!isAuthenticated) return null;

	return (
		<Sheet>
			<SheetTrigger
				onClick={() =>
					cartClient.getCart({
						accessToken: tokens?.accessToken || "",
					})
				}
			>
				<Button variant="outline" size="icon" className="relative">
					<ShoppingCart className="h-4 w-4" />
					<span className="sr-only">장바구니 열기</span>
				</Button>
			</SheetTrigger>
			<SheetContent
				side="right"
				className="w-full sm:w-[400px] !right-0 z-[60] h-full flex flex-col"
				onInteractOutside={(e) => e.preventDefault()}
			>
				<SheetHeader className="border-b p-4">
					<SheetTitle className="text-xl">{user?.email}님의 장바구니</SheetTitle>
					<SheetDescription className="text-sm">
						총 {totalCount}개 상품이 담겨있습니다
					</SheetDescription>
				</SheetHeader>

				<div className="flex-1 overflow-y-auto p-4">
					{isLoading ? (
						<LoadingSpinner />
					) : totalCount === 0 ? (
						<div className="space-y-4 text-center">
							<ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
							<p className="text-muted-foreground">장바구니가 비어있습니다</p>
						</div>
					) : (
						<CartItemList items={items} />
					)}
				</div>

				<SheetFooter className="border-t p-4">
					<div className="flex justify-between w-full mb-4">
						<span>총 수량:</span>
						<span className="font-medium">{totalCount}개</span>
					</div>
					<div className="flex justify-between w-full">
						<span>총 금액:</span>
						{isLoading ? (
							<Skeleton className="h-6 w-32" />
						) : (
							<span className="font-bold text-primary">₩{(totalPrice ?? 0).toLocaleString()}</span>
						)}
					</div>
					<Button className="w-full mt-4">결제하기</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
