import { ClassDetailData } from "@/features/course/components/classList";

type ClassDetailProps = {
	detail: ClassDetailData;
	setDisplayVideoPath: (classId: string) => void;
};

export default function ClassDetail({ detail, setDisplayVideoPath }: ClassDetailProps) {
	const {
		academyId,
		classContent,
		classId,
		className,
		classSeq,
		classType,
		courseId,
		createdAt,
		teacherId,
		teacherName,
	} = detail;

	return (
		<div className="flex items-center border rounded-md border-gray-300 dark:border-gray-700 shadow-card my-2 p-4 bg-background dark:bg-dark-background-foreground">
			{/* 왼쪽: 썸네일 영상 이미지 */}
			{/* <div className="w-1/3">
        <img
          src="/placeholder.jpg"
          alt={className}
          className="object-cover w-full h-full rounded"
        />
      </div> */}
			{/* 오른쪽: 과정명과 재생 버튼 */}
			<div className="flex w-full justify-between items-center pl-1">
				<div className="w-11/12 flex-1">
					<h3 className="text-lg font-bold text-text dark:text-dark-text">{className}</h3>
					<p className="text-gray-600 dark:text-gray-400">{classContent}</p>
				</div>
				<button
					type="button"
					className="bg-primary/10 hover:bg-primary/20 text-primary dark:text-dark-primary p-3 rounded-md flex items-center justify-center transition-all"
					onClick={() => setDisplayVideoPath(classId)}
				>
					{/* 재생 버튼 아이콘 (Play Button Icon) */}
					<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M8 5v14l11-7z" />
					</svg>
				</button>
			</div>
		</div>
	);
}
