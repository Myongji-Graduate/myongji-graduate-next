import React from 'react';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';
import { LectureData } from '../type';

interface LectureInsightModalMobileProps {
  data: LectureData;
  focusProfessor: string;
  onSelectProfessor: (professor: string) => void;
  current: any;
}

export default function LectureInsightModalMobile({
  data,
  focusProfessor,
  onSelectProfessor,
  current,
}: LectureInsightModalMobileProps) {
  return (
    <div className="mt-4 w-60 space-y-4">
      <ProfessorSelector
        professors={data.lectures}
        selectedProfessor={focusProfessor}
        onSelectProfessor={onSelectProfessor}
        isMobile={true}
      />
      <div>
        <div className="text-base font-semibold mb-2">강의 정보</div>
        <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
          <LectureInfo lecture={current} isMobile={true} />
        </div>
      </div>
    </div>
  );
}
