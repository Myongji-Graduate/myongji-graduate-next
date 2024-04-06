'use client';
import { Table } from '../../view/molecule/table';
import DeleteTakenLectureButton from './delete-taken-lecture-button';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';
import { useOptimistic } from 'react';
import { useAtomValue } from 'jotai';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

export default function TakenLectureList() {
  const takenLectures = useAtomValue(takenLectureAtom);

  const [optimisticLecture, deleteOptimisticLecture] = useOptimistic(
    takenLectures,
    (currentTakenLectures, lectureId) => {
      return currentTakenLectures.filter((lecture) => lecture.id !== lectureId);
    },
  );

  return (
    <>
      {/* pc  */}
      <div className="hidden lg:block">
        <Table
          headerInfo={headerInfo}
          data={optimisticLecture}
          renderActionButton={(id: number) => (
            <DeleteTakenLectureButton lectureId={id} deleteOptimisticLecture={deleteOptimisticLecture} />
          )}
        />
      </div>
      {/* mobile */}
      <div className="block lg:hidden">
        <Table
          headerInfo={headerInfo}
          data={optimisticLecture}
          swipeable={true}
          renderActionButton={(id: number) => <DeleteTakenLectureButton lectureId={id} swipeable={true} />}
        />
      </div>
    </>
  );
}
