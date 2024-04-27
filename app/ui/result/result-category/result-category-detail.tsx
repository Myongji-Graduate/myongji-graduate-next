import ResultCategoryDetailContent from '@/app/ui/result/result-category/result-category-detail-content/result-category-detail-content';
import { fetchResultCategoryDetailInfo } from '@/app/business/result/result.query';
import ResultCategoryDetailContentSkeleton from '@/app/ui/result/result-category/result-category-detail-content/result-category-detail-content.skeleton';
import ResultCategoryDetailDialog from './result-category-detail-dialog';
import { Suspense } from 'react';

export default function ResultCategoryDetail({ category }: { category: string }) {
  return (
    <ResultCategoryDetailDialog querystring={category}>
      <Suspense fallback={<ResultCategoryDetailContentSkeleton />}>
        <ResultCategoryDetailInfo category={category} />
      </Suspense>
    </ResultCategoryDetailDialog>
  );
}

async function ResultCategoryDetailInfo({ category }: { category: string }) {
  const data = await fetchResultCategoryDetailInfo(category);
  return <ResultCategoryDetailContent info={data} />;
}
