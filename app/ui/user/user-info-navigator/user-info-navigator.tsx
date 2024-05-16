import { UserInfoResponseSchema } from '@/app/business/user/user.validation';
import Avatar from '../../view/atom/avatar/avatar';
import SignOutButton from './sign-out-button';
import UserDeleteButton from './user-delete-button';
import { fetchUserInfo } from '@/app/business/user/user.query';
import { z } from 'zod';

export default async function UserInfoNavigator() {
  const userInfo = (await fetchUserInfo()) as z.infer<typeof UserInfoResponseSchema>;

  return (
    <div className="flex flex-col items-center p-4 ">
      <Avatar className="w-24 h-24" alt="Profile picture" src={'/assets/profile-image.png'} />

      <div className="my-5 text-lg">
        <span className="font-semibold">{userInfo.studentName}</span>
        <span>님</span>
      </div>
      <div className="mb-3 text-sm">{userInfo.completionDivision[0].major}</div>
      <div className="text-sm text-gray-400">{userInfo.studentNumber}</div>
      <div className="mt-9">
        <SignOutButton />
      </div>
      <div className="mt-2">
        <UserDeleteButton />
      </div>
    </div>
  );
}
