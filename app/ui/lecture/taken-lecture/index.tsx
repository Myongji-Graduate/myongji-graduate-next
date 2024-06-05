import { fetchTakenLectures } from '@/app/business/service/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-list';
import TakenLectureLabel from './taken-lecture-label';
import TakenLectureAtomHydrator from '@/app/store/stores/taken-lecture-atom-hydrator';
import UpdateTakenLecture from './update-taken-lecture';

export default async function TakenLecture() {
  const data = await fetchTakenLectures();
  return (
    <div className="flex flex-col gap-2">
      <TakenLectureAtomHydrator initialValue={data.takenLectures}>
        <UpdateTakenLecture data={data.takenLectures}>
          <TakenLectureLabel />
          <TakenLectureList />
        </UpdateTakenLecture>
      </TakenLectureAtomHydrator>
    </div>
  );
}
