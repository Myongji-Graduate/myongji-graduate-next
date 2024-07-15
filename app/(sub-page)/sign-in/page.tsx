import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '졸업을 부탁해에 로그인 하고 졸업요건을 간편하게 검사해 보세요.',
};

export default function SignInPage() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignInForm />
    </ContentContainer>
  );
}
