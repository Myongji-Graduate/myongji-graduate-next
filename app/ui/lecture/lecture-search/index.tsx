'use client';
import { useAtomValue } from 'jotai';
import LectureSearchBar from './lecture-search-bar';
import { searchWordAtom } from '@/app/store/search-word';
import { Suspense } from 'react';
import Image from 'next/image';
import searchResultIcon from '@/public/assets/searchResultIcon.svg';
import List from '../../view/molecule/list';
import LoadingSpinner from '../../view/atom/loading-spinner/loading-spinner';
import LectureSearchResult from './lecture-search-result';

const emptyDataRender = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Image src={searchResultIcon} alt="search-result-icon" width={40} height={40} />
      <div className="text-md font-medium text-gray-400 text-center whitespace-pre-wrap">
        검색 결과가 표시됩니다
        <br />한 글자 이상 검색해주세요
      </div>
    </div>
  );
};

export default function LectureSearch() {
  const searchWord = useAtomValue(searchWordAtom);
  const searchable = searchWord.keyword && searchWord.keyword.length > 1;

  return (
    <div className="bg-white  w-full h-[520px] sm:h-[420px] z-[10] flex justify-center" data-testid="lecture-search">
      <div className="w-[800px] mx-auto my-7  flex flex-col gap-10 sm:gap-6">
        <LectureSearchBar />

        {searchable ? (
          <Suspense
            fallback={
              <div className="rounded-xl border-[1px] border-gray-300 w-full h-72 overflow-auto flex justify-center items-center">
                <LoadingSpinner
                  className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
                  style={{ transition: `width 150ms` }}
                />
              </div>
            }
          >
            <LectureSearchResult />
          </Suspense>
        ) : (
          <List data={[]} isScrollList={true} emptyDataRender={emptyDataRender} />
        )}
      </div>
    </div>
  );
}
