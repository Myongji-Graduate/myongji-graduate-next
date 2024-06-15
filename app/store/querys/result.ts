import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface LectureInfoResponse {
  [index: string]: string | number | boolean;
  id: number;
  lectureCode: string;
  name: string;
  credit: number;
}

export interface ResultCategoryDetailLecturesResponse {
  categoryName: string;
  totalCredits: number;
  takenCredits: number;
  takenLectures: LectureInfoResponse[];
  haveToLectures: LectureInfoResponse[];
  completed: boolean;
}

export interface ResultCategoryDetailResponse {
  totalCredit: number;
  takenCredit: number;
  detailCategory: ResultCategoryDetailLecturesResponse[];
  completed: boolean;
}

export interface CreditResponse {
  category: keyof typeof RESULT_CATEGORY;
  totalCredit: number;
  takenCredit: number;
  completed: boolean;
}

export const useFetchCredits = () => {
  return useSuspenseQuery<CreditResponse[]>({
    queryKey: [QUERY_KEY.CREDIT],
    staleTime: Infinity,
    queryFn: fetchCredits,
  });
};

const fetchCredits = async () => {
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

export const useFetchResultCategoryDetailInfo = (category: string) => {
  return useSuspenseQuery<ResultCategoryDetailResponse>({
    queryKey: [QUERY_KEY.CATEGORY],
    staleTime: Infinity,
    queryFn: () => fetchResultCategoryDetailInfo(category),
  });
};

const fetchResultCategoryDetailInfo = async (category: string) => {
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
