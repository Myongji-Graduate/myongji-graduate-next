import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindIdContainer from './[components]/find-id-container';
import { Suspense } from 'react';
import FindIdFormSkeleton from '@/app/ui/user/find-id-form/find-id-form.skeleton';

export default function FindIdPage() {
  return (
    <ContentContainer>
      <TitleBox title="아이디 찾기" />
      <Suspense fallback={<FindIdFormSkeleton />}>
        <FindIdContainer />
      </Suspense>
    </ContentContainer>
  );
}
