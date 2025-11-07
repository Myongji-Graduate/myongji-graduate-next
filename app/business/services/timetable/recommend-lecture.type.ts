import { ListRow } from '@/app/ui/view/molecule/list/list-root';

export interface Lecture extends ListRow {
  id: number;
  lectureCode: string;
  name: string;
  credit: number;
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
