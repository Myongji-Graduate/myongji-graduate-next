import React from 'react';
import CompletedImage from '@/public/assets/completed-category.png';
import CheckImage from '@/public/assets/check.svg';
import Image from 'next/image';

interface AnnounceMessageProp {
  message: string;
}

function AnnounceMessage({ message }: AnnounceMessageProp) {
  return (
    <div className="relative flex justify-center items-center">
      <Image src={CompletedImage} width={1200} height={270} alt="category-fullfill-image" />
      <div className="absolute ">
        <Image className="m-auto" src={CheckImage} width={50} height={36} alt="category-fullfill-image" />
        <p className="zIndex-1">{message}</p>
      </div>
    </div>
  );
}

export default AnnounceMessage;
