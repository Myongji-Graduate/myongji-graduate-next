import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import { useFetchLectureInfo } from '@/app/business/services/lecture-finder/lecture-info-query';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';
import useDialog from '@/app/hooks/useDialog';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';

interface LectureInsightModalProps {
  subject: string;
}

export default function LectureInsightModal({ subject }: LectureInsightModalProps) {
  const { data = [], isLoading } = useFetchLectureInfo(subject);
  const [focusProfessor, setProfessor] = React.useState<string>('');
  const { isOpen } = useDialog(DIALOG_KEY.LECTURE_INSIGHT);

  const [showSkeleton, setShowSkeleton] = React.useState(true);

  React.useEffect(() => {
    if (isOpen) {
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && !isLoading && data.length > 0) {
      setProfessor(data[0].professor);
    }
  }, [isOpen, isLoading, data]);

  const current = data.find((lecture) => lecture.professor === focusProfessor);

  if ((isLoading || showSkeleton) && data.length === 0) {
    return (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <div className="w-full flex justify-center items-center">
          <LoadingSpinner
            className={'animate-spin shrink-0 h-12 w-12 mr-1.5 -ml-1 fill-gray-400'}
            style={{ transition: `width 150ms` }}
          />
        </div>
      </Modal>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <div className="p-4 text-center text-sm text-gray-500">강의 상세 정보가 없습니다.</div>
      </Modal>
    );
  }
  return (
    <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
      <div className="w-full max-w-[900px] min-w-[280px] h-[80vh] md:h-[85vh] flex flex-col md:px-0">
        <Responsive maxWidth={767}>
          <div className="flex flex-col h-full mt-4 space-y-4">
            <div className="shrink-0 w-full">
              <ProfessorSelector
                professors={data}
                selectedProfessor={focusProfessor}
                onSelectProfessor={setProfessor}
                isMobile
              />
            </div>

            <div className="flex-1 min-h-0 w-[280px] md:w-full overflow-y-auto scrollbar-hide pb-3">
              <div className="text-base font-semibold mb-2">강의 정보</div>
              {current && <LectureInfo lecture={current} professor={focusProfessor} isMobile />}
            </div>
          </div>
        </Responsive>

        <Responsive minWidth={768}>
          <div className="grid grid-cols-[220px_1fr] gap-6 mt-4 h-full">
            <div className="shrink-0">
              <ProfessorSelector
                professors={data}
                selectedProfessor={focusProfessor}
                onSelectProfessor={setProfessor}
                isMobile={false}
              />
            </div>

            <div className="flex flex-col h-full overflow-hidden">
              <div className="shrink-0 text-lg font-semibold mb-2 whitespace-nowrap">
                <Responsive maxWidth={1024}>
                  <div className="truncate">{focusProfessor} 교수님 강의 정보</div>
                </Responsive>
                <Responsive minWidth={1025}>
                  <div>{focusProfessor} 교수님 강의 정보</div>
                </Responsive>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto scrollbar-hide pr-1">
                {current && <LectureInfo lecture={current} professor={focusProfessor} isMobile={false} />}
              </div>
            </div>
          </div>
        </Responsive>
      </div>
    </Modal>
  );
}
