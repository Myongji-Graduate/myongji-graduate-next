import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import { AnonymousProvider } from './result/provider';

interface AnonymousLayoutProp {
  children: React.ReactNode;
}

export default function AnonymousLayout({ children }: AnonymousLayoutProp) {
  return <AnonymousProvider>{children}</AnonymousProvider>;
}
