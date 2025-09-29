'use client';

import { timetableLectureFilterAtom } from '@/app/store/stores/timetable-lecture';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { CURRENT_YEAR, CURRENT_SEMESTER } from '@/app/utils/timetable/constants';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { fetchSearchTimetableLecturesClient } from './timetable-lecture.client';

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
    queryFn: () =>
      fetchSearchTimetableLecturesClient({
        year: CURRENT_YEAR,
        semester: CURRENT_SEMESTER,
        campus: filters.campus,
        filter: filters.filter,
        keyword: filters.keyword,
        professor: filters.professor,
        recommendedCategory: filters.recommendedCategory,
      }),
  });
};
