import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer, { LectureSearchResultContainerSpinner } from './lecture-search-result-container';
import EmptyDataContainer from './empty-data-container';
import { Suspense } from 'react';
import { LectureSearchParams } from '@/app/type/lecture';

interface LectureSearchProps {
  searchParams: LectureSearchParams;
}
export default function LectureSearch({ searchParams }: LectureSearchProps) {
  const isSearchable = searchParams.type && searchParams.keyword && searchParams.keyword.length > 1;

  return (
    <div className="bg-white  w-full h-[500px] sm:h-[400px] z-[10] flex justify-center" data-testid="lecture-search">
      <div className="w-[800px] mx-auto my-7  flex flex-col gap-10 sm:gap-6">
        <LectureSearchBar />
        {isSearchable ? (
          <Suspense
            key={`${searchParams.keyword}${searchParams.type}`}
            fallback={<LectureSearchResultContainerSpinner />}
          >
            <LectureSearchResultContainer keyword={searchParams.keyword as string} type={searchParams.type as string} />
          </Suspense>
        ) : (
          <EmptyDataContainer />
        )}
      </div>
    </div>
  );
}
