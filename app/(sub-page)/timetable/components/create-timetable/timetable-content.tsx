'use client';

import { useEffect } from 'react';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import { fetchTimetable } from '@/app/business/services/timetable/timetable.command';
import UnscheduledLectureList from './lecture/unscheduled-lecture-list';
import { TimeTable } from '@/app/ui/view/molecule/time-table';
import { CURRENT_SEMESTER, CURRENT_YEAR } from '@/app/utils/timetable/constants';
import { toast } from '@/app/ui/view/molecule/toast/use-toast';

function TimetableContent() {
  const { lectures, removeLecture, initializeLectures, unscheduledLectures } = useTimetableLecture();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTimetable({ year: CURRENT_YEAR, semester: CURRENT_SEMESTER });
        if (data) initializeLectures(data);
      } catch (error) {
        toast({ title: '시간표 불러오기에 실패했습니다.', variant: 'destructive' });
      }
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TimeTable data={lectures} onRemove={removeLecture} />
      {unscheduledLectures.length > 0 && <UnscheduledLectureList data={unscheduledLectures} />}
    </>
  );
}

export default TimetableContent;
