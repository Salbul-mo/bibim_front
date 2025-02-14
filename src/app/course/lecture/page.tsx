import { Suspense } from "react";
import LecturePlayer from "@/features/course/components/lecturePlayer";

export default function LecturePage() {
	return (
		<Suspense fallback={<div>강의 로딩 중...</div>}>
			<LecturePlayer />
		</Suspense>
	);
}
