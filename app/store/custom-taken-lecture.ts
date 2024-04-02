import { atom } from 'jotai';
import { LectureInfo } from '../type/lecture';

export const takenLectureAtom = atom<LectureInfo[]>([]);
