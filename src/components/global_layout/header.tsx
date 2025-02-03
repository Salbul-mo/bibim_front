"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/features/auth/api/auth.client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { CartSheet } from "@/features/cart/components/cartSheet";
import { useCartStore } from "@/features/cart/store/cart.store";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Header() {
	const { theme } = useTheme();
	const { user, isAuthenticated, logout, tokens } = useAuthStore();
	const { logout: logoutApi } = authClient;

	const handleLogout = async () => {
		try {
			const token = tokens?.accessToken;
			if (token) {
				await logoutApi(token);
				await logout();
			}
		} catch (error) {
			console.error(error);
		} finally {
			logout();
		}
	};

	return (
		<header className="w-full bg-white dark:bg-gray-800 border-b h-16 flex items-center fixed top-0 z-50 shadow-sm">
			<div className="container mx-auto px-4 flex items-center justify-between">
				{/* 로고 */}
				<Link href="/" className="flex items-center gap-2">
					<span className="text-xl font-bold text-primary">EduPlatform</span>
				</Link>

				<Link href="/course/list">
					<Button asChild>
						<span>강의 목록</span>
					</Button>
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
									{user?.email} 님
								</div>
								<Button
									asChild
									variant="outline"
									size="sm"
									onClick={handleLogout}
									className="hover:bg-gray-50 dark:hover:bg-gray-700"
								>
									로그아웃
								</Button>
							</>
						) : (
							<Link href="/login">로그인</Link>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
