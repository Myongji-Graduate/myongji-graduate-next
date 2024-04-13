import ResultCategoryDetailContainer from './components/result-category-detail-container';

interface ResultLayoutProps {
  children: React.ReactNode;
}

function ResultLayout({ children }: ResultLayoutProps) {
  return (
    <>
      <ResultCategoryDetailContainer />
      {children}
    </>
  );
}

export default ResultLayout;
