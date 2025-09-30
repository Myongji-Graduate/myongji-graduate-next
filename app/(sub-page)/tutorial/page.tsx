import { cn } from '@/app/utils/shadcn/utils';
import { TUTORIAL_FEATRUE, TUTORIAL_UPLOAD } from './data';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import type { Metadata } from 'next';
import TutorialContent from './components/TutorialContent';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import { CheckIcon } from '@heroicons/react/16/solid';

export const metadata: Metadata = {
  title: '튜토리얼',
  description: '서비스의 주요 정보와 사용법을 튜토리얼을 통해 확인해봐요.',
};

function TutorialPage() {
  return (
    <ContentContainer className={cn('flex flex-col gap-2 p-1 py-10', 'max-md:max-w-[600px]')} size="lg">
      <TitleBox title="튜토리얼"></TitleBox>
      <section className="mx-[5%] py-6 overflow-hidden flex flex-col gap-4">
        <div className="text-md font-semibold text-gray-600 md:text-xl flex flex-col gap-1">
          <div className="flex items-center">
            <CheckIcon className="md:w-6 md:h-6 w-5 h-5 text-primary" />
            <span>졸업 요건 충족도 확인 서비스</span>
          </div>
          <span className="md:ml-6 ml-5">
            졸업을 부탁해의&nbsp;
            <span className="text-primary font-bold">주요 기능과 사용법</span>을 소개해요
          </span>
        </div>
        <TutorialContent data={TUTORIAL_FEATRUE} />
      </section>
      <section className="mx-[5%] py-6 overflow-hidden flex flex-col gap-4">
        <div className="text-md font-semibold text-gray-600 md:text-xl flex items-center">
          <CheckIcon className="md:w-6 md:h-6 h-5 w-5 text-primary" />
          <span className="text-primary font-bold">MyiWeb 성적표</span>를 통해 나만의 졸업사정결과를 확인해요
        </div>
        <TutorialContent data={TUTORIAL_UPLOAD} />
      </section>
    </ContentContainer>
  );
}

export default TutorialPage;
