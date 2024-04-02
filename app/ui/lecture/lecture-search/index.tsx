'use client';
import React from 'react';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';

export default function LectureSearch() {
  return (
    <div className="flex flex-col gap-4" data-testid="lecture-search-component">
      <LectureSearchBar />
      <LectureSearchResultContainer />
    </div>
  );
}
