import Image from 'next/image';
import logo from '../../../public/assets/logo.svg';
import Responsive from '../../ui/responsive';
import SideNavigationBar from './side-navigation-bar';
import UserInfoNavigator from '@/app/ui/user/user-info-navigator/user-info-navigator';
import SignButtonGroup from '@/app/ui/user/user-info-navigator/sign-button-group';
import Link from 'next/link';
import NavigationItems from './navigation-items';
import UserDeleteModal from '@/app/ui/user/user-info-navigator/user-delete-modal';

export default function NavigationBar() {
  return (
    <header className="absolute flex justify-between items-center p-2.5 border-b-[1px] w-full z-2">
      <Link href={'/'}>
        <Image className="md:h-10 h-7 w-[110px] md:w-[150px]" width={150} height={100} src={logo} alt="main-logo" />
      </Link>
      <Responsive maxWidth={1023}>
        <nav>
          <SideNavigationBar
            header={<UserInfoNavigator />}
            content={<NavigationItems />}
            footer={<SignButtonGroup />}
          />
        </nav>
      </Responsive>
      <Responsive minWidth={1024}>
        <nav>
          <NavigationItems />
        </nav>
      </Responsive>
      <UserDeleteModal />
    </header>
  );
}
