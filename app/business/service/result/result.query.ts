import { API_PATH } from '../../api-path';
import { CreditResponse, ResultCategoryDetailResponse } from './result.type';
import axios from 'axios';
import { getToken } from '../auth';

export const fetchResultCategoryDetailInfo = async (category: string) => {
  //FIX : category를 querystring으로 호출하는 건은 mock단계에서는 불필요할 것으로 예상, 실제 api 연결시 변경 예정
  try {
    const { data } = await axios<ResultCategoryDetailResponse>(API_PATH.resultCategoryDetailInfo, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCredits = async () => {
  try {
    const { data } = await axios<CreditResponse[]>(API_PATH.credits, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};
