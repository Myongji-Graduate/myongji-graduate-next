import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import AuthOptionContainer from './[components]/auth-option-container';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignInForm />
      <AuthOptionContainer />
    </ContentContainer>
  );
}
