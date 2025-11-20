import featureImage1 from '@/public/assets/tutorial/tutorial-feature1.gif';
import featureImage2 from '@/public/assets/tutorial/tutorial-feature2.gif';
import featureImage3 from '@/public/assets/tutorial/tutorial-feature3.gif';
import featureImage4 from '@/public/assets/tutorial/tutorial-feature4.gif';
import featureImage5 from '@/public/assets/tutorial/tutorial-feature5.gif';
import uploadImage0 from '@/public/assets/tutorial/tutorial0.png';
import uploadImage1 from '@/public/assets/tutorial/tutorial1.png';
import uploadImage2 from '@/public/assets/tutorial/tutorial2.png';
import uploadImage3 from '@/public/assets/tutorial/tutorial3.png';
import uploadImage4 from '@/public/assets/tutorial/tutorial4.png';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface TutorialItem {
  imageUrl: StaticImageData;
  icon?: StaticImageData;
  content: React.ReactNode;
}

export const TUTORIAL_FEATRUE: TutorialItem[] = [
  {
    imageUrl: featureImage1,
    content: '강의 커스텀을 통한 졸업 사정 예측',
  },
  {
    imageUrl: featureImage2,
    content: '영역(공통교양 등)별 수강 현황 조회',
  },
  {
    imageUrl: featureImage3,
    content: '카테고리별 기이수/미이수 과목 정보 및 학점 조회',
  },
  {
    imageUrl: featureImage4,
    content: '학기 전·후 상태에 맞춘 시간표 생성/과목 추천',
  },
  {
    imageUrl: featureImage5,
    content: '학과 필수 과목과 인기 강의 탐색',
  },
];

export const TUTORIAL_UPLOAD: TutorialItem[] = [
  {
    imageUrl: uploadImage0,
    content: (
      <>
        <Link href="https://msi.mju.ac.kr/servlet/security/MySecurityStart" target="_blank">
          1. <span className="text-primary underline">MyiWeb MSI</span>
        </Link>
        에 접속 후 로그인(PC환경)
      </>
    ),
  },
  {
    imageUrl: uploadImage1,
    content: '2. 좌측 성적/졸업 메뉴 → 성적표(상담용, B4)',
  },
  {
    imageUrl: uploadImage2,
    content: '3. 우측 상단 조회버튼 → 프린트 아이콘',
  },
  {
    imageUrl: uploadImage3,
    content: '4. 인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼',
  },
  {
    imageUrl: uploadImage4,
    content: '5. 저장한 파일 업로드',
  },
];
