'use client';
import ResultCategoryDetailContent from '@/app/ui/result/result-category-detail-content/result-category-detail-content';
import { useFetchResultCategoryDetailInfo } from '@/app/store/querys/result';
import ResultCategoryDetailContentSkeleton from '@/app/ui/result/result-category-detail-content/result-category-detail-content.skeleton';
import ResultCategoryDetailDialog from './result-category-detail-dialog';
import { Suspense } from 'react';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';

export default function ResultCategoryDetail({ category }: { category: ResultCategoryKey }) {
  if (!category) return;

  return (
    <ResultCategoryDetailDialog querystring={category}>
      <Suspense fallback={<ResultCategoryDetailContentSkeleton />}>
        <ResultCategoryDetailInfo category={category} />
      </Suspense>
    </ResultCategoryDetailDialog>
  );
}

function ResultCategoryDetailInfo({ category }: { category: ResultCategoryKey }) {
  const { data } = useFetchResultCategoryDetailInfo(category);
  return (
    <ResultCategoryDetailContent
      takenCredit={data.takenCredit}
      totalCredit={data.totalCredit}
      detailCategory={data.detailCategory}
      category={category}
    />
  );
}
