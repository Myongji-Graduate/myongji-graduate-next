import { TimetableLectureRow } from '@/app/business/services/timetable/timetable.type';

export const calculateCurrentCredit = (lectures: TimetableLectureRow[]) => {
  const totalCredit = lectures.reduce((sum, lecture) => sum + lecture.credit, 0);

  return totalCredit;
};
