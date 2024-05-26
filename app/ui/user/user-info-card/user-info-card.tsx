'use client';
import { fetchUserInfo } from '@/app/business/user/user.query';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/user/user.type';
import InitUserAnnounce from './init-user-announce';
import UserInfoContent from './user-info-content';
import { useSuspenseQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';

function UserInfoCard() {
  const { data } = useSuspenseQuery<InitUserInfoResponse | UserInfoResponse>({
    queryKey: [QUERY_KEY.USER],
    staleTime: Infinity,
    queryFn: fetchUserInfo,
  });

  function isInitUser(x: UserInfoResponse | InitUserInfoResponse): x is InitUserInfoResponse {
    return typeof x.studentName === null;
  }

  function renderUserInfo(data: UserInfoResponse | InitUserInfoResponse) {
    return isInitUser(data) ? <InitUserAnnounce /> : <UserInfoContent data={data} />;
  }

  return <>{renderUserInfo(data)}</>;
}

export default UserInfoCard;
