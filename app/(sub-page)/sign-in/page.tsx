import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignInForm />
    </ContentContainer>
  );
}
