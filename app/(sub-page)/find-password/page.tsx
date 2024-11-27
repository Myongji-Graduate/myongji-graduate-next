import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindPasswordContainer from './components/find-password-container';
import { Suspense } from 'react';
import FindIdFormSkeleton from '../../ui/user/find-id-form/find-id-form.skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '비밀번호 재설정',
  description: '회원정보를 통해 졸업을 부탁해의 비밀번호를 재설정해요.',
};

function FindPasswordPage() {
  return (
    <ContentContainer className="p-4 pb-0">
      <TitleBox title="비밀번호 재설정" />
      <Suspense fallback={<FindIdFormSkeleton />}>
        <FindPasswordContainer />
      </Suspense>
    </ContentContainer>
  );
}

export default FindPasswordPage;
