import { HttpResponse, http, delay } from 'msw';
import { revenue } from './data.mock';
import { API_PATH } from '../business/api-path';

export const handlers = [
  http.get(API_PATH.revenue, async () => {
    await delay(1000);
    console.log(revenue);
    return HttpResponse.json(revenue);
  }),
];
