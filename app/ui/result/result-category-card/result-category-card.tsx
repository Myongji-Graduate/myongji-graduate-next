'use client';
import { cn } from '@/app/utils/shadcn/utils';

import Book from '@/public/assets/book.svg';
import Image from 'next/image';
import useDialog from '@/app/hooks/useDialog';
import * as React from 'react';
import {
  RESULT_CATEGORY,
  RESULT_CATEGORY_KO,
  ResultCategoryKey,
  MAJOR_NOTATION,
} from '@/app/utils/key/result-category.key';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Link from 'next/link';
import { useSetAtom } from 'jotai';
import { isDialogOpenAtom } from '@/app/store/stores/dialog';
import Button from '../../view/atom/button/button';
import { getPercentage } from '@/app/utils/calculate.util';
import PieChart from '../../view/molecule/pie-chart/pie-chart';
import Responsive from '../../responsive';
import { usePathname } from 'next/navigation';

interface ResultCategoryCardProps {
  category: ResultCategoryKey;
  totalCredit: number;
  takenCredit: number;
  completed?: boolean;
}

const displaySeveralMajor = (category: ResultCategoryKey) => {
  const { DUAL_MANDATORY_MAJOR, DUAL_ELECTIVE_MAJOR, DUAL_BASIC_ACADEMICAL_CULTURE, SUB_MAJOR } = RESULT_CATEGORY;
  const { DUAL, SUB } = MAJOR_NOTATION;

  function severalButtonRender(majorType: string) {
    return (
      <>
        <Responsive maxWidth={767}>
          <Button label={majorType} variant="outlined" size="xs" as="div" className="p-1 text-[10px]" />
        </Responsive>
        <Responsive minWidth={768}>
          <Button label={majorType} variant="outlined" size="xs" as="div" />
        </Responsive>
      </>
    );
  }

  switch (category) {
    case DUAL_MANDATORY_MAJOR:
    case DUAL_ELECTIVE_MAJOR:
    case DUAL_BASIC_ACADEMICAL_CULTURE:
      return severalButtonRender(DUAL);
    case SUB_MAJOR:
      return severalButtonRender(SUB);
    default:
      return <></>;
  }
};

function ResultCategoryCard({ category, totalCredit, takenCredit }: ResultCategoryCardProps) {
  const { open } = useDialog(DIALOG_KEY.RESULT_CATEGORY);
  const setIsOpenDialog = useSetAtom(isDialogOpenAtom);
  const pathname = usePathname();

  const percentage = getPercentage(takenCredit, totalCredit);

  const handleClickButton = () => {
    open();
    setIsOpenDialog(true);
  };

  const getCategoryCredit = (category: ResultCategoryKey, credit: number) =>
    category === RESULT_CATEGORY.CHAPEL ? credit * 2 : credit;

  const getCategoryCountWay = (category: ResultCategoryKey) => (category === RESULT_CATEGORY.CHAPEL ? '횟수' : '학점');

  const filterCategoryExistStandard = (category: ResultCategoryKey) => {
    const NONEXIST_STANDARD_CATEGORY = ['FREE_ELECTIVE', 'NORMAL_CULTURE', 'CHAPEL', 'TRANSFER_CHRISTIAN'];
    return NONEXIST_STANDARD_CATEGORY.includes(category);
  };

  return (
    <div
      className={cn(
        'flex flex-col gap-6 z-1 rounded-xl shadow-md bg-white p-4 m-auto w-full',
        'md:p-[1.8rem] max-w-80',
      )}
    >
      <div className="flex justify-between items-center">
        <div className={cn('flex items-center gap-1 font-bold text-sm', 'md:gap-4 md:text-xl')}>
          <Image src={Book} width={24} height={24} alt="category-img" />
          <h3>{RESULT_CATEGORY_KO[category]}</h3>
        </div>
        {displaySeveralMajor(category)}
      </div>
      <div className="m-auto">
        <PieChart percentage={percentage} />
      </div>
      <div className={cn('w-full flex text-xs font-medium justify-between items-end', 'md:gap-4 md:text-base')}>
        <div>
          <div className="flex gap-2">
            <span>기준{getCategoryCountWay(category)}</span>
            <span className="font-bold">{getCategoryCredit(category, totalCredit)}</span>
          </div>
          <div className="flex gap-2">
            <span>이수{getCategoryCountWay(category)}</span>
            <span className={cn('font-bold', percentage === 100 ? 'text-point-blue' : 'text-etc-red')}>
              {getCategoryCredit(category, takenCredit)}
            </span>
          </div>
        </div>
        <Link
          className={`${filterCategoryExistStandard(category) && 'hidden'}`}
          data-cy={`${category}-button`}
          href={{
            pathname: pathname,
            query: {
              category: category,
            },
          }}
        >
          <Responsive maxWidth={767}>
            <Button size="sm" label="과목 확인" onClick={handleClickButton} className="text-[10px] p-1 px-4" />
          </Responsive>
          <Responsive minWidth={768}>
            <Button size="sm" label="과목 확인" onClick={handleClickButton} />
          </Responsive>
        </Link>
      </div>
    </div>
  );
}

export default ResultCategoryCard;
