import Skeleton from '../../view/atom/skeleton';
import { TableHeader } from '../../view/molecule/table/table-header';
import { TAKEN_LECTURE_TABLE_HEADER_INFO } from './taken-lecture-constant';
import TakenLectureLabel from './taken-lecture-label';

export default function TakenLectureSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 w-full">
      <TakenLectureLabel />
      <TableHeader headerInfo={TAKEN_LECTURE_TABLE_HEADER_INFO} cols={6} />
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton key={index} className="rounded-xl w-full h-12" />
      ))}
    </div>
  );
}
