'use client';
import { cn } from '@/app/utils/shadcn/utils';

import Book from '@/public/assets/book.svg';
import Image from 'next/image';
import useDialog from '@/app/hooks/useDialog';
import * as React from 'react';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import PieChart from '../../view/molecule/pie-chart/pie-chart';
import Button from '../../view/atom/button/button';

function ResultCategoryCard() {
  const { toggle } = useDialog(DIALOG_KEY.RESULT_CATEGORY);

  return (
    <div
      className={cn('flex flex-col gap-6 zIndex-1 rounded-xl shadow-lg bg-white p-[0.4rem]', 'md:w-80 md:p-[1.8rem]')}
    >
      <div className={cn('flex gap-4 font-bold text-sm', 'md:text-xl')}>
        <Image src={Book} width={24} height={24} alt="category-img" />
        전공필수
      </div>
      <div className="m-auto">
        <PieChart percentage={90} />
      </div>
      <div className={cn('flex text-xs font-medium justify-between items-end', 'md:gap-4 md:text-base md:px-2')}>
        <div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>기준학점</span>
            <span className="font-bold">18</span>
          </div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>이수학점</span>
            <span className="font-bold text-point-blue">18</span>
          </div>
        </div>
        <Button size="sm" label="과목 확인" onClick={toggle} />
      </div>
    </div>
  );
}

export default ResultCategoryCard;
