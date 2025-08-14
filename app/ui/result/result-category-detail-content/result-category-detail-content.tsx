'use client';

import { cn } from '@/app/utils/shadcn/utils';
import { useState } from 'react';
import { ResultCategoryDetailLectureToggle } from '../result-category-detail-lecture/result-category-detail-lecture-toggle';
import ResultCagegoryDetailLecture from '../result-category-detail-lecture/result-cagegory-detail-lecture';
import { ResultCategoryDetailResponse } from '@/app/store/querys/result';
import { RESULT_CATEGORY_KO, ResultCategoryKey } from '@/app/utils/key/result-category.key';

interface ResultCategoryDetailContentProps extends ResultCategoryDetailResponse {
  category: ResultCategoryKey;
}

function ResultCategoryDetailContent({
  takenCredit,
  totalCredit,
  detailCategory,
  category,
}: ResultCategoryDetailContentProps) {
  const [isTakenLecture, setIsTakenLectrue] = useState(false);

  return (
    <div className="md:w-[80vw] max-w-[1200px] p-2 overflow-scroll">
      <div className={cn('flex justify-between mb-6', 'md:mb-10')}>
        <div>
          <h1 className={cn('text-2xl font-bold', 'md:text-4xl')}>{RESULT_CATEGORY_KO[category]}</h1>
          <div className={cn('relative flex items-center gap-2 text-sm text-gray-7 font-medium my-2', 'md:text-lg')}>
            <span className="hidden md:block"> {RESULT_CATEGORY_KO[category]} 과목 중</span>
            <div className="w-24 h-10">
              <ResultCategoryDetailLectureToggle
                checked={isTakenLecture}
                data-testid="lecture-toggle"
                data-cy="lecture-toggle"
                onCheckedChange={setIsTakenLectrue}
                className="absolute z-2"
              />
            </div>
            <span>과목이 표시됩니다.</span>
          </div>
        </div>
        <div className={cn('min-w-fit text-2xl font-bold', 'md:text-4xl')}>
          <span className="text-point-blue">{takenCredit}</span> / {totalCredit}
        </div>
      </div>
      {detailCategory.map((categoryInfo, index) => (
        <ResultCagegoryDetailLecture isTakenLecture={isTakenLecture} detailCategory={categoryInfo} key={index} />
      ))}
    </div>
  );
}

export default ResultCategoryDetailContent;
