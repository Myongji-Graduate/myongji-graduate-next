// RSC를 위한 data fetch 함수 작성
// 이 sample 코드는 invoice 도메인에 revenue 도메인 객체(애그리게이트) 쉽게 말하면 걍 데이터를 fetch하는 함수들을 작성

import { API_PATH } from '../api-path';

export type Revenue = {
  month: string;
  revenue: number;
};

export const fetchRevenue = async (): Promise<Revenue[]> => {
  const res = await fetch(API_PATH.revenue, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch revenue data.');
  }

  const data = await res.json();

  return data;
};
