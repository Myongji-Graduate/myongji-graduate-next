import ContentContainer from '@/app/ui/view/atom/content-container';
import SignInForm from '@/app/ui/user/sign-in-form/sign-in-form';

// Refactor: fallback 스켈레톤으로 대체
export default function Page() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignInForm />
    </ContentContainer>
  );
}
