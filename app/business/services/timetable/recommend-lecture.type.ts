import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import { TimetableLectureRow } from './timetable.type';

export interface Lecture extends ListRow {
  id: string;
  name: string;
  credit: number;
  category: string;
}

export interface Semester {
  label: string;
  creditTarget: number;
  lectures: Lecture[];
}

export interface RecommendLectureData {
  semestersLeft: number;
  semesters: Semester[];
}

export interface TimetableLecturePagedResult {
  data: TimetableLectureRow[];
  nextPage: number | null;
  totalCount: number;
}
