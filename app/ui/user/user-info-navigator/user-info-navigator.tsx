import Avatar from '../../view/atom/avatar/avatar';
import Button from '../../view/atom/button/button';
import { getUserInfo } from '@/app/business/user/user.query';
import Skeleton from '../../view/atom/skeleton';
import SignOutButton from './sign-out-button';
import UserDeleteButton from './user-delete-button';

export default async function UserInfoNavigator() {
  const userInfo = await getUserInfo();

  return (
    <div className="flex flex-col items-center p-4 ">
      <Avatar className="w-24 h-24" alt="Profile picture" src={'/assets/profile-image.png'} />

      <div className="my-5 text-lg">
        <span className="font-semibold">{userInfo.studentName}</span>
        <span>님</span>
      </div>
      <div className="mb-3 text-sm">{userInfo.major}</div>
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

export function UserInfoNavigatorSkeleton() {
  return (
    <div className="flex flex-col items-center p-4  space-y-3">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="space-y-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
