import SignUpContainer from './components/sign-up-container';
import { Suspense } from 'react';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import type { Metadata } from 'next';

// Refactor: fallback 스켈레톤으로 대체

export const metadata: Metadata = {
  title: '회원가입',
  description: '졸업을 부탁해에 회원가입 하고 졸업요건을 간편하게 검사해 보세요.',
};

export default function SignUpPage() {
  return (
    <ContentContainer className="md:w-[768px]">
      <Suspense
        fallback={
          <div className="h-96">
            <LoadingSpinner />
          </div>
        }
      >
        <SignUpContainer />
      </Suspense>
    </ContentContainer>
  );
}
