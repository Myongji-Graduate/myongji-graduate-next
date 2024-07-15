import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from './ui/view/molecule/toast/toaster';
import { CypressProvider } from './utils/provider/cypress-provider';
import { ReactQueryProvider } from './utils/provider/react-query-provider';
import MSWComponent from './mocks/msw-component.mock';
import UserDeleteModal from './ui/user/user-info-navigator/user-delete-modal';

export const metadata: Metadata = {
  title: { default: '졸업을 부탁해', template: '졸업을 부탁해 | %s' },
  description:
    '명지대학교 졸업사정결과 조회서비스 "졸업을 부탁해"는 미이수 / 이수 과목정보 및 잔여학점 조회, 졸업사정예측 서비스를 원클릭으로 제공합니다.',
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
