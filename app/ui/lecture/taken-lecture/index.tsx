import { fetchTakenLectures } from '@/app/business/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-list';
import TakenLectureLabel from './taken-lecture-label';

export default async function TakenLecture() {
  const data = await fetchTakenLectures();
  return (
    <div className="flex flex-col gap-2">
      <TakenLectureLabel />
      <TakenLectureList data={data.takenLectures} />
    </div>
  );
}
