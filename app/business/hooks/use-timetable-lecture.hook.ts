'use client';

import { useAtom, useSetAtom } from 'jotai';
import { clearTimetableAtom, timeTableLectureAtom } from '@/app/store/stores/timetable-lecture';
import { useToast } from '@/app/ui/view/molecule/toast/use-toast';
import { TimetableLectureRow } from '@/app/type/timetable/types';
import { useState } from 'react';

export function useTimetableLecture() {
  const [lectures, setLectures] = useAtom(timeTableLectureAtom);
  const setIsTimetableCleared = useSetAtom(clearTimetableAtom);

  const { toast } = useToast();

  /**과목 추가 */
  const addLecture = (item: TimetableLectureRow) => {
    setLectures((prev) => {
      const isAlreadyAdded = prev.some((lec) => lec.id === item.id);
      if (isAlreadyAdded) {
        toast({ title: '이미 추가한 과목입니다.', variant: 'destructive' });
        return prev;
      }

      const hasTimeConflict = prev.some((lec) => {
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
        return prev;
      }

      return [...prev, item];
    });
  };

  /** 과목 삭제 */
  const removeLecture = (lectureId: TimetableLectureRow['id']) => {
    setLectures(lectures.filter((lec) => lec.id !== lectureId));
  };

  /** 모든 과목 초기화 */
  const clearLectures = () => {
    setLectures([]);
    setIsTimetableCleared(true);
  };

  /** 과목 전체 초기화 + 새 데이터로 설정 */
  const initializeLectures = (data: TimetableLectureRow[]) => {
    setLectures(data);
  };

  /** 과목 id 배열 */
  const lecturesIds = lectures.map((lec) => lec.id as number);

  /** 요일이 없는 강의 */
  const unscheduledLectures: TimetableLectureRow[] = lectures.filter((lecture) => !lecture.day1 && !lecture.day2);

  /** 시간표에 담긴 강의들의 총 학점 */
  const totalCredit = lectures.length > 0 ? lectures.reduce((sum, lec) => sum + lec.credit, 0) : 0;

  return {
    lectures,
    lecturesIds,
    unscheduledLectures,
    totalCredit,
    addLecture,
    removeLecture,
    clearLectures,
    initializeLectures,
  };
}
