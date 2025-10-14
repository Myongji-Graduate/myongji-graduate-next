import React from 'react';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';
import { LectureData } from '../type';

interface LectureInsightModalDesktopProps {
  data: LectureData;
  focusProfessor: string;
  onSelectProfessor: (professor: string) => void;
  current: any;
}

export default function LectureInsightModalDesktop({
  data,
  focusProfessor,
  onSelectProfessor,
  current,
}: LectureInsightModalDesktopProps) {
  return (
    <div className="mt-4 grid grid-cols-[210px_1fr] gap-6">
      <ProfessorSelector
        professors={data.lectures}
        selectedProfessor={focusProfessor}
        onSelectProfessor={onSelectProfessor}
        isMobile={false}
      />
      <div>
        <div className="text-lg font-semibold mb-2">강의 정보</div>
        <div className="max-h-60 overflow-y-auto scrollbar-hide">
          <LectureInfo lecture={current} isMobile={false} />
        </div>
      </div>
    </div>
  );
}
