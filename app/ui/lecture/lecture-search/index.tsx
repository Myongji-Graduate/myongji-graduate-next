import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer, { LectureSearchResultContainerSpinner } from './lecture-search-result-container';
import EmptyDataContainer from './empty-data-container';
import { Suspense } from 'react';

interface LectureSearchProps {
  searchParams: {
    keyword?: string;
    type?: string;
  };
}
export default function LectureSearch({ searchParams }: LectureSearchProps) {
  const hasSearchParams = searchParams.type && searchParams.keyword;
  const isSearchable = searchParams.keyword && searchParams.keyword.length > 1;

  return (
    <div className="bg-white  w-full h-[500px] sm:h-[400px] z-[10] flex justify-center" data-testid="lecture-search">
      <div className="w-[800px] mx-auto my-7  flex flex-col gap-10 sm:gap-6">
        <LectureSearchBar />
        {hasSearchParams && isSearchable ? (
          <Suspense fallback={<LectureSearchResultContainerSpinner />}>
            <LectureSearchResultContainer keyword={searchParams.keyword as string} type={searchParams.type as string} />
          </Suspense>
        ) : (
          <EmptyDataContainer />
        )}
      </div>
    </div>
  );
}
