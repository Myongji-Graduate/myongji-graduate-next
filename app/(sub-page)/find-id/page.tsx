import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindIdContainer from './[components]/find-id-container';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import { Suspense } from 'react';

export default function FindIdPage() {
  return (
    <ContentContainer>
      <TitleBox title="아이디 찾기" />
      <Suspense
        fallback={
          <div className="h-96">
            <LoadingSpinner />
          </div>
        }
      >
        <FindIdContainer />
      </Suspense>
    </ContentContainer>
  );
}
