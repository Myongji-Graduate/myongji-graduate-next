import UserInfoCard from '@/app/ui/user/user-info-card/user-info-card';
import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';
import { Suspense } from 'react';
import UserInfoCardSkeleton from '@/app/ui/user/user-info-card/user-info-card.skeleton';
import ResultCategory from '@/app/ui/result/result-category/result-category';
import ResultCategorySkeleton from '@/app/ui/result/result-category/result-category.skeleton';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '졸업 요건 검사 결과',
  description: '졸업사정 결과와, 카테고리별 미이수 / 이수 과목정보 및 잔여학점을 확인해요',
  openGraph: {
    siteName: '졸업을 부탁해',
    url: 'https://mju-graduate.com/result',
    images: [
      {
        url: 'https://github.com/user-attachments/assets/2093a57f-af35-4280-8acb-d403341fc8ff',
        width: 1200,
        height: 630,
        alt: 'result-page iamge',
      },
    ],
  },
};

interface ResultPageProp {
  searchParams: { category: ResultCategoryKey };
}

function ResultPage({ searchParams }: ResultPageProp) {
  const { category } = searchParams;

  return (
    <div className="flex justify-center items-end">
      <ContentContainer className="max-md:max-w-[500px] md:w-[700px] p-4 py-6 md:p-8">
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
