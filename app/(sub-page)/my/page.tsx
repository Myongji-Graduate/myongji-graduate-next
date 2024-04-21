import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import UserInfoNavigator, { UserInfoNavigatorSkeleton } from '@/app/ui/user/user-info-navigator/user-info-navigator';
import ContentContainer from '@/app/ui/view/atom/content-container';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog.key';
import { Suspense } from 'react';

export default function MyPage() {
  return (
    <>
      <ContentContainer className="flex">
        <div className="hidden lg:w-[30%] lg:block">
          <Suspense fallback={<UserInfoNavigatorSkeleton />}>
            <UserInfoNavigator />
          </Suspense>
        </div>
        <div className="w-full lg:w-[70%] lg:px-[20px]">
          <TakenLecture />
        </div>
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch />
      </Drawer>
    </>
  );
}
