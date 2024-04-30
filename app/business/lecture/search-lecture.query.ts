import { SearchedLectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import axios from 'axios';
import { cookies } from 'next/headers';

export interface SearchLectures {
  lectures: SearchedLectureInfo[];
}
export const fetchSearchLectures = async (type: string, keyword: string) => {
  const response = await axios<SearchLectures>(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
    },
  });
  return response.data.lectures;
};
