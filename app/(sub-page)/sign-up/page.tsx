import ContentContainer from '@/app/ui/view/atom/content-container';
import SignUpContainer from './components/sign-up-container';

export default async function Page() {
  return (
    <ContentContainer className="md:w-[768px]">
      <SignUpContainer />
    </ContentContainer>
  );
}
