import type { Metadata } from 'next';
import { Toaster } from './ui/view/molecule/toast/toaster';
import { CypressProvider } from './utils/global/cypress-provider';
import { ReactQueryProvider } from './utils/global/react-query-provider';
import ChannelTalk from './utils/global/channel-talk';
import MSWComponent from './mocks/msw-component.mock';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://mju-graduate.com'),
  title: { default: '명지대학교 졸업사정결과 조회', template: '%s | 졸업을 부탁해' },
  description:
    '명지대학교 졸업사정결과 조회서비스 "졸업을 부탁해"는 미이수 / 이수 과목정보 및 잔여학점 조회, 졸업사정예측 서비스를 원클릭으로 제공합니다.',
  icons: {
    icon: '/assets/favicon.png',
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
  keywords: ['명지대학교 졸업', '졸업을 부탁해', '명지대학교', '졸업사정'],
  robots: 'index, follow',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://mju-graduate.com',
  name: '명지대학교 졸업을 부탁해',
  description:
    "명지대학교 졸업사정결과 조회서비스 '졸업을 부탁해'는 미이수 / 이수 과목정보 및 잔여학점 조회, 졸업사정예측 서비스를 원클릭으로 제공합니다.",
  publisher: {
    '@type': 'Organization',
    name: '명지대학교 졸업을 부탁해 팀',
    logo: {
      '@type': 'ImageObject',
      url: 'https://github.com/Myongji-Graduate/MyongjiGraduate-FE/assets/75975946/79eb6efd-9def-4a95-9c75-367a81ea3474',
      width: 1200,
      height: 630,
    },
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      name: '과목 검색',
      description: '유저가 과목을 검색할 수 있습니다.',
      target: 'https://prod.mju-graduate.com/api/v1/lectures?type=lectureName&&keyword={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
    {
      '@type': 'ReadAction',
      target: 'https://mju-graduate.com/result',
      name: '졸업사정 결과 조회',
      description: '유저가 졸업사정 결과를 조회할 수 있습니다.',
      agent: {
        '@type': 'Person',
        name: 'User',
      },
      object: {
        '@type': 'WebPage',
        name: '졸업사정 결과 페이지',
        url: 'https://mju-graduate.com/result',
      },
    },
  ],
  inLanguage: 'ko',
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
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
          as="style"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  );
}
