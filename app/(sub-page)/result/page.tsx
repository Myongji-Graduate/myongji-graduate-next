import ResultCategoryCard from '@/app/ui/result/result-category/result-category-card';
import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import ResultCategoryDetailContainer, {
  ResultCategoryDetailContainerSkeleton,
} from './components/result-category-detail-container';
import { Suspense } from 'react';

interface ResultPageProp {
  searchParams: { category: string };
}

function ResultPage({ searchParams }: ResultPageProp) {
  const { category } = searchParams;

  return (
    <div className="flex justify-center items-end">
      <ContentContainer className="md:w-[700px] p-8">
        <UserInfoCard />
      </ContentContainer>
      <div
        className={cn(
          'absolute grid grid-cols-2 gap-2 top-[30rem] w-full',
          'md:max-w-[700px] md:gap-10 md:top-[33rem]',
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <ResultCategoryCard key={index} />
        ))}
      </div>
      <Suspense fallback={<ResultCategoryDetailContainerSkeleton />}>
        <ResultCategoryDetailContainer category={category} />
      </Suspense>
    </div>
  );
}
export default ResultPage;
