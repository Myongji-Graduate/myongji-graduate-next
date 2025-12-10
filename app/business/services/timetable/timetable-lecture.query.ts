'use client';

import { timetableLectureFilterAtom } from '@/app/store/stores/timetable-lecture';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_YEAR, CURRENT_SEMESTER, TIMETABLE_LECTURE_LIMIT } from '@/app/business/services/timetable/constants';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { fetchSearchTimetableLectures } from './timetable-lecture.command';
import { toast } from '@/app/ui/view/molecule/toast/use-toast';

export const useFetchSearchTimetableLecture = () => {
  const filters = useAtomValue(timetableLectureFilterAtom);

  const query = useInfiniteQuery({
    queryKey: [
      QUERY_KEY.SEARCH_TIMETABLE_LECTURE,
      filters.campus,
      filters.filter,
      filters.keyword,
      filters.professor,
      filters.recommendedCategory,
    ],
    queryFn: ({ pageParam }) => {
      return fetchSearchTimetableLectures({
        year: CURRENT_YEAR,
        semester: CURRENT_SEMESTER,
        campus: filters.campus,
        filter: filters.filter,
        keyword: filters.keyword,
        professor: filters.professor,
        recommendedCategory: filters.recommendedCategory,
        page: pageParam as number,
        limit: TIMETABLE_LECTURE_LIMIT,
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? null;
    },
  });

  if (query.isError) {
    toast({
      title: '검색 중 오류가 발생했습니다.',
      variant: 'destructive',
    });
  }

  return query;
};
