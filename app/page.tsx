import Image from 'next/image';
import mainBookBackground from '../public/assets/main-book-background.png';
import mainMyongjiLogo from '../public/assets/main-myongji-logo.png';
import Responsive from './ui/responsive';
import NavigationBar from './ui/view/molecule/navigation-bar';
import Button from './ui/view/atom/button/button';
export default function HomePage() {
  return (
    <div className="bg-primary w-[100vw] h-[100vh] overflow-hidden relative">
      <NavigationBar />

      <Responsive minWidth={768}>
        <Image
          src={mainBookBackground}
          alt="main-book-background"
          width={900}
          height={800}
          className="absolute right-0"
        />
      </Responsive>
      <Image
        src={mainMyongjiLogo}
        alt="main-myongji-logo"
        width={120}
        height={120}
        className="absolute top-24 right-4"
      />
    </div>
  );
}
