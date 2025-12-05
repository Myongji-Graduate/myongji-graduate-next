import Skeleton from '@/app/utils/skeleton';

interface TableListSkeletonProps {
  rows?: number;
  cols?: number;
}

export default function TableListSkeleton({ rows = 5, cols = 5 }: TableListSkeletonProps) {
  return (
    <div className="flex flex-col w-full">
      <div className="grid px-2 py-3">
        <Skeleton className="h-10 w-full rounded-3xl bg-light-blue-2" />
      </div>

      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid px-2 py-1" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {Array.from({ length: cols }).map((__, colIndex) => (
            <Skeleton key={colIndex} className="h-12 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
