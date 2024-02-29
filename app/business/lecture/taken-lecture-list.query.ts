import { API_PATH } from '../api-path';

type LectureInfo = {
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
};
type TakenLectures = {
  totalCredit: number;
  takenLectures: LectureInfo[];
};

export const fetchTakenLectures = async (): Promise<TakenLectures> => {
  const response = await fetch(API_PATH.takenLectures);
  const data = await response.json();
  return data;
};
