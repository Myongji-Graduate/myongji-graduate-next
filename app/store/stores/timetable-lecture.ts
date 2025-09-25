import { TimetableLectureRow } from '@/app/type/timetable/types';
import { atom } from 'jotai';

/** 시간표 과목 store */

export const timeTableLectureAtom = atom<TimetableLectureRow[]>([]);

/** 과목 필터링 */

interface timetableLectureFilter {
  campus: string;
  filter: string;
  keyword: string;
  professor: string;
  recommendedCategory?: string;
}

export const timetableLectureFilterAtom = atom<timetableLectureFilter>({
  campus: '인문',
  filter: 'NOT_TAKEN',
  keyword: '',
  professor: '',
  recommendedCategory: '',
});

interface timetableLectureSearchWord {
  input: string;
}

export const timetableLectureSearchWordAtom = atom<timetableLectureSearchWord>({
  input: '',
});

export const clearTimetableAtom = atom(false);
