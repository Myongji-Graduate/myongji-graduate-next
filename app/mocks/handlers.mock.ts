import { HttpResponse, http, delay } from 'msw';
import { revenue, takenLectures } from './data.mock';
import { API_PATH } from '../business/api-path';

const userHandlers = [
  http.get(`${API_PATH.user}/sign-up`, async () => {
    await delay(2000);

    return HttpResponse.json({ status: 200 });
  }),
];

export const handlers = [
  ...userHandlers,
  http.get(API_PATH.revenue, async () => {
    await delay(1000);
    console.log(revenue);
    return HttpResponse.json(revenue);
  }),
  http.get(API_PATH.takenLectures, () => {
    return HttpResponse.json(takenLectures);
  }),
];
