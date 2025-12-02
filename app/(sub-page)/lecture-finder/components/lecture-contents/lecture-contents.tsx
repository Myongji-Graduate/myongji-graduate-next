'use client';

import { useCallback } from 'react';
import LectureFilterGroup from './lecture-filter-group';
import LectureTable from './lecture-table';
import { useLectureFinderForm } from '@/app/business/hooks/use-lecture-finder-form.hook';
import { useFetchInfiniteLecturesByCategory } from '@/app/business/services/lecture-finder/lecture-finder-query';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Maru from '@/public/assets/graduate-maru.png';
import NoResult from '@/public/assets/no-result-maru.png';

export default function LectureContents() {
  const {
    pending,
    committed,
    didSearch,
    handleMajorChange,
    handleYearChange,
    handleCategoryChange,
    handleSearch,
    setCommitted,
    setDidSearch,
  } = useLectureFinderForm();

  const { ref, inView } = useInView();

  const categoryQuery = useFetchInfiniteLecturesByCategory({
    committed,
    didSearch,
  });

  const handleSearchAndChangeMode = useCallback(() => {
    const validated = handleSearch();
    if (!validated) return;
    setCommitted(validated);
    setDidSearch(true);
  }, [handleSearch, setCommitted, setDidSearch]);

  const activeQuery = categoryQuery;

  if (inView && activeQuery.hasNextPage && !activeQuery.isFetching) {
    activeQuery.fetchNextPage();
  }

  const isError = didSearch && categoryQuery.isError;
  const isLoading = activeQuery.isFetching && !activeQuery.data;
  const isEmpty = activeQuery.data && activeQuery.data.pages.flatMap((p) => p.items).length === 0;

  const lectures = activeQuery.data?.pages.flatMap((p) => p.items) ?? [];

  if (!didSearch) {
    return (
      <Wrapper>
        <LectureFilterGroup
          filters={pending}
          onMajorChange={handleMajorChange}
          onYearChange={handleYearChange}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearchAndChangeMode}
        />

        <InitialView />
      </Wrapper>
    );
  }

  if (isError) {
    const msg = categoryQuery.error instanceof Error ? categoryQuery.error.message : '알 수 없는 오류가 발생했습니다.';

    return (
      <Wrapper>
        <LectureFilterGroup
          filters={pending}
          onMajorChange={handleMajorChange}
          onYearChange={handleYearChange}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearchAndChangeMode}
        />

        <ErrorView message={msg} />
      </Wrapper>
    );
  }

  if (isEmpty) {
    return (
      <Wrapper>
        <LectureFilterGroup
          filters={pending}
          onMajorChange={handleMajorChange}
          onYearChange={handleYearChange}
          onCategoryChange={handleCategoryChange}
          onSearch={handleSearchAndChangeMode}
        />

        <ErrorView message="해당 조건의 강의가 없습니다." />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <LectureFilterGroup
        filters={pending}
        onMajorChange={handleMajorChange}
        onYearChange={handleYearChange}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearchAndChangeMode}
      />

      {lectures.length > 0 && <LectureTable isLoading={isLoading} lastContentRef={ref} findData={lectures} />}
    </Wrapper>
  );
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-50 px-3 py-5">{children}</div>;
}

function InitialView() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <Image src={Maru} width={160} alt="initial-state" className="opacity-90" />

      <p className="text-xl font-semibold text-gray-700 mt-4">학과와 카테고리를 선택해주세요</p>

      <div className="mt-3 text-gray-500">
        <p className="text-base font-medium py-1">원하는 조건을 선택하고 검색해보세요!</p>
        <p className="text-sm">필수 과목을 조회할 수 있습니다.</p>
      </div>
    </div>
  );
}

function ErrorView({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10">
      <Image src={NoResult} width={160} alt="no-result" className="opacity-90" />

      <p className="text-xl font-semibold text-gray-700 mt-4">{message}</p>

      <div className="mt-3 text-gray-500">
        <p className="text-base font-medium py-1">내가 원하는 과목 정보가 없나요?</p>
        <p className="text-sm">우측 하단 채널톡으로 문의해주세요.</p>
      </div>
    </div>
  );
}
