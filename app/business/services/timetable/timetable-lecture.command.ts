'use server';

import { TimetableLectureRow } from '@/app/type/timetable/types';
import fetchAX from 'fetch-ax';
import { API_PATH } from '../../api-path';
import { getToken } from '../auth';

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
  const searchParams = new URLSearchParams({
    year: String(year),
    semester: String(semester),
    campus,
    filter,
    keyword,
    professor,
  });

  if (recommendedCategory !== undefined) {
    searchParams.set('recommendedCategory', recommendedCategory);
  }

  const response = await fetchAX.get<TimetableLectureRow[]>(
    `${API_PATH.timetableLectures}/filter?${searchParams.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
