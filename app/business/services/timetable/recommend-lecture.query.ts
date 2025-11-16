'use client';

import { RecommendLectureData } from './recommend-lecture.type';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useQuery } from '@tanstack/react-query';
import { fetchRecommendLecture } from './recommend-lecture.command';

export const useFetchRecommendLecture = (enabled: boolean = true) => {
  return useQuery<RecommendLectureData>({
    queryKey: [QUERY_KEY.RECOMMEND_LECTURE],
    queryFn: fetchRecommendLecture,
    enabled,
  });
};
