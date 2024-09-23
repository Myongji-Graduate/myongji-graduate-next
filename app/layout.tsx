import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from './ui/view/molecule/toast/toaster';
import { CypressProvider } from './utils/provider/cypress-provider';
import { ReactQueryProvider } from './utils/provider/react-query-provider';
import MSWComponent from './mocks/msw-component.mock';
import UserDeleteModal from './ui/user/user-info-navigator/user-delete-modal';
import ChannelTalk from './channel-talk';

export const metadata: Metadata = {
  metadataBase: new URL('https://mju-graduate.com'),
  title: { default: '졸업을 부탁해', template: '%s | 졸업을 부탁해' },
  description:
    '명지대학교 졸업사정결과 조회서비스 "졸업을 부탁해"는 미이수 / 이수 과목정보 및 잔여학점 조회, 졸업사정예측 서비스를 원클릭으로 제공합니다.',
  icons: {
    icon: 'https://github.com/Myongji-Graduate/MyongjiGraduate-BE/assets/75975946/2a7354ae-dffe-4250-8b83-a211a07ff5d2',
  },
  openGraph: {
    siteName: '졸업을 부탁해',
    url: 'https://mju-graduate.com',
    images: [
      {
        url: 'https://github.com/Myongji-Graduate/MyongjiGraduate-FE/assets/75975946/79eb6efd-9def-4a95-9c75-367a81ea3474',
        width: 1200,
        height: 630,
        alt: 'default page image',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <link href="https://webfontworld.github.io/vitro/VitroCore.css" rel="stylesheet" />
      </head>
      <body>
        <ChannelTalk />
        <div className="bg-white">
          <ReactQueryProvider>
            <CypressProvider>
              <MSWComponent>{children}</MSWComponent>
            </CypressProvider>
          </ReactQueryProvider>
        </div>
        <Toaster />
        <UserDeleteModal />
      </body>
    </html>
  );
}
