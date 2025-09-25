'use server';

import { TimetableLectureRow } from '@/app/type/timetable/types';
import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export const fetchSearchTimetableLectures = async (
  year: number,
  semester: number,
  campus: string,
  filter: string,
  keyword: string,
  professor: string,
  recommendedCategory?: string,
) => {
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

  const response = await instance.get<TimetableLectureRow[]>(
    `${API_PATH.timetableLectures}/filter?${searchParams.toString()}`,
  );
  return response.data;
};
