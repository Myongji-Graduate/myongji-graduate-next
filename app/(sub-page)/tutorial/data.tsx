import featureImage1 from '@/public/assets/tutorial/tutorial-feature1.gif';
import featureImage2 from '@/public/assets/tutorial/tutorial-feature2.gif';
import featureImage3 from '@/public/assets/tutorial/tutorial-feature3.gif';
import uploadImage0 from '@/public/assets/tutorial/tutorial0.png';
import uploadImage1 from '@/public/assets/tutorial/tutorial1.png';
import uploadImage2 from '@/public/assets/tutorial/tutorial2.png';
import uploadImage3 from '@/public/assets/tutorial/tutorial3.png';
import uploadImage4 from '@/public/assets/tutorial/tutorial4.png';
import file from '../../../public/assets/file.svg';
import dimond from '../../../public/assets/dimond.svg';
import { StaticImageData } from 'next/image';
import Link from 'next/link';
import { title } from 'process';
import image from '@/public/assets/test.png';

export interface TutorialItem {
  imageUrl: StaticImageData;
  icon?: StaticImageData;
  content: React.ReactNode;
}

export const TUTORIAL_FEATRUE: TutorialItem[] = [
  {
    imageUrl: featureImage1,
    icon: file,
    content: '강의 커스텀을 통한 졸업 사정 예측',
  },
  {
    imageUrl: featureImage2,
    content: '영역(공통교양 등)별 수강 현황 조회',
    icon: dimond,
  },
  {
    imageUrl: featureImage3,
    icon: dimond,
    content: '카테고리(사고와 표현 등)별 기이수/미이수 과목 정보 및 학점 조회',
  },
];

export const TUTORIAL_UPLOAD: TutorialItem[] = [
  {
    imageUrl: uploadImage0,
    content: (
      <>
        <Link href="https://msi.mju.ac.kr/servlet/security/MySecurityStart" target="_blank">
          1. <span className="text-primary">MyiWeb MSI</span>
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
    content: '3. 우측 상단 조회버튼 → 프린트 아이콘 (모바일 지원 X)',
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
