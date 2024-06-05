import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { InitUserInfoResponse, UserInfoResponse } from '@/app/business/services/user/user.type';
import { UserInfoResponseSchema, InitUserInfoResponseSchema } from '@/app/business/services/user/user.validation';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { isValidation } from '@/app/utils/zod/validation.util';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchUserInfo = () => {
  return useSuspenseQuery<InitUserInfoResponse | UserInfoResponse>({
    queryKey: [QUERY_KEY.USER],
    staleTime: Infinity,
    queryFn: fetchUserInfo,
  });
};

export async function fetchUserInfo() {
  try {
    const { data } = await axios<InitUserInfoResponse | UserInfoResponse>(API_PATH.user, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    if (isValidation(data, UserInfoResponseSchema || InitUserInfoResponseSchema)) {
      return data;
    } else {
      throw 'Invalid user info response schema.';
    }
  } catch (error) {
    throw error;
  }
}
