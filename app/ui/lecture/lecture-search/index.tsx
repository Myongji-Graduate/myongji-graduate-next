'use client';
import { useAtomValue } from 'jotai';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';
import { searchWordAtom } from '@/app/store/search-word';
import EmptyDataContainer from './empty-data-container';
import { Suspense } from 'react';

export default function LectureSearch() {
  const searchWord = useAtomValue(searchWordAtom);
  const searchable = searchWord.keyword && searchWord.keyword.length > 1;
  return (
    <div className="bg-white  w-full h-[500px] sm:h-[400px] z-[10] flex justify-center" data-testid="lecture-search">
      <div className="w-[800px] mx-auto my-7  flex flex-col gap-10 sm:gap-6">
        <LectureSearchBar />
        {searchable ? (
          <Suspense fallback={<p>,,,loading</p>}>
            <LectureSearchResultContainer />
          </Suspense>
        ) : (
          <EmptyDataContainer />
        )}
      </div>
    </div>
  );
}
