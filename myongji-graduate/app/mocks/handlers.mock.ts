import { HttpResponse, http, delay } from 'msw';
import { revenue } from './data.mock';

export const handlers = [
  http.get('/revenue', async () => {
    await delay(5000);
    console.log(revenue)
    return HttpResponse.json(revenue);
  })
]