/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import TakenLectureLabel from './taken-lecture-label';
import { Table } from '../../view/molecule/table';
import { useEffect, useState } from 'react';
import Button from '../../view/atom/button/button';
import { LectureInfo } from '@/app/type/lecture';
import LectureSearch from '../lecture-search';
import { SearchLectureInfo } from '../lecture-search/lecture-search-result-container';

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

  const addLecture = (item: SearchLectureInfo) => {
    setCustomLecture([
      ...customLecture,
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
      setCustomLecture(data);
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
    </div>
  );
}
