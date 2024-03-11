import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { SignUpRequestBody } from '@/app/business/user/user.type';

export const userHandlers = [
  http.post<never, SignUpRequestBody, never>(`${API_PATH.user}/sign-up`, async ({ request }) => {
    const userData = await request.json();

    const isFailure = mockDatabase.createUser(userData);
    await delay(2000);

    if (isFailure) {
      return HttpResponse.json({ status: 400, message: '이미 존재하는 계정입니다.' });
    }

    return HttpResponse.json({ status: 200 });
  }),
];
