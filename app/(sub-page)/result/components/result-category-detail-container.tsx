'use client';

import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';
import dynamic from 'next/dynamic';

const ResultCategoryDetail = dynamic(() => import('@/app/ui/result/result-category-detail/result-category-detail'));

export default function ResultCategoryDetailContainer({ category }: { category: ResultCategoryKey }) {
  const { isOpen } = useDialog(DIALOG_KEY.RESULT_CATEGORY);

  if (!category) return;

  return <>{isOpen && <ResultCategoryDetail category={category} />}</>;
}
