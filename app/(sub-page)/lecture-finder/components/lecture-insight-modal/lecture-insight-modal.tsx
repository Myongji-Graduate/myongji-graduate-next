'use client';

import React from 'react';
import Modal from '@/app/ui/view/molecule/modal/modal';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import { useFetchLectureInfo } from '@/app/business/services/lecture-finder/lecture-info-query';
import ProfessorSelector from '../lecture-contents/professor-selector';
import LectureInfo from './lecture-info';
import useDialog from '@/app/hooks/useDialog';
import LectureInsightSkeleton from './lecture-insight-skeleton';
import Image from 'next/image';
import NoResult from '@/public/assets/no-result-maru.png';

interface LectureInsightModalProps {
  subject: string;
}

export default function LectureInsightModal({ subject }: LectureInsightModalProps) {
  const { isOpen } = useDialog(DIALOG_KEY.LECTURE_INSIGHT);
  const { data = [], isLoading } = useFetchLectureInfo(subject);
  const [focusProfessor, setProfessor] = React.useState('');
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);
  const desktopScrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      setShowSkeleton(true);
      const timer = setTimeout(() => setShowSkeleton(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (isOpen && !isLoading && data.length > 0) {
      setProfessor(data[0].professor);
    }
  }, [isOpen, isLoading, data]);

  React.useEffect(() => {
    if (focusProfessor) {
      mobileScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
      desktopScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [focusProfessor]);

  const current = data.find((l) => l.professor === focusProfessor);

  if ((isLoading || showSkeleton) && data.length === 0) {
    return (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <LectureInsightSkeleton />
      </Modal>
    );
  }

  if (!isLoading && data.length === 0) {
    return (
      <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
        <div className="flex flex-col items-center justify-center py-10 md:w-full w-72 text-center">
          <Image src={NoResult} width={150} alt="no-result" className="opacity-95" />
          <p className=" text-lg font-semibold text-gray-700">강의 상세 정보를 찾을 수 없어요</p>
          <p className=" text-sm text-gray-500 leading-relaxed">
            해당 강의의 상세 리뷰가 등록되지 않았습니다.
            <br />
            다른 교수님 강의를 확인해보세요!
          </p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal modalKey={DIALOG_KEY.LECTURE_INSIGHT}>
      <div className="w-full max-w-[400px] min-w-[280px] h-[54vh] md:h-[55vh] flex flex-col ">
        <Responsive maxWidth={767}>
          <div className="flex flex-col gap-4 h-[500px]">
            <ProfessorSelector
              professors={data}
              selectedProfessor={focusProfessor}
              onSelectProfessor={setProfessor}
              isMobile
            />

            <div ref={mobileScrollRef} className="flex-1 overflow-y-auto scrollbar-hide">
              {current && <LectureInfo lecture={current} professor={focusProfessor} isMobile />}
            </div>
          </div>
        </Responsive>

        <Responsive minWidth={768}>
          <div className="h-full flex gap-3">
            <ProfessorSelector
              professors={data}
              selectedProfessor={focusProfessor}
              onSelectProfessor={setProfessor}
              isMobile={false}
            />

            <div className="flex flex-col h-full overflow-hidden">
              <div ref={desktopScrollRef} className="flex-1 min-h-0 overflow-y-auto scrollbar-hide">
                {current && <LectureInfo lecture={current} professor={focusProfessor} />}
              </div>
            </div>
          </div>
        </Responsive>
      </div>
    </Modal>
  );
}
