import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';

export default function Page() {
  return (
    <ContentContainer className="md:w-[768px] flex">
      <div className="w-2/5"></div>
      <div className="w-3/5 p-7">
        <SignInForm />
      </div>
    </ContentContainer>
  );
}
