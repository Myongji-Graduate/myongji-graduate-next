import { cn } from '@/app/utils/shadcn/utils';
import { TUTORIAL_FEATRUE, TUTORIAL_UPLOAD } from './data';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import type { Metadata } from 'next';
import TutorialContent from './components/TutorialContent';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '튜토리얼',
  description: '서비스의 주요 정보와 사용법을 튜토리얼을 통해 확인해봐요.',
};

function TutorialPage() {
  return (
    <ContentContainer className={cn('flex flex-col gap-6 p-1 py-10', 'md:gap-20 max-md:max-w-[600px]')} size="lg">
      <h1 className={cn('text-center text-xl font-bold', 'md:text-3xl')}>튜토리얼</h1>
      <section>
        <div className="text-xl mx-[5%] py-4 font-bold text-gray-4 md:text-2xl md:py-8">
          졸업 요건 충족도 확인 서비스
          <br />
          졸업을 부탁해의&nbsp;
          <span className="max-sm:block md:hidden"></span>
          <span className="text-primary">주요 기능과 사용법</span>을 소개해요
        </div>
        <TutorialContent data={TUTORIAL_FEATRUE} />
      </section>
      <section>
        <div className="text-xl mx-[5%] py-4 font-bold text-gray-4 md:text-2xl md:py-8">
          <Link href="https://msi.mju.ac.kr/servlet/security/MySecurityStart" target="_blank">
            <span className="text-primary">MYIWEB 성적표</span>
          </Link>
          를 통해 <br />
          나만의 졸업사정결과를 확인해요
        </div>
        <TutorialContent data={TUTORIAL_UPLOAD} />
      </section>
    </ContentContainer>
  );
}

export default TutorialPage;
