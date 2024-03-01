import { fetchTakenLectures } from '@/app/business/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-table';

export default async function TakenLecture() {
  const data = await fetchTakenLectures();
  return <TakenLectureList data={data.takenLectures} />;
}
