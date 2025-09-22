import { TimetableLectureRow } from '@/app/type/timetable/types';
import { atom } from 'jotai';

/** 시간표 과목 store */

export const timeTableLectureAtom = atom<TimetableLectureRow[]>([]);
