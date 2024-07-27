import Skeleton from '@/app/utils/skeleton';

export default function FindIdFormSkeleton() {
  return (
    <div className="p-6">
      <div className="space-y-4">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-1/3 m-auto" />
      </div>
    </div>
  );
}
