import { HttpResponse, http, delay } from 'msw';
import { revenue, parsePDF, takenLectures } from './data.mock';
import { API_PATH } from '../business/api-path';

export const handlers = [
  http.get(API_PATH.revenue, async () => {
    await delay(1000);
    console.log(revenue);
    return HttpResponse.json(revenue);
  }),

  http.post(API_PATH.parsePDF, async () => {
    await delay(1000);
    console.log(parsePDF);
    return HttpResponse.json(parsePDF);
  }),

  http.post(API_PATH.uploadFile, async () => {
    await delay(1000);
    throw new HttpResponse(null, { status: 200 });
  }),

  http.get(API_PATH.takenLectures, () => {
    return HttpResponse.json(takenLectures);
  }),
];
