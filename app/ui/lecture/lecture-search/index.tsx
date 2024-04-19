import React from 'react';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';

interface LectureSearchProps {
  searchParams: {
    keyword?: string;
    type?: string;
  };
}
export default function LectureSearch({ searchParams }: LectureSearchProps) {
  return (
    <div className="bg-white  w-full h-[500px] sm:h-[400px] z-[10] flex justify-center" data-testid="lecture-search">
      <div className="w-[800px] mx-auto my-7  flex flex-col gap-10 sm:gap-6">
        <LectureSearchBar />
        <LectureSearchResultContainer searchParams={searchParams} />
      </div>
    </div>
  );
}
