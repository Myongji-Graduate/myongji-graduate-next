import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { AnonymousProvider } from './result/provider';

interface AnonymousLayoutProp {
  children: React.ReactNode;
}

export default function AnonymousLayout({ children }: AnonymousLayoutProp) {
  return (
    <AnonymousProvider>
      <ContentContainer className="max-md:max-w-[500px] md:w-[700px] p-4 py-6 md:p-8">{children}</ContentContainer>
    </AnonymousProvider>
  );
}
