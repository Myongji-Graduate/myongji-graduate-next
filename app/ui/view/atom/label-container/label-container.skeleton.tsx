import { ReactNode } from 'react';
import Skeleton from '../../../../utils/skeleton';

interface LabelContainerProps {
  rightElement: ReactNode;
}

export default function LabelContainerSkeleton({ rightElement }: LabelContainerProps) {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="rounded-[100px] bg-light-blue-6 p-2.5 text-white lg:text-sm xl:text-base 2xl:text-lg font-semibold">
        <Skeleton className="h-6 w-20" />
      </div>
      {rightElement}
    </div>
  );
}
