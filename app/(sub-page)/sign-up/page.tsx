import SignUpContainer from './components/sign-up-container';
import { Suspense } from 'react';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import SignUpFormSkeleton from '@/app/ui/user/sign-up-form/sign-up-form.skeleton';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px] xl:w-[960px]">
      <Suspense fallback={<SignUpFormSkeleton />}>
        <SignUpContainer />
      </Suspense>
    </ContentContainer>
  );
}
