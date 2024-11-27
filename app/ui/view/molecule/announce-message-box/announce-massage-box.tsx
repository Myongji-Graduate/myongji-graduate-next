import React from 'react';
import CheckImage from '@/public/assets/check.svg';
import Image from 'next/image';
import { cn } from '@/app/utils/shadcn/utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface AnnounceMessageBoxProp {
  message: string;
  background_image?: string | StaticImport;
}

function AnnounceMessageBox({ message, background_image }: AnnounceMessageBoxProp) {
  return (
    <div className="relative flex justify-center items-center p-2 bg-gray-1 min-h-24 rounded-3xl">
      {background_image && (
        <Image
          src={background_image}
          width={1200}
          height={270}
          alt="announcebox_background_image"
          className={cn('min-h-20 max-h-40', 'md:min-h-32')}
        />
      )}
      <div className="absolute">
        <Image
          className={cn('m-auto w-[30px]', 'md:w-[50px]')}
          src={CheckImage}
          width={50}
          height={36}
          alt="category-fullfill-image"
        />
        <p className={cn('z-1 text-sm', 'md:text-lg')}>{message}</p>
      </div>
    </div>
  );
}

export default AnnounceMessageBox;
