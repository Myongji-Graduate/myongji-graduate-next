import SignUpContainer from './components/sign-up-container';
import { Suspense } from 'react';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import SignUpFormSkeleton from '@/app/ui/user/sign-up-form/sign-up-form.skeleton';
import type { Metadata } from 'next';


export const metadata: Metadata = {
  title: '회원가입',
  description: '졸업을 부탁해에 회원가입 하고 졸업요건을 간편하게 검사해 보세요.',
};

export default function SignUpPage() {
  return (
    <ContentContainer className="md:w-[768px] xl:w-[960px]">
      <Suspense fallback={<SignUpFormSkeleton />}>
        <SignUpContainer />
      </Suspense>
    </ContentContainer>
  );
}
