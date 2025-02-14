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

				{/* 전체 너비 컨테이너 */}
				<div className="relative w-full bg-gray-700 dark:bg-blue-900 mt-[276px]">
					<h6 className="text-center text-2xl font-bold text-text dark:text-dark-text">
						개설된 강의
					</h6>
					{/* 내부 컨텐츠 중앙 정렬 컨테이너 */}
					<div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
						<div className="pb-20 pt-10 sm:pt-8 md:pt-12 lg:pt-16 xl:pt-24">
							<Carousel>
								<CarouselContent>
									{carouselItems.map((item) => (
										<CarouselItem key={item}>
											<div className="relative w-full h-64 md:h-96">
												<Image
													src={item}
													alt="과정 샘플"
													fill
													sizes="(max-width: 768px) 100vw, 50vw"
													className="object-cover rounded-lg"
												/>
											</div>
										</CarouselItem>
									))}
								</CarouselContent>

								{/* 네비게이션 버튼 */}
								<div className="flex justify-center gap-2 mt-4">
									<CarouselPrevious className="static translate-x-0" />
									<CarouselNext className="static translate-x-0" />
								</div>
							</Carousel>
						</div>
					</div>
				</div>

				{/* 리뷰 */}
			</div>
		</div>
	);
}
