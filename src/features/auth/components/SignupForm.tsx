"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { SignupFormValues, signupSchema } from "@/features/auth/validations/auth";

import { useRouter } from "next/navigation";

import { useState } from "react";
import Link from "next/link";

// 폼 로직만 포함하는 클라이언트 컴포넌트
export function SignupForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupFormValues>({
		resolver: zodResolver(signupSchema),
	});

	const onSubmit = async (data: SignupFormValues) => {
		try {
			setIsLoading(true);
			// 학원 ID 추가
			// 및 광고 동의 여부 추가
			const student = {
				...data,
				academyId: process.env.NEXT_PUBLIC_ACADEMY_ID as string,
				adsAgreed: data.adsAgreed ? 1 : 0,
			};
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/join`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(student),
			});

			if (response.status !== 200) {
				const errorData = await response.json();
				throw new Error(errorData.message || "회원가입에 실패했습니다");
			}

			router.push("/login?message=회원가입이 완료되었습니다");
		} catch (error) {
			console.error(error);
			alert(error instanceof Error ? error.message : "회원가입에 실패했습니다");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-700 px-4">
			<div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-gray-900 dark:text-white">회원가입</h2>
					<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
						이미 계정이 있으신가요?{" "}
						<Link href="/login" className="text-blue-600 hover:text-blue-500">
							로그인
						</Link>
					</p>
				</div>

				<form
					onSubmit={handleSubmit(onSubmit, (errors) => {
						console.log(errors);
					})}
					className="mt-8 space-y-6"
				>
					<div className="space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								이름
							</label>
							<input
								id="name"
								type="text"
								{...register("studentName")}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
									 text-gray-900 dark:text-white bg-white dark:bg-gray-700
									 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
							{errors.studentName && (
								<p className="mt-1 text-sm text-red-500">{errors.studentName.message}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								이메일
							</label>
							<input
								id="email"
								type="email"
								{...register("studentEmail")}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
									 text-gray-900 dark:text-white bg-white dark:bg-gray-700
									 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
							{errors.studentEmail && (
								<p className="mt-1 text-sm text-red-500">{errors.studentEmail.message}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								비밀번호
							</label>
							<input
								id="password"
								type="password"
								{...register("studentPassword")}
								className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
									 text-gray-900 dark:text-white bg-white dark:bg-gray-700
									 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
							{errors.studentPassword && (
								<p className="mt-1 text-sm text-red-500">{errors.studentPassword.message}</p>
							)}
						</div>

						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-700 dark:text-gray-200"
							>
								핸드폰 번호
							</label>
							<input
								id="phone"
								type="tel"
								{...register("studentPhone")}
								placeholder="010-0000-0000"
								className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
									 text-gray-900 dark:text-white bg-white dark:bg-gray-700
									 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
							/>
							{errors.studentPhone && (
								<p className="mt-1 text-sm text-red-500">{errors.studentPhone.message}</p>
							)}
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="ads"
								value="1"
								{...register("adsAgreed")}
								className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
							/>
							<label htmlFor="ads" className="text-sm text-gray-700 dark:text-gray-200">
								광고 및 마케팅 수신 동의 (선택)
							</label>
						</div>
					</div>

					<button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
                  bg-slate-300 dark:bg-slate-700 text-gray-900 dark:text-white 
								  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
								  disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? "처리중..." : "회원가입"}
					</button>
				</form>
			</div>
		</div>
	);
}
