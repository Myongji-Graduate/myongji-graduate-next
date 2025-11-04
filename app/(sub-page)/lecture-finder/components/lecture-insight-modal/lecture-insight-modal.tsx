import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import { useFetchFindeLectureInfo } from '@/app/business/services/lecture-finder/lecture-info-query';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';

interface LectureInsightModalProps {
  subject: string;
}

export default function LectureInsightModal({ subject }: LectureInsightModalProps) {
  const { data = [] } = useFetchFindeLectureInfo(subject);
  const [focusProfessor, setProfessor] = React.useState<string>('');

  React.useEffect(() => {
    if (data.length > 0 && !focusProfessor) {
      setProfessor(data[0].professor);
    }
  }, [data, focusProfessor]);

  const current = data.find((lecture) => lecture.professor === focusProfessor);

  const render = () => (
    <div className="w-full max-w-[720px] md:px-0">
      <Responsive maxWidth={767}>
        <div className="mt-4 w-60 space-y-4">
          <ProfessorSelector
            professors={data}
            selectedProfessor={focusProfessor}
            onSelectProfessor={setProfessor}
            isMobile={true}
          />
          <div>
            <div className="text-base font-semibold mb-2">강의 정보</div>
            <div className="max-h-[50vh] overflow-y-auto scrollbar-hide">
              <LectureInfo lecture={current} isMobile={true} />
            </div>
          </div>
        </div>
      </Responsive>

      <Responsive minWidth={768}>
        <div className="mt-4 grid grid-cols-[210px_1fr] gap-6">
          <ProfessorSelector
            professors={data}
            selectedProfessor={focusProfessor}
            onSelectProfessor={setProfessor}
            isMobile={false}
          />
          <div>
            <div className="text-lg font-semibold mb-2">강의 정보</div>
            <div className="max-h-60 h-full scrollbar-hide">
              <LectureInfo lecture={current} isMobile={false} />
            </div>
          </div>
        </div>
      </Responsive>
    </div>
  );

  return <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>{render()}</Modal>;
}
