import { API_PATH } from '../../api-path';
import { TimetableLecturePagedResult } from './recommend-lecture.type';
import { getToken } from '../auth';
import fetchAX from 'fetch-ax';
import { TIMETABLE_LECTURE_LIMIT, TIMETABLE_LECTURE_PAGE } from './constants';

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
  page = TIMETABLE_LECTURE_PAGE,
  limit = TIMETABLE_LECTURE_LIMIT,
}: TimetableLectureQuery): Promise<TimetableLecturePagedResult> => {
  const token = await getToken();

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

  const response = await fetchAX.get(`${API_PATH.timetableLectures}?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
