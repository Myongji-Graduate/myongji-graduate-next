import Avatar from '../../view/atom/avatar/avatar';
import Button from '../../view/atom/button/button';
import { fetchUserInfo } from '@/app/business/user/user.query';

export default async function UserInfoNavigator() {
  const userInfo = await fetchUserInfo();

  return (
    <div className="flex flex-col items-center p-4 ">
      <Avatar className="w-24 h-24" alt="Profile picture" src={'/assets/profile-image.png'} />

      <div className="my-5 text-lg">
        <span className="font-semibold">{userInfo.studentName}</span>
        <span>님</span>
      </div>
      <div className="mb-3 text-sm">{userInfo.completionDivision ? userInfo.completionDivision[0].major : ''}</div>
      <div className="text-sm text-gray-400">{userInfo.studentNumber}</div>
      <div className="mt-9">
        <Button size="sm" variant="secondary" label="로그아웃" />
      </div>
      <div className="mt-2">
        <Button size="sm" variant="text" label="회원탈퇴하기" />
      </div>
    </div>
  );
}
