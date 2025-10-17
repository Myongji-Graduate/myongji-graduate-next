'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type { PopularInitQuery, PopularByCategoryQuery, NormalizedPage } from './lecture-finder.types';
import { fetchPopularInitPaged, fetchPopularByCategoryPaged } from './lecture-finder.command';

type PageParam = { cursor?: string; limit?: number };

export function useInfinitePopularInit(query: PopularInitQuery, enabled = true) {
  return useInfiniteQuery<NormalizedPage, Error, NormalizedPage, (string | PopularInitQuery)[], PageParam>({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularInit', query],
    enabled,
    initialPageParam: { cursor: undefined, limit: query.limit },
    queryFn: ({ pageParam }) =>
      fetchPopularInitPaged({ ...query, cursor: pageParam?.cursor, limit: pageParam?.limit ?? query.limit }),
    getNextPageParam: (last) => {
      if (!last.pageInfo.hasMore) return undefined;

      return { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? undefined };
    },
  });
}

export function useInfinitePopularByCategory(query: PopularByCategoryQuery | null, enabled = true) {
  return useInfiniteQuery<
    NormalizedPage,
    Error,
    NormalizedPage,
    (string | PopularByCategoryQuery | 'disabled')[],
    PageParam
  >({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularByCategory', query ?? 'disabled'],
    enabled: enabled && !!query,
    initialPageParam: { cursor: undefined, limit: query?.limit },
    queryFn: ({ pageParam }) =>
      fetchPopularByCategoryPaged({
        ...(query as PopularByCategoryQuery),
        cursor: pageParam?.cursor,
        limit: pageParam?.limit ?? query?.limit,
      }),
    getNextPageParam: (last) => {
      if (!last.pageInfo.hasMore) return undefined;
      return { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? undefined };
    },
  });
}
