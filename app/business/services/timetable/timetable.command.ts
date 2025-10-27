'use server';

import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export interface timetableQuery {
  year: number;
  semester: number;
}

export interface uploadTimetableQuery extends timetableQuery {
  lecturesIds: number[];
}

export const uploadTimetable = async ({ year, semester, lecturesIds }: uploadTimetableQuery) => {
  await instance.post(`${API_PATH.timetable}/my/replace`, {
    year,
    semester,
    timetableIds: lecturesIds,
  });
};

export const fetchTimetable = async ({ year, semester }: timetableQuery) => {
  const response = await instance.get(`${API_PATH.timetable}/my?year=${year}&semester=${semester}`, {});
  return response.data;
};

export const deleteTimetable = async ({ year, semester }: timetableQuery) => {
  await instance.post(`${API_PATH.timetable}/my/delete`, { year, semester });
};
