import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';
import { Suspense } from 'react';
import UserInfoCardSkeleton from '@/app/ui/user/user-info-card/user-info-card.skeleton';
import ResultCategory from '@/app/ui/result/result-category/result-category';
import ResultCategorySkeleton from '@/app/ui/result/result-category/result-category.skeleton';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';

interface ResultPageProp {
  searchParams: { category: ResultCategoryKey };
}

function ResultPage({ searchParams }: ResultPageProp) {
  const { category } = searchParams;

  return (
    <div className="flex justify-center items-end">
      <ContentContainer className="md:w-[700px] p-4 py-6 md:p-8">
        <Suspense fallback={<UserInfoCardSkeleton />}>
          <UserInfoCard />
        </Suspense>
      </ContentContainer>
      <Suspense fallback={<ResultCategorySkeleton />}>
        <ResultCategory />
      </Suspense>
      <ResultCategoryDetail category={category} />
    </div>
  );
}

export default ResultPage;
