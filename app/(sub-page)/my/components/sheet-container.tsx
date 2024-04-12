'use client';
import Image from 'next/image';
import background from '@/public/assets/background.png';
import React from 'react';
import LectureSearch from '@/app/ui/lecture/lecture-search';
import { useAtomValue } from 'jotai';
import { isAddedLectureAtom } from '@/app/store/custom-taken-lecture';
import { cn } from '@/app/utils/shadcn/utils';

export default function SheetContainer({ children }: { children: React.ReactNode }) {
  const isAddedLecture = useAtomValue(isAddedLectureAtom);
  return (
    <>
      <div className={cn(isAddedLecture && 'lg:relative lg:overflow-y-scroll lg:h-[calc(100vh-400px)]')}>
        <Image src={background} width={800} height={288} className="w-full bg-white h-[18rem]" alt="background" />
        <div className="flex justify-center">{children}</div>
      </div>
      <LectureSearch />
    </>
  );
}
