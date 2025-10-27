'use server';

import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export interface uploadTimetableQuery {
  year: number;
  semester: number;
  lecturesIds: number[];
}

export const uploadTimetable = async ({ year, semester, lecturesIds }: uploadTimetableQuery) => {
  await instance.post(`${API_PATH.timetable}/my/replace`, {
    year,
    semester,
    timetableIds: lecturesIds,
  });
};

export const fetchTimetable = async (year: number, semester: number) => {
  const response = await instance.get(`${API_PATH.timetable}/my?year=${year}&semester=${semester}`, {});
  return response.data;
};

export const deleteTimetable = async (year: number, semester: number) => {
  await instance.post(`${API_PATH.timetable}/my/delete`, { year, semester });
};
