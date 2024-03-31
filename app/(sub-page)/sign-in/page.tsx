import ContentContainer from '@/app/ui/view/atom/content-container';
import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignInForm />
    </ContentContainer>
  );
}
