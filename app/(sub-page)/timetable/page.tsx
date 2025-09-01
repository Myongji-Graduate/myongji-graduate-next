import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { cn } from '@/app/utils/shadcn/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '시간표',
  description: '시간표를 생성하거나 추천받아 보세요.',
};

function TimetablePage() {
  return (
    <ContentContainer className={cn('flex flex-col gap-6 p-1 py-10', 'md:gap-20 max-md:max-w-[600px]')} size="lg">
      <h1>시간표</h1>
    </ContentContainer>
  );
}

export default TimetablePage;
