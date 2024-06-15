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
      major: '성적표를 입력하고, 졸업 여부를 확인하세요',
      studentNumber: '',
    };
  }

  if (isInitUser(userInfo)) {
    return {
      name: '명지인',
      major: '성적표를 입력하고, 졸업 여부를 확인하세요',
      studentNumber: userInfo.studentNumber,
    };
  }

  return {
    name: userInfo.studentName,
    major: userInfo.completionDivision[0].major,
    studentNumber: userInfo.studentNumber,
  };
}

export default async function UserInfoNavigator() {
  const userInfo = formatUserInfo(await auth());

  return (
    <div className="flex md:flex-col items-center md:p-4 space-x-4 md:space-x-0">
      <Avatar className="w-20 h-20 md:w-24 md:h-24" alt="Profile picture" src={'/assets/profile-image.png'} />
      <div className="flex flex-col items-start md:items-center">
        <div className="md:my-5 md:text-lg ">
          <span className="font-semibold">{userInfo.name}</span>
          <span>님</span>
        </div>
        <div className="mb-3 md:text-sm text-xs truncate">{userInfo.major}</div>
        <div className="md:text-sm text-xs text-gray-400">{userInfo.studentNumber}</div>
      </div>
    </div>
  );
}
