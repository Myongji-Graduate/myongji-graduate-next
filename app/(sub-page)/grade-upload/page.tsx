import ContentContainer from '../../ui/view/atom/content-container/content-container';
import Manual from './components/manual';
import UploadTakenLecture from '../../ui/lecture/upload-taken-lecture/upload-taken-lecture';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '성적표 업로드',
  description:
    'MyiWeb MSI의 성적표만으로 카테고리별 이수 / 미이수 과목 정보 및 잔여학점 조회, 커스텀을 통한 졸업사정예측 서비스를 원클릭으로 제공합니다.',
};

export default function GradeUploadPage() {
  return (
    <ContentContainer className="flex flex-col justify-center gap-8 min-h-[70vh]">
      <Manual />
      <UploadTakenLecture />
    </ContentContainer>
  );
}
