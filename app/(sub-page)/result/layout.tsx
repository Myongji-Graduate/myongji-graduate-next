'use client';

import ResultCategoryDetail from '@/app/ui/result/result-category/result-category-detail-content';

interface ResultLayoutProps {
  children: React.ReactNode;
}

function ResultLayout({ children }: ResultLayoutProps) {
  return (
    <>
      <ResultCategoryDetail />
      {children}
    </>
  );
}

export default ResultLayout;
