import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';

export const resultHandlers = [
  http.get(API_PATH.resultCategoryDetailInfo, async () => {
    const resultCategoryDetailInfo = mockDatabase.getResultCategoryDetailInfo();
    await delay(100);
    return HttpResponse.json(resultCategoryDetailInfo);
  }),
];
