/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import TakenLectureLabel from './taken-lecture-label';
import { Table } from '../../view/molecule/table';
import { useEffect, useState } from 'react';
import Button from '../../view/atom/button/button';
import { LectureInfo } from '@/app/type/lecture';

const headerInfo = ['수강년도', '수강학기', '과목코드', '과목명', '학점'];

interface TakenLectureListProps {
  data: LectureInfo[];
}

export default function TakenLectureList({ data }: TakenLectureListProps) {
  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [customLecture, setCustomLecture] = useState<LectureInfo[]>(data);

  const deleteLecture = (id: number) => {
    setCustomLecture(customLecture.filter((lecture) => lecture.id !== id));
  };

  useEffect(() => {
    if (!isCustomizing) {
      setCustomLecture(data);
    }
  }, [isCustomizing]);

  return (
    <div className="w-[800px] flex flex-col gap-2">
      {/* w-[800px]은 w-full로 변경 예정  */}
      <TakenLectureLabel isCustomizing={isCustomizing} setIsCustomizing={setIsCustomizing} />
      {isCustomizing ? (
        <Table
          headerInfo={headerInfo}
          data={customLecture}
          renderActionButton={(id: number) => (
            <Button
              label="삭제"
              variant="list"
              data-testid="taken-lecture-delete-button"
              onClick={() => {
                deleteLecture(id);
              }}
            />
          )}
        />
      ) : (
        <Table headerInfo={headerInfo} data={data} />
      )}
    </div>
  );
}
