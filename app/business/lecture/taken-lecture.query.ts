import { LectureInfo } from '@/app/type/lecture';
import { API_PATH } from '../api-path';

export interface TakenLectures {
  totalCredit: number;
  takenLectures: LectureInfo[];
}

export const fetchTakenLectures = async (): Promise<TakenLectures> => {
  const response = await fetch(API_PATH.takenLectures);
  const data = await response.json();
  return data;
};
