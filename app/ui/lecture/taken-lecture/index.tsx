import { fetchTakenLectures } from '@/app/business/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-list';
import TakenLectureLabel from './taken-lecture-label';
import LectureSearch from '../lecture-search';

export default async function TakenLecture() {
  const data = await fetchTakenLectures();
  return (
    <div className="w-[800px] flex flex-col gap-10">
      <LectureSearch />
      <div className="flex flex-col gap-2">
        {/* w-[800px]은 w-full로 변경 예정  */}
        <TakenLectureLabel data={data.takenLectures} />
        <TakenLectureList data={data.takenLectures} />
      </div>
    </div>
  );
}
