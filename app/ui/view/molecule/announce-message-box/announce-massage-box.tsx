import React from 'react';
import CompletedImage from '@/public/assets/completed-category.png';
import CheckImage from '@/public/assets/check.svg';
import Image from 'next/image';
import { cn } from '@/app/utils/shadcn/utils';

interface AnnounceMessageBoxProp {
  message: string;
}

function AnnounceMessageBox({ message }: AnnounceMessageBoxProp) {
  return (
    <div className="relative flex justify-center items-center p-2 bg-yellow-5">
      <Image
        src={CompletedImage}
        width={1200}
        height={270}
        alt="category-fullfill-image"
        className={cn('min-h-20 max-h-40', 'md:min-h-32')}
      />
      <div className="absolute">
        <Image
          className={cn('m-auto w-[30px]', 'md:w-[50px]')}
          src={CheckImage}
          width={50}
          height={36}
          alt="category-fullfill-image"
        />
        <p className={cn('zIndex-1 text-sm', 'md:text-lg')}>{message}</p>
      </div>
    </div>
  );
}

export default AnnounceMessageBox;
