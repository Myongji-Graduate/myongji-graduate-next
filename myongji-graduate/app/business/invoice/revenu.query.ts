import { API_PATH } from '../api-path';

export type Revenue = {
  month: string;
  revenue: number;
};

export const fetchRevenue = async () => {
  const res = await fetch(API_PATH.revenue, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch revenue data.');
  }

  const data = await res.json();

  // Risk: 이게 맞나..?
  return data as Revenue[];
};
