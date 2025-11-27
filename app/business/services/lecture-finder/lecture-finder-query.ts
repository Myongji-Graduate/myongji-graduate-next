'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type { NormalizedPage } from '@/app/business/services/lecture-finder/lecture-finder.types';
import {
  fetchPopularByCategoryPaged,
  fetchPopularInitPaged,
} from '@/app/business/services/lecture-finder/lecture-finder.command';
import type { PendingFilters } from '@/app/(sub-page)/lecture-finder/components/type';

const DEFAULT_LIMIT = 10;
const limit = DEFAULT_LIMIT;

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
  const finalPopularQuery = {
    major: committed.major,
    entryYear: committed.year ?? new Date().getFullYear().toString(),
    category: committed.category,
  };

  const queryFn = ({ pageParam }: any) =>
    fetchPopularByCategoryPaged({
      ...finalPopularQuery,
      cursor: pageParam?.cursor,
      limit: pageParam?.limit ?? limit,
    });

  const queryResoult = useInfiniteQuery({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularByCategory'],
    initialPageParam: { cursor: undefined, limit },
    queryFn,
    getNextPageParam: (last: NormalizedPage) =>
      last.pageInfo.hasMore ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? limit } : undefined,
    enabled: didSearch,

    retry: false,
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  return queryResoult;
};
