import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { API_PATH } from '../api-path';
import { UserInfoResponse } from './user.type';
import { cookies } from 'next/headers';
import { isValidation } from '@/app/utils/zod/validation.util';
import { UserInfoResponseSchema } from './user.validation';
import { ResultUserInfo } from '../result/result.query';

export async function getUserInfo(): Promise<UserInfoResponse> {
  try {
    const response = await fetch(`${API_PATH.user}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });

    const result = await response.json();

    httpErrorHandler(response, result);

    if (isValidation(result, UserInfoResponseSchema)) {
      return result;
    } else {
      throw 'Invalid user info response schema.';
    }
  } catch (error) {
    throw error;
  }
}

export async function getResultUserInfo(): Promise<ResultUserInfo> {
  try {
    const response = await fetch(`${API_PATH.resultUserInfo}`, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });

    const result = await response.json();

    httpErrorHandler(response, result);
    return result;
  } catch (error) {
    throw error;
  }
}
