import { Metadata } from 'next/types';
import AnonymousResult from '../components/anonymous-result';

export const metadata: Metadata = {
  title: '졸업 요건 검사 결과',
  description: '회원가입없이 졸업사정 결과와, 카테고리별 미이수 / 이수 과목정보 및 잔여학점을 확인해요',
  openGraph: {
    siteName: '졸업을 부탁해',
    url: 'https://mju-graduate.com/result',
    images: [
      {
        url: 'https://github.com/user-attachments/assets/2093a57f-af35-4280-8acb-d403341fc8ff',
        width: 1200,
        height: 630,
        alt: 'result-page iamge',
      },
    ],
  },
};

function AnonymousResultPage() {
  return <AnonymousResult />;
}

export default AnonymousResultPage;
