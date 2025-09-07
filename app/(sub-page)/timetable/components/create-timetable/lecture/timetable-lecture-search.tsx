import List from '@/app/ui/view/molecule/list';
import { ListRow } from '@/app/ui/view/molecule/list/list-root';
import TimetableLectureFilters from './timetable-lecture-filters';
import LectureRowDesktop from './lecture-row-desktop';
import LectureRowMobile from './lecture-row-mobile';

export const mockLectureData: ListRow[] = [
  //추후 api로 받아오기
  {
    id: '5976',
    classDivision: '5976',
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
    startMinute1: 630,
    endMinute1: 705,
    day2: '목요일',
    time2: '10:30 - 11:45',
    startMinute2: 630,
    endMinute2: 705,
    lectureRoom: 'S1558',
    note: '*인공지능·소프트웨어융합대학 전공이해기초교과',
  },
  {
    id: '6123',
    classDivision: '6123',
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
    startMinute1: 540,
    endMinute1: 615,
    day2: '수요일',
    time2: '09:00 - 10:15',
    startMinute2: 540,
    endMinute2: 615,
    lectureRoom: 'L201',
    note: null,
  },
  {
    id: '7431',
    classDivision: '7431',
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
    day1: '화요일',
    time1: '14:00 - 15:15',
    startMinute1: 840,
    endMinute1: 915,
    day2: '목요일',
    time2: '14:00 - 15:15',
    startMinute2: 840,
    endMinute2: 915,
    lectureRoom: 'E103',
    note: '국제교양필수',
  },
  {
    id: '8295',
    classDivision: '8295',
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
    startMinute1: 600,
    endMinute1: 765,
    lectureRoom: 'B402',
    note: '경영학과 전공선택',
  },
  {
    id: '9102',
    classDivision: '9102',
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
    startMinute1: 780,
    endMinute1: 855,
    day2: '목요일',
    time2: '13:00 - 14:15',
    startMinute2: 780,
    endMinute2: 855,
    lectureRoom: 'M302',
    note: '의학통계 기초필수',
  },
];

function TimetableLectureSearch() {
  const render = (item: ListRow, index: number) => (
    <List.Row data-cy={`timetable-lecture-${item.id}`} key={item.id ?? index}>
      <LectureRowDesktop item={item} />
      <LectureRowMobile item={item} />
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
