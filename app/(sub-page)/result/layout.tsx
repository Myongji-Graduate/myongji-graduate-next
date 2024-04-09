'use client';

import ResultCategoryDetail from '@/app/(sub-page)/result/components/result-category-detail-container';

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
