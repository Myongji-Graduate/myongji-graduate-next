import { ListRow } from '@/app/ui/view/molecule/list/list-root';

export interface TimetableLectureRow extends ListRow {
  lectureCode: string;
  name: string;
  credit: number;
  campus: string;
  year: number;
  semester: number;
  maxStudent: string;
  koreanCode: string;
  department: string;
  professor: string;
  day1: string;
  time1: string;
  startMinute1: number;
  endMinute1: number;
  day2: string | null;
  time2: string | null;
  startMinute2: number | null;
  endMinute2: number | null;
  lectureRoom: string;
  note: string | null;
}
