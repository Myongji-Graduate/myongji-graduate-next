import { SearchedLectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';

export interface SearchLectures {
  lectures: SearchedLectureInfo[];
}
export const fetchSearchLectures = async (type: string, keyword: string): Promise<SearchLectures> => {
  const response = await fetch(`${API_PATH.lectures}?type=${type}&&keyword=${keyword}`);
  const data = await response.json();
  return data;
};
