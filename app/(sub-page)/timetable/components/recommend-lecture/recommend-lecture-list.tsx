import { Lecture } from '@/app/business/services/timetable/recommend-lecture.type';
import Responsive from '@/app/ui/responsive';
import {
  RECOMMEND_LECTURE_TABLE_DESKTOP_HEADER_INFO,
  RECOMMEND_LECTURE_TABLE_MOBILE_HEADER_INFO,
} from '@/app/ui/timetable/recommend-lecture-constant';
import { Table } from '@/app/ui/view/molecule/table';

function RecommendLectureList({ lectures }: { lectures: Lecture[] }) {
  const mobileLectures = lectures.map((lec, i) => ({
    name: lec.name,
    credit: lec.credit,
    category: lec.category,
    id: i,
  }));

  return (
    <>
      <Responsive minWidth={520}>
        <Table headerInfo={RECOMMEND_LECTURE_TABLE_DESKTOP_HEADER_INFO} data={lectures} />
      </Responsive>
      <Responsive maxWidth={519}>
        <Table headerInfo={RECOMMEND_LECTURE_TABLE_MOBILE_HEADER_INFO} data={mobileLectures} />
      </Responsive>
    </>
  );
}

export default RecommendLectureList;
