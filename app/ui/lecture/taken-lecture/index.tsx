import { fetchTakenLectures, TakenLectureInfoResponse } from '@/app/business/services/lecture/taken-lecture.query';
import TakenLectureList from './taken-lecture-list';
import TakenLectureLabel from './taken-lecture-label';
import TakenLectureAtomHydrator from '@/app/store/stores/taken-lecture-atom-hydrator';
import UpdateTakenLecture from './update-taken-lecture';

const processChapel = (takenLectures: TakenLectureInfoResponse[]) => {
  return takenLectures.map((lecture) => {
    return {
      id: lecture.id,
      year: lecture.year,
      semester: lecture.semester,
      lectureCode: lecture.lectureCode,
      lectureName: lecture.lectureName,
      credit: lecture.lectureName === '채플' ? 0.5 : lecture.credit,
    };
  });
};
export default async function TakenLecture() {
  const data = await fetchTakenLectures();
  const takenLectures = processChapel(data.takenLectures);

  return (
    <div className="flex flex-col gap-2">
      <TakenLectureAtomHydrator initialValue={takenLectures}>
        <UpdateTakenLecture data={takenLectures}>
          <TakenLectureLabel />
          <TakenLectureList />
        </UpdateTakenLecture>
      </TakenLectureAtomHydrator>
    </div>
  );
}
