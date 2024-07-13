import { userInfo } from './../data.mock';
import { FindIdResponseSchema } from './../../business/services/user/user.validation';
import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import {
  SignUpRequestBody,
  SignInRequestBody,
  SignInResponse,
  ValidateTokenResponse,
  UserInfoResponse,
  FindIdResponse,
  FindIdFormSchema,
  UserDeleteRequestBody,
  InitUserInfoResponse,
  FindPasswordFormSchema,
  ResetPasswordRequestBody,
} from '@/app/business/services/user/user.type';
import { ErrorResponseData } from '@/app/utils/http/http-error-handler';
import { StrictRequest } from 'msw';

const findAuthId = new RegExp(API_PATH.user + '/\\d{8}/auth-id');
const validateUser = new RegExp(API_PATH.user + '/\\d{8}/validate(?:auth-id=[\\w]*)?$');

function mockDecryptToken(token: string) {
  if (token === 'fake-access-token') {
    return {
      authId: 'admin',
    };
  }
  return {
    authId: '',
  };
}

export const devModeAuthGuard = (request: StrictRequest<any>) => {
  if (process.env.NODE_ENV === 'development') {
    const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
    if (accessToken === 'undefined' || !accessToken) {
      throw new Error('Unauthorized');
    }

    return mockDecryptToken(accessToken);
  } else {
    return {
      authId: 'admin',
    };
  }
};

export const userHandlers = [
  http.get<never, never, never>(`${API_PATH.auth}/failure`, async ({ request }) => {
    await delay(500);
    return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  }),

  http.post<never, never, ValidateTokenResponse>(`${API_PATH.auth}/token`, async ({ request }) => {
    return HttpResponse.json({
      accessToken: 'fake-access-token',
    });
  }),

  http.delete<never, UserDeleteRequestBody, never>(`${API_PATH.user}/delete-me`, async ({ request }) => {
    try {
      const { authId } = devModeAuthGuard(request);
      const { password } = await request.json();

      const result = mockDatabase.deleteUser(authId, password);

      if (result) {
        return HttpResponse.json({ status: 200 });
      } else {
        return HttpResponse.json({ status: 400, message: '비밀번호가 일치하지 않습니다' }, { status: 400 });
      }
    } catch {
      return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
    }
  }),

  http.get<never, never, UserInfoResponse | InitUserInfoResponse | ErrorResponseData>(
    `${API_PATH.user}/me`,
    async ({ request }) => {
      const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (accessToken === 'undefined' || !accessToken) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }
      const userInfo = mockDatabase.getUserInfo(mockDecryptToken(accessToken).authId);
      await delay(500);

      if (!userInfo) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json(userInfo);
    },
  ),

  http.post<never, SignUpRequestBody, never>(`${API_PATH.user}/sign-up`, async ({ request }) => {
    const userData = await request.json();
    const isSuccess = mockDatabase.createUser(userData);
    await delay(500);

    if (!isSuccess) {
      return HttpResponse.json({ status: 400, message: '이미 가입된 학번입니다.' }, { status: 400 });
    }

    return HttpResponse.json({ status: 200 });
  }),

  http.post<never, SignInRequestBody, SignInResponse | ErrorResponseData>(
    `${API_PATH.auth}/sign-in`,
    async ({ request }) => {
      const signInData = await request.json();

      const isSuccess = mockDatabase.signIn(signInData);
      await delay(500);

      if (!isSuccess) {
        return HttpResponse.json(
          { status: 400, message: '아이디 또는 비밀번호가 일치하지 않습니다.' },
          { status: 400 },
        );
      }

      return HttpResponse.json({
        accessToken: 'fake-access-token',
        refreshToken: 'fake-refresh-token',
      });
    },
  ),

  http.get<never, FindIdFormSchema, FindIdResponse | ErrorResponseData>(findAuthId, async ({ request }) => {
    await delay(500);
    const studentNumber = request.url.split('/')[4];
    const userInfo = mockDatabase.getFindId({ studentNumber });
    return userInfo.studentNumber.length === 8
      ? HttpResponse.json(userInfo)
      : HttpResponse.json({ status: 400, message: '해당 사용자를 찾을 수 없습니다.' }, { status: 400 });
  }),

  http.get<never, FindIdFormSchema, never>(validateUser, async ({ request }) => {
    await delay(500);
    const studentNumber = request.url.split('/')[4];
    const authId = request.url.split('=')[1];
    const response = mockDatabase.validateUser({ authId, studentNumber });
    return response.passedUserValidation
      ? HttpResponse.json(response)
      : HttpResponse.json({ status: 400, message: '해당 사용자를 찾을 수 없습니다.' }, { status: 400 });
  }),

  http.patch<never, FindPasswordFormSchema, never>(`${API_PATH.user}/password`, async ({ request }) => {
    const userData = await request.json();
    const result = mockDatabase.resetPassword(userData);
    await delay(500);

    return HttpResponse.json({ status: 200 });
  }),
];
