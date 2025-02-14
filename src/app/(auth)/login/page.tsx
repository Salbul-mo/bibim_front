"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/features/auth/validations/auth";
import { toast } from "sonner";
import { authClient } from "@/features/auth/api/auth.client";
import { useAuthStore } from "@/features/auth/store/auth.store";
import Cookies from "js-cookie";
import type { z } from "zod";
import { Suspense, useEffect } from "react";
import Image from "next/image";

type FormValues = z.infer<typeof loginSchema>;

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { login: storeLogin } = useAuthStore();

	const message = searchParams.get("message");
	const form = useForm<FormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
			academyId: process.env.NEXT_PUBLIC_ACADEMY_ID,
		},
	});

	const onSubmit = async (data: FormValues) => {
		try {
			const response = await authClient.login(data);

			// 리프레시 토큰만 쿠키에 저장
			Cookies.set("refreshToken", response.refreshToken, {
				path: "/",
				secure: process.env.NODE_ENV === "production",
				sameSite: "none",
				expires: 7,
				domain: process.env.NODE_ENV === "production" ? ".bibimfront.vercel.app" : "localhost",
			});

			storeLogin(response);
			router.push("/dashboard");
		} catch (error) {
			toast.error("로그인 실패");
			console.error(error);
		}
	};

	useEffect(() => {
		if (message) {
			toast.success(message);
		}
	}, []);

	return (
		<div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background dark:bg-dark-background">
			<div className="w-full max-w-md p-8 bg-background dark:bg-dark-background-foreground rounded-lg shadow-lg space-y-6">
				<div className="text-center mb-8">
					<div className="flex justify-center mb-6">
						<Image
							src="/images/logo_black.jpg"
							alt="Logo"
							width={150}
							height={150}
							className="dark:hidden"
						/>
						<Image
							src="/images/logo_gray.png"
							alt="Logo"
							width={150}
							height={150}
							className="hidden dark:block"
						/>
					</div>
					<h1 className="text-2xl font-bold text-text dark:text-dark-text">로그인</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">계정에 로그인하세요</p>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700 dark:text-gray-300">이메일</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="이메일을 입력하세요"
											className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-gray-700 dark:text-gray-300">비밀번호</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="password"
											placeholder="비밀번호를 입력하세요"
											className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							className="w-full bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:hover:bg-primary/90"
							disabled={form.formState.isSubmitting}
						>
							{form.formState.isSubmitting ? "처리 중..." : "로그인"}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<LoginForm />
		</Suspense>
	);
}
