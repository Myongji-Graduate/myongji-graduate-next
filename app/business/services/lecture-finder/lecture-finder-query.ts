'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type { NormalizedPage } from '@/app/business/services/lecture-finder/lecture-finder.types';
import {
  fetchPopularByCategoryPaged,
  fetchPopularAllPaged,
} from '@/app/business/services/lecture-finder/lecture-finder.command';
import type { PendingFilters } from '@/app/(sub-page)/lecture-finder/components/type';

const DEFAULT_LIMIT = 10;

const CATEGORY_ORDER = [
  'BASIC_ACADEMICAL_CULTURE',
  'CORE_CULTURE',
  'COMMON_CULTURE',
  'MANDATORY_MAJOR',
  'ELECTIVE_MAJOR',
] as const;

function getNextCategory(currentCategory: string | undefined): string | undefined {
  if (!currentCategory) return CATEGORY_ORDER[0];
  const currentIndex = CATEGORY_ORDER.indexOf(currentCategory as (typeof CATEGORY_ORDER)[number]);
  if (currentIndex === -1 || currentIndex === CATEGORY_ORDER.length - 1) return undefined;
  return CATEGORY_ORDER[currentIndex + 1];
}

type UseFetchByCategoryParams = {
  committed: PendingFilters;
  didSearch: boolean;
};

export const useFetchInfiniteLecturesByCategory = ({ committed, didSearch }: UseFetchByCategoryParams) => {
  const finalPopularQuery = {
    major: committed.major,
    entryYear: committed.year ?? new Date().getFullYear().toString(),
    category: committed.category,
  };

  const isAll = committed.category === 'ALL';

  const queryFn = ({ pageParam }: any) => {
    if (isAll) {
      const categoryName = pageParam?.categoryName;
      return fetchPopularAllPaged({
        ...finalPopularQuery,
        cursor: pageParam?.cursor,
        limit: pageParam?.limit ?? DEFAULT_LIMIT,
        categoryName,
      });
    }
    return fetchPopularByCategoryPaged({
      ...finalPopularQuery,
      cursor: pageParam?.cursor,
      limit: pageParam?.limit ?? limit,
    });
  };

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.LECTURE_FINDER, isAll ? 'popularAll' : 'popularByCategory', finalPopularQuery],
    initialPageParam: { cursor: undefined, limit: DEFAULT_LIMIT, categoryName: undefined },
    queryFn,
    getNextPageParam: (last: NormalizedPage, allPages: NormalizedPage[]) => {
      if (!last) return undefined;

      if (isAll) {
        if (last.pageInfo.hasMore) {
          return {
            cursor: last.pageInfo.nextCursor,
            limit: last.pageInfo.pageSize ?? DEFAULT_LIMIT,
            categoryName: last.categoryName || allPages[0]?.categoryName,
          };
        } else {
          const currentCategory = last.categoryName || allPages[0]?.categoryName;
          const nextCategory = getNextCategory(currentCategory);
          if (nextCategory) {
            return {
              cursor: undefined,
              limit: DEFAULT_LIMIT,
              categoryName: nextCategory,
            };
          }
          return undefined;
        }
      }
      return last.pageInfo.hasMore
        ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? DEFAULT_LIMIT, categoryName: undefined }
        : undefined;
    },
    enabled: didSearch,
    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });
};
