'use server';

import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export interface TimetableQuery {
  year: number;
  semester: number;
}

export interface UploadTimetableQuery extends TimetableQuery {
  lecturesIds: number[];
}

export const uploadTimetable = async ({ year, semester, lecturesIds }: UploadTimetableQuery) => {
  await instance.post(`${API_PATH.timetable}/my/replace`, {
    year,
    semester,
    timetableIds: lecturesIds,
  });
};

export const fetchTimetable = async ({ year, semester }: TimetableQuery) => {
  const response = await instance.get(`${API_PATH.timetable}/my?year=${year}&semester=${semester}`, {});
  return response.data;
};

export const deleteTimetable = async ({ year, semester }: TimetableQuery) => {
  await instance.post(`${API_PATH.timetable}/my/delete`, { year, semester });
};
