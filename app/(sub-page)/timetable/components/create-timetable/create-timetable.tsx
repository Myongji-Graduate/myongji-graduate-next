import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import NotCompletedLectureContainer from './not-completed-lecture/not-completed-lecture-container';

function CreateTimetable() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-4 md:pb-6">
      <TitleBox title="시간표 생성">
        <p>미이수 과목들로 시간표를 만들고 관리해보세요!</p>
      </TitleBox>
      <NotCompletedLectureContainer />
    </div>
  );
}

export default CreateTimetable;
