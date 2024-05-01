import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';

export const resultHandlers = [
  http.get(API_PATH.resultCategoryDetailInfo, async () => {
    const resultCategoryDetailInfo = mockDatabase.getResultCategoryDetailInfo();
    await delay(4000);
    return HttpResponse.json(resultCategoryDetailInfo);
  }),
  http.get(API_PATH.credits, async () => {
    const resultCategoryInfo = mockDatabase.getCredits();
    await delay(5000);
    return HttpResponse.json(resultCategoryInfo);
  }),
];
