/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import TakenLectureLabel from './taken-lecture-label';
import { Table } from '../../view/molecule/table';
import { useEffect, useState } from 'react';
import { LectureInfo, SearchedLectureInfo } from '@/app/type/lecture';
import LectureSearch from '../lecture-search';
import { useTakenLectureStore } from '@/app/stores/lecture.store';
import DeleteTakenLecutreButton from './delete-taken-lecture-button';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

interface TakenLectureListProps {
  data: LectureInfo[];
}

export default function TakenLectureList({ data }: TakenLectureListProps) {
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const takenLectures = useTakenLectureStore((state) => state.takenLectures);
  const setTakenLectures = useTakenLectureStore((state) => state.actions.setTakenLectures);

  const addLecture = (item: SearchedLectureInfo) => {
    setTakenLectures([
      ...takenLectures,
      {
        id: item.id,
        year: 'CUSTOM',
        semester: 'CUSTOM',
        lectureCode: item.lectureCode,
        lectureName: item.name,
        credit: item.credit,
      },
    ]);
  };

  const changeCustomizingState = () => {
    setIsCustomizing(!isCustomizing);
  };

  useEffect(() => {
    if (!isCustomizing) {
      setTakenLectures(data);
    }
  }, [isCustomizing]);

  return (
    <div className="w-[800px] flex flex-col gap-10">
      {isCustomizing ? <LectureSearch handleAddButtonClick={addLecture} /> : null}
      <div className="w-[800px] flex flex-col gap-2">
        {/* w-[800px]은 w-full로 변경 예정  */}
        <TakenLectureLabel isCustomizing={isCustomizing} changeCustomizingState={changeCustomizingState} />
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
