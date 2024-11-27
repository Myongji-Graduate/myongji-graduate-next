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
    <div className="flex flex-col gap-2 mx-[5%] lg:flex-row">
      <Image alt="tutorial-image" width={1000} src={item.imageUrl} className="rounded-2xl" />
      <ul className="flex flex-col w-full gap-1 md:py-2">
        {Object.values(data).map((tutorial, index) => {
          const { icon, content } = tutorial;
          return (
            <li
              key={index}
              className={cn(
                'cursor-pointer flex items-center p-4 font-bold opacity-50 rounded-xl hover:opacity-70 md:p-6 md:text-xl',
                tutorial === item ? 'bg-light-blue-1 opacity-100 hover:opacity-100' : 'hover:bg-gray-1',
              )}
              onClick={() => setItem(tutorial)}
            >
              {icon && <Image src={icon} alt="icon" width={8} height={8} className="w-8 mr-2" />}
              <span className="w-[90%]">{content}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TutorialContent;
