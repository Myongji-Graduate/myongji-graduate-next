import { API_PATH } from '../api-path';

type lectureInfo = {
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
};
export type TakenLectures = {
  totalCredit: number;
  takenLectures: lectureInfo[];
};

export const fetchTakenLectures = async (): Promise<TakenLectures> => {
  const response = await fetch(API_PATH.takenLectures);
  const data = await response.json();
  return data;
};
