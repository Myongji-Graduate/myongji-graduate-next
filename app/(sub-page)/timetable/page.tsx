import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { Metadata } from 'next';
import RecommendLecture from './components/recommend-lecture/recommend-lecture';

export const metadata: Metadata = {
  title: '시간표',
  description: '시간표를 생성하거나 추천받아 보세요.',
};

function TimetablePage() {
  return (
    <ContentContainer className="flex flex-col gap-2 py-10 px-7 md:gap-6">
      <RecommendLecture />
    </ContentContainer>
  );
}

export default TimetablePage;
