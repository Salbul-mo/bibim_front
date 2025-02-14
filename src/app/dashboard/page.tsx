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
		"/images/index/courseSample1.jpg",
		"/images/index/courseSample2.jpg",
		"/images/index/courseSample3.jpg",
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

				<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
					<Carousel className="w-full max-w-4xl mx-auto">
						<CarouselContent className="-ml-2 md:-ml-4">
							{carouselItems.map((item, index) => (
								<CarouselItem
									key={index}
									className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
								>
									<div className="relative aspect-[4/3]">
										<Card className="border-0">
											<CardContent className="p-0">
												<Image
													src={item}
													alt={`강의 샘플 ${index + 1}`}
													fill
													sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
													className="object-cover rounded-lg"
													priority={index === 0}
												/>
											</CardContent>
										</Card>
									</div>
								</CarouselItem>
							))}
						</CarouselContent>
						<div className="flex items-center justify-center gap-2 mt-4">
							<CarouselPrevious className="static translate-x-0" />
							<CarouselNext className="static translate-x-0" />
						</div>
					</Carousel>
				</div>
			</div>
		</div>
	);
}
