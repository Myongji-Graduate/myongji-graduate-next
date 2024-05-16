import Image from 'next/image';
import logo from '../../../public/assets/logo.svg';
import Responsive from '../../ui/responsive';
import SideNavigationBar from './side-navigation-bar';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import SignOutButton from '@/app/ui/user/user-info-navigator/sign-out-button';
import UserDeleteButton from '@/app/ui/user/user-info-navigator/user-delete-button';

export default function NavigationBar() {
  return (
    <div className="absolute flex justify-between items-center p-4 border-b-[1px] w-full z-2">
      <Image className="md:h-10 h-7 w-[110px] md:w-[150px]" width={150} height={100} src={logo} alt="main-logo" />
      <Responsive maxWidth={768}>
        <SideNavigationBar
          header={<UserInfoNavigator />}
          content={<div>콘텐츠</div>}
          footer={
            <div className="flex flex-col items-center space-y-2">
              <SignOutButton />
              <UserDeleteButton />
            </div>
          }
        />
      </Responsive>
    </div>
  );
}
