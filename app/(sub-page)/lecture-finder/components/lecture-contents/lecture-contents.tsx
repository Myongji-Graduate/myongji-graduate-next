'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import LectureFilters from './lecture-filters';
import LectureTable from './lecture-table';
import { useLectureFinderForm } from '@/app/business/hooks/use-lecture-finder-form.hook';
import {
  useFetchInfiniteLectures,
  useFetchInfiniteLecturesByCategory,
} from '@/app/business/services/lecture-finder/lecture-finder-query';
import { useInView } from 'react-intersection-observer';
import type { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';

export default function LectureContents() {
  const { pending, committed, didSearch, handleMajorChange, handleYearChange, handleCategoryChange, handleSearch } =
    useLectureFinderForm({});

  const { ref, inView } = useInView();
  const [showLectureMode, setShowLectureMode] = useState<'default' | 'category'>('default');

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
  } = useFetchInfiniteLecturesByCategory({ committed, didSearch });

  const currentRawData = showLectureMode === 'default' ? defaultData : categoryData;

  const currentLectures: TimetableLectureRow[] = useMemo(() => {
    if (!currentRawData) {
      return [];
    }

    return currentRawData.pages.flatMap((page) => page.items as TimetableLectureRow[]);
  }, [currentRawData]);

  const fetchNextPage = showLectureMode === 'default' ? fetchNextDefaultPage : fetchNextCategoryPage;
  const hasNextPage = showLectureMode === 'default' ? hasNextDefaultPage : hasNextCategoryPage;
  const isFetching = showLectureMode === 'default' ? isFetchingDefault : isFetchingCategory;

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetching, fetchNextPage]);

  const handleSearchAndChangeMode = useCallback(() => {
    handleSearch();

    setShowLectureMode('category');
  }, [handleSearch]);

  const usingPopular = showLectureMode === 'default';

  return (
    <div className="flex h-50 flex-col px-3 gap-5 py-5">
      <LectureFilters
        filters={pending}
        onMajorChange={handleMajorChange}
        onYearChange={handleYearChange}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearchAndChangeMode}
      />

      {usingPopular ? (
        <LectureTable lastContentRef={ref} popularData={currentLectures} />
      ) : (
        <LectureTable lastContentRef={ref} findData={currentLectures} />
      )}
    </div>
  );
}
