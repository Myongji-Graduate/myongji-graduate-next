import LectureSearch from '@/app/ui/lecture/lecture-search';
import TakenLecture from '@/app/ui/lecture/taken-lecture';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import UserInfoNavigatorSkeleton from '@/app/ui/user/user-info-navigator/user-info-navigator.skeleton';
import ContentContainer from '@/app/ui/view/atom/content-container';
import Drawer from '@/app/ui/view/molecule/drawer/drawer';
import { DIALOG_KEY } from '@/app/utils/key/dialog-key.util';
import { Suspense } from 'react';
import MyResultContainer from './components/my-result-container';
import UserDeleteModal from '@/app/ui/user/user-info-navigator/user-delete-modal';
import SignButtonGroup from '@/app/ui/user/user-info-navigator/sign-button-group';
import Responsive from '@/app/ui/responsive';

export default function MyPage() {
  return (
    <>
      <ContentContainer className="flex">
        <Responsive minWidth={1023}>
          <div className="lg:w-[30%]">
            <Suspense fallback={<UserInfoNavigatorSkeleton />}>
              <UserInfoNavigator />
              <div className="mt-9">
                <SignButtonGroup />
              </div>
            </Suspense>
          </div>
        </Responsive>
        <div className="w-full lg:w-[70%] lg:px-[20px] pt-12 pb-2 flex flex-col gap-12">
          <MyResultContainer />
          <TakenLecture />
        </div>
      </ContentContainer>
      <Drawer drawerKey={DIALOG_KEY.LECTURE_SEARCH}>
        <LectureSearch />
      </Drawer>
      <UserDeleteModal />
    </>
  );
}
