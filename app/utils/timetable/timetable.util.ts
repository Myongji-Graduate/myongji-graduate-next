import { TimetableLectureRow } from '@/app/type/timetable/types';

export const calculateCurrentCredit = (lectures: TimetableLectureRow[]) => {
  const totalCredit = lectures.reduce((sum, lecture) => sum + lecture.credit, 0);

  return totalCredit;
};
