import { HttpResponse, http, delay } from 'msw';
import { API_PATH } from '../../business/api-path';
import { mockDatabase } from '../db.mock';
import { ErrorResponseData } from '@/app/utils/http/http-error-handler';
import { CreditResponse, ResultCategoryDetailResponse } from '@/app/store/querys/result';

export const resultHandlers = [
  http.get<never, never, ResultCategoryDetailResponse | ErrorResponseData>(
    `${API_PATH.graduations}/detail?graduationCategory=`,
    async ({ request }) => {
      const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (accessToken === 'undefined' || !accessToken) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }

      const data = mockDatabase.getResultCategoryDetailInfo();
      await delay(3000);

      if (!data) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json(data);
    },
  ),
  http.get<never, never, CreditResponse[] | ErrorResponseData>(
    `${API_PATH.graduations}/credits`,
    async ({ request }) => {
      const accessToken = request.headers.get('Authorization')?.replace('Bearer ', '');
      if (accessToken === 'undefined' || !accessToken) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }

      const data = mockDatabase.getCredits();
      await delay(1000);
      if (!data) {
        return HttpResponse.json({ status: 401, message: 'Unauthorized' }, { status: 401 });
      }

      return HttpResponse.json(data);
    },
  ),
];
