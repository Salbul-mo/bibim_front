"use client";

import {
	Carousel,
	CarouselItem,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function DashboardPage() {
	const carouselItems = [
		"/images/index/coursesample.png",
		"/images/index/courseSample-one.jpg",
		"/images/index/courseSample-two.jpg",
		"/images/index/courseSample-three.jpg",
	];

	return (
		<div>
			{/* 메인 컨텐츠 */}
			<div className="relative mt-20 flex flex-col items-center justify-center">
				<div className="relative z-20">
					<h1 className="pt-24 text-center text-5xl font-semibold  text-text dark:text-dark-text bg-background dark:bg-dark-background-foreground sm:text-5xl md:text-6xl">
						Clone Startups.
						<br />
						<span className="mt-3 block">Learn to code.</span>
					</h1>
					<div>
						<p className="mb-5 mt-10 text-center text-xl text-text dark:text-dark-text lg:mb-10 lg:mt-6">
							코딩은 진짜를 만들어보는거야!
							<br />
							실제 서비스를 따라 만들면서 코딩을 배우세요.
						</p>
						<div className="flex w-full justify-center">
							<Link
								className="inline-flex items-center z-10 justify-center rounded-md border-2 border-neutral-200 dark:border-neutral-700 bg-transparent px-5 py-3 text-base leading-6 text-primary-foreground dark:text-dark-text transition duration-150 ease-in-out bg-gray-200 dark:bg-gray-700 hover:bg-gray-200 dark:bg-primary-700 dark:hover:bg-primary-800 focus:outline-none focus:ring md:px-6 md:text-lg"
								href="/join"
							>
								시작하기 →
							</Link>
						</div>
					</div>
				</div>

				{/*  배경 선 */}
				<div
					className="bg-gray-700 py-24 my-20 shadow-inner dark:bg-blue-900 rotate-[-9deg] overflow-hidden"
					style={{
						width: 3000,
						height: 400,
						position: "absolute",
						top: 400,
						left: -247,
						zIndex: -10,
					}}
				></div>

				{/* 전체 너비 컨테이너 */}
				<div className="relative w-full bg-gray-700 dark:bg-blue-900 mt-[276px]">
					{/* 내부 컨텐츠 중앙 정렬 컨테이너 */}
					<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
						<div className="pb-20 pt-10 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-24">
							<h2 className="text-2xl font-bold text-center text-gray-200 dark:text-gray-300 mb-8">
								개설된 강의
							</h2>
							<Carousel
								opts={{
									align: "center",
									loop: true,
									skipSnaps: false,
									containScroll: false,
								}}
								className="w-full max-w-[500px] mx-auto relative group overflow-hidden"
							>
								<CarouselContent>
									{carouselItems.map((item, index) => (
										<CarouselItem key={index} className="basis-full">
											<div className="p-1">
												<Card className="border-0 bg-transparent">
													<CardContent className="relative aspect-square p-0">
														<Image
															src={item}
															alt={`강의 샘플 ${index + 1}`}
															fill
															className="object-cover rounded-lg"
															priority={index === 0}
														/>
													</CardContent>
												</Card>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>
							</Carousel>
							<CarouselPrevious className="w-10 h-10 -left-12 opacity-70 hover:opacity-100 bg-white/70 hover:bg-white" />
							<CarouselNext className="w-10 h-10 -right-12 opacity-70 hover:opacity-100 bg-white/70 hover:bg-white" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
