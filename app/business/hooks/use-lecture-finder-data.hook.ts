'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useInfiniteQuery, type InfiniteData, type QueryKey } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import type {
  NormalizedPage,
  PopularByCategoryQuery,
  PopularInitQuery,
} from '@/app/business/services/lecture-finder/lecture-finder.types';
import {
  fetchPopularByCategoryPaged,
  fetchPopularInitPaged,
} from '@/app/business/services/lecture-finder/lecture-finder.command';
import type { PendingFilters, CategoryKey, Year, Major } from '@/app/(sub-page)/lecture-finder/components/type';

const DEFAULT_LIMIT = 10;
type PageParam = { cursor?: string; limit?: number };

type Params = {
  committed: PendingFilters;
  didSearch: boolean;
  limit?: number;
  rootRef?: React.RefObject<HTMLElement | null>;
  rootMargin?: string;
};

export function useLectureFinderData({
  committed,
  didSearch,
  limit = DEFAULT_LIMIT,
  rootRef,
  rootMargin = '300px 0px',
}: Params) {
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
      limit,
    };
  }, [didSearch, hasMajor, hasYear, hasCategory, committed.major, committed.year, committed.category, limit]);

  const initList = useInfiniteQuery<
    NormalizedPage,
    Error,
    InfiniteData<NormalizedPage>,
    (string | { limit: number })[] & QueryKey,
    PageParam
  >({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularInit', { limit }],
    enabled: isInitial,
    initialPageParam: { cursor: undefined, limit },
    queryFn: ({ pageParam }) =>
      fetchPopularInitPaged({
        limit: pageParam?.limit ?? limit,
        cursor: pageParam?.cursor,
      } as PopularInitQuery & { cursor?: string }),
    getNextPageParam: (last) =>
      last.pageInfo.hasMore ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? limit } : undefined,
    staleTime: 30_000,
    gcTime: 300_000,
  });

  const popular = useInfiniteQuery<
    NormalizedPage,
    Error,
    InfiniteData<NormalizedPage>,
    (string | PopularByCategoryQuery | 'disabled')[] & QueryKey,
    PageParam
  >({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularByCategory', popularQuery ?? 'disabled'],
    enabled: !!popularQuery,
    initialPageParam: { cursor: undefined, limit: popularQuery?.limit ?? limit },
    queryFn: ({ pageParam }) =>
      fetchPopularByCategoryPaged({
        ...(popularQuery as PopularByCategoryQuery),
        cursor: pageParam?.cursor,
        limit: pageParam?.limit ?? popularQuery?.limit ?? limit,
      }),
    getNextPageParam: (last) =>
      last.pageInfo.hasMore
        ? { cursor: last.pageInfo.nextCursor, limit: last.pageInfo.pageSize ?? popularQuery?.limit ?? limit }
        : undefined,
    staleTime: 30_000,
    gcTime: 300_000,
  });

  const popularRows = useMemo(() => (popular.data?.pages ?? []).flatMap((p) => p.items), [popular.data]);
  const initRows = useMemo(() => (initList.data?.pages ?? []).flatMap((p) => p.items), [initList.data]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    const rootEl = rootRef?.current ?? null;
    if (!el) return;

    const ob = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e?.isIntersecting) return;

        if (didSearch) {
          if (popular.hasNextPage && !popular.isFetchingNextPage) void popular.fetchNextPage();
        } else {
          if (initList.hasNextPage && !initList.isFetchingNextPage) void initList.fetchNextPage();
        }
      },
      { root: rootEl, rootMargin, threshold: 0 },
    );

    ob.observe(el);
    return () => ob.disconnect();
  }, [didSearch, rootRef, rootMargin, popular, initList]);

  const usingPopular = didSearch;
  const isAll = committed.category === 'all';

  return {
    isAll,
    usingPopular,
    popularRows,
    initRows,
    loadingPopular: popular.isLoading && !popular.data,
    errorPopular: popular.error as Error | null,
    loadingInit: initList.isLoading && !initList.data,
    errorInit: initList.error as Error | null,
    sentinelRef,
    isFetchingNext: popular.isFetchingNextPage || initList.isFetchingNextPage,
  };
}
