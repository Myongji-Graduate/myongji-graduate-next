'use server';

import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';
import { TimetableLecturePagedResult } from './recommend-lecture.type';

export interface TimetableLectureQuery {
  year: number;
  semester: number;
  campus?: string;
  filter?: string;
  keyword?: string;
  professor?: string;
  recommendedCategory?: string;
  page?: number;
  limit?: number;
}

export const fetchSearchTimetableLectures = async ({
  year,
  semester,
  campus = '',
  filter = '',
  keyword = '',
  professor = '',
  recommendedCategory,
  page = 1,
  limit = 10,
}: TimetableLectureQuery): Promise<TimetableLecturePagedResult> => {
  const searchParams = new URLSearchParams({
    year: String(year),
    semester: String(semester),
    campus,
    filter,
    keyword,
    professor,
    page: String(page),
    limit: String(limit),
  });

  if (recommendedCategory) {
    searchParams.set('recommendedCategory', recommendedCategory);
  }

  const response = await instance.get(`${API_PATH.timetableLectures}?${searchParams.toString()}`);
  return response.data;
};
