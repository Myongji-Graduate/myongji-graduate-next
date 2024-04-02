'use client';
import { Table } from '../../view/molecule/table';
import DeleteTakenLectureButton from './delete-taken-lecture-button';
import { useAtomValue } from 'jotai';
import { takenLectureAtom } from '@/app/store/custom-taken-lecture';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

export default function TakenLectureList() {
  const takenLectureState = useAtomValue(takenLectureAtom);
  return (
    <>
      {/* pc  */}
      <div className="hidden lg:block">
        <Table
          headerInfo={headerInfo}
          data={takenLectureState}
          renderActionButton={(id: number) => <DeleteTakenLectureButton lectureId={id} />}
        />
      </div>
      {/* mobile */}
      <div className="block lg:hidden">
        <Table
          headerInfo={headerInfo}
          data={takenLectureState}
          swipeable={true}
          renderActionButton={(id: number) => <DeleteTakenLectureButton lectureId={id} swipeable={true} />}
        />
      </div>
    </>
  );
}
