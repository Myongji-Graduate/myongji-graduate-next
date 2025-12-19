'use client';

import { useFetchRecommendLecture } from '@/app/business/services/timetable/recommend-lecture.query';
import useDialog from '@/app/hooks/useDialog';
import Image from 'next/image';
import RecommendLectureContainer from './recommend-lecture-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import Responsive from '@/app/ui/responsive';
import { Semester } from '@/app/business/services/timetable/recommend-lecture.type';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';

function RecommendLectureModalContent() {
  const { isOpen } = useDialog(DIALOG_KEY.RECOMMEND_LECTURE);
  const { data, isLoading, isError, error } = useFetchRecommendLecture(isOpen);

  const ModalHeader = () => (
    <TitleBox title="학기별 시간표 과목 추천">
      <Responsive minWidth={1024}>
        <p>아직 듣지 않은 과목으로 남은 학기별 시간표를 자동으로 추천해드려요.</p>
      </Responsive>
      <Responsive maxWidth={1023}>
        <p className="text-center leading-relaxed break-keep">
          아직 듣지 않은 과목으로
          <br />
          남은 학기별 시간표를 자동으로 추천해드려요.
        </p>
      </Responsive>
    </TitleBox>
  );

  const Content = () => {
    if (isLoading) {
      return (
        <div className=" w-full h-72 overflow-auto flex flex-col gap-3 justify-center items-center">
          <LoadingSpinner className="animate-spin h-12 w-12 fill-gray-400" />
          <p className="text-gray-600">로딩중...</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center py-6">
          <div className="flex flex-col items-center text-center">
            <Image src="/assets/embarrassing-maru.png" alt="당황스러워하는 마루" width={200} height={350} />
            <p className="text-gray-500">과목 추천 과정에서 문제가 생겼어요</p>
            {error instanceof Error && <p>{error.message}</p>}
          </div>
        </div>
      );
    }

    if (!data) return null;

    const normalizedData = {
      ...data,
      semesters: data.semesters.map((semester) => ({
        ...semester,
        lectures: semester.lectures.map((lecture) => ({
          ...lecture,
          code: lecture.id,
        })),
      })),
    };

    if (normalizedData.semestersLeft === 0) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <Image src="/assets/graduate-maru.png" alt="학사모 마루 이미지" width={250} height={250} />
        </div>
      );
    }

    return <RecommendLectureContainer semesters={normalizedData.semesters as Semester[]} />;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="flex-shrink-0 p-4 flex flex-col gap-4">
        <ModalHeader />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <Content />
      </div>
    </div>
  );
}

export default RecommendLectureModalContent;
