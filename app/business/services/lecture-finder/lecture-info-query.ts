import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { fetchLectureInfo, fetchLectureInfoPaged } from './lecture-info.command';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { LectureInfoPagedResult } from './lecture-finder.types';

export const useFetchLectureInfo = (subject: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.LECTURE_INFO, subject],
    queryFn: () => fetchLectureInfo({ subject }),
  });
};

export const useFetchInfiniteLectureInfo = (subject: string, professor: string, page: number, size: number) => {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.LECTURE_INFO, subject, professor],
    queryFn: ({ pageParam }) => {
      return fetchLectureInfoPaged({
        subject,
        professor,
        page: pageParam as number,
        size,
      });
    },
    getNextPageParam: (lastPage: LectureInfoPagedResult) => {
      return lastPage.nextPage;
    },
    initialPageParam: page,
  });
};
