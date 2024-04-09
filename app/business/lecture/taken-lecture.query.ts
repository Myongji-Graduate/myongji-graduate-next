import { LectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';
import { TAG } from '@/app/utils/http/tag';

export interface TakenLectures {
  totalCredit: number;
  takenLectures: LectureInfo[];
}

export const fetchTakenLectures = async (): Promise<TakenLectures> => {
  const response = await fetch(API_PATH.takenLectures, { next: { tags: [TAG.GET_TAKEN_LECTURES] } });
  const data = await response.json();
  return data;
};
