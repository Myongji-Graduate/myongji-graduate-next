import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import InitUserAnnounce from './init-user-announce';
import { fetchUser } from '@/app/business/services/user/user.query';
import UserInfoContent from './user-info-content/user-info-content';

async function UserInfoCard() {
  const data = await fetchUser();

  function isInitUser(x: UserInfoResponse | InitUserInfoResponse): x is InitUserInfoResponse {
    return typeof x.studentName === null;
  }

  function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
    return isInitUser(data) ? <InitUserAnnounce /> : <UserInfoContent data={data} />;
  }

  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
