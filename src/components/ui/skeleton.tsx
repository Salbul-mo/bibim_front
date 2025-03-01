import { cn } from "@/components/utils/cn";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div className={cn("tw-animate-pulse tw-rounded-md tw-bg-muted", className)} {...props} />;
}

export { Skeleton };
