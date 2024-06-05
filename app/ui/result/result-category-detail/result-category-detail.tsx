'use client';
import ResultCategoryDetailContent from '@/app/ui/result/result-category-detail-content/result-category-detail-content';
import { fetchResultCategoryDetailInfo } from '@/app/business/service/result/result.query';
import ResultCategoryDetailContentSkeleton from '@/app/ui/result/result-category-detail-content/result-category-detail-content.skeleton';
import ResultCategoryDetailDialog from './result-category-detail-dialog';
import { Suspense } from 'react';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { ResultCategoryDetailResponse } from '@/app/business/service/result/result.type';
import { useSuspenseQuery } from '@tanstack/react-query';

export default function ResultCategoryDetail({ category }: { category: string }) {
  return (
    <ResultCategoryDetailDialog querystring={category}>
      <Suspense fallback={<ResultCategoryDetailContentSkeleton />}>
        <ResultCategoryDetailInfo category={category} />
      </Suspense>
    </ResultCategoryDetailDialog>
  );
}

function ResultCategoryDetailInfo({ category }: { category: string }) {
  const { data } = useSuspenseQuery<ResultCategoryDetailResponse>({
    queryKey: [QUERY_KEY.CATEGORY],
    staleTime: Infinity,
    queryFn: () => fetchResultCategoryDetailInfo(category),
  });

  return <ResultCategoryDetailContent info={data} />;
}
