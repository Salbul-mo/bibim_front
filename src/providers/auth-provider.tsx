"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { usePathname, useRouter } from "next/navigation";

const PUBLIC_PATHS = ["/login", "/signup"];

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const { isAuthenticated } = useAuthStore();
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		const publicPaths = ["/login"];
		if (!publicPaths.includes(pathname) && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, pathname, router]);

	return <>{children}</>;
}
