import { cn } from '@/app/utils/shadcn/utils';

export default function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-gray-100', className)} {...props} />;
}
