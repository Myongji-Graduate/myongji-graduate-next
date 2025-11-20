'use client';

import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useQuery } from '@tanstack/react-query';
import { fetchUser } from './user.query';
import { InitUserInfoResponse, UserInfoResponse } from './user.type';

export const useFetchUser = () => {
  return useQuery<InitUserInfoResponse | UserInfoResponse>({
    queryKey: [QUERY_KEY.USER],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, //5분
    gcTime: 10 * 60 * 1000, //10분
  });
};
