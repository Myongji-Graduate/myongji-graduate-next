'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import {
  fetchPopularInit,
  fetchPopularByCategory,
} from '@/app/business/services/lecture-finder/lecture-finder.command';
import type {
  LectureRowsResponse,
  PopularInitQuery,
  PopularByCategoryQuery,
} from '@/app/business/services/lecture-finder/lecture-finder.types';

export const useFindLectures = (query: PopularInitQuery, enabled = true) =>
  useQuery<LectureRowsResponse>({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'find', query],
    queryFn: () => fetchPopularInit(query),
    enabled,
  });

export const usePopularLectures = (query: PopularByCategoryQuery | null, enabled = true) =>
  useQuery<LectureRowsResponse>({
    queryKey: [QUERY_KEY.LECTURE_FINDER, 'popularByCategory', query ?? 'disabled'],
    queryFn: () => fetchPopularByCategory(query as PopularByCategoryQuery),
    enabled: enabled && !!query,
  });
