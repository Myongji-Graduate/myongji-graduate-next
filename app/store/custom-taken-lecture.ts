import { atom } from 'jotai';
import { LectureInfo } from '../type/lecture';

export const isCustomizingAtom = atom<boolean>(false);

export const customLectureAtom = atom<LectureInfo[]>([]);
