import Image from 'next/image';
import background from '../../public/assets/background.png';
import NavigationBar from './components/navigation-bar';

interface LayoutProps {
  children: React.ReactNode;
}

function SubPageLayout({ children }: LayoutProps) {
  return (
    <>
      <NavigationBar />
      <div className="relative bg-primary h-[18rem]">
        <Image src={background} sizes="100vw" className="absolute bottom-0 bg-white" alt="background" />
      </div>
      <div className="flex justify-center">{children}</div>
    </>
  );
}

export default SubPageLayout;
