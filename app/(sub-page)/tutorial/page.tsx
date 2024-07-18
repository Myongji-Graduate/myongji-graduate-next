import ImageCard from '@/app/ui/view/molecule/image-card/image-card';
import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import { cn } from '@/app/utils/shadcn/utils';
import Image from 'next/image';
import { TUTORIAL_FEATRUE, TUTORIAL_UPLOAD } from './data';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '튜토리얼',
  description: '서비스의 주요 정보와 사용법을 튜토리얼을 통해 확인해봐요.',
};

function TutorialPage() {
  return (
    <ContentContainer className={cn('flex flex-col gap-10 p-1 py-10', 'md:gap-20')} size="lg">
      <h1 className={cn('text-center text-xl font-bold', 'md:text-3xl')}>튜토리얼</h1>
      <p className={cn('w-[90%] m-auto break-keep text-center text-base text-gray-6 font-semibold', 'md:text-2xl')}>
        명지인을 위한 졸업 요건 충족도 확인 서비스 ‘졸업을부탁해’ 입니다. <br />
        우리 서비스의 주요 정보와 사용법을 확인해보세요
      </p>
      <TitleBox title="주요 기능">
        <div className="flex gap-2 p-2">
          {TUTORIAL_FEATRUE.map((feature, index) => (
            <Image src={feature.imageUrl} alt={`feature-${index}`} key={index} className="max-w-[32%]" />
          ))}
        </div>
      </TitleBox>
      <p className={cn('w-[90%] m-auto break-keep text-center text-base text-gray-6 font-semibold', 'md:text-2xl')}>
        정보 제공을 위해서는 여러분의 이수과목 정보가 필요합니다.
        <br /> PDF 업로드를 진행해주세요.
      </p>
      <TitleBox title="PDF 파일 업로드 방법">
        <div className="flex overflow-scroll gap-8 w-full mt-4">
          {TUTORIAL_UPLOAD.map((feature, index) => (
            <ImageCard
              key={index}
              image={feature.imageUrl}
              title={feature.title}
              content={feature.content}
              className="min-w-44 h-44 md:min-w-72 md:h-72"
            />
          ))}
        </div>
      </TitleBox>
    </ContentContainer>
  );
}

export default TutorialPage;
