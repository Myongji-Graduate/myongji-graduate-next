import React from 'react';
import CompletedCategoryImage from '@/public/assets/completed-category.png';
import CheckImage from '@/public/assets/check.svg';
import Image from 'next/image';

function CompletedCategory() {
  return (
    <div className="relative flex justify-center items-center">
      <Image src={CompletedCategoryImage} width={1200} height={270} alt="completed-category-image" />
      <div className="absolute">
        <Image className="m-auto" src={CheckImage} width={50} height={36} alt="completed-category-image" />
        <p className="z-10">해당 파트의 졸업요건을 충족하셨습니다!</p>
      </div>
    </div>
  );
}

export default CompletedCategory;
