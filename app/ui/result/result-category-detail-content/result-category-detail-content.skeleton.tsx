import LabelContainerSkeleton from '@/app/ui/view/atom/label-container/label-container.skeleton';
import Skeleton from '@/app/utils/skeleton';

export default function ResultCategoryDetailContentSkeleton() {
  return (
    <div className="md:w-[80vw] max-w-[1200px] p-2">
      <div className="flex justify-between mb-14">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-28" />
      </div>
      <div className="my-4 flex flex-col gap-4">
        <LabelContainerSkeleton rightElement={<Skeleton className="h-10 w-28" />} />
        <Skeleton className="h-40 w-30" />
      </div>
    </div>
  );
}
