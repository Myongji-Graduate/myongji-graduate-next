import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';

export const resultHandlers = [
  http.get(API_PATH.resultCategoryDetailInfo, async () => {
    const resultCategoryDetailInfo = mockDatabase.getResultCategoryDetailInfo();
    console.log('data fetching 진행 시점');
    await delay(7000);
    return HttpResponse.json(resultCategoryDetailInfo);
  }),
];
