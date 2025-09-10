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
      <Table headerInfo={RECOMMEND_LECTURE_TABLE_HEADER_INFO} data={lectures} />
    </>
  );
}

export default RecommendLectureList;
