import { fetchTakenLectures, lectureInfo } from '@/app/business/taken-lectures/taken-lecture-list.query';
import { Table } from '../view/molecule/table';

const parseTakenLectures = (subjects: lectureInfo[]) => {
  return subjects.map((subject) => [
    subject.year,
    subject.semester,
    subject.lectureCode,
    subject.lectureName,
    subject.credit,
  ]);
};

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

export default async function TakenLectureList() {
  const data = await fetchTakenLectures();
  const takenLectures = parseTakenLectures(data.takenLectures);

  return <Table headerInfo={headerInfo} data={takenLectures} />;
}
