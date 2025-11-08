'use client';

import { useEffect, useRef } from 'react';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import UnscheduledLectureList from './lecture/unscheduled-lecture-list';
import { TimeTable } from '@/app/ui/view/molecule/time-table';
import { useFetchTimetable } from '@/app/business/services/timetable/timetable.query';
import { TimetableLectureRow } from '@/app/type/timetable/types';

function TimetableContent() {
  const { lectures, removeLecture, initializeLectures, unscheduledLectures } = useTimetableLecture();
  const { data } = useFetchTimetable();
  const prevDataRef = useRef<TimetableLectureRow[] | undefined>(undefined);

  useEffect(() => {
    if (!data) return;

    if (prevDataRef.current !== data) {
      prevDataRef.current = data;
      initializeLectures(data);
    }
  }, [data, initializeLectures]);

  return (
    <>
      <TimeTable data={lectures} onRemove={removeLecture} />
      {unscheduledLectures.length > 0 && <UnscheduledLectureList data={unscheduledLectures} />}
    </>
  );
}

export default TimetableContent;
