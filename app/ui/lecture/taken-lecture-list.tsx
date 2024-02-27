import { fetchTakenLectures } from '@/app/business/lecture/taken-lecture-list.query';
import { Table } from '../view/molecule/table';
import TakenLectureTitle from './taken-lecture-title';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

export default async function TakenLectureList() {
  const data = await fetchTakenLectures();
  return (
    <div className="w-[800px] flex flex-col gap-2">
      <TakenLectureTitle />
      <Table headerInfo={headerInfo} data={data.takenLectures} />
    </div>
  );
}
