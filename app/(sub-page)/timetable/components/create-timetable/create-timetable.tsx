'use client';

import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import ControlButtonGroup from './control-button-group';
import { TimeTable } from '@/app/ui/view/molecule/time-table';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import SearchModal from '@/app/ui/timetable/create-timetable/lecture/search-modal';
import UnscheduledLectureList from './lecture/unscheduled-lecture-list';
import { Suspense, useEffect } from 'react';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import { useAtom } from 'jotai';
import { timeTableHydratedAtom } from '@/app/store/stores/timetable-lecture';
import { useFetchTimetable } from '@/app/business/services/timetable/timetable.query';

function TimetableContent() {
  const { lectures, removeLecture, initializeLectures, unscheduledLectures } = useTimetableLecture();
  const { data: fetchLectures } = useFetchTimetable();
  const [isHydrated, setIsHydrated] = useAtom(timeTableHydratedAtom);

  useEffect(() => {
    if (!isHydrated && fetchLectures.length > 0) {
      initializeLectures(fetchLectures);
      setIsHydrated(true);
    }
  }, [fetchLectures, initializeLectures, isHydrated, setIsHydrated]);

  return (
    <>
      <TimeTable data={lectures} onRemove={removeLecture} />
      {unscheduledLectures.length > 0 && <UnscheduledLectureList data={unscheduledLectures} />}
    </>
  );
}

function CreateTimetable() {
  const { totalCredit } = useTimetableLecture();

  return (
    <div className="flex flex-col gap-6 pb-4 md:pb-6">
      <TitleBox title="시간표 생성">
        <p>미이수 과목들로 시간표를 만들고 관리해보세요!</p>
      </TitleBox>
      <ControlButtonGroup />
      <p className="text-gray-400">총 학점: {totalCredit} 학점</p>
      <Suspense
        fallback={
          <div className="rounded-xl w-full h-72 overflow-auto flex justify-center items-center">
            <LoadingSpinner
              className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
              style={{ transition: `width 150ms` }}
            />
          </div>
        }
      >
        <TimetableContent />
      </Suspense>
      <SearchModal />
    </div>
  );
}

export default CreateTimetable;
