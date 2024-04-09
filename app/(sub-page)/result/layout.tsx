'use client';

import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';

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
