import { Metadata } from 'next';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import AnonymousContainer from './components/anonymous-container';

export const metadata: Metadata = {
  title: '비회원으로 검사하기',
  description: '로그인없이 졸업요건을 간편하게 검사해 보세요.',
};

export default function AnonymousPage() {
  return (
    <ContentContainer className="max-md:max-w-[500px] md:w-[700px] p-4 py-6 md:p-8">
      <AnonymousContainer />
    </ContentContainer>
  );
}
