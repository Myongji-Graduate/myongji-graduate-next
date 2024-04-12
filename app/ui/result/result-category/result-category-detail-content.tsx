import { cn } from '@/app/utils/shadcn/utils';

import { useState } from 'react';
import { ResultCategoryDetailToggle } from '../../view/shadcn/switch';
import ResultCagegoryDetailLecture from './result-cagegory-detail-lecture';

function ResultCategoryDetailContent() {
  const [isChecked, setChecked] = useState(false);

  return (
    <div className="md:w-[80vw] max-w-[1200px] p-2">
      <div className="flex justify-between">
        <div>
          <h1 className={cn('text-2xl font-bold', 'md:text-4xl')}>전공필수</h1>
          <p className={cn('text-sm text-gray-6 font-medium my-6', 'md:text-lg')}>
            <span>전공필수 과목 중</span>
            <ResultCategoryDetailToggle
              checked={isChecked}
              onCheckedChange={setChecked}
              className="absolute zIndex-2"
            />
            <span>과목이 표시됩니다.</span>
          </p>
        </div>
        <div className={cn('text-2xl font-bold', 'md:text-4xl')}>
          <span className="text-point-blue">18</span> / 18
        </div>
      </div>
      <ResultCagegoryDetailLecture />
    </div>
  );
}

export default ResultCategoryDetailContent;
