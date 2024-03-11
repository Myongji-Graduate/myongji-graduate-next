import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { SignUpRequestBody } from '../../business/user/user.command';
import { mockDatabase } from '../db.mock';

export const userHandlers = [
  http.post<never, SignUpRequestBody, never>(`${API_PATH.user}/sign-up`, async ({ request }) => {
    const userData = await request.json();

    mockDatabase.createUser(userData);
    await delay(2000);

    return HttpResponse.json({ status: 200 });
  }),
];
