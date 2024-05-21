import { fetchUserInfo } from '@/app/business/user/user.query';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/user/user.type';
import InitUserAnnounce from './init-user-announce';
import UserInfoContent from './user-info-content';
import { isInitUser } from '@/app/business/user/user.validation';

function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
  isInitUser(data) ? <InitUserAnnounce /> : <UserInfoContent data={data} />;
}

async function UserInfoCard() {
  const data = await fetchUserInfo();
  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
