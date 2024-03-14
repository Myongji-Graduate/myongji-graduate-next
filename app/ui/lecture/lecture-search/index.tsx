'use client';
import React from 'react';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';
import { isCustomizingAtom } from '@/app/store/custom-taken-lecture';
import { useAtomValue } from 'jotai';

export default function LectureSearch() {
  const isCustomizing = useAtomValue(isCustomizingAtom);
  if (!isCustomizing) return null;
  return (
    <div className="flex flex-col gap-4" data-testid="lecture-search-component">
      <LectureSearchBar />
      <LectureSearchResultContainer />
    </div>
  );
}
