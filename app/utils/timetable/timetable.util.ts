import { TimetableLectureRow } from '@/app/store/stores/timetable-lecture';

export const calculateCurrentCredit = (lectures: TimetableLectureRow[]) => {
  const totalCredit = lectures.reduce((sum, lecture) => sum + lecture.credit, 0);

  return totalCredit;
};
