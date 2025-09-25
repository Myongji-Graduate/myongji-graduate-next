import { TimetableLectureRow } from '@/app/type/timetable/types';
import { atom } from 'jotai';

/** 시간표 과목 store */

export const timeTableLectureAtom = atom<TimetableLectureRow[]>([]);

/** 서버 시간표 데이터로 최초 1회만 동기화 되었는지 여부 */
export const timeTableHydratedAtom = atom<boolean>(false);

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
