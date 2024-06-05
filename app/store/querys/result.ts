import { API_PATH } from '@/app/business/api-path';
import { getToken } from '@/app/business/services/auth';
import { CreditResponse } from '@/app/business/services/result/result.type';
import { QUERY_KEY } from '@/app/utils/query/react-query-key';
import { useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useFetchCredits = () => {
  return useSuspenseQuery<CreditResponse[]>({
    queryKey: [QUERY_KEY.CREDIT],
    staleTime: Infinity,
    queryFn: fetchCredits,
  });
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
