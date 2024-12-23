'use client';
import { cn } from '@/app/utils/shadcn/utils';
import { CreditResponse, useFetchCredits } from '@/app/store/querys/result';
import { RESULT_CATEGORY, ResultCategoryKey } from '@/app/utils/key/result-category.key';
import ResultCategoryCard from '@/app/ui/result/result-category-card/result-category-card';

interface ResultCategoryViewerProp {
  categories: CreditResponse[];
  className?: string;
}

const getPriority = (category: ResultCategoryKey) => {
  return [
    { keyword: 'MAJOR', weight: -100 },
    { keyword: 'PRIMARY', weight: -10 },
    { keyword: 'MANDATORY', weight: -1 },
  ].reduce((priority, { keyword, weight }) => {
    return category.includes(keyword) ? priority + weight : priority;
  }, 0);
};

export function ResultCategoryViewer({ categories, className }: ResultCategoryViewerProp) {
  const sortedCategories = categories.sort((a, b) => getPriority(a.category) - getPriority(b.category));
  return (
    <div
      className={cn(
        'absolute grid grid-cols-2 gap-2 top-[28rem] w-full',
        'md:max-w-[700px] md:gap-10 md:top-[35rem] max-md:max-w-[500px] ',
        className,
      )}
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

export default function ResultCategory() {
  const { data } = useFetchCredits();
  return <ResultCategoryViewer categories={data} />;
}
