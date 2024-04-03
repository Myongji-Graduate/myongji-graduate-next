import { fetchTakenLectures } from '@/app/business/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-list';
import TakenLectureLabel from './taken-lecture-label';
import TakenLectureAtomHydrator from '@/app/store/taken-lecture-atom-hydrator';
import { Provider } from 'jotai';

export default async function TakenLecture() {
  const data = await fetchTakenLectures();

  return (
    <div className="flex flex-col gap-2">
      <Provider>
        <TakenLectureAtomHydrator initialValue={data.takenLectures}>
          <TakenLectureLabel />
          <TakenLectureList />
        </TakenLectureAtomHydrator>
      </Provider>
    </div>
  );
}
