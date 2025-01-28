"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/modules/cart/store/cart.store";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { CartSheet } from "@/modules/cart/components/cartSheet";

const menuItems = [
	{
		title: "대시보드",
		href: "/dashboard",
	},
	{
		title: "내 강의실",
		href: "/my-courses",
	},
];

export default function Header() {
	const { theme } = useTheme();
	const { user, isAuthenticated, logout } = useAuthStore();
	const cartItems = useCartStore((state) => state.items);

	return (
		<header className="w-full bg-white dark:bg-gray-800 border-b h-16 flex items-center fixed top-0 z-50 shadow-sm">
			<div className="container mx-auto px-4 flex items-center justify-between">
				{/* 로고 */}
				<Link href="/" className="flex items-center gap-2">
					<span className="text-xl font-bold text-primary">EduPlatform</span>
				</Link>

				{/* 우측 메뉴 */}
				<div className="flex items-center gap-6">
					{/* 장바구니 */}
					{isAuthenticated && <CartSheet />}

					{/* 사용자 정보 */}
					<div className="flex items-center gap-4">
						{isAuthenticated ? (
							<>
								<div className="hidden sm:block text-sm text-gray-600 dark:text-gray-300">
									{user?.email}
								</div>
								<Button
									variant="outline"
									size="sm"
									onClick={logout}
									className="hover:bg-gray-50 dark:hover:bg-gray-700"
								>
									로그아웃
								</Button>
							</>
						) : (
							<Link href="/login">
								<Button size="sm" className="bg-primary hover:bg-primary-dark">
									로그인
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
