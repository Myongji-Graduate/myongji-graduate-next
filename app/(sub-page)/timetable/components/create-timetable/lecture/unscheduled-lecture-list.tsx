import { TimetableLectureRow } from '@/app/type/timetable/types';
import UnscheduledLecture from './unscheduled-lecture';
import { useTimetableLecture } from '@/app/business/hooks/use-timetable-lecture.hook';

interface UnscheduledLectureListProps {
  data: TimetableLectureRow[];
}

function UnscheduledLectureList({ data }: UnscheduledLectureListProps) {
  const { removeLecture } = useTimetableLecture();
  return (
    <div className="border-[1px] px-3 py-1">
      {data.map((lecture, index) => (
        <div className={`${index !== data.length - 1 && 'border-b-[1px]'} p-2`} key={lecture.id}>
          <UnscheduledLecture
            key={lecture.id}
            lectureName={lecture.name}
            lectureCredit={lecture.credit}
            lectureNote={lecture.note}
            handleDelete={() => removeLecture(lecture.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default UnscheduledLectureList;
