import { SearchedLectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import axios from 'axios';

export interface SearchLectures {
  lectures: SearchedLectureInfo[];
}
export const fetchSearchLectures = async (type: string, keyword: string) => {
  const response = await axios<SearchLectures>(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`);
  return response.data.lectures;
};
