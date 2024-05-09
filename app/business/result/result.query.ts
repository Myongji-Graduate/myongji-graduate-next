import { API_PATH } from '../api-path';
import { cookies } from 'next/headers';
import { httpErrorHandler } from '@/app/utils/http/http-error-handler';
import { CreditResponse, ResultCategoryDetailResponse } from './result.type';

export const fetchResultCategoryDetailInfo = async (category: string): Promise<ResultCategoryDetailResponse> => {
  //FIX : category를 querystring으로 호출하는 건은 mock단계에서는 불필요할 것으로 예상, 실제 api 연결시 변경 예정
  try {
    const response = await fetch(API_PATH.resultCategoryDetailInfo, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const result = await response.json();
    httpErrorHandler(response, result);

    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchCredits = async (): Promise<CreditResponse[]> => {
  try {
    const response = await fetch(API_PATH.credits, {
      headers: {
        Authorization: `Bearer ${cookies().get('accessToken')?.value}`,
      },
    });
    const result = await response.json();

    httpErrorHandler(response, result);

    return result;
  } catch (error) {
    throw error;
  }
};
