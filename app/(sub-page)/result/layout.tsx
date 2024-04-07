'use client';

import ResultCategoryDetail from '@/app/ui/result/result-category-detail/result-category-detail';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <ResultCategoryDetail />
      {children}
    </>
  );
}

export default Layout;
