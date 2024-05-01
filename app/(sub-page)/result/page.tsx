import ResultCategoryCard from '@/app/ui/result/result-category-card/result-category-card';
import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ContentContainer from '@/app/ui/view/atom/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';
import { fetchCredits } from '@/app/business/result/result.query';
import { Suspense } from 'react';
import UserInfoCardSkeleton from '@/app/ui/user/user-info-card/user-info-card.skeleton';
import ResultCategory from '@/app/ui/result/result-category/result-category';

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
      <Suspense fallback={<UserInfoCardSkeleton />}>
        <ResultCategory />
      </Suspense>

      {category && <ResultCategoryDetail category={category} />}
    </div>
  );
}

export default ResultPage;
