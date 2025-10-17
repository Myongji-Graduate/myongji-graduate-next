import type { TimetableLectureRow } from '@/app/type/timetable/types';
import { major as MAJORS } from '@/app/utils/majors/major';
import { LECTURE_FINDER_CATEGORY_KO } from '@/app/(sub-page)/lecture-finder/components/type'; // or move this const here

export type Major = (typeof MAJORS)[number];
export type CategoryKey = keyof typeof LECTURE_FINDER_CATEGORY_KO | 'all';
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

export type PopularApiResponse =
  | { lectures: TimetableLectureRow[]; pageInfo?: { nextCursor?: string; hasMore?: boolean; pageSize?: number } }
  | TimetableLectureRow[];
