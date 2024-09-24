'use client';

import ResultCategoryDetailContentSkeleton from '@/app/ui/result/result-category-detail-content/result-category-detail-content.skeleton';
import ResultCategoryDetailDialog from './result-category-detail-dialog';
import { Suspense } from 'react';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';
import ResultCategoryDetailInfo from './result-category-detail-info';

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
