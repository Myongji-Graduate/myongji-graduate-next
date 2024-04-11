import { atom } from 'jotai';
import { LectureInfo } from '../type/lecture';

export const takenLectureAtom = atom<LectureInfo[]>([]);

export const swipeTakenLectureAtom = atom<LectureInfo[]>([]);

export const isAddedLectureAtom = atom<boolean>(false);
