'use client';

import useDialog from '@/app/hooks/useDialog';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { ResultCategoryKey } from '@/app/utils/key/result-category.key';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const ResultCategoryDetail = dynamic(() => import('@/app/ui/result/result-category-detail/result-category-detail'));

export default function ResultCategoryDetailContainer({ category }: { category: ResultCategoryKey }) {
  const { isOpen, open } = useDialog(DIALOG_KEY.RESULT_CATEGORY);

  useEffect(() => {
    if (category && !isOpen) open();
  }, []);

  return isOpen && category ? <ResultCategoryDetail category={category} /> : null;
}
