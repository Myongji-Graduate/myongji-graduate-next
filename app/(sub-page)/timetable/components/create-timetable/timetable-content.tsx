'use client';

import { useEffect, useRef } from 'react';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import UnscheduledLectureList from './lecture/unscheduled-lecture-list';
import { TimeTable } from '@/app/ui/view/molecule/time-table';
import { useFetchTimetable } from '@/app/business/services/timetable/timetable.query';
import { TimetableLectureRow } from '@/app/business/services/timetable/types';

function TimetableContent() {
  const { lectures, removeLecture, initializeLectures, unscheduledLectures } = useTimetableLecture();
  const { data, isSuccess } = useFetchTimetable();
  const isInitializedRef = useRef(false);

  useEffect(() => {
    if (!isSuccess || !data || isInitializedRef.current) return;

    initializeLectures(data);
    isInitializedRef.current = true;
  }, [isSuccess, data, initializeLectures]);

  return (
    <>
      <TimeTable data={lectures} onRemove={removeLecture} />
      {unscheduledLectures.length > 0 && <UnscheduledLectureList data={unscheduledLectures} />}
    </>
  );
}

export default TimetableContent;
