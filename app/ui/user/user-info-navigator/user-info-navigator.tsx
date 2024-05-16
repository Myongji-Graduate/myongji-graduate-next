import { UserInfoResponseSchema } from '@/app/business/user/user.validation';
import Avatar from '../../view/atom/avatar/avatar';
import SignOutButton from './sign-out-button';
import UserDeleteButton from './user-delete-button';
import { fetchUserInfo } from '@/app/business/user/user.query';
import { z } from 'zod';

export default async function UserInfoNavigator() {
  const userInfo = (await fetchUserInfo()) as z.infer<typeof UserInfoResponseSchema>;

  return (
    <div className="flex md:flex-col items-center md:p-4 space-x-4 md:space-x-0">
      <Avatar className="w-20 h-20 md:w-24 md:h-24" alt="Profile picture" src={'/assets/profile-image.png'} />

      <div className="flex flex-col items-start md:items-center">
        <div className="md:my-5 md:text-lg ">
          <span className="font-semibold">{userInfo.studentName}</span>
          <span>님</span>
        </div>
        <div className="mb-3 md:text-sm text-xs truncate">{userInfo.completionDivision[0].major}</div>
        <div className="md:text-sm text-xs text-gray-400">{userInfo.studentNumber}</div>
      </div>
      {/* <div className="mt-9">
        <SignOutButton />
      </div>
      <div className="mt-2">
        <UserDeleteButton />
      </div> */}
    </div>
  );
}
