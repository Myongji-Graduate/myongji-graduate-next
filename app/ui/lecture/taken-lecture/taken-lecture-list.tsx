/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { Table } from '../../view/molecule/table';
import { useEffect } from 'react';
import { LectureInfo } from '@/app/type/lecture';
import { useAtom, useAtomValue } from 'jotai';
import { customLectureAtom, isCustomizingAtom } from '@/app/store/custom-taken-lecture';
import DeleteTakenLectureButton from './delete-taken-lecture-button';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

interface TakenLectureListProps {
  data: LectureInfo[];
}

export default function TakenLectureList({ data }: TakenLectureListProps) {
  const [isCustomizing, setIsCustomizing] = useAtom(isCustomizingAtom);
  const [customLecture, setCustomLecture] = useAtom(customLectureAtom);

  useEffect(() => {
    return () => {
      setCustomLecture(data);
      setIsCustomizing(false);
    };
  }, []);

  return (
    <>
      {isCustomizing ? (
        <Table
          headerInfo={headerInfo}
          data={customLecture}
          renderActionButton={(id: number) => <DeleteTakenLectureButton lectureId={id} />}
        />
      ) : (
        <Table headerInfo={headerInfo} data={data} />
      )}
    </>
  );
}
