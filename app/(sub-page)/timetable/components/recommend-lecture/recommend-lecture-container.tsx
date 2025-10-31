import { Semester } from '@/app/business/services/timetable/recommend-lecture.type';
import RecommendLectureList from './recommend-lecture-list';

function RecommendLectureContainer({ semesters }: { semesters: Semester[] }) {
  return (
    <div className="py-2">
      {semesters.map((semester) => (
        <div key={semester.label} className="mb-6 flex flex-col gap-3">
          <p className="font-bold text-base md:text-lg">
            {semester.label} [총 {semester.creditTarget}학점]
          </p>
          <RecommendLectureList lectures={semester.lectures} />
        </div>
      ))}
    </div>
  );
}

export default RecommendLectureContainer;
