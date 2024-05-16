import Skeleton from '../../../utils/skeleton';

export default function UserInfoNavigatorSkeleton() {
  return (
    <div className="flex flex-col items-center p-4  space-y-3">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
