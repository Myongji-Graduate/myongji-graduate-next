'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type {
  NormalizedPage,
  PopularByCategoryQuery,
} from '@/app/business/services/lecture-finder/lecture-finder.types';
import {
  fetchPopularByCategoryPaged,
  fetchPopularInitPaged,
} from '@/app/business/services/lecture-finder/lecture-finder.command';
import type { PendingFilters } from '@/app/(sub-page)/lecture-finder/components/type';

const DEFAULT_LIMIT = 10;
const limit = DEFAULT_LIMIT;

type PageParam = { cursor?: string; limit?: number };

export const useFetchInfiniteLectures = () => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularInit'],
    initialPageParam: { cursor: undefined, limit },
    queryFn: ({ pageParam }) =>
      fetchPopularInitPaged({
        limit: pageParam?.limit,
        cursor: pageParam?.cursor,
      }),
    getNextPageParam: (last: NormalizedPage) =>
      last.pageInfo.hasMore ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? limit } : undefined,
  });
};

type UseFetchByCategoryParams = {
  committed: PendingFilters;
  didSearch: boolean;
};

export const useFetchInfiniteLecturesByCategory = ({ committed, didSearch }: UseFetchByCategoryParams) => {
  const finalPopularQuery: PopularByCategoryQuery = {
    ...(committed as unknown as PopularByCategoryQuery),
    entryYear: (committed as any).year ?? new Date().getFullYear().toString(),
  };

  const enabled = didSearch;

  return useInfiniteQuery({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularByCategory', finalPopularQuery],
    initialPageParam: { cursor: undefined, limit: finalPopularQuery.limit ?? limit } as PageParam,
    queryFn: ({ pageParam }) =>
      fetchPopularByCategoryPaged({
        ...finalPopularQuery,
        cursor: pageParam?.cursor,
        limit: pageParam?.limit ?? finalPopularQuery.limit ?? limit,
      }),
    getNextPageParam: (last: NormalizedPage) =>
      last.pageInfo.hasMore
        ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? finalPopularQuery.limit ?? limit }
        : undefined,
    enabled: enabled,
  });
};
