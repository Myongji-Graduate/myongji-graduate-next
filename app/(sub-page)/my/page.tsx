import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import UserInfoNavigatorSkeleton from '@/app/ui/user/user-info-navigator/user-info-navigator.skeleton';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { Suspense } from 'react';
import MyResultContainer from './components/my-result-container';
import SignButtonGroup from '@/app/ui/user/user-info-navigator/sign-button-group';
import ContentContainer from '@/app/ui/view/atom/content-container/content-container';
import TakenLectureSkeleton from '@/app/ui/lecture/taken-lecture/taken-lecture.skeleton';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '마이페이지',
  description: '기이수 과목 및 잔여학점을 조회하고 커스텀을 통한 졸업사정을 예측해요.',
  openGraph: {
    siteName: '졸업을 부탁해',
    url: 'https://mju-graduate.com/my',
    images: [
      {
        url: 'https://github.com/user-attachments/assets/439ca378-e532-4e9b-9152-340b17218710',
        width: 1200,
        height: 630,
        alt: 'my-page image',
      },
    ],
  },
};

export default function MyPage() {
  return (
    <>
      <ContentContainer className="flex pt-10 lg:pt-16">
        <div className="lg:w-[30%] lg:block hidden">
          <Suspense fallback={<UserInfoNavigatorSkeleton />}>
            <UserInfoNavigator />
            <div className="mt-9">
              <SignButtonGroup />
            </div>
          </Suspense>
        </div>
        <div className="w-full lg:w-[70%] px-7 lg:px-[20px] pt-4 pb-2 flex flex-col gap-12">
          <MyResultContainer />
          <Suspense fallback={<TakenLectureSkeleton />}>
            <TakenLecture />
          </Suspense>
        </div>
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch />
      </Drawer>
    </>
  );
}
