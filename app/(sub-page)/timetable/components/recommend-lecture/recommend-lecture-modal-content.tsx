'use client';

import UserCreditResultSkeleton from '@/app/ui/user/user-credit-result/user-credit-result-skeleton';
import { useFetchRecommendLecture } from '@/app/business/services/timetable/recommend-lecture.query';
import useDialog from '@/app/hooks/useDialog';
import Skeleton from '@/app/utils/skeleton';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import RecommendLectureContainer from './recommend-lecture-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';

function RecommendLectureModalContent() {
  const { isOpen } = useDialog(DIALOG_KEY.RECOMMEND_LECTURE);
  const { data: recommendLectureData, isLoading } = useFetchRecommendLecture(isOpen);

  const UserCreditResult = dynamic(() => import('@/app/ui/user/user-credit-result/user-credit-result'), { ssr: false });

  const ModalHeader = () => {
    return (
      <TitleBox title="학기별 시간표 과목 추천">
        <Responsive minWidth={561}>
          <p>아직 듣지 않은 과목으로 남은 학기별 시간표를 자동으로 추천해드려요.</p>
        </Responsive>
        <Responsive maxWidth={560}>
          <p className="text-center leading-relaxed break-keep">
            아직 듣지 않은 과목으로
            <br />
            남은 학기별 시간표를 자동으로 추천해드려요.
          </p>
        </Responsive>
      </TitleBox>
    );
  };

  if (isLoading || !recommendLectureData) {
    return (
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex-shrink-0 p-4 flex flex-col gap-4">
          <ModalHeader />
          <UserCreditResultSkeleton />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <Skeleton className="h-full" />
        </div>
      </div>
    );
  }

  const normalizedRecommendLectureData = {
    ...recommendLectureData,
    semesters: recommendLectureData.semesters.map((semester) => ({
      ...semester,
      lectures: semester.lectures.map((lecture) => ({
        code: lecture.id,
        ...lecture,
      })),
    })),
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-shrink-0 p-4 flex flex-col gap-4">
        <ModalHeader />
        <UserCreditResult semestersLeft={normalizedRecommendLectureData.semestersLeft} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {normalizedRecommendLectureData.semestersLeft === 0 ? (
          <div className="flex flex-col items-center justify-center">
            <Image src="/assets/graduate-maru.png" alt="학사모 마루 이미지" className="mb-4" width={250} height={250} />
          </div>
        ) : (
          <RecommendLectureContainer semesters={normalizedRecommendLectureData.semesters} />
        )}
      </div>
    </div>
  );
}

export default RecommendLectureModalContent;
