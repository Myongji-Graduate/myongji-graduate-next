import Avatar from '../../view/atom/avatar/avatar';

import Button from '../../view/atom/button/button';

export default function UserInfoNavigator() {
  return (
    <div className="flex flex-col items-center p-4 ">
      <Avatar className="w-24 h-24" alt="Profile picture" src={'/assets/profile-image.png'} />

      <div className="my-5 text-lg">
        <span className="font-semibold">모유진</span>
        <span>님</span>
      </div>
      <div className="mb-3 text-sm">용용스튜디오연구원</div>
      <div className="text-sm text-gray-400">60201671</div>

      <div className="mt-9">
        <Button size="sm" variant="secondary" label="로그아웃" />
      </div>
      <div className="mt-2">
        <Button size="sm" variant="text" label="회원탈퇴하기" />
      </div>
    </div>
  );
}
