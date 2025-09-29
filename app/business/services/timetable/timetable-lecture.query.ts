'use client';

import { timetableLectureFilterAtom } from '@/app/store/stores/timetable-lecture';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/utils/timetable/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';

export const useFetchSearchTimetableLecture = () => {
  const filters = useAtomValue(timetableLectureFilterAtom);

  return useSuspenseQuery<TimetableLectureRow[]>({
    queryKey: [
      QUERY_KEY.SEARCH_TIMETABLE_LECTURE,
      filters.campus,
      filters.filter,
      filters.keyword,
      filters.professor,
      filters.recommendedCategory,
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        year: CURRENT_YEAR.toString(),
        semester: CURRENT_SEMESTER.toString(),
        campus: filters.campus,
        filter: filters.filter,
        keyword: filters.keyword,
        professor: filters.professor,
        recommendedCategory: filters.recommendedCategory || '',
      });
      const res = await fetch(`/api/timetable-lectures/filter?${params.toString()}`);
      return res.json();
    },
  });
};
