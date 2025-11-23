'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import LectureFilterGroup from './lecture-filter-group';
import LectureTable from './lecture-table';
import { useLectureFinderForm } from '@/app/business/hooks/use-lecture-finder-form.hook';
import {
  useFetchInfiniteLectures,
  useFetchInfiniteLecturesByCategory,
} from '@/app/business/services/lecture-finder/lecture-finder-query';
import { useInView } from 'react-intersection-observer';
import type { TimetableLectureRow } from '@/app/type/timetable/types';
import Image from 'next/image';
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
  const [showLectureMode, setShowLectureMode] = useState<'default' | 'category'>('default');
  const [categoryLectures, setCategoryLectures] = useState<TimetableLectureRow[]>([]);
  const [initialLoaded, setInitialLoaded] = useState(false);

  const {
    data: defaultData,
    fetchNextPage: fetchNextDefaultPage,
    hasNextPage: hasNextDefaultPage,
    isFetching: isFetchingDefault,
  } = useFetchInfiniteLectures();

  const {
    data: categoryData,
    fetchNextPage: fetchNextCategoryPage,
    hasNextPage: hasNextCategoryPage,
    isFetching: isFetchingCategory,
    isError: isCategoryError,
    error: categoryError,
  } = useFetchInfiniteLecturesByCategory({ committed, didSearch });

  useEffect(() => {
    if (isCategoryError) {
      setShowLectureMode('category');
      return;
    }

    if (categoryData && !isFetchingCategory) {
      const merged = categoryData.pages.flatMap((p) => p.items as TimetableLectureRow[]);
      setCategoryLectures(merged);

      if (showLectureMode === 'default') {
        setShowLectureMode('category');
      }
    }
  }, [categoryData, isFetchingCategory, isCategoryError, showLectureMode]);

  useEffect(() => {
    if (showLectureMode === 'default' && defaultData && !initialLoaded) {
      setInitialLoaded(true);
    }
  }, [showLectureMode, defaultData, initialLoaded]);

  useEffect(() => {
    if (showLectureMode === 'category' && categoryData && !initialLoaded) {
      setInitialLoaded(true);
    }
  }, [showLectureMode, categoryData, initialLoaded]);

  const currentLectures: TimetableLectureRow[] = useMemo(() => {
    if (showLectureMode === 'default') {
      if (!defaultData) return [];
      return defaultData.pages.flatMap((page) => page.items as TimetableLectureRow[]);
    }
    return categoryLectures;
  }, [showLectureMode, defaultData, categoryLectures]);

  const fetchNextPage = showLectureMode === 'default' ? fetchNextDefaultPage : fetchNextCategoryPage;
  const hasNextPage = showLectureMode === 'default' ? hasNextDefaultPage : hasNextCategoryPage;
  const isFetching = showLectureMode === 'default' ? isFetchingDefault : isFetchingCategory;

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const handleSearchAndChangeMode = useCallback(() => {
    const validate = handleSearch();
    if (validate) {
      setCommitted(validate);
      setDidSearch(true);
      setInitialLoaded(false);
    }
  }, [handleSearch, setCommitted, setDidSearch]);

  const usingPopular = showLectureMode === 'default';
  const showSkeleton = !initialLoaded && isFetching;

  let content;

  if (showLectureMode === 'category' && isCategoryError && categoryError) {
    const errorMessage =
      categoryError instanceof Error ? categoryError.message : '알 수 없는 검색 오류가 발생했습니다.';

    content = (
      <div className="flex h-full flex-col items-center justify-center pt-5 text-center">
        <Image src={NoResult} alt="no-result-maru" width={160} className="opacity-90" />

        <p className="text-xl font-semibold text-gray-700">{errorMessage}</p>

        <div className="mt-2 text-gray-500 pb-5">
          <p className="text-base font-medium py-1">내가 원하는 과목 정보가 없나요?</p>
          <p className="text-sm">우측 하단 채널톡으로 문의해주세요.</p>
        </div>
      </div>
    );
  } else if (usingPopular) {
    content = <LectureTable isLoading={showSkeleton} lastContentRef={ref} popularData={currentLectures} />;
  } else {
    content = <LectureTable isLoading={showSkeleton} lastContentRef={ref} findData={currentLectures} />;
  }

  return (
    <div className="flex h-50 flex-col px-3 py-5">
      <LectureFilterGroup
        filters={pending}
        onMajorChange={handleMajorChange}
        onYearChange={handleYearChange}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearchAndChangeMode}
      />

      {content}
    </div>
  );
}
