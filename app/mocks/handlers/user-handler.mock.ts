import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import {
  SignUpRequestBody,
  SignInRequestBody,
  SignInResponse,
  ValidateTokenResponse,
} from '@/app/business/user/user.type';
import { ErrorResponseData } from '@/app/utils/http/http-error-handler';

export const userHandlers = [
  http.post<never, never, ValidateTokenResponse>(`${API_PATH.auth}/token`, async ({ request }) => {
    return HttpResponse.json({
      accessToken: 'fake-access-token',
    });
  }),
  // http.get<never, never>(`${API_PATH.user}`, async ({ cookies  }) => {
  //   const accessToken = headers.get('Authorization')?.replace('Bearer ', '');
  //   if (!accessToken) {
  //     return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  //   }

  //   const userInfo = mockDatabase.getUserInfo(accessToken);
  //   await delay(500);

  //   if (!userInfo) {
  //     return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
  //   }

  //   return HttpResponse.json(userInfo);
  // }
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
];
