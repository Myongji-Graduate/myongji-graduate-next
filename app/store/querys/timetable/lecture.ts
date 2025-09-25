import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import fetchAX from 'fetch-ax';
import { timetableLectureFilterAtom } from '../../stores/timetable-lecture';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@/app/utils/timetable/constants';

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
    queryFn: () => {
      return fetchSearchTimetableLectures(
        CURRENT_YEAR,
        CURRENT_SEMESTER,
        filters.campus,
        filters.filter,
        filters.keyword,
        filters.professor,
        filters.recommendedCategory,
      );
    },
  });
};

export const fetchSearchTimetableLectures = async (
  year: number,
  semester: number,
  campus: string,
  filter: string,
  keyword: string,
  professor: string,
  recommendedCategory?: string,
) => {
  const token = await getToken();
  const response = await fetchAX.get<TimetableLectureRow[]>(
    `${API_PATH.timetableLectures}/filter?year=${year}&semester=${semester}&campus=${campus}&filter=${filter}&keyword=${keyword}&professor=${professor}&recommendedCategory=${recommendedCategory}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
