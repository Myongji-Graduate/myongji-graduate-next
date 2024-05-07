'use client';
import { cn } from '@/app/utils/shadcn/utils';

import Book from '@/public/assets/book.svg';
import Image from 'next/image';
import useDialog from '@/app/hooks/useDialog';
import * as React from 'react';
import {
  MAJOR_NOTATION,
  RESULT_CATEGORY,
  RESULT_CATEGORY_KO,
  ResultCategoryKey,
} from '@/app/utils/key/result-category.key';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { isDialogOpenAtom } from '@/app/store/dialog';
import Button from '../../view/atom/button/button';
import { getPercentage } from '@/app/utils/chart.util';
import PieChart from '../../view/molecule/pie-chart/pie-chart';

interface ResultCategoryCardProps {
  category: ResultCategoryKey;
  totalCredit: number;
  takenCredit: number;
  completed?: boolean;
}

const displaySeveralMajor = (category: ResultCategoryKey) => {
  const { DUAL_MANDATORY_MAJOR, DUAL_ELECTIVE_MAJOR, DUAL_BASIC_ACADEMICAL_CULTURE, SUB_MAJOR } = RESULT_CATEGORY;
  const { DUAL, SUB } = MAJOR_NOTATION;

  switch (category) {
    case DUAL_MANDATORY_MAJOR:
    case DUAL_ELECTIVE_MAJOR:
    case DUAL_BASIC_ACADEMICAL_CULTURE:
      return <Button label={DUAL} variant="outlined" size="xs" role="none presentation" />;
    case SUB_MAJOR:
      return <Button label={SUB} variant="outlined" size="xs" role="none presentation" />;
    default:
      return <></>;
  }
};

function ResultCategoryCard({ category, totalCredit, takenCredit }: ResultCategoryCardProps) {
  const { toggle } = useDialog(DIALOG_KEY.RESULT_CATEGORY);
  const setIsOpenDialog = useSetAtom(isDialogOpenAtom);

  const percentage = getPercentage(takenCredit, totalCredit);

  const handleClickButton = () => {
    toggle();
    setIsOpenDialog(true);
  };

  const getCategoryCredit = (category: ResultCategoryKey, credit: number): number => {
    return category === RESULT_CATEGORY.CHAPEL ? credit * 2 : credit;
  };

  return (
    <div
      className={cn('flex flex-col gap-6 zIndex-1 rounded-xl shadow-lg bg-white p-[0.4rem]', 'md:w-80 md:p-[1.8rem]')}
    >
      <div className="flex justify-between items-center">
        <div className={cn('flex gap-4 font-bold text-sm', 'md:text-xl')}>
          <Image src={Book} width={24} height={24} alt="category-img" />
          <h3>{RESULT_CATEGORY_KO[category]}</h3>
        </div>
        {displaySeveralMajor(category)}
      </div>
      <div className="m-auto">
        <PieChart percentage={percentage} />
      </div>
      <div className={cn('flex text-xs font-medium justify-between items-end', 'md:gap-4 md:text-base md:px-2')}>
        <div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>기준학점</span>
            <span className="font-bold">{getCategoryCredit(category, totalCredit)}</span>
          </div>
          <div className={cn('flex', 'md:gap-2')}>
            <span>이수학점</span>
            <span className={cn('font-bold', percentage === 100 ? 'text-point-blue' : 'text-etc-red')}>
              {getCategoryCredit(category, takenCredit)}
            </span>
          </div>
        </div>
        <Link
          href={{
            pathname: '/result',
            query: {
              category: 'COMMON_CULTURE',
            },
          }}
        >
          <Button size="sm" label="과목 확인" onClick={handleClickButton} />
        </Link>
      </div>
    </div>
  );
}

export default ResultCategoryCard;
