'use client';
import { cn } from '@/app/utils/shadcn/utils';

import Book from '@/public/assets/book.svg';
import Image from 'next/image';
import useDialog from '@/app/hooks/useDialog';
import * as React from 'react';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import PieChart from '../../view/molecule/pie-chart/pie-chart';
import Button from '../../view/atom/button/button';
import { RESULT_CATEGORY, ResultCategoryKey } from '@/app/utils/key/result-category.key';

function ResultCategoryCard() {
  const { toggle } = useDialog(DIALOG_KEY.RESULT_CATEGORY);
  const percentage = 100;
  const category = RESULT_CATEGORY.COMMON_CULTURE;

  const filterSeveralMajor = (category: ResultCategoryKey) => {
    const { DUAL_MANDATORY_MAJOR, DUAL_ELECTIVE_MAJOR, SUB_MAJOR } = RESULT_CATEGORY;

    switch (category) {
      case DUAL_MANDATORY_MAJOR:
      case DUAL_ELECTIVE_MAJOR:
        return <Button label="복수전공" variant="outlined" size="xs" />;
      case SUB_MAJOR:
        return <Button label="부전공" variant="outlined" size="xs" />;
      default:
        return <></>;
    }
  };

  return (
    <div
      className={cn('flex flex-col gap-6 zIndex-1 rounded-xl shadow-lg bg-white p-[0.4rem]', 'md:w-80 md:p-[1.8rem]')}
    >
      <div className="flex justify-between items-center">
        <div className={cn('flex gap-4 font-bold text-sm', 'md:text-xl')}>
          <Image src={Book} width={24} height={24} alt="category-img" />
          <h3>전공필수</h3>
        </div>
        {filterSeveralMajor(category)}
      </div>
      <div className="m-auto">
        <PieChart percentage={percentage} />
      </div>
      <div className={cn('flex text-xs font-medium justify-between items-end', 'md:gap-4 md:text-base md:px-2')}>
        <div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>기준학점</span>
            <span className="font-bold">18</span>
          </div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>이수학점</span>
            <span className={cn('font-bold', percentage === 100 ? 'text-point-blue' : 'text-etc-pink')}>18</span>
          </div>
        </div>
        <Button size="sm" label="과목 확인" onClick={toggle} />
      </div>
    </div>
  );
}

export default ResultCategoryCard;
