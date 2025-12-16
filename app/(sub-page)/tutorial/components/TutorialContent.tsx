'use client';
import Image from 'next/image';
import { cn } from '@/app/utils/shadcn/utils';
import { useState } from 'react';
import { TutorialItem } from '../data';

interface TestContentProps {
  data: TutorialItem[];
}

function TutorialContent({ data }: TestContentProps) {
  const [item, setItem] = useState<TutorialItem>(data[0]);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-6 p-6 rounded-2xl bg-gray-50">
      <div className="w-full lg:w-[70%] max-w-[650px] mx-auto lg:mx-0">
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-lg">
          <Image alt="tutorial-image" src={item.imageUrl} fill className="object-cover" />
        </div>
      </div>
      <ul className="flex flex-col flex-1 gap-4 h-full justify-between">
        {data.map((tutorial, index) => {
          const { icon, content } = tutorial;
          const isActive = tutorial === item;

          return (
            <li
              key={index}
              className={cn(
                'cursor-pointer flex items-center gap-4 rounded-xl p-4 md:p-5 transition-all duration-200 text-center lg:text-left',
                isActive ? 'bg-gray-200 text-primary' : 'bg-gray-50 hover:bg-gray-200 hover:text-primary text-gray-700',
              )}
              onClick={() => setItem(tutorial)}
            >
              {icon && <Image src={icon} alt="icon" width={24} height={24} className="w-6 h-6" priority />}
              <span className="flex-1 text-base md:text-lg font-medium">{content}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TutorialContent;
