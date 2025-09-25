'use server';

import { API_PATH } from '../../api-path';
import { instance } from '@/app/utils/api/instance';

export const uploadTimetable = async (year: number, semester: number, lecturesIds: number[]) => {
  const response = await instance.post(`${API_PATH.timetable}/my/replace`, {
    year,
    semester,
    timetableIds: lecturesIds,
  });
  return JSON.parse(JSON.stringify(response.data));
};

export const fetchTimetable = async (year: number, semester: number) => {
  const response = await instance.get(`${API_PATH.timetable}/my?year=${year}&semester=${semester}`, {});
  return JSON.parse(JSON.stringify(response.data));
};

export const deleteTimetable = async (year: number, semester: number) => {
  const response = await instance.post(`${API_PATH.timetable}/my/delete`, { year, semester });
  return JSON.parse(JSON.stringify(response.data));
};
