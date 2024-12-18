import Image from 'next/image';
import mainBookBackground from '../public/assets/main-book-background.png';
import mainMyongjiLogo from '../public/assets/main-myongji-logo.png';
import graduationCap from '../public/assets/graduation-cap.png';
import Responsive from './ui/responsive';
import NavigationBar from './(sub-page)/components/navigation-bar';
import Button from './ui/view/atom/button/button';
import Link from 'next/link';
import localFont from 'next/font/local';

const vitroFont = localFont({
  src: '../public/assets/font/vitro.woff2',
  variable: '--font-vitro',
  weight: '700',
  display: 'swap',
});

export default function HomePage() {
  return (
    <div className={`bg-primary w-screen h-screen overflow-hidden relative ${vitroFont.variable}`}>
      <NavigationBar />
      <Responsive minWidth={768}>
        <div className="fixed h-screen right-0 w-7/12">
          <Image
            src={mainBookBackground}
            alt="main-book-background"
            fill={true}
            className="absolute object-contain z-0"
            quality={50}
            priority={true}
          />
        </div>
      </Responsive>
      <Image
        src={mainMyongjiLogo}
        alt="main-myongji-logo"
        width={120}
        height={120}
        className="absolute top-24 right-4"
      />
      <main className="relative h-full flex flex-col items-center justify-center gap-6 z-1">
        <section className="text-center flex flex-col gap-4">
          <div className="relative">
            <h1
              className="z-2 text-3xl font-bold sm:text-7xl relative text-white"
              style={{ fontFamily: 'var(--font-vitro)' }}
            >
              <span className="text-etc-yellow" style={{ fontFamily: 'var(--font-vitro)' }}>
                졸
              </span>
              업을&nbsp;
              <span className="text-etc-yellow" style={{ fontFamily: 'var(--font-vitro)' }}>
                부
              </span>
              탁해
            </h1>
            <Image
              src={graduationCap}
              alt="graduation-cap"
              className="absolute object-contain bottom-2 left-8 sm:bottom-10 sm:left-[-24px] sm:w-[52px] w-[36px]"
              sizes="(min-width: 640px) 52px, 36px"
              quality={100}
            />
          </div>
          <h2 className="text-md sm:text-lg text-gray-400 font-medium">명지인을 위한 간편 졸업요건 검사 사이트</h2>
        </section>
        <Link href="/result">
          <Button label="검사 시작" variant="dark" size="xl" />
        </Link>
      </main>
    </div>
  );
}
