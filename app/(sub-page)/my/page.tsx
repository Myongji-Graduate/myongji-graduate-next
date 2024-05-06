import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import UserInfoNavigatorSkeleton from '@/app/ui/user/user-info-navigator/user-info-navigator.skeleton';
import ContentContainer from '@/app/ui/view/atom/content-container';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { Suspense } from 'react';
import MyResultContainer from './components/my-result-container';

export default function MyPage() {
  return (
    <>
      <ContentContainer className="flex">
        <div className="hidden lg:w-[30%] lg:block">
          <Suspense fallback={<UserInfoNavigatorSkeleton />}>
            <UserInfoNavigator />
          </Suspense>
        </div>
        <div className="w-full lg:w-[70%] lg:px-[20px] pt-12 pb-2 flex flex-col gap-12">
          <MyResultContainer />
          <TakenLecture />
        </div>
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch />
      </Drawer>
    </>
  );
}
