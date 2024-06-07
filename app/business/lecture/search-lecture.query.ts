import { SearchLectures } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import axios from 'axios';
import { getToken } from '../auth';

export const fetchSearchLectures = async (type: string, keyword: string) => {
  const response = await axios<SearchLectures[]>(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  return response.data;
};
