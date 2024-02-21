import Image from 'next/image';
import NavigationBar from '../ui/view/molecule/navigation-bar';
interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Image
        src="/assets/background.png"
        width={800}
        height={288}
        className="w-full bg-white h-[18rem]"
        alt="background"
      />
      <div className="flex justify-center">{children}</div>
    </>
  );
}

export default Layout;
