import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { SignUpRequestBody } from '@/app/business/user/user.type';

export const userHandlers = [
  http.post<never, SignUpRequestBody, never>(`${API_PATH.user}/sign-up`, async ({ request }) => {
    const userData = await request.json();
    console.log('userdata', userData);

    mockDatabase.createUser(userData);
    await delay(2000);

    return HttpResponse.json({ status: 200 });
  }),
];
