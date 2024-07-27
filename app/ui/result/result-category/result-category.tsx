'use client';
import { cn } from '@/app/utils/shadcn/utils';
import ResultCategoryCard from '../result-category-card/result-category-card';
import { CreditResponse, useFetchCredits } from '@/app/store/querys/result';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import { ResultCategoryKey } from '../result-category-detail-content/result-category-detail-content.stories';

const getPriority = (category: ResultCategoryKey) => {
  return [
    { keyword: 'MAJOR', weight: -100 },
    { keyword: 'PRIMARY', weight: -10 },
    { keyword: 'MANDATORY', weight: -1 },
  ].reduce((priority, { keyword, weight }) => {
    return category.includes(keyword) ? priority + weight : priority;
  }, 0);
};

function ResultCategory() {
  const { data: categories } = useFetchCredits();

  const sortedCategories = categories.sort((a, b) => getPriority(a.category) - getPriority(b.category));

  return (
    <div
      className={cn('absolute grid grid-cols-2 gap-2 top-[30rem] w-full', 'md:max-w-[700px] md:gap-10 md:top-[33rem]')}
    >
      {sortedCategories.map(({ category, totalCredit, takenCredit }, index) => (
        <ResultCategoryCard
          key={index}
          category={RESULT_CATEGORY[category]}
          totalCredit={totalCredit}
          takenCredit={takenCredit}
        />
      ))}
    </div>
  );
}
export default ResultCategory;
