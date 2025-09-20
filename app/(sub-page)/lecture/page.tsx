import type { Metadata } from 'next';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';

import TitleBox from '@/app/ui/view/molecule/title-box/title-box';
import LectureContents from './components/lecture-contents/lecture-contents';

export const metadata: Metadata = {
  title: '필수 과목 조회',
  description: '학과별 필수 과목을 조회하고, 인기순으로 비교해보세요!',
};

export default function LecturePage() {
  return (
    <ContentContainer className="py-7 px-5">
      <TitleBox title="필수 과목 조회">
        <p>학과별 필수 과목을 조회하고 인기순으로 확인해보세요!</p>
      </TitleBox>

      <LectureContents />
    </ContentContainer>
  );
}
