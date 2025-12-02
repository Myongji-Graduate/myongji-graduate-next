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
      <div className="relative bg-white h-[18rem] overflow-hidden">
        <Image src={background} alt="background" fill className="object-cover object-bottom" priority />
      </div>
      <div className="flex justify-center">{children}</div>
    </>
  );
}

export default SubPageLayout;
