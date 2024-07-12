import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import FindPasswordContainer from './[components]/find-password-container';
import LoadingSpinner from '@/app/ui/view/atom/loading-spinner/loading-spinner';
import { Suspense } from 'react';

function FindPasswordPage() {
  return (
    <ContentContainer>
      <TitleBox title="비밀번호 재설정" />
      <Suspense
        fallback={
          <div className="h-96">
            <LoadingSpinner />
          </div>
        }
      >
        <FindPasswordContainer />
      </Suspense>
    </ContentContainer>
  );
}

export default FindPasswordPage;
