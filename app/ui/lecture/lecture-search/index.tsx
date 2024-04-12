'use client';
import React from 'react';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';

export default function LectureSearch() {
  return (
    <div className="bg-white  w-full h-[400px] z-[10] flex justify-center">
      <div className="h-10% w-[800px] mx-auto my-7 flex flex-col gap-6">
        <LectureSearchBar />
        <LectureSearchResultContainer />
      </div>
    </div>
  );
}
