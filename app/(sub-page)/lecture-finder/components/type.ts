import { major as MAJORS } from '@/app/utils/majors/major';

export type Major = (typeof MAJORS)[number];

export interface Review {
  author: string;
  content: string;
  rating: number;
}

export interface Lecture {
  id?: number;
  professor: string;
  assignment: string;
  grading: string;
  attendance: string;
  exam: string;
  rating: number | string | null;
  reviews: Review[];
  lectureName?: string;
  enrollmentCount?: number;
  completionType?: string;
}

export interface LectureData {
  courseName: string;
  averageRating: number;
  courseId: number;
  lectures: Lecture[];
}

export const LECTURE_FINDER_CATEGORY_KO = {
  BASIC_ACADEMICAL_CULTURE: '학문기초교양',
  CORE_CULTURE: '핵심교양',
  COMMON_CULTURE: '공통교양',
  NORMAL_CULTURE: '일반교양',
  MANDATORY_MAJOR: '전공필수',
  ELECTIVE_MAJOR: '전공선택',
} as const;

export type CategoryKey = keyof typeof LECTURE_FINDER_CATEGORY_KO | 'all';

// 아직 미사용
export type SortKey = 'popular' | 'mostTaken' | null;

export type Year = '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24';
export const YEARS: readonly Year[] = ['16', '17', '18', '19', '20', '21', '22', '23', '24'] as const;

export interface PendingFilters {
  major: Major | '';
  year: Year | '';
  category: CategoryKey;
  sort: SortKey;
}

export type LectureRowsResponse = TimetableLectureRow[];

export interface PopularInitQuery {
  limit?: number;
  cursor?: string;
}

export interface PopularByCategoryQuery {
  major: Major;
  entryYear: number | string;
  category: Exclude<CategoryKey, 'all'>;
  limit?: number;
  cursor?: string;
}

import type { TimetableLectureRow } from '@/app/type/timetable/types';
