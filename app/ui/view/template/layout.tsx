'use client';
import { usePathname } from 'next/navigation';
import NavigationBar from '../molecule/navigation-bar';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return isMainPage ? (
    children
  ) : (
    <div className="bg-white w-[100vw] h-[100vh]">
      <NavigationBar />
      <Image
        src="/assets/background.png"
        width={800}
        height={288}
        className="w-full bg-white h-[18rem]"
        alt="background"
      />
      <div className="flex justify-center">{children}</div>
    </div>
  );
}

export default Layout;
