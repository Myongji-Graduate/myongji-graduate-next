import { atom } from 'jotai';

export interface TakenLectrueInfo {
  [index: string]: string | number;
  id: number;
  year: string;
  semester: string;
  lectureCode: string;
  lectureName: string;
  credit: number;
}

export const takenLectureAtom = atom<TakenLectrueInfo[]>([]);

export const swipeTakenLectureAtom = atom<TakenLectrueInfo[]>([]);
