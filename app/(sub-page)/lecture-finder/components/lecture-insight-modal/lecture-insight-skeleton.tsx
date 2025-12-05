import Responsive from '@/app/ui/responsive';
import Skeleton from '@/app/utils/skeleton';

export default function LectureInsightSkeleton() {
  return (
    <>
      <Responsive maxWidth={767}>
        <div className="w-72 h-96 flex flex-col gap-4">
          <Skeleton className="rounded-full h-12 w-20" />
          <div className="flex flex-col h-full gap-4">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Responsive>

      <Responsive minWidth={768}>
        <div className="w-full h-96 flex flex-row gap-4">
          <Skeleton className="rounded-full h-11 pt-2 w-20" />
          <div className="flex flex-col h-full w-full gap-4">
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </Responsive>
    </>
  );
}
