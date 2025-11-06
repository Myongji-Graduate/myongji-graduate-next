import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import { useFetchLectureInfo } from '@/app/business/services/lecture-finder/lecture-info-query';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';
import useDialog from '@/app/hooks/useDialog';

interface LectureInsightModalProps {
  subject: string;
}

export default function LectureInsightModal({ subject }: LectureInsightModalProps) {
  const { data = [], isLoading } = useFetchLectureInfo(subject);
  const [focusProfessor, setProfessor] = React.useState<string>('');
  const { isOpen } = useDialog(DIALOG_KEY.LECTURE_INSIGHT);

  React.useEffect(() => {
    if (!isLoading && data.length > 0) {
      setProfessor(data[0].professor);
    }
  }, [isLoading, data, isOpen]);

  const current = data.find((lecture) => lecture.professor === focusProfessor);

  if (!isLoading && data.length === 0) {
    return (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <div className="p-4 text-center text-sm text-gray-500">강의 상세 정보가 없습니다.</div>
      </Modal>
    );
  }

  return (
    <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
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
                {current && <LectureInfo lecture={current} professor={focusProfessor} isMobile={true} />}
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
                {current && <LectureInfo lecture={current} professor={focusProfessor} isMobile={false} />}
              </div>
            </div>
          </div>
        </Responsive>
      </div>
    </Modal>
  );
}
