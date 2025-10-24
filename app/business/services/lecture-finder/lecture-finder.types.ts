import type { TimetableLectureRow } from '@/app/type/timetable/types';
import { major as MAJORS } from '@/app/utils/majors/major';
import { LECTURE_FINDER_CATEGORY_KO } from '@/app/(sub-page)/lecture-finder/components/type';
import { PopularInitQuery, PopularByCategoryQuery } from '@/app/(sub-page)/lecture-finder/components/type';

export type Major = (typeof MAJORS)[number];
export type CategoryKey = keyof typeof LECTURE_FINDER_CATEGORY_KO | 'all';
export type LectureRowsResponse = TimetableLectureRow[];
export type { PopularInitQuery, PopularByCategoryQuery };

export type PopularApiResponse =
  | { lectures: TimetableLectureRow[]; pageInfo?: { nextCursor?: string; hasMore?: boolean; pageSize?: number } }
  | TimetableLectureRow[];

export type NormalizedPage = {
  items: LectureRowsResponse;
  pageInfo: {
    nextCursor?: string;
    hasMore: boolean;
    pageSize?: number;
  };
};
