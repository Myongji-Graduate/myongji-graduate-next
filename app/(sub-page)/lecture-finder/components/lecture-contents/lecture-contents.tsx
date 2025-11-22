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
  } = useFetchInfiniteLecturesByCategory({ committed, didSearch });

  useEffect(() => {
    if (categoryData && !isFetchingCategory && !isCategoryError) {
      const merged = categoryData.pages.flatMap((p) => p.items as TimetableLectureRow[]);
      setCategoryLectures(merged);
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
      setShowLectureMode('category');
      setInitialLoaded(false);
    }
  }, [handleSearch, setCommitted, setDidSearch]);

  const usingPopular = showLectureMode === 'default';
  const showSkeleton = !initialLoaded && isFetching;

  return (
    <div className="flex h-50 flex-col px-3 py-5">
      <LectureFilterGroup
        filters={pending}
        onMajorChange={handleMajorChange}
        onYearChange={handleYearChange}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearchAndChangeMode}
      />

      {usingPopular ? (
        <LectureTable isLoading={showSkeleton} lastContentRef={ref} popularData={currentLectures} />
      ) : (
        <LectureTable isLoading={showSkeleton} lastContentRef={ref} findData={currentLectures} />
      )}
    </div>
  );
}
