import { fetchUserInfo } from '@/app/business/user/user.query';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/user/user.type';
import InitUserAnnounce from './init-user-announce';
import UserInfoContent from './user-info-content';

async function UserInfoCard() {
  const data = await fetchUserInfo();

  function isInitUser(x: UserInfoResponse | InitUserInfoResponse): x is InitUserInfoResponse {
    return typeof x.studentName === null;
  }

  function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
    isInitUser(data) ? <InitUserAnnounce /> : <UserInfoContent data={data} />;
  }

  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
