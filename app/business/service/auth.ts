'use server';
import { cookies } from 'next/headers';
import { UnauthorizedError } from '../../utils/http/http-error';
import { httpErrorHandler } from '../../utils/http/http-error-handler';
import { isValidation } from '../../utils/zod/validation.util';
import { API_PATH } from '../api-path';
import { InitUserInfoResponse, UserInfoResponse } from './user/user.type';
import { UserInfoResponseSchema, InitUserInfoResponseSchema } from './user/user.validation';

export const getToken = (): string | undefined => {
  return cookies().get('accessToken')?.value;
};

export async function auth(): Promise<InitUserInfoResponse | UserInfoResponse | undefined> {
  try {
    const result = await fetchUser();
    return result;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return;
    }
    throw error;
  }
}

export async function fetchUser(): Promise<InitUserInfoResponse | UserInfoResponse> {
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
