import { cn } from '@/app/utils/shadcn/utils';
import ResultCategoryCardSkeleton from '../result-category-card/result-category-card.skeleton';

async function ResultCategorySkeleton() {
  return (
    <div
      className={cn(
        'absolute grid grid-cols-2 gap-2 top-[28rem] w-full',
        'md:max-w-[700px] md:gap-10 md:top-[35rem] max-md:max-w-[500px]',
      )}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <ResultCategoryCardSkeleton key={index} />
      ))}
    </div>
  );
}
export default ResultCategorySkeleton;
