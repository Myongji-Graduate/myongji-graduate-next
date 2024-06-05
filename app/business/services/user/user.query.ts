import { API_PATH } from '../../api-path';
import { InitUserInfoResponse, UserInfoResponse } from './user.type';
import axios from 'axios';
import { getToken } from '../auth';
import { isValidation } from '@/app/utils/zod/validation.util';
import { UserInfoResponseSchema, InitUserInfoResponseSchema } from './user.validation';

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
