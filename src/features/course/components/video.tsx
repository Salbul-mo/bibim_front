import { useAuthStore } from "@/features/auth/store/auth.store";
import { courseClient } from "../api/course.client";
import { useState, useEffect, useRef } from "react";

type VideoProps = {
	classId: string;
};

type ClassDetail = {
	classContent: string;
	classFileId: string;
	classFileOriginName: string;
	classFilePath: string;
	classFileSize: number;
	classFileType: string; // TODO 확인 필요
	classId: string;
	className: string;
	classSeq: number;
	classType: string; // TODO 확인 필요
};

export default function Video({ classId }: VideoProps) {
	const videoRef = useRef<HTMLVideoElement>(null); // 비디오 엘리먼트 참조
	const playerRef = useRef<any>(null); // shaka-player 인스턴스를 저장할 ref
	const [classDetail, setClassDetail] = useState<ClassDetail | null>(null); // 강의 상세 정보 상태
	const { tokens } = useAuthStore();
	const { getClassDetail } = courseClient;

	useEffect(() => {
		async function fetchClassDetailAndLoadVideo() {
			if (!tokens?.accessToken || !classId) return;

			try {
				const data = await getClassDetail(tokens.accessToken, classId);
				if (data && data.classDetail) {
					// S3 URL을 CloudFront URL로 변경
					const cloudFrontUrl = data.classDetail.classFilePath.replace(
						"https://s3.ap-northeast-2.amazonaws.com/jabibimbucket/",
						"https://dj9htmn55yij5.cloudfront.net/"
					);

					// 수정된 URL로 classDetail 업데이트
					setClassDetail({
						...data.classDetail,
						classFilePath: cloudFrontUrl,
					});

					const { default: shaka } = await import("shaka-player");
					if (!shaka.Player.isBrowserSupported()) {
						console.error("지원되지 않는 브라우저입니다.");
						return;
					}

					let player = playerRef.current;
					if (!player) {
						player = new shaka.Player(videoRef.current);
						playerRef.current = player;
						player.addEventListener("error", (event: any) => {
							console.error("Shaka Player Error", event.detail);
						});
					}

					// 수정된 URL로 비디오 로드
					await player.load(cloudFrontUrl);
					console.log("The video has been loaded successfully!");
				}
			} catch (error) {
				console.error("Error fetching class detail or loading video", error);
			}
		}

		fetchClassDetailAndLoadVideo();
	}, [classId]);

	return (
		<div className="h-fit">
			<div className="">
				{/* 비디오 영역 */}
				<video
					ref={videoRef}
					crossOrigin="anonymous"
					controls
					autoPlay
					className="w-full h-fit rounded-lg"
				></video>

				{/* 강의 제목 및 설명 영역 */}
				<div className="mt-6 p-4">
					<h1 className="text-2xl font-bold text-gray-800 pb-2 border-b-2 border-solid border-gray-400">
						{classDetail?.className}
					</h1>
					<p className="mt-4 text-gray-600 leading-relaxed">{classDetail?.classContent}</p>
				</div>
			</div>
		</div>
	);
}
