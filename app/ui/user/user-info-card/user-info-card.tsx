'use client';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import InitUserAnnounce from './init-user-announce';
import UserInfoContent from './user-info-content';
import { useFetchUserInfo } from '@/app/store/querys/user';

function UserInfoCard() {
  const { data } = useFetchUserInfo();

  function isInitUser(x: UserInfoResponse | InitUserInfoResponse): x is InitUserInfoResponse {
    return typeof x.studentName === null;
  }

  function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
    return isInitUser(data) ? <InitUserAnnounce /> : <UserInfoContent data={data} />;
  }

  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
