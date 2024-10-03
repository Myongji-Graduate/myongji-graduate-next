import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindIdContainer from './components/find-id-container';
import { Suspense } from 'react';
import FindIdFormSkeleton from '@/app/ui/user/find-id-form/find-id-form.skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '아이디 찾기',
  description: '학번을 통해 졸업을 부탁해의 아이디를 찾을 수 있어요.',
};

export default function FindIdPage() {
  return (
    <ContentContainer className="p-4 pb-0">
      <TitleBox title="아이디 찾기" />
      <Suspense fallback={<FindIdFormSkeleton />}>
        <FindIdContainer />
      </Suspense>
    </ContentContainer>
  );
}
