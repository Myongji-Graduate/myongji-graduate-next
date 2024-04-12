'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { isAddedLectureAtom } from '@/app/store/custom-taken-lecture';
import Button from '../../view/atom/button/button';
import LectureSearchBar from './lecture-search-bar';
import LectureSearchResultContainer from './lecture-search-result-container';
import Responsive from '../../responsive';

export default function LectureSearch() {
  const [isAddedLecture, setIsAddedLecture] = useAtom(isAddedLectureAtom);
  if (!isAddedLecture) return null;
  return (
    <Responsive minWidth={1024}>
      <div className="absolute left-0 bottom-0 bg-white border-t border-gray-300 w-full h-[400px] z-[10] flex justify-center">
        <div className="h-10% w-[800px] mx-auto my-7 flex flex-col gap-6">
          <LectureSearchBar />
          <LectureSearchResultContainer />
        </div>

        <Button
          label="닫기"
          variant="primary"
          size="default"
          className="absolute right-6 top-2 text-sm font-medium px-3 py-2"
          onClick={() => {
            setIsAddedLecture(false);
          }}
        />
      </div>
    </Responsive>
  );
}
