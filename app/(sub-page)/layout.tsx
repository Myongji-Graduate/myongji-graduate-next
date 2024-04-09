import Image from 'next/image';
import background from '../../public/assets/background.png';

interface LayoutProps {
  children: React.ReactNode;
}

function SubPageLayout({ children }: LayoutProps) {
  return (
    <>
      <Image src={background} width={800} height={288} className="w-full bg-white h-[18rem]" alt="background" />
      <div className="flex justify-center">{children}</div>
    </>
  );
}

export default SubPageLayout;
