import { fetchCredits, fetchResultCategoryDetailInfo } from '@/app/business/services/user/user.query';
import type { CreditResponse, ResultCategoryDetailResponse } from '@/app/business/services/graduation/graduation.type';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';

export type {
  LectureInfoResponse,
  ResultCategoryDetailLecturesResponse,
  MandatoryOptionResponse,
  ResultCategoryDetailResponse,
  CreditResponse,
} from '@/app/business/services/graduation/graduation.type';

export const useFetchCredits = () => {
  return useSuspenseQuery<CreditResponse[]>({
    queryKey: [QUERY_KEY.CREDIT],
    staleTime: 60_000,
    queryFn: fetchCredits,
  });
};

export const useFetchResultCategoryDetailInfo = (category: string) => {
  return useSuspenseQuery<ResultCategoryDetailResponse>({
    queryKey: [`${QUERY_KEY.CATEGORY}/${category}`],
    staleTime: 60_000,
    queryFn: () => fetchResultCategoryDetailInfo(category),
  });
};
