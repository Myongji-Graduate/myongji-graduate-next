import ResultCategoryDetailContent from '@/app/ui/result/result-category/result-category-detail-content/result-category-detail-content';
import { fetchResultCategoryDetailInfo } from '@/app/business/result/result.query';
import ResultCategoryDetailContentSkeleton from '@/app/ui/result/result-category/result-category-detail-content/result-category-detail-content.skeleton';
import ResultCategoryDetailDialog from './result-category-detail-dialog';

export default async function ResultCategoryDetailContainer({ category }: { category: string }) {
  const data = await fetchResultCategoryDetailInfo(category);
  return (
    <ResultCategoryDetailDialog>
      <ResultCategoryDetailContent info={data} />
    </ResultCategoryDetailDialog>
  );
}

export function ResultCategoryDetailSkeleton() {
  return (
    <ResultCategoryDetailDialog>
      <ResultCategoryDetailContentSkeleton />
    </ResultCategoryDetailDialog>
  );
}
