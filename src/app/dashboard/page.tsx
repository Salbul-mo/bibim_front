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
		{
			src: "/images/index/coursesample.png",
			courseName: "개발자의 정석",
			courseInfo: "개발자의 기본을 잡습니다.",
		},
		{
			src: "/images/index/courseSample-one.jpg",
			courseName: "자바의 정석",
			courseInfo: "자바의 기본을 잡습니다.",
		},
		{
			src: "/images/index/courseSample-two.jpg",
			courseName: "JavaScript 시작",
			courseInfo: "자바스크립트 시작하기",
		},
		{
			src: "/images/index/courseSample-three.jpg",
			courseName: "React 시작",
			courseInfo: "리액트 시작하기",
		},
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
				<div className="relative w-full bg-gray-700 dark:bg-blue-900 mt-[276px] min-h-[700px]">
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
									skipSnaps: true,
									containScroll: "trimSnaps",
									slidesToScroll: 1,
								}}
								className="w-full max-w-[600px] mx-auto relative group"
							>
								<div className="w-full max-w-[600px] mx-auto relative group overflow-hidden">
									<CarouselContent>
										{carouselItems.map((item, index) => (
											<CarouselItem key={index} className="basis-full">
												<div className="p-1">
													<Card className="border-0 bg-transparent">
														<CardContent className="relative aspect-[16/9] p-0">
															<Image
																src={item.src}
																alt={`강의 샘플 ${index + 1}`}
																fill
																className="object-cover rounded-t-lg"
																priority={index === 0}
															/>
															<div className="absolute bottom-4 right-4 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full text-sm text-gray-800 dark:text-gray-200">
																{index + 1} / {carouselItems.length}
															</div>
														</CardContent>
													</Card>
												</div>
												<div className="p-4 bg-white dark:bg-gray-800 rounded-b-lg mx-1">
													<h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 mb-2">
														{item.courseName}
													</h3>
													<p className="text-gray-600 dark:text-gray-400 text-sm">
														{item.courseInfo}
													</p>
												</div>
											</CarouselItem>
										))}
									</CarouselContent>
								</div>
								<CarouselPrevious className="w-10 h-10 -left-12 opacity-70 hover:opacity-100 bg-white/70 hover:bg-white" />
								<CarouselNext className="w-10 h-10 -right-12 opacity-70 hover:opacity-100 bg-white/70 hover:bg-white" />
							</Carousel>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
