import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../business/api-path';
import { mockDatabase } from './db.mock';
import { SignUpRequestBody } from '../business/user/user.command';

const userHandlers = [
  http.post<never, SignUpRequestBody, never>(`${API_PATH.user}/sign-up`, async ({ request }) => {
    const userData = await request.json();

    mockDatabase.createUser(userData);
    await delay(2000);

    return HttpResponse.json({ status: 200 });
  }),
];

export const handlers = [
  ...userHandlers,
  http.get(API_PATH.takenLectures, () => {
    const takenLectures = mockDatabase.getTakenLectures();

    return HttpResponse.json(takenLectures[0]);
  }),
];
