import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { RESULT_CATEGORY } from '@/app/utils/key/result-category.key';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface LectureInfoResponse {
  [index: string]: string | number | boolean;
  id: string;
  name: string;
  credit: number;
}

export interface ResultCategoryDetailLecturesResponse {
  categoryName: string;
  totalCredit: number;
  takenCredit: number;
  takenLectures: LectureInfoResponse[];
  haveToLectures: LectureInfoResponse[];
  completed: boolean;
}

export interface ResultCategoryDetailResponse {
  totalCredit: number;
  takenCredit: number;
  detailCategory: ResultCategoryDetailLecturesResponse[];
  completed?: boolean;
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
    const { data } = await axios<CreditResponse[]>(`${API_PATH.graduations}/credits`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const useFetchResultCategoryDetailInfo = (category: string) => {
  return useSuspenseQuery<ResultCategoryDetailResponse>({
    queryKey: [`${QUERY_KEY.CATEGORY}/${category}`],
    staleTime: Infinity,
    queryFn: () => fetchResultCategoryDetailInfo(category),
  });
};

const fetchResultCategoryDetailInfo = async (category: string) => {
  try {
    const { data } = await axios<ResultCategoryDetailResponse>(
      `${API_PATH.graduations}/detail?graduationCategory=${category}`,
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );
    return data;
  } catch (error) {
    throw error;
  }
};
