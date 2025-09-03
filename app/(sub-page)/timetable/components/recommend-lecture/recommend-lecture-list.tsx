import Responsive from '@/app/ui/responsive';
import { RECOMMEND_LECTURE_TABLE_HEADER_INFO } from '@/app/ui/timetable/recommend-lecture-constant';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import { Table } from '@/app/ui/view/molecule/table';

interface Lecture extends ListRow {
  code: string;
  name: string;
  credit: number;
  type: string;
}

function RecommendLectureList({ lectures }: { lectures: Lecture[] }) {
  return (
    <>
      <Responsive minWidth={1024}>
        <Table headerInfo={RECOMMEND_LECTURE_TABLE_HEADER_INFO} data={lectures} />
      </Responsive>
      <Responsive maxWidth={1023}>
        <Table headerInfo={RECOMMEND_LECTURE_TABLE_HEADER_INFO} data={lectures} />
      </Responsive>
    </>
  );
}

export default RecommendLectureList;
