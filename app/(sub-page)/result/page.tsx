import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';
import { Suspense } from 'react';
import UserInfoCardSkeleton from '@/app/ui/user/user-info-card/user-info-card.skeleton';
import ResultCategory from '@/app/ui/result/result-category/result-category';
import ResultCategorySkeleton from '@/app/ui/result/result-category/result-category.skeleton';

interface ResultPageProp {
  searchParams: { category: string };
}

async function ResultPage({ searchParams }: ResultPageProp) {
  const { category } = searchParams;

  return (
    <div className="flex justify-center items-end">
      <ContentContainer className="md:w-[700px] p-8">
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
