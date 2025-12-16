import type { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';
import type { Major, CategoryKey } from '@/app/(sub-page)/lecture-finder/components/type';
import { PopularByCategoryQuery } from '@/app/(sub-page)/lecture-finder/components/type';

export type LectureRowsResponse = TimetableLectureRow[];
export type { PopularByCategoryQuery };

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
  categoryName?: string;
};

export interface LectureReview {
  subject: string;
  professor: string;
  semester: string;
  rating: number;
  content: string;
}

export interface DetailedLecture {
  subject: string;
  professor: string;
  assignment: '없음' | '보통' | '많음' | null;
  exam: ['한번'] | ['두번'] | ['한번', '두번'] | [];
  attendance: ['전자출결'] | ['직접호명'] | ['전자출결', '직접호명'] | [];
  grading: '너그러움' | '보통' | null;
  teamwork: '없음' | '보통' | '많음' | null;
  rating: number;
  lectureReviews: LectureReview[];
}

export interface LectureInfoPagedResult {
  items: LectureReview[];
  hasNext: boolean;
  nextPage?: number;
}
