'use client';
import { cn } from '@/app/utils/shadcn/utils';

import Book from '@/public/assets/book.svg';
import Image from 'next/image';
import * as React from 'react';
import Skeleton from '../../../utils/skeleton';

function ResultCategoryCardSkeleton() {
  return (
    <div
      className={cn('flex flex-col gap-6 zIndex-1 rounded-xl shadow-lg bg-white p-[0.4rem]', 'md:w-80 md:p-[1.8rem]')}
    >
      <div className="flex justify-between items-center">
        <div className={cn('flex gap-4 font-bold text-sm', 'md:text-xl')}>
          <Image src={Book} width={24} height={24} alt="category-img" />
          <Skeleton className="h-8 w-20" />
        </div>
      </div>
      <div className="m-auto">
        <Skeleton className="h-32 w-32" />
      </div>
      <div className={cn('flex text-xs font-medium justify-between items-end', 'md:gap-4 md:text-base md:px-2')}>
        <div className="flex flex-col gap-2">
          <div className={cn('flex', 'md:gap-2')}>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-10" />
          </div>
          <div className={cn('flex', 'md:gap-2')}>
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-10" />
          </div>
        </div>
        <Skeleton className="h-14 w-28" />
      </div>
    </div>
  );
}

export default ResultCategoryCardSkeleton;
