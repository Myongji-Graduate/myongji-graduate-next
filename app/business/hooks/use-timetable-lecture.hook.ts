'use client';

import { useAtom } from 'jotai';
import { timeTableLectureAtom } from '@/app/store/stores/timetable-lecture';
import { TimetableLectureRow } from '@/app/store/stores/timetable-lecture';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';

export function useTimetableLecture() {
  const [lectures, setLectures] = useAtom(timeTableLectureAtom);

  const { toast } = useToast();

  /**과목 추가 */
  const addLecture = (item: TimetableLectureRow) => {
    const isAlreadyAdded = lectures.some((lec) => lec.id === item.id);
    if (isAlreadyAdded) {
      toast({ title: '이미 추가한 과목입니다.', variant: 'destructive' });
      return;
    }

    const hasTimeConflict = lectures.some((lec) => {
      const day1Conflict =
        lec.day1 === item.day1 &&
        Math.max(lec.startMinute1, item.startMinute1) < Math.min(lec.endMinute1, item.endMinute1);

      const day2Conflict =
        lec.day2 &&
        item.day2 &&
        lec.day2 === item.day2 &&
        Math.max(lec.startMinute2!, item.startMinute2!) < Math.min(lec.endMinute2!, item.endMinute2!);

      const crossConflict1 =
        lec.day1 === item.day2 &&
        item.day2 !== null &&
        Math.max(lec.startMinute1, item.startMinute2!) < Math.min(lec.endMinute1, item.endMinute2!);

      const crossConflict2 =
        lec.day2 === item.day1 &&
        lec.day2 !== null &&
        Math.max(lec.startMinute2!, item.startMinute1) < Math.min(lec.endMinute2!, item.endMinute1);

      return day1Conflict || day2Conflict || crossConflict1 || crossConflict2;
    });

    if (hasTimeConflict) {
      toast({ title: '같은 시간에 이미 수업이 있습니다.', variant: 'destructive' });
      return;
    }

    setLectures([...lectures, item]);
  };

  /** 과목 삭제 */
  const removeLecture = (lectureId: number) => {
    setLectures(lectures.filter((lec) => lec.id !== lectureId));
  };

  /** 모든 과목 초기화 */
  const clearLectures = () => {
    const confirmed = window.confirm('모든 과목을 초기화할까요?');
    if (confirmed) {
      setLectures([]);
    }
  };

  /** 과목 전체 초기화 + 새 데이터로 설정 */
  const initializeLectures = (data: TimetableLectureRow[]) => {
    setLectures(data);
  };

  return {
    lectures,
    addLecture,
    removeLecture,
    clearLectures,
    initializeLectures,
  };
}
