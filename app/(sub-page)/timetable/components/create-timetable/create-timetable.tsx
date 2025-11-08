'use client';

import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';
import SearchModal from '@/app/ui/timetable/create-timetable/lecture/search-modal';
import TimetableButtonGroup from './timetable-button-group';
import TimetableContent from './timetable-content';

function CreateTimetable() {
  const { totalCredit } = useTimetableLecture();

  return (
    <div className="flex flex-col gap-6 pb-4 md:pb-6">
      <TitleBox title="시간표 생성">
        <p>미이수 과목들로 시간표를 만들고 관리해보세요!</p>
      </TitleBox>
      <TimetableButtonGroup />
      <p className="text-gray-400">총 학점: {totalCredit} 학점</p>
      <TimetableContent />
      <SearchModal />
    </div>
  );
}

export default CreateTimetable;
