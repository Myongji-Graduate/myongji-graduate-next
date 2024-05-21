import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { API_PATH } from '../api-path';

import { cookies } from 'next/headers';
import { isValidation } from '@/app/utils/zod/validation.util';
import { InitUserInfoResponse, UserInfoResponse } from './user.type';
import { UserInfoResponseSchema, InitUserInfoResponseSchema } from './user.validation';
import { UnauthorizedError } from '@/app/utils/http/http-error';

export async function auth(): Promise<InitUserInfoResponse | UserInfoResponse | undefined> {
  try {
    const result = await fetchUserInfo();
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return;
    }
    throw error;
  }
}

export async function fetchUserInfo(): Promise<InitUserInfoResponse | UserInfoResponse> {
  try {
    const response = await fetch(`${API_PATH.user}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });

    const result = await response.json();

    httpErrorHandler(response, result);

    if (isValidation(result, UserInfoResponseSchema || InitUserInfoResponseSchema)) {
      return result;
    } else {
      throw 'Invalid user info response schema.';
    }
  } catch (error) {
    throw error;
  }
}
