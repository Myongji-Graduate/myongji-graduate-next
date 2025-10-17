'use client';

import { useMemo } from 'react';
import { useFindLectures, usePopularLectures } from '@/app/business/services/lecture-finder/lecture-finder.query';
import type { PendingFilters, CategoryKey, Year, Major } from '@/app/(sub-page)/lecture-finder/components/type';
import type { PopularByCategoryQuery } from '@/app/business/services/lecture-finder/lecture-finder.types';

const LIMIT = 10;

type Params = {
  committed: PendingFilters;
  didSearch: boolean;
};

export function useLectureFinderData({ committed, didSearch }: Params) {
  const hasMajor = committed.major !== '';
  const hasYear = committed.year !== '';
  const hasCategory = committed.category !== 'all';

  const isInitial = !didSearch && !hasMajor && !hasYear && committed.category === 'all' && committed.sort === null;

  const popularQuery = useMemo<PopularByCategoryQuery | null>(() => {
    if (!didSearch || !hasMajor || !hasYear || !hasCategory) return null;
    return {
      major: committed.major as Major,
      entryYear: committed.year as Year,
      category: committed.category as Exclude<CategoryKey, 'all'>,
      limit: LIMIT,
    };
  }, [didSearch, hasMajor, hasYear, hasCategory, committed.major, committed.year, committed.category]);

  const popular = usePopularLectures(popularQuery, !!popularQuery);
  const find = useFindLectures({ limit: LIMIT }, isInitial);

  const usingPopular = didSearch;
  const isAll = committed.category === 'all';

  return {
    isAll,
    usingPopular,

    popularData: popular.data,
    loadingPopular: popular.isLoading,
    errorPopular: popular.error as Error | null,

    findData: find.data,
    loadingFind: find.isLoading,
    errorFind: find.error as Error | null,
  };
}
