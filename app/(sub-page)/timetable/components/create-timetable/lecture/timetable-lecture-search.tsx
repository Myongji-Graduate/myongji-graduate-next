import List from '@/app/ui/view/molecule/list';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import TimetableLectureFilters from './timetable-lecture-filters';
import LectureRowDesktop from './lecture-row-desktop';
import LectureRowMobile from './lecture-row-mobile';
import Responsive from '@/app/ui/responsive';

export const mockLectureData: ListRow[] = [
  //추후 api로 받아오기
  {
    id: '5976',
    lectureCode: 'HEF01102',
    name: '기초프로그래밍2',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 2,
    maxStudent: '50',
    koreanCode: '인소102',
    department: '인공지능·소프트웨어융합대학',
    professor: '정재희',
    day1: '화요일',
    time1: '10:30 - 11:45',
    startMinute1: 1030,
    endMinute1: 1145,
    day2: '목요일',
    time2: '10:30 - 11:45',
    startMinute2: 1030,
    endMinute2: 1145,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과',
  },
  {
    id: '6123',
    lectureCode: 'LAW20103',
    name: '헌법개론',
    credit: 3,
    campus: '자연',
    year: 2025,
    semester: 2,
    maxStudent: '80',
    koreanCode: '법학201',
    department: '법학대학',
    professor: '김민수',
    day1: '월요일',
    time1: '09:00 - 10:15',
    startMinute1: 900,
    endMinute1: 1015,
    day2: '수요일',
    time2: '09:00 - 10:15',
    startMinute2: 900,
    endMinute2: 1015,
    lectureRoom: 'L201',
    note: null,
  },
  {
    id: '7431',
    lectureCode: 'ENG10201',
    name: 'Academic English',
    credit: 2,
    campus: '인문',
    year: 2025,
    semester: 1,
    maxStudent: '40',
    koreanCode: '교양102',
    department: '교양교육원',
    professor: 'Alice Johnson',
    day1: '월요일',
    time1: '14:00 - 15:15',
    startMinute1: 1400,
    endMinute1: 1515,
    day2: '수요일',
    time2: '14:00 - 15:15',
    startMinute2: 1400,
    endMinute2: 1515,
    lectureRoom: 'E103',
    note: '국제교양필수',
  },
  {
    id: '8295',
    lectureCode: 'BUS30110',
    name: '재무관리',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 1,
    maxStudent: '60',
    koreanCode: '경영301',
    department: '경영대학',
    professor: '이수현',
    day1: '금요일',
    time1: '10:00 - 12:45',
    day2: null,
    time2: null,
    startMinute1: 1000,
    endMinute1: 1245,
    startMinute2: null,
    endMinute2: null,
    lectureRoom: 'B402',
    note: '경영학과 전공선택',
  },
  {
    id: '8296',
    lectureCode: 'BUS30111',
    name: 'ERP개론',
    credit: 3,
    campus: '인문',
    year: 2025,
    semester: 1,
    maxStudent: '60',
    koreanCode: '경영301',
    department: '경영대학',
    professor: '신현진',
    day1: '화요일',
    time1: '18:00 - 20:15',
    day2: null,
    time2: null,
    startMinute1: 1800,
    endMinute1: 2015,
    startMinute2: null,
    endMinute2: null,
    lectureRoom: 'B402',
    note: null,
  },
  {
    id: '9102',
    lectureCode: 'MED11005',
    name: '의학통계학',
    credit: 3,
    campus: '자연',
    year: 2025,
    semester: 1,
    maxStudent: '70',
    koreanCode: '의학110',
    department: '의과대학',
    professor: '박지현',
    day1: '화요일',
    time1: '13:00 - 14:15',
    startMinute1: 1300,
    endMinute1: 1415,
    day2: '목요일',
    time2: '13:00 - 14:15',
    startMinute2: 1300,
    endMinute2: 1415,
    lectureRoom: 'M302',
    note: '의학통계 기초필수',
  },
];

function TimetableLectureSearch() {
  const render = (item: ListRow, index: number) => (
    <List.Row data-cy={`timetable-lecture-${item.id}`} key={item.id ?? index}>
      <Responsive minWidth={1000}>
        <LectureRowDesktop item={item} />
      </Responsive>
      <Responsive maxWidth={999}>
        <LectureRowMobile item={item} />
      </Responsive>
    </List.Row>
  );

  return (
    <div className="flex flex-col gap-4 pt-6">
      <div className="px-2">
        <TimetableLectureFilters />
      </div>
      <List data={mockLectureData} render={render} isScrollList={true} />
    </div>
  );
}

export default TimetableLectureSearch;
