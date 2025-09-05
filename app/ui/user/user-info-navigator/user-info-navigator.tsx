import { auth } from '@/app/business/services/user/user.query';
import { isInitUser } from '@/app/business/services/user/user.validation';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import Avatar from '../../view/atom/avatar';

function formatUserInfo(userInfo: InitUserInfoResponse | UserInfoResponse | undefined): {
  name: string;
  major: string;
  studentNumber: string;
} {
  if (!userInfo) {
    return {
      name: '소중한 GUEST',
      major: '성적표 입력 후, 졸업 여부를 확인해요',
      studentNumber: '',
    };
  }

  if (isInitUser(userInfo)) {
    return {
      name: '명지인',
      major: '성적표 입력 후, 졸업 여부를 확인해요',
      studentNumber: userInfo.studentNumber,
    };
  }

  return {
    name: userInfo.studentName,
    major: userInfo.completeDivision[0].major,
    studentNumber: userInfo.studentNumber,
  };
}

interface UserInfoNavigatorProps {
  variant?: 'small' | 'large';
}

export default async function UserInfoNavigator({ variant }: UserInfoNavigatorProps) {
  const userInfo = formatUserInfo(await auth());

  if (variant === 'large') {
    return (
      <div className="flex flex-col items-center p-4 pb-6">
        <Avatar className="w-24 h-24" alt="Profile picture" src="/assets/profile-image.png" />
        <div className="flex flex-col items-center mt-5">
          <div className="text-lg font-semibold">
            {userInfo.name}
            <span>님</span>
          </div>
          <div className="mb-3 text-sm truncate">{userInfo.major}</div>
          <div className="text-sm text-gray-400">{userInfo.studentNumber}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-center p-4 pb-6 border-b-4 space-x-4">
      <Avatar className="w-16 h-16" alt="Profile picture" src="/assets/profile-image.png" />
      <div className="flex flex-col items-start">
        <div className="text-md font-semibold">
          {userInfo.name}
          <span>님</span>
        </div>
        <div className="mb-2 text-xs truncate">{userInfo.major}</div>
        <div className="text-xs text-gray-400">{userInfo.studentNumber}</div>
      </div>
    </div>
  );
}
