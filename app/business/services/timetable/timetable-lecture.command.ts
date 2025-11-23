'use server';

import { TimetableLectureRow } from '@/app/business/services/timetable/types';
import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export interface TimetableLectureQuery {
  year: number;
  semester: number;
  campus?: string;
  filter?: string;
  keyword?: string;
  professor?: string;
  recommendedCategory?: string;
}

export const fetchSearchTimetableLectures = async ({
  year,
  semester,
  campus = '',
  filter = '',
  keyword = '',
  professor = '',
  recommendedCategory,
}: TimetableLectureQuery): Promise<TimetableLectureRow[]> => {
  const searchParams = new URLSearchParams({
    year: String(year),
    semester: String(semester),
    campus,
    filter,
    keyword,
    professor,
  });

  if (recommendedCategory) {
    searchParams.set('recommendedCategory', recommendedCategory);
  }

  const response = await instance.get<TimetableLectureRow[]>(
    `${API_PATH.timetableLectures}/filter?${searchParams.toString()}`,
  );
  return response.data;
};
