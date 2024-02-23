import { TakenLectures, fetchTakenLectures } from '@/app/business/taken-lectures/taken-lecture-list.query';
import { Table } from '../view/molecule/table';
import TakenLectureTitle from './taken-lecture-title';
import Button from '../view/atom/button/button';
import Link from 'next/link';

const parseTakenLectures = (subjects: TakenLectures['takenLectures']) => {
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

  return (
    <div className="w-[800px] flex flex-col gap-2">
      <TakenLectureTitle
        titleLabel="내 기이수 과목"
        rightElement={
          <div className="flex gap-2">
            <Button label="커스텀하기" variant="secondary" size="md" />
            <Link href="/file-upload">
              <Button label="업데이트" variant="secondary" size="md" />
            </Link>
          </div>
        }
      />
      <Table headerInfo={headerInfo} data={takenLectures} />
    </div>
  );
}
