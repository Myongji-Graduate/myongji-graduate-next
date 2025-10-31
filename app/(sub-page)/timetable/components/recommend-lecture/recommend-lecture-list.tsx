import { Lecture } from '@/app/business/services/timetable/recommend-lecture.type';
import { RECOMMEND_LECTURE_TABLE_HEADER_INFO } from '@/app/ui/timetable/recommend-lecture-constant';
import { Table } from '@/app/ui/view/molecule/table';

function RecommendLectureList({ lectures }: { lectures: Lecture[] }) {
  return (
    <>
      <Table headerInfo={RECOMMEND_LECTURE_TABLE_HEADER_INFO} data={lectures} />
    </>
  );
}

export default RecommendLectureList;
