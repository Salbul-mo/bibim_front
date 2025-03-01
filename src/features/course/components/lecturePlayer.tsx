"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ClassList from "@/features/course/components/classList";
import Video from "@/features/course/components/video";

// 클라이언트 컴포넌트로 분리
export default function LecturePlayer() {
	const searchParams = useSearchParams();
	const courseId = searchParams.get("courseId");
	const [classId, setClassId] = useState("");
	const [videoPath, setVideoPath] = useState("");

	const setDisplayVideoPath = (classId: string) => {
		setClassId(classId);
	};

	return (
		<div className="min-h-[calc(100vh-4rem)] pt-12 bg-background dark:bg-dark-background">
			<main className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
				{/* 강의 리스트 */}
				<aside className="lg:w-1/3 bg-background dark:bg-dark-background-foreground rounded-lg shadow-lg p-4 lg:h-screen overflow-hidden h-full">
					<ClassList
						courseId={courseId || ""}
						videoPath={videoPath}
						setVideoPath={setVideoPath}
						setDisplayVideoPath={setDisplayVideoPath}
					/>
				</aside>

				{/* 비디오 재생 영역 */}
				<section className="lg:w-2/3 bg-background dark:bg-dark-background-foreground rounded-lg shadow-lg p-4 h-fit">
					<Video classId={classId} />
				</section>
			</main>
			<p className="text-text dark:text-dark-text">현재 강의 ID: {courseId}</p>
		</div>
	);
}
