import SignUpContainer from './components/sign-up-container';
import { Suspense } from 'react';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';

// Refactor: fallback 스켈레톤으로 대체
export default function Page() {
  return (
    <ContentContainer className="md:w-[768px] xl:w-[960px]">
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
