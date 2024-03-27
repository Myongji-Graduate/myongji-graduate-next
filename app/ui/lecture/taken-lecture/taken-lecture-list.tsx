import { Table } from '../../view/molecule/table';
import { LectureInfo } from '@/app/type/lecture';
import DeleteTakenLectureButton from './delete-taken-lecture-button';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

interface TakenLectureListProps {
  data: LectureInfo[];
}

export default function TakenLectureList({ data }: TakenLectureListProps) {
  return (
    <Table
      headerInfo={headerInfo}
      data={data}
      renderActionButton={(id: number) => <DeleteTakenLectureButton lectureId={id} />}
    />
  );
}
