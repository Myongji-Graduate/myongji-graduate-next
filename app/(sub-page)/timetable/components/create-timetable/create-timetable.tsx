import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import ControlButtons from './ControlButtons';

function CreateTimetable() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-4 md:pb-6">
      <TitleBox title="시간표 생성">
        <p>미이수 과목들로 시간표를 만들고 관리해보세요!</p>
      </TitleBox>
      <ControlButtons />
      <div>시간표</div> {/* 추후 시간표 컴포넌트 추가 */}
    </div>
  );
}

export default CreateTimetable;
