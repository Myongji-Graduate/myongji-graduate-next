import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import UserInfoContent from './user-info-content';
import { fetchUser } from '@/app/business/services/user/user.query';
import { isInitUser } from '@/app/business/services/user/user.validation';

async function UserInfoCard() {
  const data = await fetchUser();

  function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
    return isInitUser(data) ? <></> : <UserInfoContent data={data} />;
  }

  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
