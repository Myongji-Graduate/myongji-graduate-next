import { atom } from 'jotai';
import { TakenLectrueInfo } from '../type/lecture';

export const takenLectureAtom = atom<TakenLectrueInfo[]>([]);

export const swipeTakenLectureAtom = atom<TakenLectrueInfo[]>([]);
