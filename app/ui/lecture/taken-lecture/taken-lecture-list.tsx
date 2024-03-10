/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import TakenLectureLabel from './taken-lecture-label';
import { Table } from '../../view/molecule/table';
import { useEffect } from 'react';
import { LectureInfo } from '@/app/type/lecture';
import LectureSearch from '../lecture-search';
import { useLectureStore } from '@/app/stores/lecture.store';
import DeleteTakenLecutreButton from './delete-taken-lecture-button';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

interface TakenLectureListProps {
  data: LectureInfo[];
}

export default function TakenLectureList({ data }: TakenLectureListProps) {
  const isCustomizing = useLectureStore((state) => state.isCustomizing);
  const takenLectures = useLectureStore((state) => state.takenLectures);
  const setTakenLectures = useLectureStore((state) => state.actions.setTakenLectures);

  useEffect(() => {
    if (!isCustomizing) {
      setTakenLectures(data);
    }
  }, [isCustomizing]);

  return (
    <div className="w-[800px] flex flex-col gap-10">
      {isCustomizing ? <LectureSearch /> : null}
      <div className="w-[800px] flex flex-col gap-2">
        {/* w-[800px]은 w-full로 변경 예정  */}
        <TakenLectureLabel />
        {isCustomizing ? (
          <Table
            headerInfo={headerInfo}
            data={takenLectures}
            renderActionButton={(id: number) => <DeleteTakenLecutreButton lectureId={id} />}
          />
        ) : (
          <Table headerInfo={headerInfo} data={data} />
        )}
      </div>
    </div>
  );
}
