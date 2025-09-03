import NotCompletedLectureContainer from './not-completed-lecture/not-completed-lecture-container';

function CreateTimetable() {
  return (
    <div className="flex flex-col gap-5 md:gap-6  pb-4 md:pb-6">
      <div className="flex flex-col gap-1 border-b-2 pb-4 ">
        <p className="font-bold sm:text-3xl text-2xl sm:ml-0">시간표 생성</p>
        <p className="text-gray-400">미이수 과목들로 시간표를 만들고 관리해보세요.</p>
      </div>
      <div>
        <NotCompletedLectureContainer />
      </div>
    </div>
  );
}

export default CreateTimetable;
