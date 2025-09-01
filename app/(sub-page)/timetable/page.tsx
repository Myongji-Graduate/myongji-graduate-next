import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { Metadata } from 'next';
import RecommendLectureContainer from './components/recommend-lecture-container';
import Image from 'next/image';

export const metadata: Metadata = {
  title: '시간표',
  description: '시간표를 생성하거나 추천받아 보세요.',
};

function TimetablePage() {
  const remainSemester: number = 2; // 추후 API에서 받아오기
  const userName = '신현진';

  return (
    <ContentContainer className={cn('flex flex-col gap-2 py-10 px-7', 'md:gap-6 max-md:max-w-[600px]')} size="lg">
      <div className="flex flex-col gap-5 md:gap-6 border-b-2 pb-4 md:pb-6">
        <div className="flex flex-col gap-1">
          <p className="font-bold sm:text-3xl text-2xl sm:ml-0">학기별 시간표 과목 추천</p>
          <p className="text-gray-400">아직 듣지 않은 과목으로 남은 학기별 시간표를 자동으로 추천해드려요.</p>
        </div>
        <p className="text-lg md:text-xl font-bold text-gray-500">
          {userName}님, 앞으로 {remainSemester}학기 남았습니다!
        </p>
      </div>
      {remainSemester === 0 ? (
        <div className="flex flex-col items-center justify-center py-10">
          <Image src="/assets/graduate-maru.png" alt="학사모 마루 이미지" className="mb-4" width={400} height={400} />
        </div>
      ) : (
        <RecommendLectureContainer />
      )}
    </ContentContainer>
  );
}

export default TimetablePage;
