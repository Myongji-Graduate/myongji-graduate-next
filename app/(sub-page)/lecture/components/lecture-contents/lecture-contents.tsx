'use client';
import LectureFilter from './lecture-filter';
import LectureTable from './lecture-table';

function LectureContents() {
  return (
    <div className="h-50 flex px-3 gap-4 py-5 flex-col">
      <LectureFilter />
      <LectureTable isAll={false} />
    </div>
  );
}

export default LectureContents;
