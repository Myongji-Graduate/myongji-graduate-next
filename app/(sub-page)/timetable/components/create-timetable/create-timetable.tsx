'use client';

import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import ControlButtonGroup from './control-button-group';
import { TimeTable } from '@/app/ui/view/molecule/time-table';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import { calculateCurrentCredit } from '@/app/utils/timetable/timetable.util';
import SearchModal from '@/app/ui/timetable/create-timetable/lecture/search-modal';
import UnscheduledLectureList from './lecture/unscheduled-lecture-list';
import { TimetableLectureRow } from '@/app/type/timetable/types';

function CreateTimetable() {
  const { lectures, removeLecture } = useTimetableLecture();
  const totalCredit = calculateCurrentCredit(lectures);

  const unscheduledLectures: TimetableLectureRow[] = lectures.filter((lecture) => !lecture.day1 && !lecture.day2);

  return (
    <div className="flex flex-col gap-6 pb-4 md:pb-6">
      <TitleBox title="시간표 생성">
        <p>미이수 과목들로 시간표를 만들고 관리해보세요!</p>
      </TitleBox>
      <ControlButtonGroup />
      <p className="text-gray-400">총 학점: {totalCredit} 학점</p>
      <TimeTable data={lectures} onRemove={removeLecture} />
      {unscheduledLectures.length > 0 && <UnscheduledLectureList data={unscheduledLectures} />}
      <SearchModal />
    </div>
  );
}

export default CreateTimetable;
