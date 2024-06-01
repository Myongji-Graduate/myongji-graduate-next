import featureImage1 from '@/public/assets/tutorial/tutorial-feature1.png';
import featureImage2 from '@/public/assets/tutorial/tutorial-feature2.png';
import featureImage3 from '@/public/assets/tutorial/tutorial-feature3.png';
import uploadImage0 from '@/public/assets/tutorial/tutorial0.png';
import uploadImage1 from '@/public/assets/tutorial/tutorial1.png';
import uploadImage2 from '@/public/assets/tutorial/tutorial2.png';
import uploadImage3 from '@/public/assets/tutorial/tutorial3.png';
import uploadImage4 from '@/public/assets/tutorial/tutorial4.png';
import { StaticImageData } from 'next/image';
import Link from 'next/link';

interface TutorialItem {
  imageUrl: StaticImageData;
  title: string;
  content: React.ReactNode;
}

export const TUTORIAL_FEATRUE: TutorialItem[] = [
  {
    imageUrl: featureImage1,
    title: 'first',
    content: '강의 커스텀을 통한 졸업 사정 예측',
  },
  {
    imageUrl: featureImage2,
    title: 'second',
    content: '카테고리별(교양 / 전공) 수강 학점 현황 조회',
  },
  {
    imageUrl: featureImage3,
    title: 'third',
    content: '카테고리별(교양 / 전공) 미이수 과목 정보 및 잔여 학점 조회',
  },
];

export const TUTORIAL_UPLOAD: TutorialItem[] = [
  {
    imageUrl: uploadImage0,
    title: '1.',
    content: (
      <Link href="https://msi.mju.ac.kr/servlet/security/MySecurityStart" target="_blank">
        <span className="text-primary">MyiWeb MSI</span>에 접속 후 로그인(PC환경 권장)
      </Link>
    ),
  },
  {
    imageUrl: uploadImage1,
    title: '2.',
    content: '좌측 성적/졸업 메뉴 → 성적표(상담용,B4)클릭',
  },
  {
    imageUrl: uploadImage2,
    title: '3.',
    content: '우측 상단 조회버튼 클릭 → 프린트 아이콘 클릭 (모바일 환경에서는 뜨지 않을 수 있습니다.)',
  },
  {
    imageUrl: uploadImage3,
    title: '4.',
    content: '인쇄 정보의 대상(PDF로 저장) 설정 → 하단 저장 버튼 클릭 (비율이 깨지지 않도록 조심해주세요.)',
  },
  {
    imageUrl: uploadImage4,
    title: '5.',
    content: '저장한 파일 업로드',
  },
];
